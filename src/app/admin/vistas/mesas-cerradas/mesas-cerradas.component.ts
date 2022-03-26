import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
//Modelos
import { modeloSesion } from '../../../mozo/ModelosMozo/modeloSesion'
//Inyeccions de dependencia
import { AdminService } from "../../servicios/api/admin.service"
import { MoozoService } from "../../../mozo/servicios/api/moozo.service"
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
// Dependencias para la tabla
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
//Dependencia Dialogs
import { DetallesSesionDialogComponent } from "../../Dialogs/detalles-sesion-dialog/detalles-sesion-dialog.component"

@Component({
  selector: 'app-mesas-cerradas',
  templateUrl: './mesas-cerradas.component.html',
  styleUrls: ['./mesas-cerradas.component.css']
})
export class MesasCerradasComponent implements OnChanges {

  constructor( private _adminService:AdminService, private _mozoService:MoozoService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  @Input() usuarioID!:number
  @Input() tokenAdmin!:string 
  sesiones!:modeloSesion[]
  // Tabla //
  displayedColumns = ["mesa", "cerrada"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloSesion>
  
  ngOnChanges(): void {
    this.obtenerSesionesCerradas()
    setInterval(() => {this.obtenerSesionesCerradas()}, 30000)
  }

  obtenerSesionesCerradas() {
    this._mozoService.obtenerSesionesCerradas(this.usuarioID).subscribe({
      next: (x) => {
        this.sesiones = x
        this.dataSource = new MatTableDataSource<modeloSesion>(this.sesiones.reverse())
        this.dataSource.paginator = this.paginator        
      }
    })   
  }

  irDetallesSesion(sesion:modeloSesion) {
    this._adminService.usuarioID = this.usuarioID
    this._adminService.tokenAdmin = this.tokenAdmin
    this._mozoService.sesion = sesion
    this._dialog.open(DetallesSesionDialogComponent)
  }
}
