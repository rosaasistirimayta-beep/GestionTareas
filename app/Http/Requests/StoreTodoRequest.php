<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
         return [
        'name' => 'required|string',
        'status' => 'required|in:creado,en-proceso,finalizado',
        'user_id' => 'required|exists:users,id', // <--- El valor debe existir en la tabla users, en la columna id.
    ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la tarea es obligatorio',
            'status.required' => 'El estado de la tarea es obligatorio',
            'user_id.required' => 'Debes seleccionar un usuario',
            'user_id.exists' => 'El usuario seleccionado no es válido',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'nombre de la tarea',
            'status' => 'estado de la tarea',
        ];
    }
}



