import { Paralelo } from './Paralelo';

export interface Asignatura{
    id:number;
    nombre:string;
    descripcion:string;
    horas_clase:number;
    paralelos_id:number;
    paralelo:Paralelo;
}