import React from "react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="p-4 text-center font-bold text-xl border-b border-blue-500">
          Todo Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <a href="#" className="block py-2 px-4 rounded hover:bg-blue-500">
                Vue d'ensemble
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 rounded hover:bg-blue-500">
                Ajouter une tâche
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 rounded hover:bg-blue-500">
                Tâches en cours
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 rounded hover:bg-blue-500">
                Tâches supprimées
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-blue-500">
          <button className="w-full py-2 px-4 bg-red-500 rounded hover:bg-red-600">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenue sur le Dashboard</h1>
          <p className="text-gray-600">Gérez vos tâches efficacement.</p>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">Tâches totales</h2>
            <p className="text-4xl font-bold text-blue-600">10</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">Tâches supprimées</h2>
            <p className="text-4xl font-bold text-red-600">2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">Tâches en cours</h2>
            <p className="text-4xl font-bold text-green-600">8</p>
          </div>
        </section>

        {/* Add Task Form */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ajouter une tâche</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="taskTitle" className="block text-gray-700 font-bold mb-2">
                Titre de la tâche
              </label>
              <input
                type="text"
                id="taskTitle"
                placeholder="Entrez le titre de la tâche"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
           
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Ajouter
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;