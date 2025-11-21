<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
// 1 metodo get (tabla) llamar al controlador del la funcion index el nombre de la tabla
Route::get('todos', [TodoController::class, 'index'])->name('Todos.index');

// 2 crear la nueva tabla de usuario
Route::get('todos/create', [TodoController::class, 'create'])->name('Todos.create');

// 3  store
Route::post('/todos', [TodoController::class, 'store'])->name('Todos.store');

// 4 Editar Esta ruta muestra el formulario para editar un Todo específico, usando la URL todos/{id}/edit, controlada por el método edeit del TodoController, y tiene el nombre Todos.edit.
// web.php
Route::get('todos/{todo}/edit', [TodoController::class, 'edit'])->name('Todos.edit');

// 5 update
Route::put('todos/{todo}', [TodoController::class, 'update'])->name('Todos');

// 6 destroy
Route::delete('todoss/{todo}', [TodoController::class, 'destroy'])->name('todoss.destroy');

// 7  PARA MOSTRAR UNA TAREA ESPECÍFICA (SHOW)  en en este punto se podria desi rque traiga el usuario con todos sus datos
Route::get('todos/{todo}', [TodoController::class, 'show'])->name('Todos.show');


require __DIR__.'/settings.php';
