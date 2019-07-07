<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parametro extends Model
{
    protected $table = 'parametros';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['id','valor','descripcion'];
    public $timestamps = false;
}
