<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('docentes/porNombre/{nombre}', 'DocenteController@buscarPorNombre')->name('docente.buscarPorNombre');
Route::resource('docentes', 'DocenteController');


Route::resource('parametros', 'ParametroController');
Route::get('parametros/porValor/{valor}', 'ParametroController@buscarPorValor')->name('docente.buscarPorValor');

Route::resource('carreras', 'CarreraController');
Route::get('carreras/porNombre/{nombre}', 'CarreraController@buscarPorNombre')->name('carrera.buscarPorNombre');

Route::get('niveles/porCarrera/{id}', 'NivelController@buscarPorIdCarrera')->name('nivel.buscarPorIdCarrera');
Route::resource('niveles', 'NivelController');

Route::get('paralelos/porNivel/{id}', 'ParaleloController@buscarPorIdNivel')->name('paralelo.buscarPorIdNivel');
Route::resource('paralelos', 'ParaleloController');

Route::get('asignaturas/porNivel/{id}', 'AsignaturaController@buscarPorIdNivel')->name('asignatura.buscarPorIdNivel');
Route::resource('asignaturas', 'AsignaturaController');

Route::get('docenteCarrera/buscarPorIdDocente/{id}', 'DocenteCarreraController@buscarPorIdDocente')->name('docentecarrera.buscarPorIdDocente');
Route::post('docenteCarrera/crearPorIdDocente/{id}', 'DocenteCarreraController@crearPorIdDocente')->name('docentecarrera.crearPorIdDocente');
Route::delete('docenteCarrera/eliminarPorIdDocenteCarrera/{idDocente}/{idCarrera}', 'DocenteCarreraController@eliminarPorIdDocenteCarrera')->name('docentecarrera.eliminarPorIdDocenteCarrera');


Route::resource('periodos', 'PeriodoController');
Route::get('periodos/buscarPorPeriodo/{periodo}', 'PeriodoController@buscarPorPeriodo')->name('periodos.buscarPorPeriodo');


Route::resource('distribucion', 'DistribucionDocenteController');
Route::get('distribucion/buscarPorIdDocente/{id}/{idPeriodo}', 'DistribucionDocenteController@buscarPorIdDocente')->name('distribucion.buscarPorIdDocente');
Route::get('distribucion/sumaAsignaturasPorPeriodoYParalelo/{idAsignatura}/{idPeriodo}/{idParalelo}', 'DistribucionDocenteController@traerSumaHorasAsignaturaPeriodoYParalelo')->name('distribucion.traerSumaHorasAsignaturaPeriodoYParalelo');
