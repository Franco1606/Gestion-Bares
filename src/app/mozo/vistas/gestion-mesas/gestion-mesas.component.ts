import { Component} from '@angular/core';

@Component({
  selector: 'app-gestion-mesas',
  templateUrl: './gestion-mesas.component.html',
  styleUrls: ['./gestion-mesas.component.css']
})
export class GestionMesasComponent {

  constructor() { }

  //////////   Atributos de la clase   /////////////  
  mozoID!:number   
  tokenMozo!:string

  obtenerUsuario(datosUsuario:any) {
    this.mozoID = datosUsuario["mozoID"]    
    this.tokenMozo = datosUsuario["tokenMozo"]
  }
}
