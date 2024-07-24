const todoContainer = document.getElementById("todo");
const inProgessContainer= document.getElementById("in-progess");
const doneContainer = document.getElementById("done");
const hostName = "todolist-s7ls.onrender.com";
const addNewTaskAPI = frameAPI(hostName,"add");
const getAllTasksAPI = frameAPI(hostName,"getAllTask");
const expiredTaskAPI = frameAPI(hostName,"getTimeExceedTasks");

let nextDate = new Date();
nextDate.setDate(nextDate.getDate()+1);
let formattedDate = nextDate.toISOString().split('T')[0];


const taskItem = {
    "taskName": "Task Name",
    "taskDescription": "Sample Description",
    "completedPercentage": 0,
    "completionDate": nextDate.getTime()/1000,
    "priority": "Critical",
    "status": "Todo"
}

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
            params["key"] = "completedPercentage";
            params["value"] = percentCompleted;
            let updatePercentageCompletedAPI = frameAPI(hostName,"updateBasedOnKey",params);
            response = await performAPICall("GET", updatePercentageCompletedAPI);
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
            params["key"] = "completedPercentage";
            params["value"] = 100;
            let updatePercentageCompletedAPI = frameAPI(hostName,"updateBasedOnKey",params);
            response = await performAPICall("GET", updatePercentageCompletedAPI);
        })();
    })
    scrollBarAndCompletedBtnDiv.appendChild(completedBtn);

    descriptionAndPercentageCompletedDiv.appendChild(scrollBarAndCompletedBtnDiv);
    return descriptionAndPercentageCompletedDiv;
}

function frameTheDateInputTag(taskId, completionDate){
    let inputDateDiv = document.createElement("input");
    inputDateDiv.type = "date";
    inputDateDiv.className = "dateTimeToBeCompleted";
    inputDateDiv.addEventListener("blur", (eventListener)=>{
        params = {
            "taskId" : taskId,
            "key" : "completionDate",
            "value" : eventListener.target.value
        }
        let dateChangeAPI = frameAPI(hostName,"updateBasedOnKey",params);
        (async () => {
            response = await performAPICall("GET", dateChangeAPI);
            let alertElementDiv = document.getElementById("alertMessage");
            if(alertElementDiv.style.display == "block"){
                closeDialog();
                frameAlertMessage();
            }
        })();
    });
    let epochTime = completionDate;
    let date = new Date(epochTime*1000);
    let formattedDate = date.toISOString().split("T")[0];
    inputDateDiv.value = formattedDate;
    return inputDateDiv;
}

function frameDeleteButton(taskId){
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtnCSS";
    deleteBtn.textContent = "Delete Task";
    deleteBtn.addEventListener("click",(eventListener) =>{
        let id = taskId;
        let cardToBeDeleted = document.getElementById(id);
        cardToBeDeleted.remove();
        let params = {
            "taskId" : taskId
        }
        let deleteTaskAPI = frameAPI(hostName,"delete",params);
        (async () => {
            response = await performAPICall("GET", deleteTaskAPI);
            let alertElementDiv = document.getElementById("alertMessage");
            if(alertElementDiv.style.display == "block"){
                closeDialog();
                frameAlertMessage();
            }
        })();
        
    })
    return deleteBtn;
}

function footerSection(entireItem){
    let footerDiv = document.createElement("div");
    footerDiv.className = "dateTimeToBeCompletedDiv"; 
    let inputDateDiv = frameTheDateInputTag(entireItem['id'], entireItem["completionDate"]);
    footerDiv.appendChild(inputDateDiv);
    let deleteBtn = frameDeleteButton(entireItem['id']);
    footerDiv.appendChild(deleteBtn);
    deleteBtn.style.display = "none";
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
        openLoading();
        let response;
        if (method === "GET") {
            response = await fetch(url);
            let responseFromDB = await response.json();
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
            return responseData;
        }
    } catch (error) {
        console.error(`${method} request error:`, error);
    }
    finally{
        closeLoading();
    }
}

function openLoading() {
    let overlaySpinElement = document.getElementById("overlayForLoading");
    let spinLoadingElement = document.getElementById("spinLoading");
    overlaySpinElement.style.display = "flex";
    spinLoadingElement.style.display = "block";
}

