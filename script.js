let todoElement = document.getElementById("todo");
let inProgessElement = document.getElementById("in-progess");
let doneElement = document.getElementById("done");

todoArr = [
    {
        "name" : "Todo1",
        "description" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quas deserunt at tempora, obcaecati ex! Enim fuga minima eaque voluptatem? Facere dolorem dolores earum consequatur totam minus illum dignissimos quaerat!",
        "status" : "Critical",
        "completePercentage" : 0,
        "completionDate" : "2024-06-21"// It should be yyyy-MM-dd format
    },
    {
        "name" : "Todo2",
        "description" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quas deserunt at tempora, obcaecati ex! Enim fuga minima eaque voluptatem? Facere dolorem dolores earum consequatur totam minus illum dignissimos quaerat!",
        "status" : "Important",
        "completePercentage" : 0,
        "completionDate" : "2024-06-21"
    },
    {
        "name" : "Todo3",
        "description" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quas deserunt at tempora, obcaecati ex! Enim fuga minima eaque voluptatem? Facere dolorem dolores earum consequatur totam minus illum dignissimos quaerat!",
        "status" : "Normal",
        "completionDate" : "2024-06-21",
        "completePercentage" : 0
    }
]

inProgessArr = [
    {
        "name" : "In-progess 1",
        "description" : "Just a simple In-progess 1 description",
        "status" : "Critical",
        "completionDate" : "2024-06-21",
        "completePercentage" : 40
    },
    {
        "name" : "In-progess 2",
        "description" : "Just a simple In-progess 2 description",
        "status" : "Normal",
        "completionDate" : "2024-06-21",
        "completePercentage" : 50
    },
    {
        "name" : "In-progess 3",
        "description" : "Just a simple In-progess 3 description",
        "status" : "Important",
        "completionDate" : "2024-06-21",
        "completePercentage" : 62
    }
]

doneArr = [
    {
        "name" : "Done1",
        "description" : "Just a simple Done 1 description",
        "status" : "Normal",
        "completionDate" : "2024-06-21",
        "completePercentage" : 100
    },
    {
        "name" : "Done2",
        "description" : "Just a simple Done 2 description",
        "status" : "Important",
        "completionDate" : "2024-06-21",
        "completePercentage" : 100
    },
    {
        "name" : "Done3",
        "description" : "Just a simple Done 3 description",
        "status" : "Critical",
        "completionDate" : "2024-06-21",
        "completePercentage" : 100
    }
]

taskColorMap = {
    "Critical" : "red",
    "Important" : "yellow",
    "Normal" : "green"
}

