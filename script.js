document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('registrationForm');
    const studentRecords = document.getElementById('studentRecords');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    const displayStudents = () => {
        studentRecords.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentRecords.appendChild(row);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('studentName').value;
        const id = document.getElementById('studentID').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contactNumber').value;

        if (name && id && email && contact) {
            students.push({ name, id, email, contact });
            localStorage.setItem('students', JSON.stringify(students));
            displayStudents();
            form.reset();
        } else {
            alert('All fields are required!');
        }
    });

    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentID').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contactNumber').value = student.contact;
        students.splice(index, 1); // Remove the edited student temporarily
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    };

    window.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    };

    displayStudents(); // Initial call to display stored students
});
