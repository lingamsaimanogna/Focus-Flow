// ===============================
// FocusFlow - JavaScript
// ===============================


// ---------- Date ----------

const currentDate = document.getElementById("currentDate");

const today = new Date();

currentDate.textContent = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
});


// ---------- Tasks ----------

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const completedCount = document.getElementById("completedCount");
const taskCount = document.getElementById("taskCount");
const progressText = document.getElementById("progressText");

let tasks = JSON.parse(localStorage.getItem("focusflowTasks")) || [];


// Display tasks

function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-state">
                <div>✓</div>
                <p>No tasks yet</p>
                <span>Add something you want to accomplish today.</span>
            </div>
        `;

        updateStats();

        return;
    }


    tasks.forEach((task, index) => {

        const taskElement = document.createElement("div");

        taskElement.className = `task ${task.completed ? "completed" : ""}`;

        taskElement.innerHTML = `
            <div
                class="task-checkbox"
                onclick="toggleTask(${index})"
            ></div>

            <span>${escapeHTML(task.text)}</span>

            <button
                class="task-delete"
                onclick="deleteTask(${index})"
            >
                ×
            </button>
        `;

        taskList.appendChild(taskElement);

    });


    updateStats();
}


// Add task

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    renderTasks();
}


// Enter key

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Add button

addTaskBtn.addEventListener("click", addTask);


// Complete task

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    renderTasks();
}


// Delete task

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}


// Save tasks

function saveTasks() {

    localStorage.setItem(
        "focusflowTasks",
        JSON.stringify(tasks)
    );

}


// ---------- Statistics ----------

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    completedCount.textContent = completed;

    taskCount.textContent =
        `${total} ${total === 1 ? "task" : "tasks"}`;


    const progress =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);


    progressText.textContent = `${progress}%`;
}


// ---------- Notes ----------

const notes = document.getElementById("notes");
const saveStatus = document.getElementById("saveStatus");

notes.value = localStorage.getItem("focusflowNotes") || "";


notes.addEventListener("input", function() {

    localStorage.setItem(
        "focusflowNotes",
        notes.value
    );

    saveStatus.textContent = "Saved locally";

});


// ---------- Theme ----------

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("focusflowTheme");


if (savedTheme === "dark") {
    document.body.classList.add("dark");
}


themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    const theme =
        document.body.classList.contains("dark")
            ? "dark"
            : "light";

    localStorage.setItem(
        "focusflowTheme",
        theme
    );

});


// ---------- Pomodoro ----------

let timeLeft = 25 * 60;

let timerInterval = null;

let timerRunning = false;

let sessions = Number(
    localStorage.getItem("focusflowSessions")
) || 0;


const timerMinutes =
    document.getElementById("timerMinutes");

const startTimer =
    document.getElementById("startTimer");

const resetTimer =
    document.getElementById("resetTimer");

const timerStatus =
    document.getElementById("timerStatus");

const sessionCount =
    document.getElementById("sessionCount");


sessionCount.textContent = sessions;


// Format timer

function updateTimerDisplay() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    timerMinutes.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


// Start / Pause timer

startTimer.addEventListener("click", function() {

    if (timerRunning) {

        clearInterval(timerInterval);

        timerRunning = false;

        startTimer.textContent = "Resume";

        timerStatus.textContent = "Paused";

        return;
    }


    timerRunning = true;

    startTimer.textContent = "Pause";

    timerStatus.textContent = "Focusing";


    timerInterval = setInterval(function() {

        timeLeft--;

        updateTimerDisplay();


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timerRunning = false;

            sessions++;

            localStorage.setItem(
                "focusflowSessions",
                sessions
            );

            sessionCount.textContent = sessions;

            timerStatus.textContent = "Completed 🎉";

            startTimer.textContent = "Start Focus";

            timeLeft = 25 * 60;

            updateTimerDisplay();
        }

    }, 1000);

});


// Reset timer

resetTimer.addEventListener("click", function() {

    clearInterval(timerInterval);

    timerRunning = false;

    timeLeft = 25 * 60;

    updateTimerDisplay();

    startTimer.textContent = "Start Focus";

    timerStatus.textContent = "Ready";

});


// ---------- Security helper ----------

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// Initial render

updateTimerDisplay();

renderTasks();