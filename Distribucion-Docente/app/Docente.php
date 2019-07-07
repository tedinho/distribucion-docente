<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    protected $table = 'docentes';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre1','nombre2','apellido1','apellido2','correo','cedula','tipoContrato'];
    public $timestamps = false;
}

