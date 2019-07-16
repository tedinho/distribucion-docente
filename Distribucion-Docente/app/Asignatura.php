<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asignatura extends Model
{
    protected $table = 'asignaturas';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'nombre', 'descripcion', 'horas_clase', 'niveles_id'];
    public $timestamps = false;

    public function nivel()
    {
        return $this->belongsTo(Nivel::class,"niveles_id");
    }
}
