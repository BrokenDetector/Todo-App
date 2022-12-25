import { UI } from "./UI";

/*
let lists = JSON.parse(localStorage.getItem('projects.list')) || [];
let selectedId = localStorage.getItem('projects.selected');
let i = 0;

import { format, isThisWeek, isToday } from "date-fns";

const projects = document.querySelector('.projects');
const sidebar = document.querySelector('.sidebar');
const projectName = document.querySelector('.projectInput');
const tasks = document.querySelector('.tasks');
const addProjectBtn = document.querySelector('.create');
const taskList = document.querySelector('.task-list')
const taskForm = document.querySelector('#form-task')

sidebar.addEventListener('click', (e) => {
    selectProject(e);
})

addProjectBtn.addEventListener('click', () => {
    createNewProject();
})

// Create new project
function createNewProject() {
    if (projectName.value == '' || projectName.value === null) return;

    const list = createListForm(projectName.value);
    lists.push(list);

    projectName.value = null;
    saveAndRender()
}

// Save and render
function saveAndRender() {
    save();
    render();
}

function save() {
    localStorage.setItem('projects.list', JSON.stringify(lists));
    localStorage.setItem('projects.selected', selectedId);
}

// Make project active
function selectProject(e) {
    if (e.target.parentElement.className == 'project') {
        selectedId = e.target.parentElement.id;
    }
    if (e.target.className == 'delete-project') {
        deleteProject(e.target.parentElement);
    }
    if (e.target.parentElement.tagName == 'LI') {

        clearElement(taskList)
        getDateTasks(e.target.parentElement)
    }
    saveAndRender();

}

// Render all
function render() {
    clearElement(projects)
    renderProjects()

    const selectedList = lists.find(list => list.id === selectedId)

    if (selectedId == null || selectedId == 'null') {
        //clearElement(taskList);

        //getDateTasks(allTaskList)
        //taskList.style.display = 'none'
        taskForm.style.display = 'none'
    } else {
        taskList.style.display = ''
        taskForm.style.display = ''
        clearElement(taskList)
        renderTasks(selectedList)
    }
}
*
// Render projects(lists)
function renderProjects() {
    //console.log(lists)
    lists.forEach(e => {
        i++
        const project = document.createElement('div');
        project.setAttribute('class', 'project');
        project.setAttribute('id', e.id)

        const img = document.createElement('img');
        img.src = './img/project.svg';

        const text = document.createElement('p');
        text.textContent = e.name;

        const deleteImg = document.createElement('img');
        deleteImg.src = './img/delete.svg';
        deleteImg.setAttribute('class', 'delete-project')

        project.appendChild(img);
        project.appendChild(text);
        project.appendChild(deleteImg);

        if (e.id == selectedId) {
            project.classList.add('active')
        }

        projects.appendChild(project);
    })
}

// Form for new project
function createListForm(name) {
    return {
        id: i.toString(),
        name: name,
        tasks: []
    }
}

// Clear element
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

// Delete element
function deleteProject(e) {
    lists = lists.filter(el => el.id != e.id.toString())
    selectedId = null;
}

// Create new task
const newTaskBtn = document.querySelector('.btn-task');
const newTaskInput = document.querySelector('.newTask');
const newDateInput = document.querySelector('.newDate');
newTaskBtn.addEventListener('click', () => {
    //convertDate(newDateInput.value)
    //console.log(format(new Date(newDateInput.value), 'EEEE/MMM/yyyy'))
    createNewTask()
})

function convertDate(date) {
    const day = date.split('-')[1]
    const month = date.split('-')[2]
    const year = date.split('-')[0]

    console.log(`${day}/${month}/${year}`)
}

function createNewTask() {
    if (newTaskInput.value == '' || newTaskInput.value === null) return;
    const newdate = format(new Date(newDateInput.value), 'dd/MMM/yyyy')

    const task = createTaskForm(newTaskInput.value, newdate)
    const selectedList = lists.find(list => list.id === selectedId)
    selectedList.tasks.push(task)

    newTaskInput.value = null;
    saveAndRender()
}

// Form for new task
function createTaskForm(text, date) {
    return {
        id: i.toString(),
        text: text,
        date: date
    }
}

// Render tasks from storage for selected projects
function renderTasks(selectedList) {
    //console.log(selectedList)
    if (selectedList == undefined) return
    selectedList.tasks.forEach(task => {
        i++
        createTask(task.id, task.text, task.date);
    });
};

// Render tasks
function createTask(id, text, datetext) {
    const li = document.createElement('li');
    li.setAttribute('id', id);

    const checkbox = document.createElement('div');
    checkbox.setAttribute('class', 'check');

    const title = document.createElement('div');
    title.setAttribute('class', 'title-task');
    title.textContent = text;

    const date = document.createElement('div');
    date.setAttribute('class', 'date');
    date.textContent = datetext;

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(date);

    taskList.appendChild(li);
}

// Delete task
tasks.addEventListener('click', (e) => {
    if (e.target.className == 'check') {
        e.target.parentElement.remove();

        if (selectedId == null || selectedId == 'null') {
            let AllTasks
            //let remove
            lists.forEach(list => {
                AllTasks = list.tasks;
                //remove = AllTasks.find(task => task.id === e.target.parentElement.id)
                list.tasks = AllTasks.filter(task => task.id != e.target.parentElement.id)
                //console.log(list.tasks)
                //console.log(remove)
            })

            saveAndRender()
            return
        }

        const selectedList = lists.find(task => task.id === selectedId)
        selectedList.tasks = selectedList.tasks.filter(task => task.id != e.target.parentElement.id)

        saveAndRender()
    }
})

// Date tasks
function getDateTasks(el) {
    //console.log(el)
    if (el.classList.contains('all-tasks')) {
        selectedId = null
        lists.forEach(list => {
            const AllTasks = list.tasks;
            AllTasks.forEach(TaskList => {
                //console.log(TaskList)
                createTask(TaskList.id, TaskList.text, TaskList.date)
            })
        })
    }
    if (el.classList.contains('today')) {
        selectedId = null
        lists.forEach(list => {
            const AllTasks = list.tasks;
            AllTasks.forEach(TaskList => {
                if (isToday(new Date(TaskList.date))) {
                    //console.log(TaskList)
                    createTask(TaskList.id, TaskList.text, TaskList.date)
                }
            })
        })
    }
    if (el.classList.contains('this-week')) {
        selectedId = null
        lists.forEach(list => {
            const AllTasks = list.tasks;
            AllTasks.forEach(TaskList => {
                if (isThisWeek(new Date(TaskList.date))) {
                    //console.log(TaskList)
                    createTask(TaskList.id, TaskList.text, TaskList.date)
                }
            })
        })
    }
};

render();


*/

document.addEventListener('DOMContentLoaded', UI.loadAll())