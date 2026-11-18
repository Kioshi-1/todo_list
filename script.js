const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

todoForm.addEventListener("submit", addTask);

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement('li');  
    li.dataset.id = task.id;

    const span = document.createElement('span');
    span.textContent = task.text;
    span.classList.add("todo-text");
    if (task.completed) {
      span.classList.add("completed");
    }

    const actions = document.createElement('div');
    actions.classList.add("todo-actions");

    const btnDone = document.createElement('button');
    btnDone.type = "button";
    btnDone.classList.add("btn-done");
    btnDone.textContent = "Выполнено";
    btnDone.addEventListener('click', () => doneTask(task.id));

    const btnDelete = document.createElement('button');
    btnDelete.type = "button";
    btnDelete.classList.add("btn-delete");
    btnDelete.textContent = "Удалить";
    btnDelete.addEventListener('click', () => deleteTask(task.id));

    li.append(span, actions);
    actions.append(btnDone, btnDelete);
    todoList.appendChild(li);
  });
}

function addTask(event) {
  event.preventDefault();
  if (todoInput.value.trim() === "") {
    return;
  }
  
  const taskObj = {
    id: crypto.randomUUID(),
    text: todoInput.value,
    completed: false
  };

  tasks.push(taskObj);

  saveTasks();
  renderTasks();
  
  todoInput.value = '';
}

function doneTask(id) {
   const foundTask = tasks.find(t => t.id === id);
   if (foundTask) {
    foundTask.completed = !foundTask.completed;
   }
   saveTasks();
   renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);

  saveTasks();
  renderTasks();
}


renderTasks();