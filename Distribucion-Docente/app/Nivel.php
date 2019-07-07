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
}
