<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('docentes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre1');
            $table->string('nombre2')->nullable($value = true);
            $table->string('apellido1');
            $table->string('apellido2')->nullable($value = true);
            $table->string('correo')->nullable($value = true);
            $table->string('cedula');
            $table->string('tipo_contrato')->nullable($value = true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('docentes');
    }
}
