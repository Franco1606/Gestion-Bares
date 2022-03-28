import { Component } from '@angular/core';
//Modelos
import { modeloSesion } from '../../ModelosMozo/modeloSesion';
//Inyeccions de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
// Dependencias para Dialogs
import { DetallesSesionDialogComponent } from "../../Dialogs/detalles-sesion-dialog/detalles-sesion-dialog.component"

@Component({
  selector: 'app-gestion-mesas',
  templateUrl: './gestion-mesas.component.html',
  styleUrls: ['./gestion-mesas.component.css']
})
export class GestionMesasComponent {

  constructor( private _mozoService:MoozoService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  usuarioID:number  
  mozoID!:number   
  tokenMozo!:string
  sesiones:modeloSesion[] = []

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]
    this.mozoID = datosUsuario["mozoID"]
    this.tokenMozo = datosUsuario["tokenMozo"]
    this.obtenerSesiones()
    setInterval(() => {this.obtenerSesiones()}, 30000)
  }

  obtenerSesiones() {
    this._mozoService.obtenerSesiones(this.usuarioID, "activa").subscribe({
      next: (x) => {
        if(x.length) {
          this.sesiones = x.filter(element => element.mozoID == this.mozoID || element.estado == "solicitada")  
        }
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo obtener los datos de la base de datos")
      }
     })
  }

  detallesMesa(sesion:modeloSesion) {
    this._mozoService.sesion = sesion
    this._mozoService.usuarioID = this.usuarioID
    this._mozoService.mozoID = this.mozoID
    this._mozoService.tokenMozo = this.tokenMozo
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
