<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Periodo extends Model
{
    protected $table = 'periodos_academicos';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'periodo'];
    public $timestamps = false;
}
