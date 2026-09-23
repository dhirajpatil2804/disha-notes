const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "disha123";


function getData() {

    const stored =
        localStorage.getItem("dishaNotesData");

    if (stored) {
        return JSON.parse(stored);
    }

    return {
        subjects: [],
        notes: []
    };

}


function saveData(data) {

    localStorage.setItem(
        "dishaNotesData",
        JSON.stringify(data)
    );

}


function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;


    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        sessionStorage.setItem(
            "dishaAdmin",
            "true"
        );

        showDashboard();

    } else {

        document.getElementById(
            "loginError"
        ).textContent =
            "Invalid username or password.";

    }

}


function logout() {

    sessionStorage.removeItem(
        "dishaAdmin"
    );

    location.reload();

}


function showDashboard() {

    document.getElementById(
        "loginScreen"
    ).style.display = "none";


    document.getElementById(
        "dashboard"
    ).style.display = "block";


    renderDashboard();

}


function renderDashboard() {

    const data = getData();


    document.getElementById(
        "totalSubjects"
    ).textContent =
        data.subjects.length;


    document.getElementById(
        "totalNotes"
    ).textContent =
        data.notes.length;


    renderSubjectSelect();

    renderSubjects();

    renderNotes();

}


function renderSubjectSelect() {

    const data = getData();

    const select =
        document.getElementById("noteSubject");


    select.innerHTML =
        `<option value="">
            Select Subject
        </option>`;


    data.subjects.forEach(subject => {

        select.innerHTML += `
            <option value="${subject.id}">
                ${subject.name}
            </option>
        `;

    });

}


function addSubject() {

    const name =
        document.getElementById(
            "subjectName"
        ).value.trim();


    const description =
        document.getElementById(
            "subjectDescription"
        ).value.trim();


    const icon =
        document.getElementById(
            "subjectIcon"
        ).value.trim();


    if (!name) {

        alert("Enter subject name.");

        return;

    }


    const data = getData();


    data.subjects.push({

        id: Date.now(),

        name: name,

        description: description,

        icon: icon || "📚"

    });


    saveData(data);


    document.getElementById(
        "subjectName"
    ).value = "";


    document.getElementById(
        "subjectDescription"
    ).value = "";


    document.getElementById(
        "subjectIcon"
    ).value = "";


    renderDashboard();


    alert("Subject added successfully.");

}


function addNote() {

    const subjectId =
        Number(
            document.getElementById(
                "noteSubject"
            ).value
        );


    const title =
        document.getElementById(
            "noteTitle"
        ).value.trim();


    const description =
        document.getElementById(
            "noteDescription"
        ).value.trim();


    const onlineLink =
        document.getElementById(
            "onlineLink"
        ).value.trim();


    const pdfLink =
        document.getElementById(
            "pdfLink"
        ).value.trim();


    if (!subjectId) {

        alert("Select a subject.");

        return;

    }


    if (!title) {

        alert("Enter note name.");

        return;

    }


    if (!onlineLink && !pdfLink) {

        alert(
            "Enter at least one notes link."
        );

        return;

    }


    const data = getData();


    data.notes.push({

        id: Date.now(),

        subjectId: subjectId,

        title: title,

        description: description,

        onlineLink: onlineLink,

        pdfLink: pdfLink

    });


    saveData(data);


    document.getElementById(
        "noteTitle"
    ).value = "";


    document.getElementById(
        "noteDescription"
    ).value = "";


    document.getElementById(
        "onlineLink"
    ).value = "";


    document.getElementById(
        "pdfLink"
    ).value = "";


    renderDashboard();


    alert("Note added successfully.");

}


function renderSubjects() {

    const data = getData();

    const table =
        document.getElementById(
            "subjectTable"
        );


    table.innerHTML = "";


    data.subjects.forEach(subject => {

        const count =
            data.notes.filter(
                n => n.subjectId === subject.id
            ).length;


        table.innerHTML += `

            <tr>

                <td>
                    ${subject.icon}
                    ${subject.name}
                </td>

                <td>
                    ${count}
                </td>

                <td>

                    <button
                        class="action-btn edit"
                        onclick="editSubject(${subject.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="action-btn delete"
                        onclick="deleteSubject(${subject.id})"
                    >
                        Delete
                    </button>

                </td>

            </tr>

        `;

    });

}


function renderNotes() {

    const data = getData();

    const table =
        document.getElementById(
            "notesTable"
        );


    table.innerHTML = "";


    data.notes.forEach(note => {

        const subject =
            data.subjects.find(
                s => s.id === note.subjectId
            );


        table.innerHTML += `

            <tr>

                <td>
                    ${subject ? subject.name : "Unknown"}
                </td>

                <td>
                    ${note.title}
                </td>

                <td>

                    ${
                        note.onlineLink
                        ?
                        `<a
                            href="${note.onlineLink}"
                            target="_blank"
                        >
                            Open
                        </a>`
                        :
                        "-"
                    }

                </td>

                <td>

                    ${
                        note.pdfLink
                        ?
                        `<a
                            href="${note.pdfLink}"
                            target="_blank"
                        >
                            PDF
                        </a>`
                        :
                        "-"
                    }

                </td>

                <td>

                    <button
                        class="action-btn edit"
                        onclick="editNote(${note.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="action-btn delete"
                        onclick="deleteNote(${note.id})"
                    >
                        Delete
                    </button>

                </td>

            </tr>

        `;

    });

}


function deleteSubject(id) {

    if (!confirm(
        "Delete this subject and all its notes?"
    )) return;


    const data = getData();


    data.subjects =
        data.subjects.filter(
            s => s.id !== id
        );


    data.notes =
        data.notes.filter(
            n => n.subjectId !== id
        );


    saveData(data);

    renderDashboard();

}


function deleteNote(id) {

    if (!confirm(
        "Delete this note?"
    )) return;


    const data = getData();


    data.notes =
        data.notes.filter(
            n => n.id !== id
        );


    saveData(data);

    renderDashboard();

}


function editSubject(id) {

    const data = getData();

    const subject =
        data.subjects.find(
            s => s.id === id
        );


    const name =
        prompt(
            "Enter new subject name:",
            subject.name
        );


    if (!name) return;


    subject.name = name;


    saveData(data);

    renderDashboard();

}


function editNote(id) {

    const data = getData();

    const note =
        data.notes.find(
            n => n.id === id
        );


    const title =
        prompt(
            "Enter new note name:",
            note.title
        );


    if (!title) return;


    note.title = title;


    saveData(data);

    renderDashboard();

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            sessionStorage.getItem(
                "dishaAdmin"
            ) === "true"
        ) {

            showDashboard();

        }

    }
);