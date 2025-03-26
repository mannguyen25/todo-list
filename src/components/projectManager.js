const Task = (name, desc, dueDate, priority = 2) => {
    return { name, desc, dueDate, priority, isCompleted: false };
};

const Project = (name, tasks = []) => {
    const addTask = (task) => {
        tasks.push(task);
    };
    const removeTask = (taskId) => {
        tasks = tasks.filter((task) => task.id !== taskId);
    };
    return { name, tasks, addTask, removeTask };
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
        const projectIndex = this.projectList.findIndex((p) => p.name === projectName);
        if (projectIndex === -1) return;
        for (const key in props) {
            if (this.projectList[projectIndex].hasOwnProperty(key)) this.projectList[projectIndex][key] = props[key];
        }
    }
    getProjectByName(projectName) {
        return this.projectList.find((project) => project.name === projectName);
    }
    getAllProjects() {
        return this.projectList;
    }

}

export { Project, ProjectManager, Task };
