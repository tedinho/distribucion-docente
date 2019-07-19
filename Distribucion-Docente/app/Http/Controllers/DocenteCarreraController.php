<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DocenteCarrera;
use App\Docente;
use App\Carrera;

class DocenteCarreraController extends Controller
{

    public function __construct(\App\DocenteCarrera $post)
    {
        $this->post = $post;
    }

    public function buscarPorIdDocente($id)
    {
        $docente = Docente::find($id);

        return $docente->carreras;
    }

    public function buscarPorIdCarrera($id)
    {
        $carrera = Carrera::find($id);
        return ($carrera->docentes);
    }

    public function crearPorIdDocente(Request $request, $id)
    {
        $docente = Docente::find($id);
        $carrerasIds = $request->all();
        $docente->carreras()->attach($carrerasIds);
        return ['message' => 'creado correctamente'];
    }

    public function eliminarPorIdDocenteCarrera($idDocente, $idCarrera)
    {
        $dc = $this->post->where('docentes_id', '=', $idDocente)->where('carreras_id', '=', $idCarrera)->get();

        if (isset($dc[0])) {
            $id = $dc[0]->{'id'};
            $post = $this->post->destroy($id);
            return ['message' => 'deleted successfully', 'post_id' => $post];
        } else {
            return ['message' => 'not fund'];
        }
    }
}
