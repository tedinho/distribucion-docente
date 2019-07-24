import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";
import { DistribucionDocente } from 'src/modelos/DistribucionDocente';

const API_URL: string = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class DistribucionDocenteServicioService {

  constructor(private http: Http) { }

  buscarPorIdDocente(id: number): Observable<DistribucionDocente[]> {
    return this.http.get(API_URL + 'distribucion/buscarPorIdDocente/' + id)
      .pipe(map(res => res.json()));
  }
}
