const todoContainer = document.getElementById("todo");
const inProgessContainer= document.getElementById("in-progess");
const doneContainer = document.getElementById("done");
const hostName = "todolist-s7ls.onrender.com";
const addNewTaskAPI = frameAPI(hostName,"add");
const getAllTasksAPI = frameAPI(hostName,"getAllTask");
const expiredTaskAPI = frameAPI(hostName,"getTimeExceedTasks");

let currentDate = new Date();
let nextDate = new Date(currentDate);
console.log(nextDate);
nextDate.setDate(currentDate.getDate()+1);
let formattedDate = nextDate.toISOString().split('T')[0];
console.log(formattedDate);


const taskItem = {
    "taskName": "Task Name",
    "taskDescription": "Sample Description",
    "completedPercentage": 0,
    "completionDate": nextDate.getTime()/1000,
    "priority": "Critical",
    "status": "Todo"
}

console.log(taskItem);
let taskColorMap = {
    "Critical" : "red",
    "Important" : "yellow",
    "Normal" : "green"
}

function getCardContainer(item) {
    let parentDiv = document.createElement("div");
    parentDiv.id = item['id']
    parentDiv.className = "generalClass";

    let headingAndStatusDiv = getheadingAndPriorityDiv(item["taskName"], item["priority"], item["id"]);
    parentDiv.appendChild(headingAndStatusDiv);

    let brtag1 = document.createElement("br");
    parentDiv.appendChild(brtag1);
    
    let paraDiv = getDescriptionAndPercentageCompletedDiv(parentDiv, item["taskDescription"], item["completedPercentage"], item["id"]);
    parentDiv.appendChild(paraDiv);

    let brtag2 = document.createElement("br");
    parentDiv.appendChild(brtag2);

    let footerDiv = footerSection(item);
    paraDiv.appendChild(footerDiv);
    
    return parentDiv;
}

function clearDefaults(eventListener, defaultValue) {
    if(eventListener.target.innerText === defaultValue){
        eventListener.target.innerText = "";
    }
}

function getheadingAndPriorityDiv(heading, priority, taskId){
    let headingAndStatusDiv = document.createElement("div");
    headingAndStatusDiv.className = "taskList";

    let headingDiv = document.createElement("h3");
    headingDiv.textContent = heading;
    headingDiv.contentEditable = true;
    headingDiv.addEventListener("click", (eventListener)=>{
        clearDefaults(eventListener, "Task Name");
    })
    headingDiv.addEventListener("blur",(eventListener) => {
        let heading = eventListener.target.innerText;
        let params = {
            "taskId" : taskId,
            "key" : "taskName",
            "value" : heading
        }
        let updateHeadingAPI = frameAPI(hostName,"updateBasedOnKey",params);
        (async () => {
            response = await performAPICall("GET", updateHeadingAPI);
        })();
    });

    headingAndStatusDiv.appendChild(headingDiv);

    let buttonDiv = document.createElement("button");
    buttonDiv.textContent = priority;
    buttonDiv.style.backgroundColor = taskColorMap[priority];
    buttonDiv.addEventListener("click", (eventListener) =>{
        let currentPriority = eventListener.target.innerText;
        if(currentPriority=="Critical"){
            eventListener.target.innerText = "Important";
            eventListener.target.style.backgroundColor = "yellow";
        }
        else if(currentPriority=="Important"){
            eventListener.target.innerText = "Normal";
            eventListener.target.style.backgroundColor = "green";
        }
        else if(currentPriority=="Normal"){
            eventListener.target.innerText = "Critical";
            eventListener.target.style.backgroundColor = "red";
        }
        let priority = eventListener.target.innerText;
        let params = {
            "taskId" : taskId,
            "key" : "priority",
            "value" : priority
        }
        let updatePriorityAPI = frameAPI(hostName,"updateBasedOnKey",params);
        (async () => {
            response = await performAPICall("GET", updatePriorityAPI);
        })();
    })

    headingAndStatusDiv.appendChild(buttonDiv);

    return headingAndStatusDiv;
}

