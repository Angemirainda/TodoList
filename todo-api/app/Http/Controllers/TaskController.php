<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     //recuperer toutes les taches de l'utilisateur connecté
     //la méthode latest() permet de trier les taches par date de création
     //la méthode get() permet de recuperer toutes les taches
     //la méthode auth() permet de recuperer l'utilisateur connecté
     //la méthode user() permet de recuperer l'utilisateur
     //la méthode tasks() permet de recuperer les taches de l'utilisateur
    public function index(Request $request)
    {    
        // Récupère l'utilisateur connecté
        $user = auth()->user();

        // Récupère le filtre depuis la requête (par défaut : all)
        $filter = $request->query('filter', 'all');

        // Commence une requête sur les tâches de l'utilisateur
        $query = $user->tasks()->latest();

        // Applique un filtre si demandé
        if ($filter === 'done') {
            $query->where('completed', true);
        } elseif ($filter === 'todo') {
            $query->where('completed', false);
        }

        // Exécute la requête et retourne les tâches
        return $query->get();
            // return auth()->user()->tasks()->latest()->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

     //creer un nouvel utilisateur
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);
        return auth()->user()->tasks()->create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

     // Met à jour une tâche
     public function update(Request $request, Task $task)
     {
         $this->authorize('update', $task);
 
         $data = $request->validate([
             'title' => 'required|string|max:255',
         ]);
 
         $task->update($data);
 
         return response()->json(['message' => 'Tâche modifiée']);
     }
    /**
     * Remove the specified resource from storage.
     */

     //supprime une tache
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return response()->json(['message' => 'Tâche supprimée']);
    }

      // Change le statut "terminé" / "non terminé"
      public function toggle(Task $task)
      {
          $this->authorize('update', $task);
  
          $task->update(['completed' => !$task->completed]);
  
          return response()->json(['message' => 'Statut changé']);
      }
}
