/**
 * Custom hook
 *
 * Wraps TaskContext consumption and throws a clear error when used outside Provider.
 * All components needing task data should use useTasks(), not manual prop drilling.
 */
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext.jsx';

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
