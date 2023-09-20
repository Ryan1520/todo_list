//Data fetching
let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos'));

if(Array.isArray(savedTodos)){
    todos = savedTodos;
} else{
    todos = [{
        title: 'Learn JS',
        date: '2023-04-10',
        id: 'id1'
    }, {
        title: 'Build Project',
        date: '2021-02-03',
        id: 'id2'
    }, {
        title: 'Get groceries',
        date: '2021-03-04',
        id: 'id3'
    }]
}

// M -> Model
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}


//C -> Controller
function createTodo(){
    const titleTxt = document.getElementById('todo-title')
    const title = titleTxt.value;

    const dateTxt = document.getElementById('date-picker')
    const date = dateTxt.value;

    addTodo(title, date);
}

//C -> Controller
function deleteTodo(e){
    const deleteBtn = e.target;
    const idToDelete = deleteBtn.id;
    
    removeTodo(idToDelete);
}

//C -> Controller
function addTodo(title, date){
    const id = '' + new Date().getTime();
     
    todos.push({
        title: title,
        date: date,
        id: id
    })
    render()
    saveTodos()
}

//C -> Controller
function removeTodo(idToDelete){
    todos = todos.filter(todo => {
        return todo.id !== idToDelete
        // if (todo.id === idToDelete){
        //   return false;
        // } else{
        //   return true;
        // }
    })
    render()
    saveTodos()
}


// V -> View
const render = () =>{
    document.getElementById('todo-list').innerHTML = '';

    const createBtn = document.getElementById('createBtn');
    createBtn.onclick = createTodo;

    todos.forEach(todo => {
        const element = document.createElement('div');
        element.innerText = todo.title + ' ' + todo.date;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.style = 'margin-left: 12px';
        deleteBtn.onclick = deleteTodo;
        deleteBtn.id = todo.id;
        element.appendChild (deleteBtn);

        const todoList = document.getElementById('todo-list');
        todoList.appendChild(element);
    })
}

render();