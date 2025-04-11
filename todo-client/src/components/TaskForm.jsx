// TaskForm.jsx
// // Composant pour ajouter une nouvelle tâche
import React, { useState } from 'react';
import api from '../api/axios';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await api.post('/tasks', { title });
      setTitle('');
      onTaskAdded(); // Recharger les tâches
    } catch (err) {
      console.error('Erreur lors de l’ajout de la tâche', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche"
        className="flex-1 border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        Ajouter
      </button>
    </form>
  );
}

export default TaskForm;


