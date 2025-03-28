import { Project, ProjectManager, Task } from "../components/projectManager";
import '../assets/styles/project.css';
const ScreenController = (() => {
    const projectManager = new ProjectManager();

    // dummy data
    let projectOne = Project('project #1');
    let projectTwo = Project('project #2');
    projectOne.addTask(Task('Task #1', 'do stuff', Date.now()));
    projectOne.addTask(Task('Task #2', 'I must take out the trash erwrewerw', Date.now() + 3600000));
    projectManager.addProject(projectOne);
    projectManager.activeProject = projectOne.name;
    projectManager.addProject(projectTwo);
    const projectListContainer = document.querySelector(".project-list li");
    const mainContent = document.querySelector('.main-content');
    const displayActiveProject = () => {
        if (projectManager.activeProject !== undefined) {
            mainContent.innerHTML = "";
            const projectContainer = document.createElement("div");
            projectContainer.classList.add("project-main-container");
            const projectTitle = document.createElement("input");
            projectTitle.type = "text";
            projectTitle.value = projectManager.activeProject;
            projectTitle.addEventListener("change", (e) => {
                projectManager.updateProject(projectManager.activeProject, { name: e.target.value });
                projectManager.activeProject = e.target.value;
                displayProjects();
            })
            const taskListContainer = document.createElement("ul");
            projectManager.getProjectByName(projectManager.activeProject).tasks.forEach(task => {
                const listElement = document.createElement("li");
                listElement.classList.add("task-container");
                const input = document.createElement("input");
                input.checked = task.isCompleted;
                input.type = "checkbox";
                input.id = `${task.name.split(" ").join("-")}`
                const label = document.createElement("label");
                const description = document.createElement("span");
                description.textContent = `${task.desc}`;
                label.appendChild(description);
                label.setAttribute('for', input.id);
                listElement.appendChild(input);
                listElement.appendChild(label);
                const taskActions = document.createElement("div");
                taskActions.classList.add("task-actions");
                const editButton = document.createElement("button");
                const editIcon = document.createElement("span");
                editIcon.classList.add("material-symbols-outlined");
                editIcon.textContent = "edit";
                editButton.appendChild(editIcon);
                taskActions.appendChild(editButton);
                const deleteButton = document.createElement("button");
                const deleteIcon = document.createElement("span");
                deleteIcon.classList.add("material-symbols-outlined");
                deleteIcon.textContent = "delete";
                deleteButton.appendChild(deleteIcon);
                taskActions.appendChild(deleteButton);
                listElement.appendChild(taskActions);
                taskListContainer.appendChild(listElement);
                input.addEventListener("change", (e) => {
                    task.isCompleted = e.target.checked;
                });
            })
            projectContainer.appendChild(projectTitle);
            projectContainer.appendChild(taskListContainer);
            mainContent.appendChild(projectContainer);
        }
    };
    const displayProjects = () => {
        // clear previous projects
        projectListContainer.innerHTML = "";
        // display projects
        projectManager.getAllProjects()
            .forEach((project) => {
                const projectContainer = document.createElement("div");
                projectContainer.classList.add("project-container");
                if (project.name == projectManager.activeProject) {
                    projectContainer.classList.add("active");
                }
                const button = document.createElement("button");
                const tag = document.createElement("span");
                const text = document.createElement("div");
                tag.classList.add("material-symbols-outlined");
                tag.textContent = "tag";
                text.textContent = `${project.name}`;
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-btn");
                const trash = document.createElement("span");
                trash.classList.add("material-symbols-outlined");
                trash.textContent = "delete";
                deleteButton.appendChild(trash);
                projectContainer.appendChild(button);
                projectContainer.appendChild(deleteButton);
                deleteButton.addEventListener("click",
                    () => {
                        projectManager.removeProject(project.name);
                        displayProjects();
                    });
                button.appendChild(tag);
                button.appendChild(text);
                button.addEventListener("click", () => {
                    // set active project
                    projectManager.activeProject = project.name;
                    projectContainer.classList.add("active");
                    displayActiveProject();
                    // deactivate other projects
                    Array.from(projectListContainer.children).forEach((listItem) => {
                        if (listItem !== projectContainer) {
                            listItem.classList.remove("active");
                        }
                    });
                });
                projectListContainer.appendChild(projectContainer);
            });
    };
    displayActiveProject();
    displayProjects();
})();
