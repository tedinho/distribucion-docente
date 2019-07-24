import { Asignatura } from './Asignatura';
import { Docente } from './Docente';
import { PeriodoAcademico } from './PeriodoAcademico';
import { Paralelo } from './Paralelo';

export class DistribucionDocente {
    id: number;
    horas_clase: number;
    asignaturas_id: number;
    docentes_id: number;
    periodos_academicos_id: number;
    asignatura: Asignatura;
    docente: Docente;
    periodo: PeriodoAcademico;
    paralelo: Paralelo;
}