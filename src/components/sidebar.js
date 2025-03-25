import '../assets/styles/sidebar.css';

const sidebar = document.getElementById('sidebar');
const sidebarToggleBtn = document.getElementById('view-sidebar');
const addTask = document.getElementById('add-task');

sidebarToggleBtn.addEventListener('click', toggleSidebar);
function toggleSidebar(){
    sidebar.classList.toggle('close');
    addTask.classList.toggle('hide');
    addTask.nextElementSibling.classList.toggle('hide');
}

const collapseButtons = document.querySelectorAll('.collapse-btn');
const projectList = document.querySelector('.project-list');
collapseButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.target.classList.toggle('rotate');
        projectList.classList.toggle('show');
    });
})