<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asignatura extends Model
{
    protected $table = 'asignaturas';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'nombre', 'descripcion', 'horas_clase', 'paralelos_id'];

    public function paralelo()
    {
        return $this->belongsTo(Paralelo::class,"paralelos_id");
    }
}
