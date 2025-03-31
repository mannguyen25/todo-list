const Task = (name, desc, dueDate, priority = 2) => {
    return { name, desc, dueDate, priority, isCompleted: false };
};

const Project = (name, tasks = []) => {
    let project = {};
    project.name = name;
    project.tasks = tasks;

    project.addTask = (task) => {
        project.tasks.push(task);
    };
    project.removeTask = (taskName) => {
        project.tasks = tasks.filter((task) => task.name !== taskName);
    };
    return project;
};

class ProjectManager {
    constructor(projectList = []) {
        this.projectList = projectList;
        this._activeProject;
    }
    set activeProject(projectName) {
        this._activeProject = projectName;
    }
    get activeProject() {
        return this._activeProject;
    }
    addProject(project) {
        this.projectList.push(project);
    }
    removeProject(projectName) {
        this.projectList = this.projectList.filter((project) => project.name !== projectName);
    }
    updateProject(projectName, props) {
        if (props?.name !== undefined) {
            const existingKey = this.projectList.findIndex((p) => p.name === props.name);
            if (existingKey !== -1) return false;
        }
        const projectIndex = this.projectList.findIndex((p) => p.name === projectName);
        if (projectIndex === -1) return false;
        for (const key in props) {
            if (this.projectList[projectIndex].hasOwnProperty(key) && this.projectList[projectIndex] != props[key]) this.projectList[projectIndex][key] = props[key];
        }
        return true;
    }
    getProjectByName(projectName) {
        return this.projectList.find((project) => project.name === projectName);
    }
    getAllProjects() {
        return this.projectList;
    }

}

export { Project, ProjectManager, Task };
