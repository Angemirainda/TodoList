import { useEffect, useState } from 'react';
import api from '../api/axios';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const res = await api.get('/all-tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Erreur chargement des tâches publiques', error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">🌍 Tâches des autres utilisateurs</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">Aucune tâche publique trouvée.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="border rounded p-3 bg-gray-50 shadow-sm">
              <div className="font-semibold">{task.title}</div>
              <div className="text-sm text-gray-500">
                Par : {task.user?.name ?? 'Utilisateur inconnu'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllTasks;
