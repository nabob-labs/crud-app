import { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { z } from 'zod';
import { useTasks } from '../hooks/useTasks.js';

const titleSchema = z
  .string()
  .trim()
  .min(1, 'Title is required')
  .max(100, 'Title must be 100 characters or less');

export default function TaskItem({ task }) {
  const { updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editError, setEditError] = useState('');

  const handleToggle = async () => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      toast.success('Task updated');
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleSaveEdit = async () => {
    const result = titleSchema.safeParse(editTitle);
    if (!result.success) {
      setEditError(result.error.issues[0].message);
      return;
    }

    setEditError('');
    try {
      await updateTask(task.id, { title: result.data });
      setIsEditing(false);
      toast.success('Task updated');
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditError('');
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSaveEdit();
    }
    if (event.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await deleteTask(task.id);
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  return (
    <li className={clsx('task-item', { completed: task.completed })}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />

      {isEditing ? (
        <div className="task-edit">
          <input
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {editError && <span className="field-error">{editError}</span>}
          <button type="button" onClick={handleSaveEdit}>
            Save
          </button>
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span className="task-title">{task.title}</span>
          <span className="task-date">
            {format(new Date(task.createdAt), 'MMM d, yyyy')}
          </span>
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      )}

      <button type="button" className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}
