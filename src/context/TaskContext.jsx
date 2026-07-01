import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as taskService from '../services/taskService.js';

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (title) => {
    const newTask = await taskService.createTask(title);
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback(async (id, updates) => {
    const updated = await taskService.updateTask(id, updates);
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    return updated;
  }, []);

  const deleteTask = useCallback(async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const clearCompleted = useCallback(async () => {
    await taskService.clearCompleted();
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      addTask,
      updateTask,
      deleteTask,
      clearCompleted,
    }),
    [tasks, loading, error, addTask, updateTask, deleteTask, clearCompleted],
  );

  return (
    <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
  );
}
