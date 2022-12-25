import { format, isThisWeek, isToday } from "date-fns";
import { Project } from "./Project";
import { Storage } from "./Storage";
import { Task } from "./Task";

class UI {
    static loadAll() {
        const projects = document.querySelector('.projects');
        const sidebar = document.querySelector('.sidebar');
        const addProjectBtn = document.querySelector('.create');
        const taskList = document.querySelector('.task-list');
        const taskForm = document.querySelector('#form-task');
        const tasks = document.querySelector('.tasks');

        sidebar.addEventListener('click', (e) => {
            UI.selectProject(e);
        });

        addProjectBtn.addEventListener('click', () => {
            UI.createNewProject();
        });

        tasks.addEventListener('click', (e) => {
            UI.deleteTask(e);
        });

        // Render all
        UI.clearElement(projects)
        UI.renderProjects()

        const lists = Storage.getProjects().find(list => list.id === Storage.getId());
        const selectedId = Storage.getId()

        if (selectedId == null || selectedId == 'null') {
            taskForm.style.display = 'none';

        } else {
            taskList.style.display = '';
            taskForm.style.display = '';
            UI.clearElement(taskList);

            const newTaskBtn = document.querySelector('.btn-task');
            newTaskBtn.addEventListener('click', () => {
                UI.createNewTask()
            })

            //console.log(lists)
            UI.renderTasks(lists);
        };
    };

    // Render projects(lists)
    static renderProjects() {
        const projects = document.querySelector('.projects');
        let i = 0;
        //console.log(Storage.getProjects())
        Storage.getProjects().forEach(e => {
            i++;
            const project = document.createElement('div');
            project.setAttribute('class', 'project');
            project.setAttribute('id', e.id);

            const img = document.createElement('img');
            img.src = './img/project.svg';

            const text = document.createElement('p');
            text.textContent = e.name;

            const deleteImg = document.createElement('img');
            deleteImg.src = './img/delete.svg';
            deleteImg.setAttribute('class', 'delete-project');

            project.appendChild(img);
            project.appendChild(text);
            project.appendChild(deleteImg);

            if (e.id == Storage.getId()) {
                project.classList.add('active');
            };

            projects.appendChild(project);
        })
    }

    // Render tasks from storage for selected projects
    static renderTasks(selectedList) {
        if (selectedList == undefined) return
        selectedList.tasks.forEach(task => {
            UI.createTask(task.id, task.name, task.date);
        });
    };

    // Create new project
    static createNewProject() {
        const i = Date.now()
        const projectName = document.querySelector('.projectInput');

        if (projectName.value == '' || projectName.value === null) return;

        const project = new Project(i, projectName.value);
        let lists = Storage.getProjects()
        lists.push(project)
        Storage.saveProjects(lists)

        projectName.value = null;
        UI.loadAll()
    }

    // Render tasks
    static createTask(id, name, datetext) {
        const taskList = document.querySelector('.task-list');

        const li = document.createElement('li');
        li.setAttribute('id', id);

        const checkbox = document.createElement('div');
        checkbox.setAttribute('class', 'check');

        const title = document.createElement('div');
        title.setAttribute('class', 'title-task');
        title.textContent = name;

        const date = document.createElement('div');
        date.setAttribute('class', 'date');
        date.textContent = datetext;

        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(date);

        taskList.appendChild(li);
    }

    // Create new task
    static createNewTask() {
        const lists = Storage.getProjects()
        const newTaskInput = document.querySelector('.newTask');
        const newDateInput = document.querySelector('.newDate');
        const id = Date.now()

        if (newTaskInput.value == '' || newTaskInput.value === null) return;

        const newdate = format(new Date(newDateInput.value), 'dd/MMM/yyyy');

        const task = new Task(id, newTaskInput.value, newdate)
        const selectedList = lists.find(list => list.id === Storage.getId())

        selectedList.tasks.push(task)

        Storage.saveProjects(lists)
        newTaskInput.value = null;
        UI.loadAll()
    }

    // Date tasks
    static getDateTasks(el) {
        const lists = Storage.getProjects()
        if (el.classList.contains('all-tasks')) {
            Storage.saveId(null)
            lists.forEach(list => {
                const AllTasks = list.tasks;
                AllTasks.forEach(TaskList => {
                    UI.createTask(TaskList.id, TaskList.name, TaskList.date)
                })
            })
        }
        if (el.classList.contains('today')) {
            Storage.saveId(null)
            lists.forEach(list => {
                const AllTasks = list.tasks;
                AllTasks.forEach(TaskList => {
                    if (isToday(new Date(TaskList.date))) {
                        UI.createTask(TaskList.id, TaskList.name, TaskList.date)
                    }
                })
            })
        }
        if (el.classList.contains('this-week')) {
            Storage.saveId(null)
            lists.forEach(list => {
                const AllTasks = list.tasks;
                AllTasks.forEach(TaskList => {
                    if (isThisWeek(new Date(TaskList.date))) {
                        UI.createTask(TaskList.id, TaskList.name, TaskList.date)
                    }
                })
            })
        }
    };

    // Make project active
    static selectProject(e) {
        const taskList = document.querySelector('.task-list');

        if (e.target.parentElement.className == 'project') {
            Storage.saveId(e.target.parentElement.id);
        };
        if (e.target.className == 'delete-project') {
            UI.deleteProject(e.target.parentElement);
        };
        if (e.target.parentElement.tagName == 'LI') {

            UI.clearElement(taskList);
            UI.getDateTasks(e.target.parentElement);
        };
        UI.loadAll()
    };

    // Clear element
    static clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    }

    // Delete element
    static deleteProject(e) {
        Storage.saveProjects(Storage.getProjects().filter(el => el.id != e.id.toString()))
        Storage.saveId(null);
    }

    // Delete task
    static deleteTask(e) {
        if (e.target.className == 'check') {
            e.target.parentElement.remove();

            const selectedId = Storage.getId();
            const lists = Storage.getProjects();

            if (selectedId == null || selectedId == 'null') {
                let AllTasks;
                console.log(lists)
                lists.forEach(list => {
                    AllTasks = list.tasks;
                    list.tasks = AllTasks.filter(task => task.id != e.target.parentElement.id);
                    //console.log(list.tasks)
                })

                Storage.saveProjects(lists);
                UI.loadAll();
                return;
            }

            const selectedList = lists.find(task => task.id === selectedId);
            selectedList.tasks = selectedList.tasks.filter(task => task.id != e.target.parentElement.id);
            Storage.saveProjects(lists);

            UI.loadAll();
        }
    }
};

export { UI };
