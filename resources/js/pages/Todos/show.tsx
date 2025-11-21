import { Head } from '@inertiajs/react';
import { Todo } from '@/types';
// Tipo del usuario que creó la tarea
// types.ts

// Props que recibe este componente desde Inertia
interface Props {
    todo: Todo;
}
export default function Show({ todo }: Props) {
    return (

        <div className="mx-auto max-w-md p-4">
            {/* Título dinámico en la pestaña en la cual se debe actualizar */}
            <Head title={`Tarea #${todo.id}`} />

            <h1 className="text-center mb-4 text-2xl font-bold">Detalle de la Tarea</h1>

            <div className="rounded bg-white p-4 shadow dark:bg-gray-800">
                {/* ID de la tarea */}
                <p className="mb-2">
                    <strong>ID:</strong> {todo.id}
                </p>

                {/* Nombre de la tarea */}
                <p className="mb-2">
                    <strong>Tarea:</strong> {todo.name}
                </p>

                {/* Estado de la tarea */}
                <p className="mb-2">
                    <strong>Estado:</strong> {todo.status}
                </p>

                {/* Usuario asignado (solo si existe) */}
                {todo.usuarioQueCreoLaTarea ? (
                    <p className="mb-2">
                        <strong>Usuario:</strong>{' '}
                        {todo.usuarioQueCreoLaTarea.name}
                    </p>
                ) : (
                    // Mensaje si no tiene usuario
                    <p className="text-gray-500">
                        Este no tiene usuario asignado.
                    </p>
                )}
            </div>
        </div>
    );
}
