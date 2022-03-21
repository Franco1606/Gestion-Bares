import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// Inyecciones de dependencia
import { AppService } from "../../../servicios/api/app.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-header-cocina',
  templateUrl: './header-cocina.component.html',
  styleUrls: ['./header-cocina.component.css']
})
export class HeaderCocinaComponent implements OnInit {

  constructor( private _router:Router, private _appServiceApi:AppService ) { }

  //////////   Atributos de la clase   /////////////  
  tokenCocina!:string
  usuario!:string

  @Output() datosUsuario = new EventEmitter<any>();  

  ngOnInit(): void {
    if(localStorage.getItem("tokenCocina")){
      this.tokenCocina = localStorage.getItem("tokenCocina") || ""
      this.obtenerUsuario()      
    } else {
      alert("Sesion expirada")
      this._router.navigateByUrl("cocina/login")
    }
  }

  obtenerUsuario(){    
    this._appServiceApi.obtenerUsuarioPorToken("tokenCocina", this.tokenCocina).subscribe({
      next: (x) => {        
        if(x.cocineroID != null) {
          this.usuario = x.usuario
          this.datosUsuario.emit({usuarioID: x.usuarioID, cocineroID: x.cocineroID, tokenCocina: this.tokenCocina})          
        } else {          
          alert("Sesion expirada")
          localStorage.removeItem("tokenCocina")       
          this._router.navigateByUrl("cocina/login")
        }                 
      },
      error: () => {
        alert("Sesion expirada")        
        localStorage.removeItem("tokenCocina")       
        this._router.navigateByUrl("cocina/login")
      }
    })
  }

  closeSesion(){ 
    localStorage.removeItem("tokenCocina")       
    this._router.navigateByUrl("cocina/login")
  }

}
