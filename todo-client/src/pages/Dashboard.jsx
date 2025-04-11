import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import api from '../api/axios';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data); // Adapte selon la structure de réponse
    } catch (err) {
      console.error('Erreur lors de la récupération des tâches', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ma Todo List</h1>
      <TaskForm onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} onTasksUpdated={fetchTasks} />
    </div>
  );
}

export default App;

// import React from "react";

// const Home = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
//       <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Bienvenue sur le Dashboard
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Gérez vos tâches facilement et efficacement avec notre application.
//         </p>
//         <button
//           className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//           onClick={() => alert("Commencer")}
//         >
//           Commencer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;