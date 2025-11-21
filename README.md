Se agregó la descripción completa del proyecto con migraciones, modelos, controladores y frontend. Estructura del Proyecto
Migraciones
create_todos_table.php

Crea la tabla todos con:

Título

Descripción

Estado (creado, en-proceso, finalizado)

Foreign key a users

Timestamps

Comentarios incluidos para documentar cada columna.

add_two_factor_columns_to_users_table.php

Agrega columnas necesarias para 2FA.

Incluye explicación del propósito de cada campo.

Modelos
Todo.php

Modelo Eloquent documentado con:

$fillable para asignación masiva segura.

Relaciones:

belongsTo(User::class)

Scopes comunes, por ejemplo:

scopeEstado($query, $estado) para filtros por estado.

Atributos personalizados donde corresponde.

User.php

Incluye:

Relaciones con tareas.

Configuración para Fortify y autenticación moderna.

Controladores
TodoController.php

CRUD completo y documentado:

index() → Lista de tareas, incluye filtros.

store() → Crea una nueva tarea, validación con Form Request.

update() → Edita título, descripción o estado.

destroy() → Elimina tareas.

Usa Inertia para renderizar componentes React.

Incluye politicas (TodoPolicy) para garantizar seguridad por usuario.

Middlewares

HandleInertiaRequests → Manejo de datos compartidos en todas las vistas.

HandleAppearance → Manejo de tema claro/oscuro.

Vistas y Frontend (Inertia + React + TypeScript)

Dentro de resources/js/pages/Todos:

index.tsx → Tabla con filtrado por estado.

create.tsx → Formulario para crear tareas.

edit.tsx → Formulario para editar.

show.tsx → Vista de detalles.

Componentes UI reutilizables (botones, inputs, tablas, modales, alerts, etc.) basados en shadcn/ui.

Propósito

Este proyecto está diseñado para:

Ser una plantilla base para aplicaciones Laravel + Inertia + React.

Enseñar buenas prácticas con Laravel 10+.

Mostrar cómo estructurar controladores, modelos, políticas y migraciones.

Servir como referencia para UI moderna con React + TypeScript.

Implementar un flujo de estados realista para tareas.

Requisitos

PHP ≥ 8.3

Composer

Laravel ≥ 10.x

Node.js ≥ 18

Base de datos MySQL o PostgreSQL

NPM ≥ 9

Instalación
git clone https://github.com/rosaasistirimayta-beep/GestionTareas.git
cd GestionTareas
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
npm run dev

Contribuir

¡Contribuciones y mejoras son bienvenidas!

Puedes:

Hacer un fork del repositorio.

Crear un issue.

Enviar un pull request con tus mejoras.

Licencia

Este proyecto está disponible bajo la MIT License.
