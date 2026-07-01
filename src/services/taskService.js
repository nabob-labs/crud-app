import { v4 as uuidv4 } from 'uuid';
import { mockTasks } from '../data/mockTasks.js';

const STORAGE_KEY = 'crud-app-tasks';

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fall back to mock data
  }
  const initial = [...mockTasks];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function persistTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

let tasks = loadTasks();

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTasks() {
  await delay();
  return [...tasks];
}

export async function createTask(title) {
  await delay();
  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks = [newTask, ...tasks];
  persistTasks();
  return newTask;
}

export async function updateTask(id, updates) {
  await delay();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    throw new Error('Task not found');
  }
  tasks[index] = { ...tasks[index], ...updates };
  persistTasks();
  return tasks[index];
}

export async function deleteTask(id) {
  await delay();
  tasks = tasks.filter((task) => task.id !== id);
  persistTasks();
}

export async function clearCompleted() {
  await delay();
  const removedCount = tasks.filter((task) => task.completed).length;
  tasks = tasks.filter((task) => !task.completed);
  persistTasks();
  return removedCount;
}
