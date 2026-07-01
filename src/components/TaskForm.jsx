import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useTasks } from '../hooks/useTasks.js';

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
});

export default function TaskForm() {
  const { addTask } = useTasks();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { title: '' },
  });

  const onSubmit = async (data) => {
    const result = taskSchema.safeParse(data);
    if (!result.success) {
      setError('title', { message: result.error.issues[0].message });
      return;
    }

    try {
      await addTask(result.data.title);
      reset();
      toast.success('Task created');
    } catch {
      toast.error('Failed to create task');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title')}
        placeholder="Add a new task..."
        aria-label="Task title"
      />
      {errors.title && (
        <span className="field-error">{errors.title.message}</span>
      )}
      <button type="submit">Add Task</button>
    </form>
  );
}
