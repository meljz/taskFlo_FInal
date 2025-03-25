// FOR FOLDERS FILE =================================================

// Function to save folders to local storage
function saveFolders() {
    const folders = [];
    document.querySelectorAll('.container1-FOLDERS').forEach(folderItem => {
        const label = folderItem.querySelector('label').textContent;
        folders.push(label);
    });
    localStorage.setItem('folders', JSON.stringify(folders));
}

// Load saved folders from local storage
document.addEventListener('DOMContentLoaded', function() {
    const savedFolders = JSON.parse(localStorage.getItem('folders')) || [];
    const folderList = document.getElementById('folderList');

    // Clear the existing folder list
    folderList.innerHTML = '';

    // Add saved folders to the DOM
    savedFolders.forEach(folder => {
        createFolderElement(folderList, folder);
    });
});

// Function to create folder elements
function createFolderElement(folderList, folderValue) {
    const folderItem = document.createElement('div');
    folderItem.classList.add('container1-FOLDERS');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const uniqueId = 'folder-' + Date.now();
    checkbox.id = uniqueId;

    const label = document.createElement('label');
    label.textContent = folderValue;
    label.setAttribute('for', uniqueId);

    // Edit Button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.onclick = function() {
        const newFolderValue = prompt('Edit your folder name:', label.textContent);
        if (newFolderValue !== null && newFolderValue.trim() !== '') {
            label.textContent = newFolderValue;
            saveFolders(); // Update local storage
        }
    };

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        folderList.removeChild(folderItem);
        saveFolders(); // Update local storage
    };

    folderItem.appendChild(checkbox);
    folderItem.appendChild(label);
    folderItem.appendChild(editButton);
    folderItem.appendChild(deleteButton);
    folderList.appendChild(folderItem);
}

// Adding folder functionality
document.getElementById('addFolderButton').addEventListener('click', function() {
    const folderInput = document.getElementById('taskInput_folders');
    const folderValue = folderInput.value.trim();

    if (folderValue !== '') {
        const folderList = document.getElementById('folderList');
        createFolderElement(folderList, folderValue);
        folderInput.value = ''; // Clear input field
        saveFolders(); // Save to local storage
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
