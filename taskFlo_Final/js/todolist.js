// Function to save tasks to local storage -- TODOLOST
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.container1-TODOLIST').forEach(taskItem => {
        const label = taskItem.querySelector('label').textContent;
        tasks.push(label);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Load saved tasks from local storage
document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    // Clear the existing task list
    taskList.innerHTML = '';

    // Add saved tasks to the DOM
    savedTasks.forEach(task => {
        createTaskElement(taskList, task);
    });
});

// Function to create task elements
function createTaskElement(taskList, taskValue) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('container1-TODOLIST');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const uniqueId = 'task-' + Date.now();
    checkbox.id = uniqueId;

    const label = document.createElement('label');
    label.textContent = taskValue;
    label.setAttribute('for', uniqueId);

    // Edit Button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.onclick = function() {
        const newTaskValue = prompt('Edit your task:', label.textContent);
        if (newTaskValue !== null && newTaskValue.trim() !== '') {
            label.textContent = newTaskValue;
            saveTasks(); // Update local storage
        }
    };

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        taskList.removeChild(taskItem);
        saveTasks(); // Update local storage
    };

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

// Adding task functionality
document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput_todolist');
    const taskValue = taskInput.value.trim();

    if (taskValue !== '') {
        const taskList = document.getElementById('taskList');
        createTaskElement(taskList, taskValue);
        taskInput.value = ''; // Clear input field
        saveTasks(); // Save to local storage
    }
});


// Function to display the current week and start date
function displayCurrentWeek() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startDate.getDay() + 1) / 7);

    // Calculate the start date of the current week
    const startOfWeekDate = new Date(currentDate);
    startOfWeekDate.setDate(currentDate.getDate() - currentDate.getDay());

    // Format the date as MM/DD/YYYY
    const month = String(startOfWeekDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(startOfWeekDate.getDate()).padStart(2, '0');
    const year = startOfWeekDate.getFullYear();

    // Update the header with the week number and start date
    document.querySelector('.header-right-right h3').textContent = `Week ${weekNumber}: ${month}/${day}/${year}`;
}

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentWeek();
    
    // Your existing code for loading folders...
});
