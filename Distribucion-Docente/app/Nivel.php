<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    protected $table = 'niveles';
    protected $primaryKey = 'id';
    protected $fillable = ['id','nombre','descripcion','carreras_id'];
    public $timestamps = false;

    public function carrera()
    {
        return $this->belongsTo(Carrera::class,"carreras_id");
    }

    public function paralelos() { 
        return $this->hasMany(Paralelo::class,"niveles_id"); 
    }

    public function asignaturas() { 
        return $this->hasMany(Asignatura::class,"asignaturas_id"); 
    }
}
