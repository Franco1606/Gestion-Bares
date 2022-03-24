import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
//Modelos
import { modeloSesion } from '../../ModelosMozo/modeloSesion';
import { modeloOrden } from '../../ModelosMozo/modeloOrden';
import { modeloPedido } from '../../ModelosMozo/modeloPedido';
import { modeloRespuesta } from 'src/app/ModelosApp/modeloRespuesta';
import { modeloCategoria } from 'src/app/admin/ModelosAdmin/modeloCategoria';
import { modeloProductoPedido } from 'src/app/carta/ModelosCarta/modeloProductoPedido';
//Clases
import { claseProductoPedido } from 'src/app/carta/Clases/claseProductoPedido';

@Injectable({
  providedIn: 'root'
})
export class MoozoService {

  constructor( private _http:HttpClient ) { }

  //URL de la API
  url = "https://visita360.hopto.org/Api-Gestion-Bares/"
  //Paso de variables por servicio
  mesaID!:number
  sesion!:modeloSesion
  categoria!:modeloCategoria
  producto!:modeloProductoPedido
  pedido:claseProductoPedido[] = []
  orden!:modeloOrden
  ordenID!:number
  usuarioID!:number
  mozoID!:number
  tokenMozo!:string
  pedidoFinal!:any[]
  IDinterno = 0
  
  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA SESIONES  //////////////////
  ///////////////////////////////////////////////////////

  //Obtener sesiones por usuarioID
  obtenerSesiones(usuarioID:number):Observable<modeloSesion[]> {
    return this._http.get<modeloSesion[]>(this.url + `sesiones.php?usuarioID=${usuarioID}`)
  }

  //Modificar sesion
  cambiarEstadoSesion(estado:string, sesionID:number, tokenMozo:string) {
    let body = {
      estado: estado,
      sesionID: sesionID,
      tokenMozo: tokenMozo
    }
    return this._http.put<modeloRespuesta>(this.url + `sesiones.php`, body)
  }

  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA ORDENES  ///////////////////
  ///////////////////////////////////////////////////////

  //Obtener Ordenes
  obtenerOrdenes(usuarioID:number, sesionID:number):Observable<modeloOrden[]> {
    return this._http.get<modeloOrden[]>(this.url + `ordenes.php?usuarioID=${usuarioID}&sesionID=${sesionID}`)
  }

  //Obtener Orden
  obtenerOrden(ordenID:number):Observable<modeloOrden> {
    return this._http.get<modeloOrden>(this.url + `ordenes.php?ordenID=${ordenID}`)
  }

  //Modificar Orden
  cambiarEstado(estado:string, ordenID:number, sesionID:number, mozoID:number,tokenMozo:string) {
    let body = {
      estado: estado,
      ordenID: ordenID,
      sesionID: sesionID,
      mozoID: mozoID,
      tokenMozo: tokenMozo
    }
    return this._http.put<modeloRespuesta>(this.url + `ordenes.php`, body)
  }

  generarOrdenMozo(usuarioID:number, mesaID:number, pedido:claseProductoPedido[], total:number, mozoID:number, tokenMozo:string):Observable<modeloRespuesta> {
    let body = {
      usuarioID : usuarioID,
      mesaID : mesaID,
      mozoID: mozoID,
      pedidos: pedido,
      estado: "activa",
      tokenMozo: tokenMozo,
      total: total
    }
    return this._http.post<modeloRespuesta>(this.url + "ordenes.php", body)
  }

  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA PEDIDOS  ///////////////////
  ///////////////////////////////////////////////////////

  //Obtener Pedidos
  obtenerPedidos(ordenID:number):Observable<modeloPedido[]> {
    return this._http.get<modeloPedido[]>(this.url + `pedidos.php?ordenID=${ordenID}`)
  }

  obtenerPedidosPorSesion(sesionID:number):Observable<modeloPedido[]> {
    return this._http.get<modeloPedido[]>(this.url + `pedidos.php?sesionID=${sesionID}`)
  }

  //Modificar Pedido
  enviarComanda(pedido:modeloPedido[], ordenID:number ,tokenMozo:string) {
    let body = {
      pedido: pedido,
      ordenID: ordenID,
      tokenMozo: tokenMozo
    }    
    return this._http.put<modeloRespuesta>(this.url + `pedidos.php`, body)
  }
}
