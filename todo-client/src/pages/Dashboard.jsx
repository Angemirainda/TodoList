// import React from "react";
// import { useState, useEffect } from 'react';
// import api from '../api/axios'; // Axios configuré
// import TaskList from '../components/TaskList';
// import TaskForm from '../components/TaskForm';
// import AllTasks from '../components/AllTasks';


// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);
//   const [filter, setFilter] = useState('all'); // ( 'all' | 'done' | 'todo') ajout de l'etat du filtre afin d'envoyer le bon filtre à l'API
//   const [search, setSearch] = useState('');
//   const [activeTab, setActiveTab] = useState('mes-taches'); // ou 'toutes'



//   // Récupérer les tâches au chargement
//   useEffect(() => {
//     fetchTasks();
//   }, [filter, search]); //  tableau de dépendances contenant "filter"

//   // GET /tasks
//   const fetchTasks = async () => {
//     try {
//       const res = await api.get('/tasks', {
//         params: { filter,search }, //  envoie ?filter=all ou done ou todo
//       });
//       setTasks(res.data);
//     } 

//     //   const res = await api.get('/tasks');
//     //   setTasks(res.data);
//     // } 
//     catch (error) {
//       console.error('Erreur lors du chargement des tâches :', error);
//     }
//   };

//   // POST /tasks (créer) ou PUT /tasks/{id} (modifier)
//   const handleCreateOrUpdate = async (data) => {
//     try {
//       if (editingTask) {
//         await api.put(`/tasks/${editingTask.id}`, data);
//         setEditingTask(null);
//       } else {
//         await api.post('/tasks', data);
//       }
//       fetchTasks();
//     } catch (error) {
//       console.error('Erreur lors de la création/modification :', error);
//     }
//   };

//   // DELETE /tasks/{id}
//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/tasks/${id}`);
//       fetchTasks();
//     } catch (error) {
//       console.error('Erreur lors de la suppression :', error);
//     }
//   };

//   // PATCH /tasks/{id}/toggle
//   const handleToggle = async (id) => {
//     try {
//       await api.patch(`/tasks/${id}/toggle`);
//       fetchTasks();
//     } catch (error) {
//       console.error('Erreur lors du changement de statut :', error);
//     }
//   };

//   const handleEdit = (task) => {
//     setEditingTask(task);
//   };
//   return (
//     //boutons pour les taches de l'utilisateur et les taches publiques
//     <div>
//       <div className="flex justify-center gap-4 mb-4">
//         <button
//           onClick={() => setActiveTab('mes-taches')}
//           className={`px-3 py-1 rounded ${
//             activeTab === 'mes-taches' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//           }`}
//         >
//           📋 Mes Tâches
//         </button>
//         <button
//           onClick={() => setActiveTab('toutes')}
//           className={`px-3 py-1 rounded ${
//             activeTab === 'toutes' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//           }`}
//         >
//           🌍 Voir Toutes
//         </button>
//       </div>
     

//       {/* Barre de recherche */}
//       <div className="mb-4">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Rechercher une tâche..."
//           className="w-full p-2 border rounded border-gray-300"
//         />
//       </div>
      
  
//       <div>
//         {/* Boutons de filtrage */}
//         <div className="flex justify-center gap-4 mb-6">
//           {['all', 'done', 'todo'].map((key) => (
//             <button
//               key={key}
//               onClick={() => setFilter(key)}
//               className={`px-3 py-1 rounded ${
//                 filter === key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
//               }`}
//             >
//               {key === 'all' ? 'Toutes' : key === 'done' ? 'Terminées' : 'En cours'}
//             </button>
//           ))}
//         </div>
//         <div className="max-w-xl mx-auto mt-10 px-4">
//           <h1 className="text-2xl font-bold mb-6 text-center"> Ma Todo List</h1>
  
//           {/* Formulaire d'ajout / modification */}
//           <TaskForm onSubmit={handleCreateOrUpdate} currentTask={editingTask} />
  
