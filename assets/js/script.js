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

    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

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
    listItemEl.appendChild(taskInfoE1);
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

formE1.addEventListener("submit", taskFormHandler);
