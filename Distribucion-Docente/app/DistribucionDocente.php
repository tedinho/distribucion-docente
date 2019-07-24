<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DistribucionDocente extends Model
{
    protected $table = 'distribucion_docentes';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'horas_clase', 'asignaturas_id', 'docentes_id', 'periodos_academicos_id', 'paralelos_id'];
    public $timestamps = false;

    public function asignatura()
    {
        return $this->belongsTo(Asignatura::class, "asignaturas_id");
    }

    public function docente()
    {
        return $this->belongsTo(Docente::class, "docentes_id");
    }

    public function periodo()
    {
        return $this->belongsTo(Periodo::class, "periodos_academicos_id");
    }

    public function paralelo()
    {
        return $this->belongsTo(Paralelo::class, "paralelos_id");
    }
}
