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

  buscarPorIdDocente(id: number, idPerido: number): Observable<DistribucionDocente[]> {
    return this.http.get(API_URL + 'distribucion/buscarPorIdDocente/' + id + "/" + idPerido)
      .pipe(map(res => res.json()));
  }

  getSumaHorasAsignaturaPorPeriodoYParalelo(idAsignatura: number, idPerido: number, idParalelo: number): Observable<number> {
    return this.http.get(API_URL + 'distribucion/sumaAsignaturasPorPeriodoYParalelo/' + idAsignatura + "/" + idPerido + "/" + idParalelo)
      .pipe(map(res => res.json()));
  }

  guardarCompleto(distri: DistribucionDocente[], idPeriodo: number) {
    distri.forEach(d => {
      d.periodos_academicos_id = idPeriodo;
      if (d.id == null) {
        this.guardarDistribucion(d).subscribe(dis => { console.log(dis) });
      } else {
        delete d["docente"];
        delete d["asignatura"];
        delete d["periodo"];
        delete d["paralelo"];
        this.actualizarDistribucion(d, d.id).subscribe(dis => { console.log(dis) });
      }
    });
  }

  guardarDistribucion(distri) {
    return this.http.post(API_URL + 'distribucion/', distri
    ).pipe(map(res => res.json()));
  }

  actualizarDistribucion(distri, id) {
    return this.http.patch(API_URL + 'distribucion/' + id, distri
    ).pipe(map(res => res.json()));
  }


}
