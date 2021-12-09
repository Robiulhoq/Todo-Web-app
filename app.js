// selector
const todoInput = document.querySelector(".todo_input");
const todoButton = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo_list");
const filterOption = document.querySelector(".filter_todo");
// event listinler
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheckEdit);
filterOption.addEventListener("click", filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);
// function
function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.classList.add("todo_item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);
  saveLocalTodos(todoInput.value)

  const editButton = document.createElement("button")
  editButton.classList.add("edit_btn")
  editButton.innerHTML = '<i class="far fa-edit"></i>';
  todoDiv.appendChild(editButton)

  const completebutton = document.createElement("button");
  completebutton.classList.add("complete_btn");
  completebutton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completebutton);

  const trashButton = document.createElement("button");
  trashButton.classList.add("trash_btn");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheckEdit(event) {
  const item = event.target;
  if (item.classList[0] === "trash_btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo)
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete_btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  if(item.classList[0] === "edit_btn"){
    const todo = item.parentElement;
    const todoText = item.parentElement.innerText;
    todoInput.value = todoText;
    removeLocalTodos(todo)
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    } 
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex"
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompletd":
        if(!todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else{
          todo.style.display = "none";
        } 
        break;
    }
  });
}

// function editTodo(todo){
//   let todos;
//   if(localStorage.getItem("todos") === null){
//     todos = []
//   } else{
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }
//   todos.forEach(function(todo){
//    document.createElement("input").value = todo;
//   })
// }
 
function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = []
  } else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = []
  } else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.classList.add("todo_item");
  newTodo.innerText = todo;
  todoDiv.appendChild(newTodo);
  
  const editButton = document.createElement("button")
  editButton.classList.add("edit_btn")
  editButton.innerHTML = '<i class="far fa-edit"></i>';
  todoDiv.appendChild(editButton)

  const completebutton = document.createElement("button");
  completebutton.classList.add("complete_btn");
  completebutton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completebutton);

  const trashButton = document.createElement("button");
  trashButton.classList.add("trash_btn");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = []
  } else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1)
   localStorage.setItem('todos', JSON.stringify(todos))
}