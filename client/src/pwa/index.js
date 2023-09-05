import { Workbox } from 'workbox-window';
import Editor from './editor.js';
import { saveHabitsToDatabase, loadHabitsFromDatabase } from './database';
import '../assets/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();
editor.loadHabits(loadHabitsFromDatabase()); 

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Register workbox service worker
const workboxSW = new Workbox('/src-sw.js');
workboxSW.register();
