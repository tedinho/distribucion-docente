export class Docente{

    id:number;
    nombre1:string;
    nombre2:string;
    apellido1:string;
    apellido2:string;
    correo:string;
    cedula:string;
    tipo_contrato:string="";
    
    getNombreApellido():string{
        return this.nombre1+" "+this.apellido1;        
    }
}