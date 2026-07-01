/**
 * Mock API service layer
 *
 * Uses setTimeout to simulate async requests; no real backend required.
 * All CRUD operations live here; UI calls through Context.
 *
 * Bonus: persists to localStorage after each change so data survives refresh.
 */
import { v4 as uuidv4 } from 'uuid';
import { mockTasks } from '../data/mockTasks.js';

const STORAGE_KEY = 'crud-app-tasks';

/** Load from localStorage; seed with mockTasks and persist when empty */
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
    // Fall back to mock data on parse failure
  }
  const initial = [...mockTasks];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function persistTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/** Module-level in-memory store simulating a server data source */
let tasks = loadTasks();

/** Simulated network latency to surface Loading state */
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

/** Return all tasks */
export async function getTasks() {
  await delay();
  return [...tasks];
}

/** Create task: new id, completed: false, createdAt; prepend to list */
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

/** Merge updates into an existing task */
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

/** Delete task by id */
export async function deleteTask(id) {
  await delay();
  tasks = tasks.filter((task) => task.id !== id);
  persistTasks();
}

/** Bonus — Remove all completed tasks in bulk */
export async function clearCompleted() {
  await delay();
  const removedCount = tasks.filter((task) => task.completed).length;
  tasks = tasks.filter((task) => !task.completed);
  persistTasks();
  return removedCount;
}
