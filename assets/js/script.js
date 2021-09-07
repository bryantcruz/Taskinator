var pageContentE1 = document.querySelector("#page-content");
var formE1 = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }

    // has data attribute, so get task id and call function to complete edit process
if (isEdit) {
  var taskId = formE1.getAttribute("data-task-id");
  completeEditTask(taskNameInput, taskTypeInput, taskId);
}


   // no data attribute, so create object as normal and pass to createTaskEl function
else {
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

}
    var isEdit = formE1.hasAttribute("data-task-id");

    

    createTaskE1(taskDataObj);
  }


var createTaskE1 = function(taskDataObj) {
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    
    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    // give it a class name
    taskInfoE1.className = "task-info";
    // add HTML content to div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  
  
    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsE1);
    tasksToDoEl.appendChild(listItemEl);
   // increase task counter for next unique id
    taskIdCounter++;
};
var createTaskActions = function(taskId) {
  var actionContainerE1 = document.createElement("div");
  actionContainerE1.className = "task-actions";
  // create edit button
  var editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "btn edit-btn";
  editButton.setAttribute("data-task-id", taskId);

  actionContainerE1.appendChild(editButton);

  // create delete button
  var deleteButtonE1 = document.createElement("button");
  deleteButtonE1.textContent = "Delete";
  deleteButtonE1.className = "btn delete-btn";
  deleteButtonE1.setAttribute("data-task-id", taskId);

  actionContainerE1.appendChild(deleteButtonE1);

  var statusSelectE1 = document.createElement("select");
  statusSelectE1.className = "select-status";
  statusSelectE1.setAttribute("name", "status-change");
  statusSelectE1.setAttribute("data-task-id", taskId);

  actionContainerE1.appendChild(statusSelectE1);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i=0; i < statusChoices.length; i++) {
     //create option element
  var statusOptionE1 = document.createElement("option");
  statusOptionE1.textContent = statusChoices[i];
  statusOptionE1.setAttribute("value", statusChoices [i]);

  // append to select
  statusSelectE1.appendChild(statusOptionE1);
  
  }

  return actionContainerE1;
};

var completeEditTask = function(taskName, taskType, taskId) {
  console.log(taskName, taskType, taskId);
};

var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  if (event.target.matches(".delete-btn")) {
    console.log("you clicked a delete button");
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
    console.log(taskId);
  }
};

var editTask = function(taskId) {
  console.log(taskId);

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // write values of taskname and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // set data attribute to the form with a value of the task's id so it knows which one is being edited
  formE1.setAttribute("data-task-id", taskId);
  // update form's button to reflect editing a task rather than creating a new one
  formE1.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
  console.log(taskId);
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
}

formE1.addEventListener("submit", taskFormHandler);
pageContentE1.addEventListener("click", taskButtonHandler);

