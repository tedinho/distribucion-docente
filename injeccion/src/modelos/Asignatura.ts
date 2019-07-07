import { Paralelo } from './Paralelo';

export interface Asignatura{
    id:number;
    nombre:string;
    descripcion:string;
    horasClases:number;
    paralelo:Paralelo;
}