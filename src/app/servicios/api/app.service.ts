import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

//Modelos
import { modeloRespuesta } from "../../ModelosApp/modeloRespuesta"
import { modeloUsuario } from "../../ModelosApp/modeloUsuario"

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor( private _http:HttpClient ) { }

  url = "https://visita360.hopto.org/Api-Gestion-Bares/"

  //Metodo para autenticar
  auth(loginData:any):Observable<modeloRespuesta> {
    return this._http.post<modeloRespuesta>(this.url + "login.php", loginData)
  }

  //Metodos para buscar usuario
  //Buscar usuario por token
  obtenerUsuarioPorToken(tokenUsuario:string, token:string):Observable<modeloUsuario> {
    return this._http.get<modeloUsuario>(this.url + `usuarios.php?${tokenUsuario}=${token}`)
  }
}
