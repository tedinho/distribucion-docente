<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDistribucionDocentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('distribucion_docentes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('horas_clase');

            //CLAVE FORANEA
            $table->integer('asignaturas_id')->unsigned();
            $table->foreign('asignaturas_id')->references('id')->on('asignaturas');

            $table->integer('docentes_id')->unsigned();
            $table->foreign('docentes_id')->references('id')->on('docentes');

            $table->integer('periodos_academicos_id')->unsigned();
            $table->foreign('periodos_academicos_id')->references('id')->on('periodos_academicos');
   
            $table->integer('paralelos_id')->unsigned();
            $table->foreign('paralelos_id')->references('id')->on('paralelos');
   
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('distribucion_docentes');
    }
}
