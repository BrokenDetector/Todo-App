class Project {
    constructor(i, name) {
        this.id = i,
            this.name = name,
            this.tasks = []
    }

    getName() {
        return this.name
    }

    setTask(tasks) {
        this.date = tasks
    }

    getTask() {
        return this.tasks
    }
}

export { Project }
