import { useTasks } from '../hooks/useTasks.js';
import TaskItem from './TaskItem.jsx';

export default function TaskList({ searchQuery }) {
  const { tasks } = useTasks();

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above.</p>;
  }

  if (filteredTasks.length === 0) {
    return <p className="empty-state">No tasks match your search.</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
