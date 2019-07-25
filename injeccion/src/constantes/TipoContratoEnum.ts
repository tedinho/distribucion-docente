export class ConstanteContratos {
    public static TIPOSCONTRATO = ['Medio Tiempo', 'Tiempo Completo'];

    static isMedioTiempo(tipo: string): boolean {
        return tipo == 'Medio Tiempo';
    }

    static isTiempoCompleto(tipo: string): boolean {
        return tipo == 'Tiempo Completo';
    }

}


