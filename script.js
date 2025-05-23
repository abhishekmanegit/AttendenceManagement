document.addEventListener('DOMContentLoaded', () => {
    const attendanceTableBody = document.getElementById('attendanceTableBody');
    const sendAbsentBtn = document.getElementById('sendAbsentBtn');
    const viewDataBtn = document.getElementById('viewDataBtn');
    const dataDisplayArea = document.getElementById('dataDisplayArea');

    // Initialize attendance status for 100 students (Default to Present)
    const attendanceStatus = {};
    for (let i = 1; i <= 100; i++) {
        attendanceStatus[i] = 'Present'; // Default to Present
    }

    // Function to render the attendance table
    function renderTable() {
        attendanceTableBody.innerHTML = ''; // Clear existing rows
        for (let i = 1; i <= 100; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i}</td>
                <td>
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
        if (target.tagName === 'BUTTON') {
            const rollNumber = target.dataset.roll;
            if (target.classList.contains('present-btn')) {
                attendanceStatus[rollNumber] = 'Present';
            } else if (target.classList.contains('absent-btn')) {
                attendanceStatus[rollNumber] = 'Absent';
            }
            renderTable(); // Re-render table to update button styles
        }
    });

    // Send Absent Numbers button functionality
    sendAbsentBtn.addEventListener('click', () => {
        const absentStudents = Object.keys(attendanceStatus).filter(roll => attendanceStatus[roll] === 'Absent');
        if (absentStudents.length > 0) {
            const message = 'Absent Student Roll Numbers: ' + absentStudents.join(', ');
            // Attempt to open WhatsApp with pre-filled message
            window.open('whatsapp://send?text=' + encodeURIComponent(message), '_blank');
             dataDisplayArea.innerText = 'Attempting to open WhatsApp with absent numbers...';
        } else {
            dataDisplayArea.innerText = 'No students are absent.';
        }
    });

    // View Attendance Data button functionality
    viewDataBtn.addEventListener('click', () => {
        let dataText = 'Attendance Data:\n';
        for (let i = 1; i <= 100; i++) {
            dataText += `Roll ${i}: ${attendanceStatus[i]}\n`;
        }
        dataDisplayArea.innerText = dataText;
    });

    // Initial render
    renderTable();
}); 