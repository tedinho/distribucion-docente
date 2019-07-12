<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paralelo extends Model
{
    protected $table = 'paralelos';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'nombre', 'niveles_id'];
    public $timestamps = false;

    public function niveles()
    {
        return $this->belongsTo(Nivel::class, "niveles_id");
    }

    public function asignaturas() { 
        return $this->hasMany(Asignatura::class,"asignaturas_id"); 
    }
}
