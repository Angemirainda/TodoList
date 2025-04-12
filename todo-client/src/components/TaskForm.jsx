import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, currentTask }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (currentTask) setTitle(currentTask.title);
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        placeholder="Nouvelle tâche..."
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {currentTask ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
};

export default TaskForm;
