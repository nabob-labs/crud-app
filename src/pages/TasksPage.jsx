import { useState } from 'react';
import { toast } from 'react-toastify';
import { TaskProvider } from '../context/TaskContext.jsx';
import { useTasks } from '../hooks/useTasks.js';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import SearchBar from '../components/SearchBar.jsx';

function TasksContent() {
  const { tasks, loading, error, clearCompleted } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');

  const hasCompleted = tasks.some((task) => task.completed);

  const handleClearCompleted = async () => {
    if (!window.confirm('Remove all completed tasks?')) {
      return;
    }

    try {
      await clearCompleted();
      toast.success('Completed tasks cleared');
    } catch {
      toast.error('Failed to clear completed tasks');
    }
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <h1>Todo App</h1>
      <TaskForm />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      {hasCompleted && (
        <div className="toolbar">
          <button type="button" className="clear-btn" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </div>
      )}
      <TaskList searchQuery={searchQuery} />
    </>
  );
}

export default function TasksPage() {
  return (
    <div className="tasks-page">
      <TaskProvider>
        <TasksContent />
      </TaskProvider>
    </div>
  );
}
