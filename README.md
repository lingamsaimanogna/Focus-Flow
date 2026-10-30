# FocusFlow

A simple productivity dashboard built to make everyday task management a little easier.

FocusFlow lets you manage your daily tasks, track your progress, use a Pomodoro timer for focused work, and keep quick notes — all in one place.

## Features

- Add, complete, and delete tasks
- Track completed tasks and daily progress
- 25-minute Pomodoro focus timer
- Pause, resume, and reset the timer
- Keep quick notes and reminders
- Light and dark mode
- Saves tasks, notes, theme, and focus sessions using LocalStorage
- Responsive design for different screen sizes

## Tech Stack

- HTML5
- CSS3
- JavaScript
- LocalStorage
- CSS Grid & Flexbox

## Project Structure

```text
FocusFlow/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### Files

**`index.html`**  
Contains the structure of the dashboard, including tasks, statistics, Pomodoro timer, notes, and navigation.

**`style.css`**  
Handles the layout, styling, dark mode, responsive design, cards, buttons, and overall appearance of the application.

**`script.js`**  
Handles the main functionality such as task management, progress calculation, notes, theme switching, LocalStorage, and the Pomodoro timer.

## Getting Started

No backend or database is needed to run this project.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/focusflow.git
```

### 2. Open the project

```bash
cd focusflow
```

### 3. Run it

Open `index.html` in your browser.

If you're using VS Code, you can also use the **Live Server** extension.

## How It Works

FocusFlow stores your data in the browser using LocalStorage, so your tasks and notes remain available when you come back to the application.

Tasks are saved whenever they are added, completed, or deleted, while notes are saved as you type. 

The Pomodoro timer starts with a 25-minute focus session. Once a session is completed, the focus session count is updated automatically. 

## What I Learned

While building FocusFlow, I practiced:

- Working with the DOM
- JavaScript event handling
- Managing arrays and objects
- Using LocalStorage
- Creating a countdown timer
- Dynamically updating the UI
- Building responsive layouts
- Implementing light and dark themes

## Future Improvements

Some things I would like to add later:

- Task priorities and categories
- Due dates and reminders
- Custom Pomodoro durations
- Short and long break timers
- Productivity history and charts
- Task search and filtering
- User accounts and cloud storage

---

**FocusFlow — Stay focused.**