function getDescriptionAndPercentageCompletedDiv(parentDiv, description, completePercentage, taskId){
    let descriptionAndPercentageCompletedDiv = document.createElement("div");
    
    let para = document.createElement("para");
    para.innerText = description;
    para.contentEditable = true;
    para.style.margin = "10px";
    descriptionAndPercentageCompletedDiv.appendChild(para);
    para.addEventListener("click", (eventListener)=>{
        clearDefaults(eventListener, "Sample Description");
    })
    para.addEventListener("blur",(eventListener) => {
        let description = eventListener.target.innerText;
        let params = {
            "taskId" : taskId,
            "key" : "taskDescription",
            "value" : description
        }
        let updateDescriptionAPI = frameAPI(hostName,"updateBasedOnKey",params);
        (async () => {
            response = await performAPICall("GET", updateDescriptionAPI);
        })();
    });

    let scrollEle = document.createElement("input");
    scrollEle.type = "range";
    scrollEle.min = 0;
    scrollEle.max = 100;
    scrollEle.className = "slider";
    scrollEle.value = completePercentage;

    scrollEle.addEventListener("change",(eventListener)=>{
        // Updating the percentage in DB
        let percentCompleted = eventListener.target.value;
        let currentStatus = "";
        if(percentCompleted==0){ 
            todoContainer.append(parentDiv);
            let deleteBtn = parentDiv.getElementsByClassName("deleteBtnCSS")[0];
            deleteBtn.style.display = "none";
            currentStatus = "Todo";
        }
        else if(percentCompleted==100){ 
            doneContainer.append(parentDiv);
            let deleteBtn = parentDiv.getElementsByClassName("deleteBtnCSS")[0];
            deleteBtn.style.display = "block";
            currentStatus = "Done";
        }
        else{ 
            inProgessContainer.append(parentDiv);
            let deleteBtn = parentDiv.getElementsByClassName("deleteBtnCSS")[0];
            deleteBtn.style.display = "none";
            currentStatus = "Inprogess";
        }
        (async() =>{
            let params = {
                "taskId" : taskId,
                "key" : "status",
                "value" : currentStatus
            }
            let updateStatusAPI = frameAPI(hostName,"updateBasedOnKey",params);
            response = await performAPICall("GET", updateStatusAPI);
            console.log(response);
            params["key"] = "completedPercentage";
            params["value"] = percentCompleted;
            let updatePercentageCompletedAPI = frameAPI(hostName,"updateBasedOnKey",params);
            response = await performAPICall("GET", updatePercentageCompletedAPI);
            console.log(response);
        })();
    })
    let scrollBarAndCompletedBtnDiv = document.createElement("div");
    scrollBarAndCompletedBtnDiv.appendChild(scrollEle);
    scrollBarAndCompletedBtnDiv.className = "flexClass";
    
    let completedBtn = document.createElement("button");
    completedBtn.innerText = "Completed";
    completedBtn.addEventListener("click", () =>{
        let scrollVal = parentDiv.getElementsByTagName("input")[0];
        scrollVal.value = 100;
        console.log(scrollVal);
        doneContainer.append(parentDiv);
        let deleteBtn = parentDiv.getElementsByClassName("deleteBtnCSS")[0];
        deleteBtn.style.display = "block";
        currentStatus = "Done";
        (async() =>{
            let params = {
                "taskId" : taskId,
                "key" : "status",
                "value" : currentStatus
            }
            let updateStatusAPI = frameAPI(hostName,"updateBasedOnKey",params);
            response = await performAPICall("GET", updateStatusAPI);
            console.log(response);
            params["key"] = "completedPercentage";
            params["value"] = 100;
            let updatePercentageCompletedAPI = frameAPI(hostName,"updateBasedOnKey",params);
            response = await performAPICall("GET", updatePercentageCompletedAPI);
            console.log(response);
        })();
    })
    scrollBarAndCompletedBtnDiv.appendChild(completedBtn);

    descriptionAndPercentageCompletedDiv.appendChild(scrollBarAndCompletedBtnDiv);
    return descriptionAndPercentageCompletedDiv;
}

