<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carrera extends Model
{
    protected $table = 'carreras';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'nombre', 'descripcion'];
    public $timestamps = false;

    public function niveles()
    {
        return $this->hasMany(Nivel::class, "carreras_id");
    }

    public function docentes()
    {
        return $this->belongsToMany(Docente::class, 'docentes_carreras');
    }
}
