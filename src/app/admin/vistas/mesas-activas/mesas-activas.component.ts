import { Component, Input, OnChanges } from '@angular/core';
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
  templateUrl: './mesas-activas.component.html',
  styleUrls: ['./mesas-activas.component.css']
})
export class MesasActivasComponent implements OnChanges{

  constructor( private _adminService:AdminService, private _mozoService:MoozoService, private _dialog:MatDialog ) { }
  
  //////////   Atributos de la clase   /////////////
  @Input() usuarioID!:number
  @Input() tokenAdmin!:string 
  sesiones!:modeloSesion[]

  ngOnChanges(): void {
    this.obtenerSesionesActivas()
    setInterval(() => {this.obtenerSesionesActivas()}, 30000)
  }

  obtenerSesionesActivas() {
    this._mozoService.obtenerSesiones(this.usuarioID, "activa").subscribe({
      next: (x) => {
        this.sesiones = x        
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
        this.obtenerSesionesActivas()
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