function footerSection(entireItem){
    let footerDiv = document.createElement("div");
    footerDiv.className = "dateTimeToBeCompletedDiv"; 
    // footerDiv.classList.add("");
    let inputDateDiv = document.createElement("input");
    inputDateDiv.type = "date";
    inputDateDiv.className = "dateTimeToBeCompleted";
    inputDateDiv.addEventListener("blur", (eventListener)=>{
        console.log(eventListener.target.value);
        params = {
            "taskId" : entireItem['id'],
            "key" : "completionDate",
            "value" : eventListener.target.value
        }
        let dateChangeAPI = frameAPI(hostName,"updateBasedOnKey",params);
        (async () => {
            response = await performAPICall("GET", dateChangeAPI);
            console.log(response);
        })();
    })

    let epochTime = entireItem["completionDate"];
    console.log(epochTime);
    let date = new Date(epochTime*1000);
    let formattedDate = date.toISOString().split("T")[0];
    console.log(formattedDate);
    inputDateDiv.value = formattedDate;
    footerDiv.appendChild(inputDateDiv);
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtnCSS";
    deleteBtn.textContent = "Delete Task";
    footerDiv.appendChild(deleteBtn);
    deleteBtn.addEventListener("click",(eventListener) =>{
        console.log(eventListener.target.id);
        let id = entireItem['id'];
        console.log(id);
        let cardToBeDeleted = document.getElementById(id);
        cardToBeDeleted.remove();
        let params = {
            "taskId" : entireItem['id'],
        }
        let deleteTaskAPI = frameAPI(hostName,"delete",params);
        (async () => {
            response = await performAPICall("GET", deleteTaskAPI);
            console.log(response);
        })();
    })
    deleteBtn.style.display = "none";
    // deleteBtn.style.visibility = hidden;
    if(entireItem["status"] == "Done"){
        deleteBtn.style.display = "block";
    }

    return footerDiv;
}

function frameAPI(hostName, endpoint, params = {}) {
    let url = `https://${hostName}/task/${endpoint}`;
    if (Object.keys(params).length !== 0) {
        url += '?';
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                url += key + '=' + params[key] + "&";
            }
        }
        url = url.substring(0, url.length - 1);
    }
    return url;
}

async function performAPICall(method, url, payload = {}) {
    try {
        let response;
        if (method === "GET") {
            response = await fetch(url);
            let responseFromDB = await response.json();
            console.log('GET response data:', responseFromDB);
            return responseFromDB;
        } else if (method === "POST") {
            response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            let responseData = await response.json();
            console.log('POST response data:', responseData);
            return responseData;
        }
    } catch (error) {
        console.error(`${method} request error:`, error);
    }
}


function getDetailsFromBackEnd(){
    let responseFromDB 
    (async () => {
        responseFromDB = await performAPICall("GET", getAllTasksAPI);
        responseFromDB = responseFromDB["taskList"];
        for(let item of responseFromDB){
            let cardToBeAdded = getCardContainer(item);
            console.log(item);
            if(item["status"].toLowerCase() == "todo") todoContainer.append(cardToBeAdded);
            else if(item["status"].toLowerCase() == "inprogess") inProgessContainer.append(cardToBeAdded);
            else if(item["status"].toLowerCase() == "done") doneContainer.append(cardToBeAdded);
        }
        console.log(responseFromDB);
    })();
    
}

function addNewEventFunction(){
    let cardToBeAdded = getCardContainer(taskItem);
    todoContainer.append(cardToBeAdded);
    (async () => {
        let payload = {
            "taskName" : "Task Name",
            "taskDescription" : "Sample Description",
            "priority" : "Critical",
            "completionDate" : formattedDate
        }
        await performAPICall("POST", addNewTaskAPI,payload);
    })();
}

function openDialog() {
    document.getElementById('dialogBox').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeDialog() {
    console.log("Inside the close dialog box");
    document.getElementById('dialogBox').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function createAlertItem(item){
    let card = document.createElement("div");
    card.className = "generalClass";
    let cardTitle = document.createElement("div");
    cardTitle.innerHTML = item["taskName"];
    cardTitle.className = "generalClass";
    cardTitle.style.backgroundColor = taskColorMap[item["priority"]];
    console.log(taskColorMap[item["priority"]]);
    card.appendChild(cardTitle);
    return card;
}
function frameAlertMessage(){
    console.log("Inside the frameAlertMessage");
    (async() => {
        let response = await performAPICall("GET", expiredTaskAPI);
        let taskList = response.taskList;
        console.log("taskList.length >> ",taskList.length);
        if(taskList.length >0){
            let taskIdList = []
            let alertElement = document.getElementById("dialogBox");
            alertElement.innerHTML = `
            <h3> Task Timeline Exceeded List </h3>
            `
            taskList.forEach((item, index) => {
                let createElement = createAlertItem(item);
                alertElement.appendChild(createElement);
            });
            let closeButton = document.createElement("button");
            closeButton.innerText = "Close";
            closeButton.addEventListener("click",closeDialog);
            alertElement.appendChild(closeButton);
            openDialog();
        }
    })();
}

window.onload = getDetailsFromBackEnd()

let addNewEvent = document.getElementsByClassName("addNewEventCSS")[0];
addNewEvent.addEventListener("click", addNewEventFunction);

// setInterval(frameAlertMessage,10000)
setInterval(frameAlertMessage, 3600000)