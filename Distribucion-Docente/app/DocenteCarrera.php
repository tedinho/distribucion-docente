<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DocenteCarrera extends Model
{
    protected $table = 'docentes_carreras';
    protected $primaryKey = 'id';
    protected $fillable = ['docentes_id', 'carreras_id', 'id'];
    public $timestamps = false;
}
