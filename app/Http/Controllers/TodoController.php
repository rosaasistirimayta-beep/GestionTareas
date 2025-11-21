<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\Todo;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

/**
 * TodoController - Controlador para gestión de tareas
 *
 * Maneja todas las operaciones CRUD de las tareas (todos) dentro del sistema.
 * Incluye paginación, relaciones con usuario y vistas Inertia.
 *
 * @group Gestión de Tareas
 * @authenticated
 *
 * @version 1.0.0
 * @package App\Http\Controllers
 *
 * @responseFormat {
 *   "success": true,
 *   "data": {},
 *   "message": "Operación exitosa"
 * }
 */
class TodoController extends Controller
{
    /**
     * Listar todas las tareas
     *
     * Obtiene una lista paginada de tareas con el usuario que las creó.
     * Incluye eager loading de la relación `usuarioQueCreoLaTarea`.
     *
     * @return Response
     *
     * @example
     * // Devuelve un JSON para Inertia con datos de tareas
     */
    public function index(): Response
    {
        $todos = Todo::with('usuarioQueCreoLaTarea:id,name')
            ->paginate(10)
            ->through(fn($todo) => [
                'id' => $todo->id,
                'name' => $todo->name,
                'status' => $todo->status,
                'user_id' => $todo->user_id,
                'usuarioQueCreoLaTarea' => $todo->usuarioQueCreoLaTarea
                    ? ['id' => $todo->usuarioQueCreoLaTarea->id, 'name' => $todo->usuarioQueCreoLaTarea->name]
                    : null,
            ]);

        return inertia('Todos/index', ['todos' => $todos]);
    }

    /**
     * Mostrar formulario para crear nueva tarea
     *
     * Recupera la lista de usuarios para seleccionar el dueño de la tarea.
     *
     * @return Response
     */
    public function create(): Response
    {
        $users = User::select('id','name')->orderBy('name')->get();

        return Inertia::render('Todos/create', [
            'users' => $users,
            'todo'  => new Todo(),
        ]);
    }

    /**
     * Almacenar nueva tarea
     *
     * Valida y crea una nueva tarea en la base de datos.
     *
     * @param StoreTodoRequest $request Request validado
     * @return RedirectResponse
     *
     * @example
     * // Redirige a la lista de tareas con mensaje flash
     */
    public function store(StoreTodoRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        Todo::create($validated);

        return redirect()->route('Todos.index')->with('success', 'Tarea creada correctamente');
    }

    /**
     * Mostrar tarea específica
     *
     * Incluye información del usuario que creó la tarea.
     *
     * @param Todo $todo Modelo tarea (Route Model Binding)
     * @return Response
     *
     * @example
     * // Devuelve tarea con usuario asociado
     */
    public function show(Todo $todo): Response
    {
        $todo->load('usuarioQueCreoLaTarea:id,name');

        return inertia('Todos/show', [
            'todo' => [
                'id' => $todo->id,
                'name' => $todo->name,
                'status' => $todo->status,
                'user_id' => $todo->user_id,
                'usuarioQueCreoLaTarea' => $todo->usuarioQueCreoLaTarea
                    ? ['id' => $todo->usuarioQueCreoLaTarea->id, 'name' => $todo->usuarioQueCreoLaTarea->name]
                    : null,
            ],
        ]);
    }

    /**
     * Mostrar formulario para editar tarea existente
     *
     * Recupera la lista de usuarios para poder reasignar la tarea.
     *
     * @param Todo $todo Modelo tarea a editar
     * @return Response
     */
    public function edit(Todo $todo): Response
    {
        $users = User::select('id','name')->orderBy('name')->get();

        return inertia('Todos/edit', [
            'todo' => $todo,
            'users' => $users,
        ]);
    }

    /**
     * Actualizar tarea existente
     *
     * Valida los datos y actualiza la tarea en la base de datos.
     *
     * @param UpdateTodoRequest $request Request validado
     * @param Todo $todo Modelo tarea a actualizar
     * @return RedirectResponse
     */
    // public function update(UpdateTodoRequest $request, Todo $todo): RedirectResponse
    // {


    //     $validated = $request->validated();
    //     $todo->update($validated);

    //     return redirect()->route('Todos.index')->with('success', 'Tarea actualizada correctamente');
    // }
    public function update(UpdateTodoRequest $request, Todo $todo): RedirectResponse                                          // un response es cualquier cosa que el servidor  devuelve el navegador  despues de procesar una peticion
    {
            // 1Validamos lo que venga del formulario lo que realizo el usuario
            // Datos validados desde UpdateTodoRequest que mandan para verificar que los( Datos de la base de datos )
            $validated = $request->validated();
            // --------- En este punto el usuario quiere cambiar el Estado --------
            //  En te punto es un if donde dises (Si viene " status " en la actualización,) controlar el flujo
            if (isset($validated['status'])) {
            // 2.El estado actual que tiene la tarea en la BD
            // en este punto obtine la tarea actual
            $estadoActual = $todo->status;
            // 3.El nuevo estado que está pidiendo el usuario
            $nuevoEstado = $validated['status'];// en este punto es para cuando el usuario pueda
            // Flujo permitido que lo llame  en modelo  esto son como reglas que si exigen en el sistema
            $flujo = [
                'creado' => ['en-proceso'],
                'en-proceso' => ['finalizado'],
                'finalizado' => [], // No puede avanzar aqui murio el estado
            ];
            // 4.(tabla de cambios permitidos)
            // Validación del flujo Cambia el estado si es permitido
            //   el if(!in_array -> ¿Este cambio está permitido según el flujo de estados?)
            if (!in_array($nuevoEstado, $flujo[$estadoActual])) {
                return back()->withErrors([
                    'status' => "No se puede cambiar de '$estadoActual' a '$nuevoEstado'."
                ]);
            }
        }
        // 5. El guardián revisa si el cambio es válido
        // Actualización final (Si pasó la validación del flujo)
        $todo->update($validated);
        return redirect()
            ->route('Todos.index');
    }
    /**
     * Eliminar tarea
     *
     * Realiza eliminación de la tarea de la base de datos.
     *
     * @param Todo $todo Modelo tarea a eliminar
     * @return RedirectResponse
     */
    public function destroy(Todo $todo): RedirectResponse
    {
        $todo->delete();

        return redirect()->route('Todos.index')->with('success', 'Tarea eliminada correctamente');
    }
}
