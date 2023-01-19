window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todo')) || []; //get the the todo text and parse it to javascript object    //if there is no todo text, set it to an empty array
    const nameInput = document.querySelector('#name'); //get the name input
    const newTodoForm = document.querySelector('#new-todo-form'); //get the new todo form

    const username = localStorage.getItem('username'); //get the username
    nameInput.value = username; //set the name input to the username

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value); //set the username to the name input
    })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault(); //prevent the default behavior of the form

        const todo = {
            content: e.target.elements.content.value, //get the todo text from the form
            category: e.target.elements.category.value, //get the category from the form
            done: false, //set the done to false
            createdAt: new Date().getTime() //set the createAt to the current date
        }

        todos.push(todo); //add the todo to the todos array
        
        localStorage.setItem('todos', JSON.stringify(todos)); //set the todos to the local storage
        
        e.target.reset(); //reset the form

        DisplayTodos(); //display the todos 
    })

    DisplayTodos(); 
})

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list'); //get the todo list
    
    todoList.innerHTML = ""; //clear the todo list

    todos.forEach(todo => { //for each todo in the todos array
        const todoItem = document.createElement('div'); //create a new div element
        todoItem.classList.add('todo-item'); //add the class todo-item to the div element
        
        const label = document.createElement('label'); //create a new label element
        const input = document.createElement('input'); //create a new input element
        const span = document.createElement('span'); //create a new span element
        const content = document.createElement('div');//create a new div element for the content
        const actions = document.createElement('div');//create a new div element for the actions
        const edit = document.createElement('button');//create a new button element for the edit button
        const deleteButton = document.createElement('button');//create a new button element for the delete button
    
        input.type = 'checkbox'; //set the input type to checkbox
        input.checked = todo.done; //set the input checked to the done value of the todo
        span.classList.add('bubble');

        if(todo.category == 'personal'){ //if the category is personal
            span.classList.add('personal'); //add the class personal to the span element
        }
        else{
            span.classList.add('business'); //if the category is business, add the class business to the span element
        }

        content.classList.add('todo-content'); //add the class todo-content to the div element
        actions.classList.add('actions'); //add the class todo-actions to the div element
        edit.classList.add('edit'); //add the class edit to the button element
        deleteButton.classList.add('delete'); //add the class delete to the button element
        
        content.innerHTML = `<input type="text" value="${todo.content}" readonly/>` //set the content to the todo text
        edit.innerHTML = 'Edit'; //set the innerHTML of the edit button to Edit
        deleteButton.innerHTML = 'Delete'; //set the innerHTML of the delete button to Delete

        label.appendChild(input); //append the input to the label
        label.appendChild(span); //append the span to the label
        actions.appendChild(edit); //append the edit button to the actions div
        actions.appendChild(deleteButton); //append the delete button to the actions div
        todoItem.appendChild(label); //append the label to the todo item
        todoItem.appendChild(content); //append the content to the todo item
        todoItem.appendChild(actions); //append the actions to the todo item

        todoList.appendChild(todoItem); //append the todo item to the todo list

        if(todo.done){
            todoItem.classList.add('done'); //if the todo is done, add the class done to the todo item
        }
        
        input.addEventListener('click', e =>{
            todo.done = e.target.checked; //set the done value of the todo to the checked value of the input
            localStorage.setItem('todos', JSON.stringify(todos)); //set the todos to the local storage

            if(e.target.checked){
                todoItem.classList.add('done'); //if the input is checked, add the class done to the todo item
            }
            else{
                todoItem.classList.remove('done'); //if the input is not checked, remove the class done from the todo item
            }

            DisplayTodos(); //display the todos
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input'); //get the input from the content div
            input.removeAttribute('readonly'); //remove the readonly attribute from the input
            input.focus(); //focus the input
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true); //set the readonly attribute to true
                todo.content = e.target.value; //set the todo content to the value of the input
                localStorage.setItem('todos', JSON.stringify(todos)); //set the todos to the local storage
                DisplayTodos(); //display the todos
            })
        })
        
        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t !== todo); //filter the todos array to remove the todo
            localStorage.setItem('todos', JSON.stringify(todos)); //set the todos to the local storage
            DisplayTodos(); //display the todos
        })
    }) 
}