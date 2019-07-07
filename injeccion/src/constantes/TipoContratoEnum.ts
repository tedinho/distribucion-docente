export class ConstanteContratos{
    public static TIPOSCONTRATO=['Medio Tiempo','Tiempo Completo'];

    isMedioTiempo(tipo:string):boolean{
        return tipo=='Medio Tiempo';
    }

    isTiempoCompleto(tipo:string):boolean{
        return tipo=='Tiempo Completo';
    }
    
}


