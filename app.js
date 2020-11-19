//Variables being selected for manipulation

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Function to load Events

loadEventListeners();

// Function to add a Task

function loadEventListeners() {
	document.addEventListener('DOMContentLoaded', getTasks);
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTasks);
	filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task) {
		const li = document.createElement('li');
		const link = document.createElement('a');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(task));
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fa fa-remove"></i>';
		li.appendChild(link);
		taskList.appendChild(li);
	});
}

function addTask(e) {
	if (taskInput.value === '') {
		alert('Please add a task');
	}
	const li = document.createElement('li');
	const link = document.createElement('a');
	li.className = 'collection-item';
	li.appendChild(document.createTextNode(taskInput.value));
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="fa fa-remove"></i>';
	li.appendChild(link);
	taskList.appendChild(li);

	storeTaskInLocalStorage(taskInput.value);

	taskInput.value = '';

	e.preventDefault();
}

function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();
			removeTasksFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

function removeTasksFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//function to clear tasks
function clearTasks() {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	clearTasksFromLocalStorage();
}

//Clear Tasks from local storage using btn 'clear'
function clearTasksFromLocalStorage() {
	localStorage.clear();
}

// Function created to filter letters to suggest the correct task we're looking for

function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}
