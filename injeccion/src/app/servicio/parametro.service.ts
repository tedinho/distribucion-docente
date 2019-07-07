import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Parametro } from 'src/modelos/Parametro';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";

const API_URL: string = 'http://localhost:8000/api/';


@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http: Http) { 
    
  }

getParametros():Observable<Parametro[]> {
  return this.http.get(API_URL+'parametros')
  .pipe(map(res => res.json()));
}

buscarParametro(llave:string):Observable<Parametro>{
  return this.http.get(API_URL+'parametros/'+llave+'',llave)
  .pipe(map(res => res.json()));
}

addParametro(player,id){
  return this.http.patch(API_URL + 'parametros/'+id,player
  ).pipe(map(res => res.json().data));
}
 
}
