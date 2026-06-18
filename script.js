let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
// empty array to store the tasks
let arrayOfTasks=[];

// chack taskes
if(localStorage.getItem("tasks")){
   arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}
// trigger get data from local storge
getDataFromLocalStorage();
//submit Task
submit.onclick = function(){
                    if (input.value !== ""){
                    addTaskToArray(input.value);
                    input.value ="";
                    }
}
//click on tasks element
tasksDiv.addEventListener("click", (e) =>{
   if (e.target.classList.contains("delete-btn")){
       //remove task from localstoreg
       deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
      //remove element page
       e.target.parentElement.remove();  
   }
   //task element
   if(e.target.classList.contains("task")){
      toggleStatusTaskWith(e.target.getAttribute("data-id"));
      e.target.classList.toggle("done");
   }
});




function addTaskToArray(taskText){
const task = {
                    id: Date.now(),
                    title:taskText,
                    completed:false,
};
arrayOfTasks.push(task);
// add task to page
addElementsToPageFrom(arrayOfTasks);
// add tasks to local storage
addDataToLocalStorageFrom(arrayOfTasks);

}

function addElementsToPageFrom(arrayOfTasks){
                    // cleandata
   tasksDiv.innerHTML = "" ; 
//    inputOnTheFunction
   arrayOfTasks.forEach((task)=> {
                    // createElemint
                    let div = document.createElement("div");
                    div.className = "task";
                  //   check If task is Done
                  if (task.completed){
                     div.className = " task done";
                  }
                    div.setAttribute("data-id",task.id);
                    div.appendChild(document.createTextNode(task.title));
                    // buttonDelaete
                   let span = document.createElement("span");
                   span.className = "delete-btn";
                   span.appendChild(document.createTextNode("Delete"));
                  //  add button to main div
                   div.appendChild(span);
                  //  add task to tasks container
                  tasksDiv.appendChild(div);
                   
   });  
}
function addDataToLocalStorageFrom(arrayOfTasks) { 
window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
 }

 function getDataFromLocalStorage(){
   let data = window.localStorage.getItem("tasks");
   if (data){
      let tasks = JSON.parse(data);
      addElementsToPageFrom(tasks);
   }
 }

 function deleteTaskWith(taskId){
   // for explein only
   // for(let i = 0; i < arrayOfTasks.length; i++){
   //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
   // }
   arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
   addDataToLocalStorageFrom(arrayOfTasks);
 }
 function toggleStatusTaskWith(taskId){
for(let i = 0; i < arrayOfTasks.length; i++){
     if (arrayOfTasks[i].id === taskId){
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i]).completed =false
     }

 }
    addDataToLocalStorageFrom(arrayOfTasks);
}
