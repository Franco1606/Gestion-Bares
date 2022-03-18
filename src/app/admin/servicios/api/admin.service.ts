import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';
//Importacion de Modelos
import { modeloRespuesta } from "../../../ModelosApp/modeloRespuesta"
import { modeloCategoria } from '../../ModelosAdmin/modeloCategoria';
import { modeloProducto } from '../../ModelosAdmin/modeloProducto';
import { modeloImagen } from "../../ModelosAdmin/modeloImagen"
import { modeloEstilo } from 'src/app/carta/ModelosCarta/modeloEstilo';
import { modeloHappy } from '../../ModelosAdmin/modeloHappy';
import { modeloMozo } from '../../ModelosAdmin/modeloMozo';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private _http:HttpClient ) { }

  //URL de la API
  url = "https://visita360.hopto.org/Api-Gestion-Bares/"
  //Paso de variables por servicio
  usuarioID!:number
  tokenAdmin!:string
  categoria!:modeloCategoria
  categoriaID!:number
  producto!:modeloProducto
  mozoID!:number

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

  /////////////////////////////////////////////////////////
  /////////////  METODOS PARA ESTILOS  ///////////////////
  ///////////////////////////////////////////////////////

  //Insertar o actualizar estilos
  modificarEstilos(estilos:any[], usuarioID:number, tokenAdmin:string):Observable<modeloRespuesta>{
    let body = {
      estilos: estilos,
      usuarioID: usuarioID,
      tokenAdmin: tokenAdmin
    }
    return this._http.post<modeloRespuesta>(this.url + `estilos.php`, body)
  }

  //Obtener estilo de este usuario por nombre
  obtenerEstiloPorNombre(nombre:string, usuarioID:number):Observable<modeloEstilo>{      
    return this._http.get<modeloEstilo>(this.url + `estilos.php?nombre=${nombre}&usuarioID=${usuarioID}`)
  }

  //Mostrar encabezado
  actualizarMostrar(mostrar:number, nombre:string, usuarioID:number,tokenAdmin:string):Observable<modeloRespuesta>{
    let body = {
      usuarioID: usuarioID,
      mostrar: mostrar,
      nombre: nombre,
      tokenAdmin: tokenAdmin
    }
    return this._http.put<modeloRespuesta>(this.url + `estilos.php`, body)
  }

  //////////////////////////////////////////////////////////
  /////////////  METODOS PARA IMAGENES  ///////////////////
  ////////////////////////////////////////////////////////

    //Insertar o actualizar imagen
    cambiarImagen(nombre:string, nombreArchivo:string, imgData:any, usuarioID:number, tokenAdmin:string):Observable<modeloRespuesta>{
      let body = {
        nombre: nombre,
        nombreArchivo: nombreArchivo,
        imgData: imgData,        
        mostrar: 1,
        usuarioID: usuarioID,
        tokenAdmin: tokenAdmin
      }
      return this._http.post<modeloRespuesta>(this.url + `imagenes.php`, body)
    }

    //Obtener imagen de este usuario por nombre
    obtenerImagenPorNombre(nombre:string, usuarioID:number):Observable<modeloImagen>{      
      return this._http.get<modeloImagen>(this.url + `imagenes.php?nombre=${nombre}&usuarioID=${usuarioID}`)
    }

    //Actualizar Mostrar
    actualizarMostrarImg(mostrar:number, nombre:string, usuarioID:number, tokenAdmin:string) {
      let body = {
        usuarioID: usuarioID,
        mostrar: mostrar,
        nombre: nombre,
        tokenAdmin: tokenAdmin
      }
      return this._http.put<modeloProducto>(this.url + `imagenes.php`, body)
    }

  //////////////////////////////////////////////////////////
  /////////////  METODOS PARA HAPPY HOUR  /////////////////
  ////////////////////////////////////////////////////////

  //Obtener Happy Hour por categoriaID
  obtenerHappy(usuarioID:number, categoriaID:number):Observable<modeloHappy>{      
    return this._http.get<modeloHappy>(this.url + `happy.php?usuarioID=${usuarioID}&categoriaID=${categoriaID}`)
  }

  //Insertar o modificar categoria
  agregarHappy(form:any):Observable<modeloRespuesta> {    
    return this._http.post<modeloRespuesta>(this.url + `happy.php`, form)
  }

  //Eliminar Happy
  eliminarHappy(usuarioID:number, categoriaID:number, tokenAdmin:string):Observable<modeloRespuesta> {
    let options = {
      header: new HttpHeaders({
        "Content-type" : "application/json"
      }),
      body : {
        usuarioID: usuarioID,
        categoriaID: categoriaID,
        tokenAdmin: tokenAdmin        
      }
    }
    return this._http.delete<modeloRespuesta>(this.url + `happy.php`, options)
  }

  //////////////////////////////////////////////////////////
  ////////////////  METODOS PARA MOZOS  ///////////////////
  ////////////////////////////////////////////////////////

  // Obtener Mozos por usuarioID
  obtenerMozos(usuarioID:number):Observable<modeloMozo[]> {
    return this._http.get<modeloMozo[]>(this.url + `mozos.php?usuarioID=${usuarioID}`)
  }

  // Obtener Mozos por usuarioID
  obtenerMozo(mozoID:number):Observable<modeloMozo> {
    return this._http.get<modeloMozo>(this.url + `mozos.php?mozoID=${mozoID}`)
  }

  //Insertar Mozo
  agregarMozo(form:any):Observable<modeloRespuesta> {    
    return this._http.post<modeloRespuesta>(this.url + `mozos.php`, form)
  }

  //Modificar Mozo
  modificarMozo(form:any) {
    return this._http.put<modeloRespuesta>(this.url + `mozos.php`, form)
  }

  //Eliminar Mozo
  eliminarMozo(mozoID:number, tokenAdmin:string):Observable<modeloRespuesta> {
    let options = {
      header: new HttpHeaders({
        "Content-type" : "application/json"
      }),
      body : {
        mozoID: mozoID,
        tokenAdmin: tokenAdmin               
      }
    }
    return this._http.delete<modeloRespuesta>(this.url + `mozos.php`, options)
  }
}
