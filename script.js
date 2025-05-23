document.addEventListener('DOMContentLoaded', () => {
    const attendanceTableBody = document.getElementById('attendanceTableBody');
    const sendAbsentBtn = document.getElementById('sendAbsentBtn');
    const viewDataBtn = document.getElementById('viewDataBtn');
    const dataDisplayArea = document.getElementById('dataDisplayArea');

    const numberOfStudents = 50; // Changed from 100 to 50

    // Initialize attendance status for 50 students (Default to Present)
    const attendanceStatus = {};
    for (let i = 1; i <= numberOfStudents; i++) {
        attendanceStatus[i] = 'Present'; // Default to Present
    }

    // Function to render the attendance table
    function renderTable() {
        attendanceTableBody.innerHTML = ''; // Clear existing rows
        for (let i = 1; i <= numberOfStudents; i++) {
            const row = document.createElement('tr');
            // Added a class for the attendance buttons container for easier styling
            row.innerHTML = `
                <td>${i}</td>
                <td class="attendance-buttons">
                    <button class="present-btn" data-roll="${i}">P</button>
                    <button class="absent-btn" data-roll="${i}">A</button>
                </td>
            `;
            attendanceTableBody.appendChild(row);

            // Add active class to selected button based on current status
            const presentBtn = row.querySelector('.present-btn');
            const absentBtn = row.querySelector('.absent-btn');

            if (attendanceStatus[i] === 'Present') {
                presentBtn.classList.add('active');
                absentBtn.classList.remove('active');
            } else {
                presentBtn.classList.remove('active');
                absentBtn.classList.add('active');
            }
        }
    }

    // Event delegation for attendance buttons
    attendanceTableBody.addEventListener('click', (event) => {
        const target = event.target;
        // Ensure the click was on one of the attendance buttons
        if (target.tagName === 'BUTTON' && (target.classList.contains('present-btn') || target.classList.contains('absent-btn')) ) {
            const rollNumber = target.dataset.roll;
            if (target.classList.contains('present-btn')) {
                attendanceStatus[rollNumber] = 'Present';
            } else if (target.classList.contains('absent-btn')) {
                attendanceStatus[rollNumber] = 'Absent';
            }
            // Re-render table to update button styles
            renderTable();
        }
    });

    // Send Absent Numbers button functionality
    sendAbsentBtn.addEventListener('click', () => {
        const absentStudents = Object.keys(attendanceStatus).filter(roll => attendanceStatus[roll] === 'Absent');
        if (absentStudents.length > 0) {
            const message = 'Absent Student Roll Numbers: ' + absentStudents.join(', ');
            // Attempt to open WhatsApp with pre-filled message
            // encodeURIComponent is used to correctly format the message for the URL
            window.open('whatsapp://send?text=' + encodeURIComponent(message), '_blank');
            // Optional: Provide feedback to the user that an attempt was made
             dataDisplayArea.innerText = 'Attempting to open WhatsApp with absent numbers...';
        } else {
            dataDisplayArea.innerText = 'No students are absent.';
        }
    });

    // View Attendance Data button functionality
    viewDataBtn.addEventListener('click', () => {
        let dataText = 'Attendance Data:\n';
        for (let i = 1; i <= numberOfStudents; i++) {
            dataText += `Roll ${i}: ${attendanceStatus[i]}\n`;
        }
        dataDisplayArea.innerText = dataText;
    });

    // Initial render
    renderTable();
}); 