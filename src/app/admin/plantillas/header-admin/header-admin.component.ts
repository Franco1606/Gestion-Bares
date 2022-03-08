import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Inyecciones de dependencia
import { AppService } from "../../../servicios/api/app.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor( private _router:Router, private _appServiceApi:AppService ) { }

  //////////   Atributos de la clase   /////////////  
  tokenAdmin!:string
  usuario!:string

  @Output() usuarioID = new EventEmitter<number>();  

  ngOnInit(): void {
    if(localStorage.getItem("tokenAdmin")){
      this.tokenAdmin = localStorage.getItem("tokenAdmin") || ""
      this.obtenerUsuario()      
    } else {
      alert("Sesion expirada")
      this._router.navigateByUrl("admin/login")
    }
  }

  obtenerUsuario(){    
    this._appServiceApi.obtenerUsuarioPorToken("tokenAdmin", this.tokenAdmin).subscribe({
      next: (x) => {
        if(x.usuarioID != null) {
          this.usuario = x.usuario
          this.usuarioID.emit(x.usuarioID)          
        } else {
          alert("Sesion expirada")
          localStorage.removeItem("tokenAdmin")       
          this._router.navigateByUrl("admin/login")
        }                 
      },
      error: () => {
        alert("Sesion expirada")
        localStorage.removeItem("tokenAdmin")       
        this._router.navigateByUrl("admin/login")
      }
    })
  }

  closeSesion(){ 
    localStorage.removeItem("tokenAdmin")       
    this._router.navigateByUrl("admin/login")
  }

}
