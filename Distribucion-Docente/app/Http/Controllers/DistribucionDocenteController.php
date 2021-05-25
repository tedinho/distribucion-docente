<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\DistribucionDocente;

class DistribucionDocenteController extends Controller
{

    public function __construct(\App\DistribucionDocente $post)
    {
        $this->post = $post;
    }

    public function traerSumaHorasAsignaturaPeriodoYParalelo($idAsignatura, $idPeriodo, $idParalelo)
    {
        $distribucione =
            $this->post->where('asignaturas_id', '=', $idAsignatura)->where('periodos_academicos_id', '=', $idPeriodo)->where('paralelos_id', '=', $idParalelo)->sum('horas_clase');
        return $distribucione;
    }

    public function buscarPorIdDocente($id, $idPeriodo)
    {
        $distribucione =
            $this->post->where('docentes_id', $id)->where('periodos_academicos_id', '=', $idPeriodo)->get();

        for ($i = 0; $i < count($distribucione); $i++) {
            $distribucione[$i]->docente;
            $asi = $distribucione[$i]->asignatura;
            $nivel = $asi->nivel;
            $nivel->carrera;
            $distribucione[$i]->periodo;
            $distribucione[$i]->paralelo;
        }

        return $distribucione;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        return $this->post->create($input);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $this->post->where('id', $id)->update($input);
        return $this->post->find($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = $this->post->destroy($id);
        return ['message' => 'deleted successfully', 'post_id' => $post];
    }
}