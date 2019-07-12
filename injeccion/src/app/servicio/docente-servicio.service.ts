import { Docente } from 'src/modelos/Docente';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";
const API_URL: string = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class DocenteServicioService {


  constructor(private http: Http) { }

  getDocentes(nombre:string):Observable<Docente[]> {

    if(nombre!=''){
      return this.http.get(API_URL+'docentes/porNombre/'+nombre)
    .pipe(map(res => res.json()));
    }
    return this.http.get(API_URL+'docentes')
    .pipe(map(res => res.json()));
  }

  buscarDocente(llave:number):Observable<Docente>{
    return this.http.get(API_URL+'docentes/'+llave+'')
    .pipe(map(res => res.json()));
  }

  actualizarDocente(docente,id){
    return this.http.patch(API_URL + 'docentes/'+id,docente
    ).pipe(map(res => res.json().data));
  }

  guardarDocente(docente){
    return this.http.post(API_URL + 'docentes/',docente
    ).pipe(map(res => res.json().data));
  }
}
