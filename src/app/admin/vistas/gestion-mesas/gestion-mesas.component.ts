import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-mesas',
  templateUrl: './gestion-mesas.component.html',
  styleUrls: ['./gestion-mesas.component.css']
})
export class GestionMesasComponent {

  constructor() { }

  //////////   Atributos de la clase   /////////////
  usuarioID:number   
  tokenAdmin!:string

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]    
    this.tokenAdmin = datosUsuario["tokenAdmin"]    
  }
}
