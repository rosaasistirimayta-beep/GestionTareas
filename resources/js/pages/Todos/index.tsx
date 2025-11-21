import { useState } from 'react'; // 1 Importamos useState sirve para guardar un dato que puede cambiar
// y que React muestre automáticamente su actualización.
import Show from './show'; // Ajusta la ruta según dónde esté tu Show.tsx  para realizar el modal
import { Todo } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PageLinkItem, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'TAREA ASIGNADAS',
        href: '/todos',
    },
];
type IndexProps = {
    data: Todo[];
    links: PageLinkItem[];
};
export default function Index({ todos }: { todos: IndexProps }) {

    const { processing, delete: destroy } = useForm();


    // Este es para insertar el modal
    // Por ejemplo: setOpenShowModal(true) abre el modal, setOpenShowModal(false) lo cierra.
    // Estado para abrir/cerrar el modal de ver tarea
    const [openShowModal, setOpenShowModal] = useState(false);
    // -----Estado para almacenar la tarea seleccionada para mostrar-------
    // openShowModal controla si el modal se ve o no.
    // selectedTodo controla qué tarea se muestra dentro del modal.
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
    // 2 Estado para filtro de estado
    // estado es la variable que guarda el valor actual del filtro.
    // setEstadoFiltro es la función que usamos para cambiar ese valor.
    const [estadoFiltro, setEstadoFiltro] =
    // inicializa el estado: los valores permitidos
    useState<'creado' | 'en-proceso' | 'finalizado' | ''>('');
     // Estado para mensajes  de eliminar los datos  e ellos y asi
    const [mensaje, setMensaje] = useState<string | null>(null);
    const handleDelete = (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este dato ... ?')) return;
        destroy(route('todoss.destroy', id), {
            onSuccess: () => {
                setMensaje('Tarea eliminada correctamente');
                // Opcional: recargar datos o filtrar
                setTimeout(() => setMensaje(null), 3000); // Desaparece en 3 segcu
            },
            onError: (errors) => console.log(errors),
        });
    };
    // 3 Filtramos tareas según el estado seleccionado
    const tareasFiltradas = estadoFiltro
        //  si estadoFiltro = 'creado', solo devuelve las tareas que tengan todo.status === 'creado'.
        // .filter(...) recorre el array todos.data y devuelve un nuevo array con solo las tareas
        // cuyo status coincida con estadoFiltro.
        ? todos.data.filter((todo) => todo.status === estadoFiltro)
        //  Devuelve todas las tareas, sin filtrar. en este punto no se le entiende  nmuy bien
        : todos.data;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tarea | Usuario" />
               {/* Mensaje de éxito */}
                {mensaje && (
                    <div className="mb-2 p-3 rounded bg-green-50 text-green-800 font-semibold">
                        {mensaje}
                    </div>
                )}
            {/* Aquí va el input y el select para filtrar */}
            <div className="mb-4 flex gap-4 items-center">
                {/* 4 Select para filtrar por estado */}
                <select
                    value={estadoFiltro}
                    onChange={(e) =>
                        setEstadoFiltro(e.target.value as 'creado' | 'en-proceso' | 'finalizado' | '')}
                    className="mt-3 ml-3 border p-2 rounded-lg bg-gray-800">
                    <option value="">Todos los estados</option>
                    <option value="creado">Creado</option>
                    <option value="en-proceso">En proceso</option>
                    <option value="finalizado">Finalizado</option>
                </select>
            </div>
            {/* /*-----> en este div se realiza de este modo para que sea en pantallas pequeñas y medianos con tailwind */}
            <div className=" w-full p-4 overflow-x-auto">
                {/* Boton de crear tarea con su hover */}
                <Link href="/todos/create">
                    <button className="mb-4 rounded-lg bg-orange-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-500">
                        Crear Tarea
                    </button>
                </Link>
                {/* 5 Renderizamos la tabla con las tareas filtradas */}
                        {tareasFiltradas.length > 0 && (
                            <Table>
                                <TableCaption>Lista de tareas asignadas</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className=" bg-amber-700 border min-w-[100px]text-center">Id</TableHead>
                                        <TableHead className=" bg-amber-700 border min-w-[100px] text-center">Usuario</TableHead>
                                        <TableHead className=" bg-amber-700 border min-w-[100px] text-center">Tarea</TableHead>
                                        <TableHead className=" bg-amber-700 border min-w-[100px] text-center">Estado</TableHead>
                                        <TableHead className=" bg-amber-700 border min-w-[80px] text-center">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tareasFiltradas.map((todo) => (
                                        <TableRow key={todo.id}>
                                            <TableCell className="border font-medium text-center">{todo.id}</TableCell>
                                            <TableCell className="border font-medium">{todo.usuarioQueCreoLaTarea?.name || 'Sin usuario'}</TableCell>
                                            <TableCell className="border font-medium">{todo.name}</TableCell>
                                            <TableCell className="border font-medium text-center">
                                                <span //  es un contenedor en línea en HTML.
                                                    className={` border border-gray-100  rounded px-2 py-1 text-xs font-semibold ${
                                                        todo.status === 'creado' && 'bg-orange-100 text-orange-600'
                                                    } ${
                                                        todo.status === 'en-proceso' && 'bg-yellow-100 text-yellow-900'
                                                    } ${
                                                        todo.status === 'finalizado' && 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {todo.status === 'creado' && 'Creado'}
                                                    {todo.status === 'en-proceso' && 'En proceso'}
                                                    {todo.status === 'finalizado' && 'Finalizado'}
                                                </span>
                                            </TableCell>
                                            <TableCell className=" flex justify-center border font-medium text-center ">
                                                <Link href={`/todos/${todo.id}/edit`}>
                                                    <Button className=" mt-2 ml-3 mb-4 rounded bg-emerald-800 px-6 py-2 font-semibold text-white hover:bg-emerald-700">
                                                        Editar
                                                    </Button>
                                                </Link>

                                                <Button
                                                    disabled={processing}
                                                    className=" mt-2 ml-3 mb-3 rounded bg-red-800 px-6 py-2 font-semibold text-white hover:bg-red-600"
                                                    onClick={() => handleDelete(todo.id)}
                                                >
                                                    Eliminar
                                                </Button>

                                                {/* Botón que abre el modal de ver tarea de show */}
                                                <Button
                                                    className="mt-2 ml-3 mb-3 rounded bg-gray-800 px-4 py-2 font-semibold text-white hover:bg-gray-700"
                                                    onClick={() => {
                                                        setSelectedTodo(todo); // selecciona la tarea actual
                                                        setOpenShowModal(true); // abre el modal
                                                    }}>
                                                    Ver
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        {/* 6 Paginación   en este punto es de la paginacion de pantalla que se nesesita*/}
                         <div className="mt-6 flex gap-2">
                            <Link
                                href={todos.links[0]?.url || '#'}
                                className={`rounded px-3 py-1 ${
                                    !todos.links[0]?.url ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-black'
                                }`}>
                                Anterior
                            </Link>

                            {todos.links.slice(1, -1).map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`rounded px-3 py-1 ${link.active ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}>
                                    {i + 1}
                                </Link>
                            ))}
                            <Link
                                href={todos.links[todos.links.length - 1]?.url || '#'}
                                className={`rounded px-3 py-1 ${
                                    !todos.links[todos.links.length - 1]?.url ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-black'
                                }`}>
                                Siguiente
                            </Link>
                         </div>
                        {/* Modal para mostrar el componente Show */}
                            {openShowModal && selectedTodo && (
                                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                    <div className="bg-gray-900  rounded shadow-lg w-full max-w-sm  relative">
                                        {/* Botón cerrar del modal */}
                                        <button
                                            onClick={() => setOpenShowModal(false)}
                                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                                        x
                                        </button>
                                        {/* Mostrar contenido de Show que contiene un usuario */}
                                        <Show todo={selectedTodo} />
                                    </div>
                                </div>
                            )}
           </div>


        </AppLayout>
    );
}
