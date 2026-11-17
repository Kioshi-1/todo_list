const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener("submit", addTask);
todoList.addEventListener("click", event => {
  if (event.target.classList.contains("btn-done")) {
    doneTask(event);
  }

  if (event.target.classList.contains("btn-delete")) {
    deleteTask(event);
  }
});

function addTask(event) {
  event.preventDefault();
  if (todoInput.value.trim() === "") {
    return;
  }
  
  const inputValue = todoInput.value;
  const li = document.createElement('li');  
  const span = document.createElement('span');
  span.textContent = inputValue;
  span.classList.add("todo-text");
  const actions = document.createElement('div');
  actions.classList.add("todo-actions");
  const btnDone = document.createElement('button');
  btnDone.type = "button";
  btnDone.classList.add("btn-done");
  btnDone.textContent = "Выполнено";
  const btnDelete = document.createElement('button');
  btnDelete.type = "button";
  btnDelete.classList.add("btn-delete");
  btnDelete.textContent = "Удалить";

  li.append(span, actions);
  actions.append(btnDone, btnDelete);
  todoList.appendChild(li);
  
  todoInput.value = '';
}

function doneTask(event) {
  const task = event.target.closest("li");
  const text = task.querySelector(".todo-text");

  text.classList.toggle('completed');
}

function deleteTask(event) {
  event.target.closest("li").remove();
}

// ДОБАВИТЬ LOCALSTORAGE