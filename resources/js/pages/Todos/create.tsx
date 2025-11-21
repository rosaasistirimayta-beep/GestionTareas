import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
// import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Crear Nueva Tarea',
            href: '/todos/create',
        },
    ];
    export default function Create({
        users,
    }: {
        users: { id: number; name: string }[];
    }) {
    const { data, setData, post, processing, errors } = useForm({
    name: '',
    status: 'creado',
    user_id: '' as string | number,
    });
    // Estado para mostrar mensaje
    const [mensaje, setMensaje] = useState<string | null>(null);
    //handleSubmit evita recargar la página y envía los datos del formulario al backend usando Inertia.
    // La ruta /todos debe coincidir con tu ruta en el servidor que crea la tarea
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/todos', {
        onSuccess: () => {
            setMensaje('Tarea creada correctamente');
            setTimeout(() => setMensaje(null), 8000);
        },
        onError: (errors) => {
            setMensaje('No se pudo crear la tarea');
            setTimeout(() => setMensaje(null), 2000);
            console.log(errors);
        },
    });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tarea | Create" />
        {mensaje && (
            <div className="mb-4 p-3 rounded bg-green-100 text-green-800 font-semibold">
                {mensaje}
            </div>
        )}
                <div className="m-4">
                    <form
                        onSubmit={handleSubmit}
                        method="post"
                        className="space-y-4">
                        <div>
                            <label>Tarea</label>
                            <input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`border p-2 w-full rounded ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                        </div>
                        {/*  esto es de boton errors de usuario asignar */}
                        <div>
                        <label className="block">Usuario</label>
                           <select
                              value={data.user_id}
                              onChange={(e) =>
                                setData('user_id', Number(e.target.value))}
                              className={` m-4 bg-gray-800 -900 text-white border p-2 w-full rounded ${errors.user_id ? 'border-red-500' : ''}`}>
                              <option value="">— Seleccione usuario —</option>
                              {users.map((u) => (
                                  <option key={u.id} value={u.id}>{u.name}</option>
                              ))}
                          </select>
                               {errors.user_id && <p className="text-red-600 text-sm mt-1">{errors.user_id}</p>}
                        </div>
                        {/* aqui se hace el boton de un componente y no de html */}
                        <Button
                            disabled={processing}
                            type="submit"
                            className="mb-4 rounded-lg bg-orange-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-500">
                            Guardar Tarea
                        </Button>
                    </form>
                </div>
        </AppLayout>
    );
}



