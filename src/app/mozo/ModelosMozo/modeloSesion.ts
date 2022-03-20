export interface modeloSesion {
    sesionID: number,
    usuarioID:number,
    mozoID:number,
    solicitadaFecha:Date,
    abiertaFecha:Date,
    cerradaFecha:Date,
    estado:string,
    ordenNueva:number,
    ordenLista:number,
    mesaID:number,
    llamarMozo:number
}