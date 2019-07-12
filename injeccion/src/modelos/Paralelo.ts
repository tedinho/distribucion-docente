import { Nivel } from './Nivel';
import { Asignatura } from './Asignatura';

export class Paralelo{

    id:number;
    nombre:string;
    nivel:Nivel;
    niveles_id:number;
    asignaturaTransient:Asignatura[];
    
}