function closeLoading() {
    let overlaySpinElement = document.getElementById("overlayForLoading");
    let spinLoadingElement = document.getElementById("spinLoading");
    overlaySpinElement.style.display = "none";
    spinLoadingElement.style.display = "none";
}

function getDetailsFromBackEnd(){
    let responseFromDB 
    (async () => {
        responseFromDB = await performAPICall("GET", getAllTasksAPI);
        responseFromDB = responseFromDB["taskList"];
        for(let item of responseFromDB){
            let cardToBeAdded = getCardContainer(item);
            if(item["status"].toLowerCase() == "todo") todoContainer.append(cardToBeAdded);
            else if(item["status"].toLowerCase() == "inprogess") inProgessContainer.append(cardToBeAdded);
            else if(item["status"].toLowerCase() == "done") doneContainer.append(cardToBeAdded);
        }
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
    let overlayForAlert = document.getElementById("overlayForAlertMessage");
    let alertMessageDiv = document.getElementById("alertMessage");
    overlayForAlert.style.display = "flex";
    alertMessageDiv.style.display = "block";
}

function closeDialog() {
    let overlayForAlert = document.getElementById("overlayForAlertMessage");
    let alertMessageDiv = document.getElementById("alertMessage");
    overlayForAlert.style.display = "none";
    alertMessageDiv.style.display = "none";
}

function calculateTheDaysCrossed(taskActualEpochTime){
    let currentEpochTime = Date.now();
    currentEpochTime = currentEpochTime/1000;
    console.log("currentEpochTime : ",currentEpochTime);
    let daysCrossedTheDueDate = Math.floor((currentEpochTime-taskActualEpochTime)/86400);
    return daysCrossedTheDueDate;
}

function frameCardTitle(taskName, taskActualEpochTime){
    let daysCrossedTheDueDate = calculateTheDaysCrossed(taskActualEpochTime);
    let cardTitle = document.createElement("div");
    cardTitle.innerHTML = taskName+"<br>"+"Task due date is before "+daysCrossedTheDueDate+" days";
    cardTitle.className = "generalClass";
    return cardTitle;
}

function createAlertItem(item){
    let card = document.createElement("div");
    card.className = "generalClass";
    let cardTitle = frameCardTitle(item["taskName"], item["completionDate"]);
    cardTitle.style.backgroundColor = taskColorMap[item["priority"]];
    card.appendChild(cardTitle);
    let inputDateDiv = frameTheDateInputTag(item["id"], item["completionDate"]);
    inputDateDiv.style.margin="15px";
    card.appendChild(inputDateDiv);
    let deleteBtn = frameDeleteButton(item["id"]);
    deleteBtn.innerText = "Mark as done and delete";
    deleteBtn.style.height = "auto";
    card.append(deleteBtn);
    console.log(item['completionDate']);
    return card;
}
function frameAlertMessage(){
    let alertElementDiv = document.getElementById("alertMessage");
    if(alertElementDiv.style.display == "block") return ;
    (async() => {
        let response = await performAPICall("GET", expiredTaskAPI);
        let taskList = response.taskList;
        if(taskList.length >0){
            let alertElement = document.getElementById("alertMessage");
            alertElement.innerHTML = `
            <h3> Task Timeline Exceeded List </h3>
            `
            taskList.forEach((item, index) => {
                let createElement = createAlertItem(item);
                alertElement.appendChild(createElement);
            });
            let centerTagDiv = document.createElement("center");
            let closeButton = document.createElement("button");
            closeButton.innerText = "Close";
            closeButton.style.width = "100px";
            closeButton.style.borderRadius = "5px";
            closeButton.addEventListener("click",closeDialog);
            centerTagDiv.appendChild(closeButton);
            alertElement.appendChild(centerTagDiv);
            openDialog();
        }
    })();
}

window.onload = getDetailsFromBackEnd()

let addNewEvent = document.getElementsByClassName("addNewEventCSS")[0];
addNewEvent.addEventListener("click", addNewEventFunction);

// setInterval(frameAlertMessage,10000)
setInterval(frameAlertMessage, 3600000)