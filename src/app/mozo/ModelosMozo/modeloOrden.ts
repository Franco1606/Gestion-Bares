export interface modeloOrden {
    ordenID:number,
    sesionID:number,
    finalizoMozoID:number,
    usuarioID:number,
    mesaID:number,
    domicilio:string,
    numOrden:string,
    nuevaFecha:Date,
    activaFecha:Date,
    listaFecha:Date,
    finalizadaFecha:Date,
    estado:string,
    solicitante:string,
    total:number,
    cocina:number
}