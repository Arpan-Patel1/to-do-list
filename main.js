const checkToDo = (id) => {
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));
  toDoList = toDoList.map((toDo) => {
    if (toDo.id === id) {
      return {
        ...toDo,
        checked: !toDo.checked,
      };
    } else {
      return toDo;
    }
  });
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  addTask(toDoList);
};

const createTask = () => {
  const task = document.getElementById("task").value;
  const newTask = {
    id: crypto.randomUUID(),
    task: task,
    checked: false,
    trash: false,
  };
  let toDoList = [];
  const oldTask = JSON.parse(localStorage.getItem("toDoList"));
  if (oldTask) {
    toDoList = [...oldTask, newTask];
  } else {
    toDoList.push(newTask);
  }

  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  addTask(toDoList);
};

const createToDoItem = (toDo) => {
  if (toDo.trash) {
    return "";
  }
  return `<div class="toDoContainer" >
    <div class="toDoCheck" onclick="checkToDo('${toDo.id}')" data-checked="${
    toDo.checked ? "checked" : "unchecked"
  }"></div>
    <div class="toDoText ${toDo.checked ? "lineThrough" : ""}">${
    toDo.task
  }</div>
    <img onclick="removeToDo('${
      toDo.id
    }')" class="toDoRemove" src="cross.png" alt="" />
  </div>`;
};

const addTask = (toDos) => {
  const toDoList = document.getElementById("toDoList");
  let toDoItems = "";
  for (const toDo of toDos) {
    toDoItems += createToDoItem(toDo);
  }
  toDoList.innerHTML = toDoItems;
};

const removeToDo = (id) => {
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));
  toDoList = toDoList.map((toDo) => {
    if (toDo.id === id) {
      return {
        ...toDo,
        trash: !toDo.trash,
      };
    } else {
      return toDo;
    }
  });
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  addTask(toDoList);
};

const updateDateTime = () => {
  const date = new Date();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours -= 12;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let sec = date.getSeconds();
  if (sec < 10) {
    sec = `0${sec}`;
  }
  let tarik = date.getDate();
  if (tarik < 10) {
    tarik = `0${tarik}`;
  }
  const month = date.getMonth();
  const dateTime = document.getElementById("dateTime");

  dateTime.innerHTML = `${hours}:${minutes}:${sec} ${ampm}, ${tarik} ${monthName[month]}`;
};

const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

setInterval(updateDateTime, 1000);

window.onload = () => {
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));

  if (toDoList) {
    addTask(toDoList);
  }

  updateDateTime();

  const addButton = document.querySelector(".inputContainer button");
  addButton.addEventListener("click", createTask);
};
