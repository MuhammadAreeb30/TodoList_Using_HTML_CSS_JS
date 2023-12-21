const input = document.getElementById("todo-input");
const addTaskBtn = document.getElementById("add-button");
const Btn = document.getElementById("add-button").innerText;
const taskList = document.getElementById("todo-list");
let taskArray = [];
let objstr = localStorage.getItem("MyTask");
let edit_id = null;

if (objstr !== "") {
  taskArray = JSON.parse(objstr);
}

Display();
addTaskBtn.addEventListener("click", () => {
  let taskVal = input.value.trim();
  if (edit_id !== null) {
    taskArray.splice(edit_id, 1, { Task: taskVal });
    edit_id = null;
  } else {
    taskArray.push({ Task: taskVal });
  }
  SaveTask(taskArray);
  input.value = "";
  addTaskBtn.innerText = Btn;
});

const SaveTask = (taskArray) => {
  let tasks = JSON.stringify(taskArray);
  localStorage.setItem("MyTask", tasks);
  Display(taskArray);
};

function Display() {
  let statment = "";
  taskArray.forEach((task, id) => {
    statment += `
    <li>
      <span class="text">${task.Task}</span>
      <span>
        <button class="editBtn" onClick="editTask(${id})">Edit</button>
       <button class="delBtn" onClick="deleteTask(${id})">Delete</button>
     </span>
   </li>
    `;
  });
  taskList.innerHTML = statment;
}

const deleteTask = (id) => {
  taskArray.splice(id, 1);
  SaveTask(taskArray);
};

const editTask = (id) => {
  edit_id = id;
  input.value = taskArray[id].Task;
  addTaskBtn.innerText = "Save Changes";
};

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTaskBtn.click();
  }
});
