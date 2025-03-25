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
