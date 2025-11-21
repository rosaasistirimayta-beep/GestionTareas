# ESTRUCTURA DEL PROYECTO

## MIGRACIONES
### create_todos_table.php
Crea la tabla `todos` con:  
- **TÍTULO**  
- **DESCRIPCIÓN**  
- **ESTADO** (creado, en-proceso, finalizado)  
- **FOREIGN KEY A USERS**  
- **TIMESTAMPS**  

Comentarios incluidos para documentar cada columna.

### add_two_factor_columns_to_users_table.php
Agrega columnas necesarias para 2FA.  
Incluye explicación del propósito de cada campo.

## MODELOS
### Todo.php
Modelo Eloquent documentado con:  
- **$FILLABLE** para asignación masiva segura.  
- **RELACIONES**: belongsTo(User::class)  
- **SCOPES COMUNES**, por ejemplo: scopeEstado($query, $estado) para filtros por estado.  
- **ATRIBUTOS PERSONALIZADOS** donde corresponde.

### User.php
Incluye:  
- **RELACIONES CON TAREAS**  
- **CONFIGURACIÓN PARA FORTIFY Y AUTENTICACIÓN MODERNA**

## CONTROLADORES
### TodoController.php
CRUD completo y documentado:  
- **INDEX()** → Lista de tareas, incluye filtros.  
- **STORE()** → Crea una nueva tarea, validación con Form Request.  
- **UPDATE()** → Edita título, descripción o estado.  
- **DESTROY()** → Elimina tareas.  

Usa Inertia para renderizar componentes React.  
Incluye políticas (**TodoPolicy**) para garantizar seguridad por usuario.

## MIDDLEWARES
- **HandleInertiaRequests** → Manejo de datos compartidos en todas las vistas.  
- **HandleAppearance** → Manejo de tema claro/oscuro.

## VISTAS Y FRONTEND (INERTIA + REACT + TYPESCRIPT)
Dentro de `resources/js/pages/Todos`:  
- **INDEX.TSX** → Tabla con filtrado por estado.  
- **CREATE.TSX** → Formulario para crear tareas.  
- **EDIT.TSX** → Formulario para editar.  
- **SHOW.TSX** → Vista de detalles.  

Componentes UI reutilizables (botones, inputs, tablas, modales, alerts, etc.) basados en **shadcn/ui**.

## PROPÓSITO
Este proyecto está diseñado para:  
- Ser una plantilla base para aplicaciones **Laravel + Inertia + React**.  
- Enseñar buenas prácticas con **Laravel 10+**.  
- Mostrar cómo estructurar controladores, modelos, políticas y migraciones.  
- Servir como referencia para **UI moderna con React + TypeScript**.  
- Implementar un flujo de estados realista para tareas.

## REQUISITOS
- **PHP ≥ 8.3**  
- **COMPOSER**  
- **LARAVEL ≥ 10.X**  
- **NODE.JS ≥ 18**  
- **BASE DE DATOS MYSQL O POSTGRESQL**  
- **NPM ≥ 9**

## INSTALACIÓN
```bash
git clone https://github.com/rosaasistirimayta-beep/GestionTareas.git
cd GestionTareas
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
npm run dev
