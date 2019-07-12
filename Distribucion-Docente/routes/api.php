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

Route::resource('carreras', 'CarreraController');
Route::get('niveles/porCarrera/{id}', 'NivelController@buscarPorIdCarrera')->name('nivel.buscarPorIdCarrera');
Route::resource('niveles', 'NivelController');

Route::get('paralelos/porNivel/{id}', 'ParaleloController@buscarPorIdNivel')->name('paralelo.buscarPorIdNivel');
Route::resource('paralelos', 'ParaleloController');

