import '../src/assets/styles/styles.css';
import '../src/assets/styles/sidebar.css';

import '../src/components/sidebar.js'
import ScreenController from '../src/components/screenController.js'
import '../src/assets/styles/modal.css'

if (localStorage.getItem('projectList')){
    let projectList = JSON.parse(localStorage.getItem('projectList'));
    const newProjectList = ScreenController(projectList);
    localStorage.setItem('projectList', JSON.stringify(newProjectList));
}
else {
    const newProjectList = ScreenController();
    localStorage.setItem('projectList', JSON.stringify(newProjectList));
}
