<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

/**
 * Modelo Todo - Representa una tarea dentro del sistema
 *
 * Permite gestionar tareas asociadas a usuarios, con estados y atributos
 * que facilitan su seguimiento y control.
 *
 * @package App\Models
 * @version 1.0.0
 *
 * @property int $id Identificador único auto-incremental
 * @property string $name Nombre o título de la tarea
 * @property string $status Estado actual de la tarea (creado, en-proceso, finalizado)
 * @property int $user_id Identificador del usuario que creó la tarea
 * @property \Carbon\Carbon $created_at Fecha de creación
 * @property \Carbon\Carbon $updated_at Fecha de última actualización
 *
 * @property-read \App\Models\User $usuarioQueCreoLaTarea Usuario que creó la tarea
 *
 * @method static \Database\Factories\TodoFactory factory($count = null, $state = []) Generador de factories
 * @method static \Illuminate\Database\Eloquent\Builder|Todo newModelQuery() Iniciar nueva query
 * @method static \Illuminate\Database\Eloquent\Builder|Todo newQuery() Crear nuevo query
 * @method static \Illuminate\Database\Eloquent\Builder|Todo query() Iniciar query estándar
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereId($value) Filtrar por ID
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereName($value) Filtrar por nombre
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereStatus($value) Filtrar por estado
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereUserId($value) Filtrar por usuario
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereCreatedAt($value) Filtrar por fecha creación
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereUpdatedAt($value) Filtrar por fecha actualización
 *
 * @author Tu Equipo <equipo@empresa.com>
 * @copyright 2025 Empresa XYZ
 */
class Todo extends Model
{
    use HasFactory;

    /**
     * Constantes de estado
     *
     * @var string
     */
    const STATUS_CREADO = 'creado';
    const STATUS_EN_PROCESO = 'en-proceso';
    const STATUS_FINALIZADO = 'finalizado';

    /**
     * Campos asignables masivamente
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'status', 'user_id'];

    /**
     * Valores por defecto del modelo
     *
     * @var array<string, string>
     */
    protected $attributes = [
        'status' => self::STATUS_CREADO
    ];

    /**
     * Relación inversa: una tarea pertenece a un usuario
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     *
     * @example
     * $todo = Todo::find(1);
     * $user = $todo->usuarioQueCreoLaTarea; // Usuario que creó la tarea
     */
    public function usuarioQueCreoLaTarea()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
