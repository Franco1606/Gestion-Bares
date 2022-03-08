import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';
//Importacion de Modelos
import { modeloCategoria } from '../../ModelosAdmin/modeloCategoria';
import { modeloRespuesta } from "../../../ModelosApp/modeloRespuesta"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private _http:HttpClient ) { }

  //URL de la API
  url = "https://visita360.hopto.org/Api-Gestion-Bares/"
  //Paso de variables por servicio
  usuarioID!:number
  categoriaID!:number
  productoID!:number
  nombre!:string
  tokenAdmin!:string

  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA CATEGORIAS  /////////////////
  /////////////////////////////////////////////////////////

  //Obtener categorias por usuarioID
  obtenerCategorias(usuarioID:Number):Observable<modeloCategoria[]> {
    return this._http.get<modeloCategoria[]>(this.url + `categorias.php?usuarioID=${usuarioID}`)
  }

  //Insertar categoria
  agregarCategoria(usuarioID:number, tokenAdmin:string, nombre:string):Observable<modeloCategoria> {
    let body = {
      usuarioID: usuarioID,
      tokenAdmin: tokenAdmin,
      nombre: nombre
    }
    return this._http.post<modeloCategoria>(this.url + `categorias.php`, body)
  }

//Eliminar categoria
  eliminarCategoria(categoriaID:number, tokenAdmin:string):Observable<modeloRespuesta> {
    let options = {
      header: new HttpHeaders({
        "Content-type" : "application/json"
      }),
      body : {
        categoriaID: categoriaID,
        tokenAdmin: tokenAdmin        
      }
    }
    return this._http.delete<modeloRespuesta>(this.url + `categorias.php`, options)
  }

  //Modificar categoria
  modificarCategoria(categoriaID:number, tokenAdmin:string, nombre:string) {
    let body = {
      categoriaID: categoriaID,
      tokenAdmin: tokenAdmin,
      nombre: nombre
    }
    return this._http.put<modeloCategoria>(this.url + `categorias.php`, body)
  }
}
