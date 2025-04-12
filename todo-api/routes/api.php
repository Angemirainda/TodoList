<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



// Route publique pour le cookie CSRF (nécessaire pour les SPA)
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

// Routes publiques d'authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Déconnexion (suppression du token)
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Récupération des informations de l'utilisateur connecté
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // Route pour permettre d'afficher toutes les taches des autres utilisateurs
    Route::get('/all-tasks', [TaskController::class, 'allTasks']);

    
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
    Route::patch('/tasks/{task}/toggle', [TaskController::class, 'toggle']);
    // Alternative avec un contrôleur
    // Route::get('/user', [AuthController::class, 'user']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    
    return $request->user();
});


//Pour tester mon filtrage dans postman
// http://localhost:8000/api/tasks?filter=all
// http://localhost:8000/api/tasks?filter=done
// http://localhost:8000/api/tasks?filter=todo



