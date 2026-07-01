# crud-app

A todo list application with full CRUD (Create / Read / Update / Delete) capabilities.

## Tech Stack

React 19, Vite, React Router, Context API, react-hook-form, Zod, mock API (setTimeout + Promise)

## Getting Started

```bash
npm install
npm run dev
```

The app runs at [http://localhost:8080](http://localhost:8080).

## Other Commands

```bash
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint check
```

## Features

- Load and display tasks (loading and error states)
- Create tasks (form validation: title 1–100 characters)
- Toggle completion and inline title editing
- Delete tasks (confirmation dialog)
- Search/filter by title
- Toast feedback on create, update, and delete
- localStorage persistence (data survives refresh)
- Bulk clear completed tasks (Clear completed)
- `react-error-boundary` fallback UI

## Project Structure

```
src/
├── main.jsx, App.jsx
├── pages/TasksPage.jsx
├── components/{TaskForm,TaskList,TaskItem,SearchBar}.jsx
├── hooks/useTasks.js
├── services/taskService.js
├── context/TaskContext.jsx
├── data/mockTasks.js
└── styles/app.css
```
