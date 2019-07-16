import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { Paralelo } from 'src/modelos/Paralelo';

const API_URL: string = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class ParaleloServicioService {

  constructor(private http: Http) { }

  getParalelosPorNivel(id:number): Observable<Paralelo[]> {
    return this.http.get(API_URL + 'paralelos/porNivel/'+id)
      .pipe(map(res => res.json()));
  }

  guardarLote(paralelos:Paralelo[],id:number){
    console.log("service");
    paralelos.forEach(paralelo => {
      paralelo.niveles_id=id;
      if(paralelo.id==null){
        this.guardarParalelo(paralelo).subscribe(paralelo=>{console.log(paralelo)});
      }else{
        this.actualizarParalelo(paralelo,paralelo.id).subscribe(paralelo=>{console.log(paralelo)});
      }
    });
  }

  borrarLote(paralelos:Paralelo[]){
    paralelos.forEach(paralelo => {
      this.borrarParalelo(paralelo).subscribe(paralelo=>{console.log(paralelo)});
    });
  }

  borrarParalelo(paralelo){
    return this.http.delete(API_URL + 'paralelos/'+paralelo.id, paralelo
    ).pipe(map(res => res.json().data));
  }

  guardarParalelo(paralelo){
    return this.http.post(API_URL + 'paralelos/', paralelo
    ).pipe(map(res => {res.json(); 
      console.log(res.json())
    }));
  }

  actualizarParalelo(paralelo,id){
    return this.http.patch(API_URL + 'paralelos/' + id, paralelo
    ).pipe(map(res => res.json()));
  }
}
