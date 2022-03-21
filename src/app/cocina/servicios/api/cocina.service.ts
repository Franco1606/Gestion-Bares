import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
//Modelos
import { modeloPedido } from '../../../mozo/ModelosMozo/modeloPedido';
import { modeloOrden } from '../../../mozo/ModelosMozo/modeloOrden';
import { modeloRespuesta } from 'src/app/ModelosApp/modeloRespuesta';

@Injectable({
  providedIn: 'root'
})
export class CocinaService {

  constructor( private _http:HttpClient ) { }

  //URL de la API
  url = "https://visita360.hopto.org/Api-Gestion-Bares/"
  //Paso de variables por servicio
  productoID!:number
  orden!:modeloOrden
  comentario!:string
  tokenCocina!:string

  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA PEDIDOS  ///////////////////
  ///////////////////////////////////////////////////////

  //Obtener Pedidos de cocina
  obtenerPedidosDeCocina(usuarioID:number, cocina:number):Observable<modeloPedido[]> {
    return this._http.get<modeloPedido[]>(this.url + `pedidos.php?usuarioID=${usuarioID}&cocina=${cocina}`)
  }

  //Obtener Pedidos
  obtenerPedidosPorProductoId(productoID:number, cocina:number):Observable<modeloPedido[]> {
    return this._http.get<modeloPedido[]>(this.url + `pedidos.php?productoID=${productoID}&cocina=${cocina}`)
  }

  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA ORDENES  ///////////////////
  ///////////////////////////////////////////////////////

  //Obtener Ordenes de cocina
  obtenerOrdenesDeCocina(usuarioID:number, cocina:number):Observable<modeloOrden[]> {
    return this._http.get<modeloOrden[]>(this.url + `ordenes.php?usuarioID=${usuarioID}&cocina=${cocina}`)
  }

  //Modificar Orden
  cambiarEstadoOrden(estado:string, ordenID:number, sesionID:number, tokenCocina:string) {
    let body = {
      estado: estado,
      ordenID: ordenID,
      sesionID:sesionID,
      tokenCocina: tokenCocina
    }
    return this._http.put<modeloRespuesta>(this.url + `ordenes.php`, body)
  }
}
