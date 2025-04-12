import React from "react";
import { useState, useEffect } from 'react';
import api from '../api/axios'; // Axios configuré
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // ( 'all' | 'done' | 'todo') ajout de l'etat du filtre afin d'envoyer le bon filtre à l'API
  const [search, setSearch] = useState('');


  // Récupérer les tâches au chargement
  useEffect(() => {
    fetchTasks();
  }, [filter, search]); //  tableau de dépendances contenant "filter"

  // GET /tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks', {
        params: { filter,search }, //  envoie ?filter=all ou done ou todo
      });
      setTasks(res.data);
    } 

    //   const res = await api.get('/tasks');
    //   setTasks(res.data);
    // } 
    catch (error) {
      console.error('Erreur lors du chargement des tâches :', error);
    }
  };

  // POST /tasks (créer) ou PUT /tasks/{id} (modifier)
  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask.id}`, data);
        setEditingTask(null);
      } else {
        await api.post('/tasks', data);
      }
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la création/modification :', error);
    }
  };

  // DELETE /tasks/{id}
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  // PATCH /tasks/{id}/toggle
  const handleToggle = async (id) => {
    try {
      await api.patch(`/tasks/${id}/toggle`);
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors du changement de statut :', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };
  return (
    <div>
      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une tâche..."
          className="w-full p-2 border rounded border-gray-300"
        />
      </div>
  
      <div>
        {/* Boutons de filtrage */}
        <div className="flex justify-center gap-4 mb-6">
          {['all', 'done', 'todo'].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded ${
                filter === key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {key === 'all' ? 'Toutes' : key === 'done' ? 'Terminées' : 'En cours'}
            </button>
          ))}
        </div>
        <div className="max-w-xl mx-auto mt-10 px-4">
          <h1 className="text-2xl font-bold mb-6 text-center">📋 Ma Todo List</h1>
  
          {/* Formulaire d'ajout / modification */}
          <TaskForm onSubmit={handleCreateOrUpdate} currentTask={editingTask} />
  
          {/* Liste des tâches */}
          <div className="mt-6">
            <TaskList
              tasks={tasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

