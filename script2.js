const table = document.getElementById('myTable');

document.addEventListener('DOMContentLoaded', () => {
    // Your specific code here
    getData();
  });
  
  async function getData() {
    try {
        const response = await fetch('http://localhost:8080/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (response.ok) {
            const data = await response.json(); // Use await here
            console.log('Weather data retrieved successfully:', data);
            data.forEach((item) => {
                const row = table.insertRow();
                row.insertCell().textContent = item.id;
                row.insertCell().textContent = item.location;
                row.insertCell().textContent = item.prec;
                row.insertCell().textContent = item.temp;
                row.insertCell().textContent = item.time;
                row.insertCell().textContent = item.uvi;
            });
        } else {
            console.error('Error retrieving weather data');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
  }

  table.addEventListener('click', (event) => {
    const clickedRow = event.target.closest('tr'); // Get the clicked row
    if (!clickedRow) return; // Ignore clicks outside rows

    // Extract data from the clicked row (assuming ID is in the first cell)
    const idToDelete = clickedRow.cells[0].textContent;

    // Call your function to delete the record (e.g., send an API request)
    deleteRecord(idToDelete);

    clickedRow.classList.add('removing');

    // Remove the row from the DOM after the transition completes
    setTimeout(() => {
        clickedRow.remove();
    }, 300); // Adjust the delay to match your transition duration
});

function deleteRecord(idToDelete){
    try {
        const response = fetch(`http://localhost:8080/delete/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (response.ok) {
            const data = response.json(); // Use await here
            console.log('Weather data deleted successfully:', data);
        } else {
            console.error('Error deleting weather data');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}