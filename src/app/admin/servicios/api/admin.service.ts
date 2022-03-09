import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';
//Importacion de Modelos
import { modeloCategoria } from '../../ModelosAdmin/modeloCategoria';
import { modeloRespuesta } from "../../../ModelosApp/modeloRespuesta"
import { modeloProducto } from '../../ModelosAdmin/modeloProducto';

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
  producto!:modeloProducto
  productoID!:number
  nombre!:string
  mostrar!:number
  tokenAdmin!:string

  //////////////////////////////////////////////////////////
  /////////////  METODOS PARA CATEGORIAS  /////////////////
  ////////////////////////////////////////////////////////

  //Obtener categorias por usuarioID
  obtenerCategorias(usuarioID:number):Observable<modeloCategoria[]> {
    return this._http.get<modeloCategoria[]>(this.url + `categorias.php?usuarioID=${usuarioID}`)
  }

  //Insertar categoria
  agregarCategoria(form:any):Observable<modeloCategoria> {    
    return this._http.post<modeloCategoria>(this.url + `categorias.php`, form)
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
  modificarCategoria(form:any) {    
    return this._http.put<modeloCategoria>(this.url + `categorias.php`, form)
  }

  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA PRODUCTOS  /////////////////
  ///////////////////////////////////////////////////////

  //Obtener productos por usuarioID y categoriaID
  obtenerProductos(usuarioID:number, categoriaID:number):Observable<modeloProducto[]> {
    return this._http.get<modeloProducto[]>(this.url + `productos.php?usuarioID=${usuarioID}&categoriaID=${categoriaID}`)
  }

  //Obtener producto por usuarioID y categoriaID
  obtenerProducto(productoID:number):Observable<modeloProducto> {
    return this._http.get<modeloProducto>(this.url + `productos.php?productoID=${productoID}`)
  }

   //Insertar Producto
   agregarProducto(form:any):Observable<modeloProducto> {    
    return this._http.post<modeloProducto>(this.url + `productos.php`, form)
  }

  //Eliminar producto
  eliminarProducto(productoID:number, tokenAdmin:string):Observable<modeloRespuesta> {
    let options = {
      header: new HttpHeaders({
        "Content-type" : "application/json"
      }),
      body : {
        productoID: productoID,
        tokenAdmin: tokenAdmin        
      }
    }
    return this._http.delete<modeloRespuesta>(this.url + `productos.php`, options)
  }

    //Modificar producto
    modificarProducto(form:any) {
      return this._http.put<modeloProducto>(this.url + `productos.php`, form)
    }
}