function addElement(toBeChangedEle, arr){
    // if(toBeChangedEle.id=="todo")
    toBeChangedEle.innerHTML = `
    <h1>${toBeChangedEle.id.toUpperCase()}</h1>
    `
    arr.forEach((item, idx)=>{
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute("class","generalClass");

        let secondaryDiv = document.createElement("div");
        secondaryDiv.setAttribute("class","taskList");

        let headDiv = document.createElement("h3");
        headDiv.textContent = item['name'];

        let buttonDiv = document.createElement("button");
        buttonDiv.textContent = item['status'];
        buttonDiv.style.backgroundColor = taskColorMap[item['status']];

        secondaryDiv.appendChild(headDiv);
        secondaryDiv.appendChild(buttonDiv);

        mainDiv.appendChild(secondaryDiv);

        let paraDiv = document.createElement("p");
        paraDiv.textContent = item['description'];

        mainDiv.appendChild(paraDiv);

        let scrollDiv = document.createElement("div");
        scrollDiv.setAttribute("class","scrollBar");

        let scrollEle = document.createElement("input");
        scrollEle.type = "range";
        scrollEle.min = 0;
        scrollEle.max = 100;
        scrollEle.className = "slider";
        scrollEle.value = item['completePercentage']
        scrollEle.addEventListener("click", function(){
            moveBasedRespectiveArrBasedOnPercantageCompleted(scrollEle.value, idx, toBeChangedEle.id)
        });

        scrollDiv.appendChild(scrollEle);

        mainDiv.appendChild(scrollDiv);

        let brtag = document.createElement("br");

        mainDiv.appendChild(brtag);

        let thirdDiv = document.createElement("div");
        thirdDiv.setAttribute("class","dateTimeToBeCompletedDiv");

        let inputDiv = document.createElement("input");
        inputDiv.setAttribute("type","date");
        inputDiv.setAttribute("class","dateTimeToBeCompleted");
        inputDiv.value = item['completionDate'];

        let leftArrowBtn = document.createElement("button");
        leftArrowBtn.setAttribute("class","arrowCSS");
        leftArrowBtn.addEventListener("click", function(){
            shiftLeft(toBeChangedEle.id, idx);
        });
        leftArrowBtn.textContent = "\u2190";

        let rightArrowBtn = document.createElement("button");
        rightArrowBtn.setAttribute("class","arrowCSS");
        rightArrowBtn.textContent = "\u2192";
        rightArrowBtn.addEventListener("click", function(){
            shiftRight(toBeChangedEle.id, idx);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class","deleteBtnCSS");
        deleteBtn.textContent = "Delete Task";

        if(toBeChangedEle.id=="done" || toBeChangedEle.id=="in-progess"){
            thirdDiv.appendChild(leftArrowBtn);
        }
        thirdDiv.appendChild(inputDiv);
        
        if(toBeChangedEle.id=="todo" || toBeChangedEle.id=="in-progess"){
            thirdDiv.appendChild(rightArrowBtn);
        }
        else if(toBeChangedEle.id=="done"){
            thirdDiv.appendChild(deleteBtn);
        }

        mainDiv.appendChild(thirdDiv);

        toBeChangedEle.appendChild(mainDiv);
    })
}

function shiftLeft(idName, index){
    if(idName=="done"){
        inProgessArr.push(doneArr[index]);
        doneArr = doneArr.filter((item, idx)=>idx!=index);
    }
    else if(idName=="in-progess"){
        todoArr.push(inProgessArr[index]);
        inProgessArr = inProgessArr.filter((item, idx)=>idx!=index);
    }
    renderUI();
}

function shiftRight(idName, index){
    if(idName=="todo"){
        inProgessArr.push(todoArr[index]);
        todoArr = todoArr.filter((item, idx)=>idx!=index);
    }
    else if(idName=="in-progess"){
        doneArr.push(inProgessArr[index]);
        inProgessArr = inProgessArr.filter((item, idx)=>idx!=index);
    }
    renderUI();
}

function moveBasedRespectiveArrBasedOnPercantageCompleted(value, index, idName){
    if(value==0){
        if(idName=="done"){
            elementToBePushed = doneArr[index];
            elementToBePushed['completePercentage'] = value;
            doneArr = doneArr.filter((item, idx)=>idx!=index);
            todoArr.push(elementToBePushed);
        }
        else if(idName=="in-progess"){
            elementToBePushed = inProgessArr[index];
            elementToBePushed['completePercentage'] = value;
            inProgessArr = inProgessArr.filter(function(item, idx) {return idx!=index});
            todoArr.push(elementToBePushed);
        }
    }
    else if(value==100){
        if(idName=="todo"){
            elementToBePushed = todoArr[index]
            elementToBePushed['completePercentage'] = value;
            todoArr = todoArr.filter((item, idx)=>idx!=index);
            doneArr.push(elementToBePushed);
        }
        else if(idName=="in-progess"){
            elementToBePushed = inProgessArr[index];
            elementToBePushed['completePercentage'] = value;
            inProgessArr = inProgessArr.filter(function(item, idx) {return idx!=index});
            doneArr.push(elementToBePushed);
        }
    }
    else if(value>0 && value<100){
        if(idName=="todo"){
            elementToBePushed = todoArr[index]
            elementToBePushed['completePercentage'] = value;
            todoArr = todoArr.filter((item, idx)=>idx!=index);
            inProgessArr.push(elementToBePushed);
        }
        else if(idName=="done"){
            elementToBePushed = doneArr[index];
            elementToBePushed['completePercentage'] = value;
            doneArr = doneArr.filter(function(item, idx) {return idx!=index});
            inProgessArr.push(elementToBePushed);
        }
    }
    renderUI();
}
// function addElement(toBeChangedEle, arr){
//     arr.forEach((item, idx)=>{
//         toBeChangedEle.innerHTML +=`
//         <div class="generalClass">
//             <div class="taskList">
//                 <h3> ${item['name']} </h3>
//                 <button style="background-color: ${taskColorMap[item['status']]}"> ${item['status']} </button>
//             </div>
//             <p> ${item['description']} </p>
//             <div class="scrollBar"></div>
//             <br>
//             <div class="dateTimeToBeCompletedDiv" id="dateTimeToBeCompletedId">
//                 <input type="date" name="completionDate" id="" class="dateTimeToBeCompleted" value = ${item['completionDate']}>
//             </div>
//         </div>
//         `
//         console.log(toBeChangedEle.id)
//         // if(toBeChangedEle.id=="todo"){
//         //     let elementToBeChanged = document.getElementById("dateTimeToBeCompletedId")
//         //     elementToBeChanged.innerHTML += `
//         //     <button class="arrowCSS"> <b>&rarr;</b></button>
//         //     `
//         // }
//     });
// }

function changePriority(eventListener){
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
}

function changeInDB(eventListener){
    console.log(eventListener);
    console.log(eventListener.target.innerText);
    params = {}
    frameAPI("localhost","updateBasedOnKey")
}

function addNewTask(){
    let mainDiv = document.createElement("div");
    mainDiv.className = "generalClass";
    mainDiv.setAttribute("class","generalClass");

    let secondaryDiv = document.createElement("div");
    secondaryDiv.setAttribute("class","taskList");

    let headDiv = document.createElement("h3");
    headDiv.textContent = "Test Task";
    headDiv.contentEditable = true;
    headDiv.addEventListener("blur", (eventListener)=>{
        changeInDB(eventListener, )
    });

    let buttonDiv = document.createElement("button");
    buttonDiv.textContent = "Critical";
    buttonDiv.style.backgroundColor = taskColorMap["Critical"];
    buttonDiv.addEventListener("click", changePriority);

    secondaryDiv.appendChild(headDiv);
    secondaryDiv.appendChild(buttonDiv);

    mainDiv.appendChild(secondaryDiv);

    let paraDiv = document.createElement("p");
    paraDiv.textContent = "Sample Description";
    paraDiv.contentEditable = true

    mainDiv.appendChild(paraDiv);

    let scrollDiv = document.createElement("div");
    scrollDiv.setAttribute("class","scrollBar");

    let scrollEle = document.createElement("input");
    scrollEle.type = "range";
    scrollEle.min = 0;
    scrollEle.max = 100;
    scrollEle.className = "slider";
    scrollEle.value = 0
    scrollEle.addEventListener("click", function(){
        moveBasedRespectiveArrBasedOnPercantageCompleted(scrollEle.value, idx, toBeChangedEle.id)
    });

    scrollDiv.appendChild(scrollEle);

    mainDiv.appendChild(scrollDiv);

    let brtag = document.createElement("br");

    mainDiv.appendChild(brtag);

    let thirdDiv = document.createElement("div");
    thirdDiv.setAttribute("class","dateTimeToBeCompletedDiv");

    let inputDiv = document.createElement("input");
    inputDiv.setAttribute("type","date");
    inputDiv.setAttribute("class","dateTimeToBeCompleted");
    inputDiv.value = "";
    // Get the current date
    let currentDate = new Date();

    // Set the date to tomorrow
    currentDate.setDate(currentDate.getDate() + 1);

    // Format the date as yyyy-MM-dd (assuming you need this format)
    let formattedDate = currentDate.toISOString().split('T')[0];
    inputDiv.value = formattedDate;

    let leftArrowBtn = document.createElement("button");
    leftArrowBtn.setAttribute("class","arrowCSS");
    leftArrowBtn.addEventListener("click", function(){
        shiftLeft(toBeChangedEle.id, idx);
    });
    leftArrowBtn.textContent = "\u2190";

    let rightArrowBtn = document.createElement("button");
    rightArrowBtn.setAttribute("class","arrowCSS");
    rightArrowBtn.textContent = "\u2192";
    rightArrowBtn.addEventListener("click", function(){
        shiftRight(toBeChangedEle.id, idx);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class","deleteBtnCSS");
    deleteBtn.textContent = "Delete Task";

    
    thirdDiv.appendChild(inputDiv);
    
    thirdDiv.appendChild(rightArrowBtn);
    

    mainDiv.appendChild(thirdDiv);

    todoElement.appendChild(mainDiv);
    let addTaskAPI = frameAPI("localhost","add");
    payload = {
        "taskName" : headDiv.textContent,
        "taskDescription" : paraDiv.textContent,
        "priority" : buttonDiv.textContent,
        "completionDate" : formattedDate
    }
    console.log(payload);
    response = hitApiWithPayload(addTaskAPI, payload);
    console.log("----------------");
    console.log(response);
    console.log("----------------");
    // if (response.hasOwnProperty("taskId")){
    //     taskId = response["taskId"];
    //     console.log(taskId);
    // }

}

function frameAPI(hostName, endpoint, params={}){
    
    url = `http://${hostName}:8080/task/${endpoint}`;
    if(params!={}){
        let urlToBeAdded = "";
        for(let key in params){
            if(params.hasOwnProperty(key)){
                urlToBeAdded += key+"="+params[key];
            }
            urlToBeAdded += "&"; 
        }
        url += urlToBeAdded.slice(0,urlToBeAdded.length-1);
    }
    return url;
}

async function hitApiWithPayload(apiAddress, payload) {
    // Define fetch options
    console.log("Inside the hit api function");
    const requestOptions = {
        method: 'POST', // or 'PUT', 'PATCH', etc. depending on your API endpoint
        headers: {
            'Content-Type': 'application/json' // Specify content type if sending JSON payload
        },
        body: JSON.stringify(payload) // Convert JavaScript object to JSON string
    };

    // Make the fetch request
    await fetch(apiAddress, requestOptions)
        .then(async response => {
            if (response.ok) {
                return await response.json(); // Parse the response data as JSON
            } else {
                throw new Error('API request failed');
            }
        })
        .then(data => {
            // Process the response data here
            console.log(data); // Example: Logging the parsed JSON data to the console
            console.log("##############");
            console.log(data['taskId']);
            console.log("##############");
            return data['taskId'];
        })
        .catch(error => {
            // Handle any errors here
            console.error(error); // Example: Logging the error to the console
        });
}


function hitAnApi(apiAddress){
    fetch(apiAddress)
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response data as JSON
            } else {
                throw new Error('API request failed');
            }
        })
        .then(data => {
            // Process the response data here
            console.log(data); // Example: Logging the parsed JSON data to the console
        })
        .catch(error => {
            // Handle any errors here
            console.error(error); // Example: Logging the error to the console
        });
}




function renderUI(){
    addElement(todoElement, todoArr);
    addElement(inProgessElement, inProgessArr);
    addElement(doneElement, doneArr);
}

renderUI();

let addTask = document.getElementsByClassName("addNewEventCSS")[0]
addTask.addEventListener("click", addNewTask);


// Example usage:
// apiUrl = "http://localhost:8080/task/add"

// payload = {
// 	"taskName" : "Todo - 2",
// 	"taskDescription" : "Todo Description",
// 	"priority" : "Critical",
// 	"completionDate" : "2024-06-30"
// }
// hitApiWithPayload(apiUrl, payload);