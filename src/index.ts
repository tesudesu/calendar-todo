const h1 = document.querySelector('h1') as HTMLElement;
h1.innerText = new Date().toDateString();

const tasks = document.querySelector('#tasks') as HTMLElement;

// Change date

let dates: {[key: string]: string} = {};

const changeDate = document.querySelector('#change-date') as HTMLInputElement;
changeDate.addEventListener('change', () => {
    const currDate = h1.innerText;
    const toDate = new Date(`${changeDate.value}T00:00`).toDateString();
    if (tasks.firstElementChild) {
        dates[currDate] = tasks.innerHTML;
    }
    if (dates[toDate]) {
        tasks.innerHTML = dates[toDate];
    } else {
        while (tasks.firstElementChild) {
            tasks.removeChild(tasks.firstElementChild);
        }
    }
    h1.innerText = toDate;
    showAll();
});


// Add

const addButton = document.querySelector('#add') as HTMLButtonElement;
const newTask = document.querySelector('#new-task') as HTMLInputElement;

const add = () => {
    if (!newTask.value) {
        return;
    }

    const newTaskDiv = document.createElement('div');
    const newValue = document.createElement('div');
    const newDeleteImg = document.createElement('img');
    const newDeleteButton = document.createElement('button');

    newValue.innerText = newTask.value;
    newDeleteImg.setAttribute('src', 'delete.svg');

    newTaskDiv.classList.add('task');
    newValue.classList.add('info');
    newDeleteImg.classList.add('delete');
    newDeleteButton.classList.add('deleteButton');

    newDeleteButton.appendChild(newDeleteImg);
    newTaskDiv.appendChild(newValue);
    newTaskDiv.appendChild(newDeleteButton);
    tasks.appendChild(newTaskDiv);

    newTask.value = '';
}

addButton.addEventListener('click', () => {
    add();
});


// Add task when press enter

newTask.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        add();
    }
});


// Delete

tasks.addEventListener('click', (e) => {
    if (e.target instanceof HTMLElement && e.target.className === 'delete') {
        tasks.removeChild((e.target.parentElement as HTMLElement).parentElement as HTMLElement);
    }
});


// Check (strikethrough)

tasks.addEventListener('click', (e) => {
    if (e.target instanceof HTMLElement && e.target.className === 'info') {
        if (e.target.style.textDecoration === 'line-through') {
            e.target.style.textDecoration = 'none';
        } else {
            e.target.style.textDecoration = 'line-through';
        }
    }
});


// Clear completed

const clearCompleted = document.querySelector('#clear-completed')!;
clearCompleted.addEventListener('click', () => {
    if (confirm('You are about to remove all completed tasks. Are you sure?')) {
        const list = document.querySelectorAll('.info') as NodeListOf<HTMLElement>;
        for (let i = 0; i < list.length; i++) {
            if (list[i].style.textDecoration === 'line-through') {
                tasks.removeChild(list[i].parentElement as HTMLElement);
            }
        }
    }
});


// Filter

// Show all

const showAll = () => {
    const children = tasks.children as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'flex';
    }
    filterAll.style.textDecoration = 'underline';
    filterCompleted.style.textDecoration = 'none';
    filterTodo.style.textDecoration = 'none';
}

const filterAll = document.querySelector('#filter-all') as HTMLButtonElement;
filterAll.addEventListener('click', () => {
    showAll();
});

// Show only completed

const filterCompleted = document.querySelector('#filter-completed') as HTMLButtonElement;
filterCompleted.addEventListener('click', () => {
    const list = document.querySelectorAll('.info') as NodeListOf<HTMLElement>;
    for (let i = 0; i < list.length; i++) {
        if (list[i].style.textDecoration === 'line-through') {
            (list[i].parentElement as HTMLElement).style.display = 'flex';
        } else {
            (list[i].parentElement as HTMLElement).style.display = 'none';
        }
    }
    filterCompleted.style.textDecoration = 'underline';
    filterTodo.style.textDecoration = 'none';
    filterAll.style.textDecoration = 'none';
});

// Show only to do

const filterTodo = document.querySelector('#filter-todo') as HTMLButtonElement;
filterTodo.addEventListener('click', () => {
    const list = document.querySelectorAll('.info') as NodeListOf<HTMLElement>;
    for (let i = 0; i < list.length; i++) {
        if (list[i].style.textDecoration === 'line-through') {
            (list[i].parentElement as HTMLElement).style.display = 'none';
        } else {
            (list[i].parentElement as HTMLElement).style.display = 'flex';
        }
    }
    filterTodo.style.textDecoration = 'underline';
    filterAll.style.textDecoration = 'none';
    filterCompleted.style.textDecoration = 'none';
});

