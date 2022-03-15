import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor() { }

    //////////   Atributos de la clase   /////////////  
    usuarioID!:number   
    tokenAdmin!:string
  
    obtenerUsuario(datosUsuario:any) {
      this.usuarioID = datosUsuario["usuarioID"]
      this.tokenAdmin = datosUsuario["tokenAdmin"]
    }

}
