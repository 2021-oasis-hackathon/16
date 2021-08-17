const toDoForm = document.querySelector(".search__bar");
const toDoInput = document.querySelector(".search__bar input");

const TODOS_KEY = "todos";

let toDos = [];

toDoForm.addEventListener("submit", handleToDoSubmit);

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    // console.log(toDoInput.value);
    toDoInput.value = ""; // Not be gone but the value become em space
    // console.log(newTodo, toDoInput.value); // Check what's the difference between both
    const newTodoObj = { // newTodo is just text
        text: newTodo,
        id: Date.now(), // a like random number
    }
    toDos.push(newTodoObj);
    saveToDos();
}

// localStorage can save only text ,not array
// JSON.stringify( object ): Object becomes string
function saveToDos() {
    // localStorage.setItem("todos", toDos);
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

const savedToDos = localStorage.getItem(TODOS_KEY);
// console.log(savedToDos); // sting
// *************  -> when refresched, init  -> so needed the if statement

// JSON.parse( string ): string becomes array
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    // console.log(parsedToDos); // array
    toDos = parsedToDos; // Update the var  to restore  cause whenever refreshed the app, toDos array is empty
    // parsedToDos.forEach(paintToDo);
}

// function paintToDo(newTodo) {
//     // console.log("I will paint", newTodo);
//     const li = document.createElement("li");
//     li.id = newTodo.id;
//     const span = document.createElement("span");
//     span.innerText = newTodo.text;
//     const input = document.createElement("input");
//     input.type = "checkbox";
//     input.addEventListener("click", deleteToDo);
//     li.appendChild(span);
//     li.appendChild(input);
//     // console.log(li);
//     toDoList.appendChild(li);
// }