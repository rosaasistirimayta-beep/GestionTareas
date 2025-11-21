    import { Input } from '@/components/ui/input';
    import AppLayout from '@/layouts/app-layout';
    import { User, type BreadcrumbItem } from '@/types';
    import { Head, useForm } from '@inertiajs/react';
    import { Button } from '@/components/ui/button';
    import React from 'react';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Editar Tarea',
            href: '/todos',
        },
    ];

    interface Todo {
        id: number;
        user_id: number;
        name: string;
        status: 'creado' | 'en-proceso' | 'finalizado';
        usuarioQueCreoLaTarea?: { name: string } | null;
    }

  export default function Edit({ todo, users }: { todo: Todo; users: User[] }) {
    // useForm almacena los datos editables
    const { data, setData, put, processing, errors } = useForm({
        name: todo.name,
        status: todo.status,
    });

    // Actualiza la tarea
    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Enviar el formulario; data se envía automáticamente
        put(`/todos/${todo.id}`, {
            onSuccess: () => {
                alert('Tarea actualizada con Exito');
            },
            onError: (err) => {
                console.log(err);
                alert('No se pudo actualizar la tarea');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Tarea" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Nombre de la tarea */}
                    <div className="gap-1.5">
                        <Input
                            placeholder="Nombre de la Tarea"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    {/* Usuario asignado */}
                    <div className="gap-1.5">
                        <label className="block mb-1 font-semibold">Asignado a</label>
                        <p className="border p-2 w-full rounded">
                            {users.find(u => u.id === todo.user_id)?.name || 'Sin usuario'}
                        </p>
                    </div>

                    {/* Estado */}
                    <div className="gap-1.5">
                        <label className="block mb-1 font-semibold">Estado</label>
                        <select
                            value={data.status}
                            onChange={(e) =>
                                setData('status', e.target.value as 'creado' | 'en-proceso' | 'finalizado')
                            }
                            className={`
                                border p-2 w-full rounded font-semibold
                                ${data.status === 'creado' && 'bg-blue-100 text-blue-800'}
                                ${data.status === 'en-proceso' && 'bg-yellow-100 text-yellow-800'}
                                ${data.status === 'finalizado' && 'bg-green-100 text-green-800'}
                            `}
                        >
                            <option value={todo.status}>{todo.status}</option>
                            {todo.status === 'creado' && <option value="en-proceso">En proceso</option>}
                            {todo.status === 'en-proceso' && <option value="finalizado">Finalizado</option>}
                        </select>
                    </div>

                    {/* Botón actualizar */}
                    <Button type="submit" disabled={processing}>
                        Actualizar Tarea
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}





// {todo.status !== 'finalizado' && (
//   <select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
//     {todo.status === 'creado' && <option value="en-proceso">En proceso</option>}
//     {todo.status === 'en-proceso' && <option value="finalizado">Finalizado</option>}
//   </select>
// )}
