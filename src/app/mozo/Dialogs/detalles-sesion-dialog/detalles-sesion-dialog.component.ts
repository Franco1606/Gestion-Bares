import { Component, OnInit } from '@angular/core';
//Inyeccions de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
//Modelos
import { modeloOrden } from '../../ModelosMozo/modeloOrden';
import { modeloPedido } from '../../ModelosMozo/modeloPedido';
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
    this._dialog.open(DetallesOrdenComponent)
  }

  cerrarMesa() {    
    this._dialog.open(CerrarMesaDialogComponent)    
  }  
}
