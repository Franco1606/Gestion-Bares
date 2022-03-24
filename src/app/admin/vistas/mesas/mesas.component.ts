import { Component } from '@angular/core';
//Modelos
import { modeloSesion } from '../../../mozo/ModelosMozo/modeloSesion'
//Inyeccions de dependencia
import { AdminService } from "../../servicios/api/admin.service"
import { MoozoService } from "../../../mozo/servicios/api/moozo.service"
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
// Dependencias Dialogs
import { DetallesSesionDialogComponent } from '../../Dialogs/detalles-sesion-dialog/detalles-sesion-dialog.component';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent {

  constructor( private _adminService:AdminService, private _mozoService:MoozoService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  usuarioID:number   
  tokenAdmin!:string
  sesiones!:modeloSesion[]  

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]    
    this.tokenAdmin = datosUsuario["tokenAdmin"]
    this.obtenerSesiones()
    setInterval(() => {this.obtenerSesiones()}, 30000)
  }

  obtenerSesiones() {
    this._mozoService.obtenerSesiones(this.usuarioID).subscribe({
      next: (x) => {
        this.sesiones = x.filter(sesion => sesion.estado == "solicitada" || sesion.estado == "abierta")
      }
    })
  }

  detallesMesa(sesion:modeloSesion) {
    this._mozoService.sesion = sesion
    this._adminService.usuarioID = this.usuarioID
    this._adminService.tokenAdmin = this.tokenAdmin
    let dialogRef = this._dialog.open(DetallesSesionDialogComponent)
    dialogRef.afterClosed().subscribe({
      next: () => {        
        this.obtenerSesiones()
      }
    })
  }

  tiempoTranscurrido(fecha:Date):string {
    let ahora = Date.now()
    let dif = ahora - Date.parse(fecha.toString())    
    let min = Math.floor((dif / (1000 * 60)) % 60)
    let horas = Math.floor((dif / (1000 * 60 * 60)) % 24)
    let string = `${horas} horas, ${min} min`  
    return string         
  }
}
