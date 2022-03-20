import { Component, OnInit } from '@angular/core';
//Inyeccions de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
//Modelos
import { modeloOrden } from '../../ModelosMozo/modeloOrden';
// Dependencias para Dialogs
import { DetallesOrdenComponent } from "../../Dialogs/detalles-orden/detalles-orden.component"
import { CerrarMesaDialogComponent } from '../cerrar-mesa-dialog/cerrar-mesa-dialog.component';

@Component({
  selector: 'app-detalles-sesion-dialog',
  templateUrl: './detalles-sesion-dialog.component.html',
  styleUrls: ['./detalles-sesion-dialog.component.css']
})
export class DetallesSesionDialogComponent implements OnInit {

  constructor( private _mozoService:MoozoService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////   
  mesaID!:number
  // Tabla //
  displayedColumns = ["numOrden", "estado"]
  dataSource!:modeloOrden[]

  ngOnInit(): void {
    this.mesaID = this._mozoService.sesion.mesaID
    this.obtenerOrdenes()
  }

  obtenerOrdenes() {
    this._mozoService.obtenerOrdenes(this._mozoService.usuarioID, this._mozoService.sesion.sesionID).subscribe({
      next: (x) => {
        this.dataSource = x
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo obtener los datos de la base de datos")
      }
    })
  }

  

  irDetallesOrden(orden:modeloOrden) {
    this._mozoService.orden = orden
    let dialogRef = this._dialog.open(DetallesOrdenComponent)
    dialogRef.afterClosed().subscribe({
      next: () => {        
        this.obtenerOrdenes()
      }
    })
  }

  cerrarMesa() {
    this._mozoService.obtenerOrdenes(this._mozoService.usuarioID, this._mozoService.sesion.sesionID).subscribe({
      next: (x) => {
        if(x.length > 0) {
          if(x.filter(element => element.estado == "nueva" || element.estado == "lista" || element.estado == "activa").length == 0) {
            this._dialog.open(CerrarMesaDialogComponent)
          } else {
            alert("No se puede cerrar la mesa con ordenes nuevas, listas o activas, debe finalizar todas las ordenes")          
          }
        } else {
          this._mozoService.cambiarEstadoSesion("cerrada", this._mozoService.sesion.sesionID, this._mozoService.tokenMozo).subscribe({
            next:() => {              
              location.reload()
            },
            error: (err) => {
              console.log(err)
              alert("ERROR: No se pudo cerrar la mesa")
              location.reload()
            }
          })
        }
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)        
      }
    })
        
  }  
}
