import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
//Importacion de Modelos
import { modeloProductoPedido } from "../../ModelosCarta/modeloProductoPedido"
//Importacion de clases
import { claseProductoPedido } from '../../Clases/claseProductoPedido';
import { modeloRespuesta } from 'src/app/ModelosApp/modeloRespuesta';
import { modeloEstilo } from '../../ModelosCarta/modeloEstilo';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  constructor( private _http:HttpClient ) { }

  //URL de la API
  url = "https://visita360.hopto.org/Api-Gestion-Bares/"
  //Paso de variables por servicio
  usuarioID!:number
  mesaID!:number
  comentario!:string
  producto!:modeloProductoPedido
  productoID!:number
  IDinterno!:number
  nombre!:string
  pedidos!:claseProductoPedido[]

  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA PRODUCTOS  /////////////////
  ///////////////////////////////////////////////////////

  //Obtener productos por usuarioID y categoriaID
  obtenerProductos(usuarioID:number, categoriaID:number):Observable<modeloProductoPedido[]> {
    return this._http.get<modeloProductoPedido[]>(this.url + `productos.php?usuarioID=${usuarioID}&categoriaID=${categoriaID}`)
  }

  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA ORDENES  ///////////////////
  ///////////////////////////////////////////////////////
  
  generarOrden(usuarioID:number, mesaID:number, domicilio:string, pedidos:claseProductoPedido[], total:number):Observable<modeloRespuesta> {
    let body = {
      usuarioID : usuarioID,
      mesaID : mesaID,
      domicilio: domicilio,
      pedidos: pedidos,
      estado: "nueva",
      solicitante: "cliente",
      total: total
    }
    return this._http.post<modeloRespuesta>(this.url + "ordenes.php", body)
  }

  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA ESTILOS  ///////////////////
  ///////////////////////////////////////////////////////

  //Obtener estilos
  obtenerEstilos(usuarioID:number):Observable<modeloEstilo[]> {
    return this._http.get<modeloEstilo[]>(this.url + `estilos.php?usuarioID=${usuarioID}`)
  }
}

  