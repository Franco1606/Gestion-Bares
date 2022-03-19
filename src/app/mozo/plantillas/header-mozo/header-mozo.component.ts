import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// Inyecciones de dependencia
import { AppService } from "../../../servicios/api/app.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-header-mozo',
  templateUrl: './header-mozo.component.html',
  styleUrls: ['./header-mozo.component.css']
})
export class HeaderMozoComponent implements OnInit {

  constructor( private _router:Router, private _appServiceApi:AppService ) { }

  //////////   Atributos de la clase   /////////////  
  tokenMozo!:string
  usuario!:string

  @Output() datosUsuario = new EventEmitter<any>();  

  ngOnInit(): void {
    if(localStorage.getItem("tokenMozo")){
      this.tokenMozo = localStorage.getItem("tokenMozo") || ""
      this.obtenerUsuario()      
    } else {
      alert("Sesion expirada")
      this._router.navigateByUrl("mozo/login")
    }
  }

  obtenerUsuario(){    
    this._appServiceApi.obtenerUsuarioPorToken("tokenMozo", this.tokenMozo).subscribe({
      next: (x) => {
        if(x.mozoID != null) {
          this.usuario = x.usuario
          this.datosUsuario.emit({usuarioID: x.usuarioID, mozoID: x.mozoID, tokenMozo: this.tokenMozo})          
        } else {
          
          alert("Sesion expirada")
          localStorage.removeItem("tokenMozo")       
          this._router.navigateByUrl("mozo/login")
        }                 
      },
      error: () => {
        alert("Sesion expirada")        
        localStorage.removeItem("tokenMozo")       
        this._router.navigateByUrl("mozo/login")
      }
    })
  }

  closeSesion(){ 
    localStorage.removeItem("tokenMozo")       
    this._router.navigateByUrl("mozo/login")
  }

}
