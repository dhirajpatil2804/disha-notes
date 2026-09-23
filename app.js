const defaultData = {

    subjects: [

        {
            id: 1,
            name: "C Programming",
            description: "Programming fundamentals, syntax, functions and practicals.",
            icon: "💻"
        },

        {
            id: 2,
            name: "C++",
            description: "Object-oriented programming and C++ concepts.",
            icon: "⚙️"
        },

        {
            id: 3,
            name: "Java Programming",
            description: "Core Java, OOP, exception handling and practicals.",
            icon: "☕"
        },

        {
            id: 4,
            name: "Python",
            description: "Python programming, functions, OOP and libraries.",
            icon: "🐍"
        },

        {
            id: 5,
            name: "DBMS",
            description: "Database concepts, SQL, normalization and transactions.",
            icon: "🗄️"
        },

        {
            id: 6,
            name: "Operating System",
            description: "Processes, memory management, scheduling and file systems.",
            icon: "💿"
        },

        {
            id: 7,
            name: "Computer Networks",
            description: "Networking concepts, protocols and network models.",
            icon: "🌐"
        },

        {
            id: 8,
            name: "Power BI",
            description: "Data visualization, DAX, dashboards and analytics.",
            icon: "📊"
        }

    ],

    notes: [

        {
            id: 1,
            subjectId: 3,
            title: "Unit 1 - Introduction to Java",
            description: "Java basics, features, JVM, JDK and JRE.",
            onlineLink: "https://example.com/java-unit-1",
            pdfLink: "https://example.com/java-unit-1.pdf"
        },

        {
            id: 2,
            subjectId: 3,
            title: "Unit 2 - Classes and Objects",
            description: "Classes, objects, constructors and methods.",
            onlineLink: "https://example.com/java-unit-2",
            pdfLink: "https://example.com/java-unit-2.pdf"
        }

    ]

};


function getData() {

    const stored = localStorage.getItem("dishaNotesData");

    if (stored) {
        return JSON.parse(stored);
    }

    localStorage.setItem(
        "dishaNotesData",
        JSON.stringify(defaultData)
    );

    return defaultData;
}


function renderSubjects(search = "") {

    const data = getData();

    const container =
        document.getElementById("subjectContainer");

    if (!container) return;

    const filtered =
        data.subjects.filter(subject => {

            const subjectNotes =
                data.notes.filter(
                    note => note.subjectId === subject.id
                );

            const searchText =
                (
                    subject.name +
                    " " +
                    subject.description +
                    " " +
                    subjectNotes.map(n => n.title).join(" ")
                ).toLowerCase();

            return searchText.includes(
                search.toLowerCase()
            );

        });


    container.innerHTML = "";


    filtered.forEach(subject => {

        const notes =
            data.notes.filter(
                note => note.subjectId === subject.id
            );


        const card = document.createElement("div");

        card.className = "subject-card";


        card.innerHTML = `

            <div class="subject-icon">
                ${subject.icon || "📚"}
            </div>

            <h3>
                ${subject.name}
            </h3>

            <p>
                ${subject.description || ""}
            </p>

            <p>
                <strong>${notes.length}</strong>
                ${notes.length === 1 ? "Note" : "Notes"}
            </p>

            <a
                href="javascript:void(0)"
                class="view-btn"
                onclick="openSubject(${subject.id})"
            >
                View Notes →
            </a>

        `;


        container.appendChild(card);

    });


    if (filtered.length === 0) {

        container.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
                color:#777;
            ">
                No subjects or notes found.
            </div>
        `;

    }

}


function openSubject(subjectId) {

    const data = getData();

    const subject =
        data.subjects.find(
            s => s.id === subjectId
        );

    const notes =
        data.notes.filter(
            n => n.subjectId === subjectId
        );


    let html = `

        <div style="
            position:fixed;
            inset:0;
            background:rgba(0,0,0,.6);
            z-index:9999;
            padding:30px;
            overflow:auto;
        ">

            <div style="
                max-width:800px;
                margin:auto;
                background:white;
                border-radius:18px;
                padding:35px;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:30px;
                ">

                    <div>

                        <span style="
                            color:#e51d2a;
                            font-size:11px;
                            font-weight:bold;
                        ">
                            SUBJECT NOTES
                        </span>

                        <h2 style="margin-top:8px">
                            ${subject.name}
                        </h2>

                    </div>

                    <button
                        onclick="closeModal()"
                        style="
                            border:none;
                            background:#f3f3f3;
                            width:40px;
                            height:40px;
                            border-radius:50%;
                            cursor:pointer;
                            font-size:18px;
                        "
                    >
                        ×
                    </button>

                </div>
    `;


    if (notes.length === 0) {

        html += `
            <div style="
                padding:30px;
                text-align:center;
                background:#f8f8f8;
                border-radius:12px;
                color:#777;
            ">
                Notes will be available soon.
            </div>
        `;

    }


    notes.forEach(note => {

        html += `

            <div style="
                border:1px solid #eee;
                border-radius:12px;
                padding:20px;
                margin-bottom:15px;
            ">

                <h3>
                    ${note.title}
                </h3>

                <p style="
                    color:#777;
                    margin:8px 0 18px;
                    line-height:1.6;
                ">
                    ${note.description || ""}
                </p>

                <div style="
                    display:flex;
                    gap:10px;
                    flex-wrap:wrap;
                ">

                    ${
                        note.onlineLink
                        ?
                        `<a
                            href="${note.onlineLink}"
                            target="_blank"
                            style="
                                background:#e51d2a;
                                color:white;
                                padding:10px 15px;
                                border-radius:7px;
                                font-size:13px;
                                font-weight:600;
                            "
                        >
                            🌐 Read Online
                        </a>`
                        : ""
                    }

                    ${
                        note.pdfLink
                        ?
                        `<a
                            href="${note.pdfLink}"
                            target="_blank"
                            style="
                                background:#f2f2f2;
                                color:#333;
                                padding:10px 15px;
                                border-radius:7px;
                                font-size:13px;
                                font-weight:600;
                            "
                        >
                            📄 View PDF
                        </a>`
                        : ""
                    }

                </div>

            </div>

        `;

    });


    html += `
            </div>
        </div>
    `;


    document.body.insertAdjacentHTML(
        "beforeend",
        html
    );

}


function closeModal() {

    const modal =
        document.body.lastElementChild;

    if (modal &&
        modal.style.position === "fixed") {

        modal.remove();

    }

}


function updateStats() {

    const data = getData();

    document.getElementById("subjectCount")
        .textContent =
        data.subjects.length;

    document.getElementById("noteCount")
        .textContent =
        data.notes.length;

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderSubjects();

        updateStats();


        const search =
            document.getElementById("searchInput");


        if (search) {

            search.addEventListener(
                "input",
                () => {

                    renderSubjects(
                        search.value
                    );

                }
            );

        }

    }
);