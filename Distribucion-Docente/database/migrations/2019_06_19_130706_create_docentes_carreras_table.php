<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocentesCarrerasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('docentes_carreras', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('docentes_id')->unsigned();
            $table->foreign('docentes_id')->references('id')->on('docentes');
            
            $table->integer('carreras_id')->unsigned();
            $table->foreign('carreras_id')->references('id')->on('carreras');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('docentes_carreras');
    }
}