//           {/* Liste des tâches */}
//           <div className="mt-6">
//             <TaskList
//               tasks={tasks}
//               onToggle={handleToggle}
//               onDelete={handleDelete}
//               onEdit={handleEdit}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import AllTasks from '../components/AllTasks';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('mes-taches');
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    fetchTasks();
  }, [filter, search]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks', {
        params: { filter, search },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement des tâches :', error);
    }
  };

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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

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
    <div className="flex min-h-screen bg-white">
      {/*  Sidebar clair */}
      <div className="w-64 bg-blue-700 text-white p-6 space-y-6 shadow-md">
        <h2 className="text-2xl font-bold text-center">🗂️ Todo Manager</h2>
        <nav className="space-y-3">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full text-left px-4 py-2 rounded hover:bg-gray-900 ${
              activeView === 'dashboard' ? 'bg-gray-900 font-semibold' : ''
            }`}
          >
            📋 Mes Tâches
          </button>
          <button
            onClick={() => setActiveView('all-tasks')}
            className={`w-full text-left px-4 py-2 rounded hover:bg-gray-900 ${
              activeView === 'all-tasks' ? 'bg-gray-300 font-semibold' : ''
            }`}
          >
            🌍 Voir toutes les autres
          </button>
          <button
            onClick={() => setActiveView('stats')}
            className={`w-full text-left px-4 py-2 rounded hover:bg-gray-900 ${
              activeView === 'stats' ? 'bg-gray-300 font-semibold' : ''
            }`}
          >
            📊 Statistiques
          </button>
        </nav>

        <button className="mt-10 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
           Déconnexion
        </button>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 bg-white p-6">
        {/* Vue : Mes Tâches */}
        {activeView === 'dashboard' && (
          <>
           <h1 className="text-4xl font-bold mb-6"> Ma Todo List</h1>
            {/* Barre de recherche */}
            <div className="mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Rechercher une tâche..."
                className="w-full p-2 border rounded border-gray-300"
              />
            </div>

            {/*  Blocs de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-600 h-30 p-4 rounded-lg shadow text-center">
                <h3 className="text-md text-white font-semibold">Tâches Totales</h3>
                <p className="text-5xl font-bold text-white">12</p>
              </div>
              <div className="bg-yellow-500 p-4 rounded-lg shadow text-center">
                <h3 className="text-md font-semibold text-white">Tâches en cours</h3>
                <p className="text-5xl font-bold text-white">5</p>
              </div>
              <div className="bg-green-500 p-4 rounded-lg shadow text-center">
                <h3 className="text-md font-semibold text-white">Tâches terminées</h3>
                <p className="text-5xl font-bold text-white">7</p>
              </div>
            </div>

            {/* Boutons de filtre */}
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

              <TaskForm onSubmit={handleCreateOrUpdate} currentTask={editingTask} />

              <div className="mt-6">
                <TaskList
                  tasks={tasks}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </div>
            </div>
          </>
        )}

        {/* Vue : Statistiques (visuelle seulement) */}
        {activeView === 'stats' && (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">📊 Statistiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-100 text-blue-900 p-6 rounded-xl shadow text-center">
                <h3 className="text-lg font-semibold">Total de Tâches</h3>
                <p className="text-3xl font-bold mt-2">12</p>
              </div>
              <div className="bg-green-100 text-green-900 p-6 rounded-xl shadow text-center">
                <h3 className="text-lg font-semibold">Terminées</h3>
                <p className="text-3xl font-bold mt-2">7</p>
              </div>
              <div className="bg-yellow-100 text-yellow-900 p-6 rounded-xl shadow text-center">
                <h3 className="text-lg font-semibold">En cours</h3>
                <p className="text-3xl font-bold mt-2">5</p>
              </div>
            </div>
          </div>
        )}

        {/* Vue : Tâches publiques */}
        {activeView === 'all-tasks' && (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">🌍 Tâches Publiques</h2>
            <AllTasks />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
