class Storage {
    static getProjects() {
        let projects;

        if (localStorage.getItem('projects.list') === null) {
            projects = [];
        }

        else {
            projects = JSON.parse(localStorage.getItem('projects.list'));
        }

        return projects;
    };

    static getId() {
        return JSON.parse(localStorage.getItem('projects.selected'));
    };

    static saveProjects(projects) {
        localStorage.setItem('projects.list', JSON.stringify(projects));
    };

    static saveId(selectedId) {
        localStorage.setItem('projects.selected', selectedId);
    };

};

export { Storage };
