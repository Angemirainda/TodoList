// // TaskList.jsx
// // Composant pour afficher la liste des tâches
// import React, { useEffect, useState } from 'react'; 
// import api from '../api/axios';

// function TaskList() {
    
//     const [tasks, setTasks] = useState([]);

// useEffect(() => { fetchTasks(); }, []);


// const fetchTasks = async () => { 
//     try { 
//         const res = await api.get('/tasks'); setTasks(res.data); // adapte selon la structure de réponse
//  } catch (err) {
//      console.error('Erreur lors du fetch', err 

//      );
//      } 
//     };

// return ( 
// <ul> 
//     {
//     tasks.map(task => ( <li key={task.id}> {task.title} {task.completed ? '✅' : ''} </li>
    

//      )
//     )
//     } </ul> ); 
    
// }

// const updateTask = async (id, newTitle) => {
//      try { 
//       await api.put(/tasks/${id}, { title: newTitle }

//       );
//       fetchTasks(); 
//     } catch (err) { console.error('Erreur de mise à jour', err); } };//Tu peux appeler updateTask depuis un bouton "Modifier" ou un champ input modifiable.

// export default TaskList;



import React, { useState } from 'react';
import api from '../api/axios';

function TaskList({ tasks, onTasksUpdated }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    onTasksUpdated();
  };

  const toggleTask = async (id) => {
    await api.patch(`/tasks/${id}/toggle`);
    onTasksUpdated();
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  const updateTask = async (id) => {
    if (!editTitle.trim()) return;
    await api.put(`/tasks/${id}`, { title: editTitle });
    setEditingTaskId(null);
    onTasksUpdated();
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between border p-2 rounded ${
            task.completed ? 'bg-green-100 line-through' : ''
          }`}
        >
          {editingTaskId === task.id ? (
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => updateTask(task.id)}
              className="flex-1 border px-2 py-1 mr-2 rounded"
              autoFocus
            />
          ) : (
            <span className="flex-1">{task.title}</span>
          )}

          <div className="flex gap-2 ml-2 text-sm">
            <button
              onClick={() => toggleTask(task.id)}
              className="bg-green-500 text-white px-2 rounded"
              title="Terminer"
            >
              effectuer
            </button>
            <button
              onClick={() => startEdit(task)}
              className="bg-yellow-400 text-white px-2 rounded"
              title="Modifier"
            >
              editer
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-2 rounded"
              title="Supprimer"
            >
              supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
