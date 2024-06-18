let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveTodoButton = document.getElementById("saveTodoButton");


saveTodoButton.onclick = function() {
    localStorage.setItem("itemsList", JSON.stringify(itemsList));
}

function getListFromLocalstorage() {
    let stringifiedItemsList = localStorage.getItem("itemsList");
    let parsedItemsList = JSON.parse(stringifiedItemsList);
    if (parsedItemsList === null) {
        return [];
    } else {
        return parsedItemsList;
    }
}

let itemsList = getListFromLocalstorage()


let todoCount = itemsList.length

function onToDoStatus(checkboxId, labelId, todoId) {
    let checkBoxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked")
    let todoObjectIndex = itemsList.findIndex(function(i) {
        let objectId = "todo" + i.uniqueNo;
        if (todoId === objectId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = itemsList[todoObjectIndex];
    if (todoObject.isChecked === false) {
        todoObject.isChecked = true;
    } else {
        todoObject.isChecked = false
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deletedElementIndex = itemsList.findIndex(function(i) {
        let eachTodoId = "todo" + i.uniqueNo;
        if (todoId === eachTodoId) {
            return true;
        } else {
            return false;
        }
    });
    itemsList.splice(deletedElementIndex, 1);


}

function todolistOperations(todo) {

    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container");
    todoElement.classList.add("d-flex");
    todoElement.classList.add("flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement)

    let inputElement = document.createElement("input");
    inputElement.id = checkboxId
    inputElement.type = "checkbox"
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input")
    todoElement.appendChild(inputElement)
    inputElement.onclick = function() {
        onToDoStatus(checkboxId, labelId, todoId);
    }

    let containerElement = document.createElement("div");
    containerElement.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(containerElement)

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label")
    if (todo.isChecked === true) {
        labelElement.classList.add("checked")
    }
    containerElement.appendChild(labelElement);

    let imageContainer = document.createElement("div");
    imageContainer.classList.add("delete-icon-container");
    imageContainer.onclick = function() {
        onDeleteTodo(todoId)
    }
    containerElement.appendChild(imageContainer);

    let image = document.createElement("i");
    image.classList.add("far", "fa-trash-alt", "delete-icon")
    imageContainer.appendChild(image)



}
for (let i of itemsList) {
    todolistOperations(i);
}

function onAddTodo() {
    todoCount = todoCount + 1
    let userInput = document.getElementById("todoUserInput");
    let userInputValue = userInput.value;
    if (userInputValue === "") {
        alert("Invalid Operation");
        return
    }
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    }
    itemsList.push(newTodo);
    todolistOperations(newTodo)
    userInput.value = " ";
}
let addTodoButton = document.getElementById("addTodoButton");
addTodoButton.onclick = function() {
    onAddTodo()
}