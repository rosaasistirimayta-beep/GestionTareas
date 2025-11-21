<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

/**
 * Migración para crear la tabla `todos`
 *
 * Tabla que almacena las tareas (todos) asignadas a los usuarios.
 * Cada tarea pertenece a un usuario y tiene un estado para su seguimiento.
 *
 * @version 1.0.0
 */
return new class extends Migration
{
    private const TABLE_NAME = 'todos';
    private const INDEX_PREFIX = 'idx_todos_';
    private const FOREIGN_KEY_PREFIX = 'fk_todos_';

    /**
     * Ejecutar la migración
     */
    public function up(): void
    {
        Schema::create(self::TABLE_NAME, function (Blueprint $table) {
            // ==================== CLAVE PRIMARIA ====================

            $table->id()->comment('ID único de la tarea');

            // ==================== RELACIÓN CON USUARIOS ====================

            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade')
                  ->onUpdate('cascade')
                  ->comment('Usuario que creó la tarea');

            // ==================== INFORMACIÓN DE LA TAREA ====================

            $table->string('name', 255)
                  ->comment('Nombre o título de la tarea');

            $table->string('status', 20)
                  ->default('creado')
                  ->comment('Estado actual de la tarea: creado, en-proceso, finalizado');

            // ==================== METADATOS ====================

            $table->timestamps();

            // ==================== ÍNDICES ====================

            $table->index(['user_id', 'status'], self::INDEX_PREFIX . 'user_status');
        });

        // Comentario de tabla
        DB::statement("
            ALTER TABLE " . self::TABLE_NAME . "
            COMMENT = 'Tabla de tareas (todos) asignadas a usuarios. Permite seguimiento y control de estado de cada tarea.'
        ");
    }

    /**
     * Revertir la migración
     */
    public function down(): void
    {
        Schema::dropIfExists(self::TABLE_NAME);
    }
};
