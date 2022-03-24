import { Component, OnInit } from '@angular/core';
//Inyeccions de dependencia
import { MoozoService } from "../../../mozo/servicios/api/moozo.service"
import { AdminService } from "../../servicios/api/admin.service"
import { Router } from "@angular/router"
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
//Modelos
import { modeloOrden } from '../../../mozo/ModelosMozo/modeloOrden';
import { modeloSesion } from 'src/app/mozo/ModelosMozo/modeloSesion';
import { modeloMozo } from '../../ModelosAdmin/modeloMozo';
// Dependencias Dialog
import { DetallesOrdenDialogComponent } from "../detalles-orden-dialog/detalles-orden-dialog.component"
//Form
import { FormControl, FormGroup } from '@angular/forms';
import { NumericColorInputDirective } from '@angular-material-components/color-picker';

@Component({
  selector: 'app-detalles-sesion-dialog',
  templateUrl: './detalles-sesion-dialog.component.html',
  styleUrls: ['./detalles-sesion-dialog.component.css']
})
export class DetallesSesionDialogComponent implements OnInit {

  constructor( private _mozoService:MoozoService, private _adminService:AdminService, private _dialog:MatDialog, private _router:Router ) { }

  //////////   Atributos de la clase   /////////////  
  usuarioID!:number
  tokenAdmin!:string 
  mesaID!:number
  llamarMozo!:number
  sesion!:modeloSesion
  mozos!:modeloMozo[]
  // Tabla //
  displayedColumns = ["numOrden", "estado"]
  dataSource!:modeloOrden[]
  // Formulario
  form:FormGroup = new FormGroup({
    "mozoID" : new FormControl(),
    "sesionID" : new FormControl(),
    "tokenAdmin" : new FormControl()
  })

  ngOnInit(): void {
    this.obtenerDatos()
    this.obtenerOrdenes()
    this.obtenerMozos()
    this.obtenerMozo()
  }

  obtenerDatos() {
    this.usuarioID = this._adminService.usuarioID
    this.tokenAdmin = this._adminService.tokenAdmin
    this.llamarMozo = this._mozoService.sesion.llamarMozo    
    this.sesion = this._mozoService.sesion
  }

  obtenerOrdenes() {
    this._mozoService.obtenerOrdenes(this.usuarioID, this._mozoService.sesion.sesionID).subscribe({
      next: (x) => {
        this.dataSource = x
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo obtener los datos de la base de datos")
      }
    })
  }

  obtenerMozos() {
    this._adminService.obtenerMozos(this.usuarioID).subscribe({
      next: (x) => {
        this.mozos = x   
      },
      error: () => {
        alert("No se pudo obtener los datos de la base de datos")
      }
     })
  }

  obtenerMozo() {
    this._adminService.obtenerMozo(this._mozoService.sesion.mozoID).subscribe({
      next: (x) => {
        this.form.controls["mozoID"].setValue(x.mozoID)
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

  cambiarMozo() {
    this.form.controls["tokenAdmin"].setValue(this.tokenAdmin)
    this.form.controls["sesionID"].setValue(this.sesion.sesionID)
    this._adminService.cambiarMozoDeMesa(this.form.value).subscribe({
      next:() => {
        alert("Se cambio de mozo con exito")
      },
      error: (err) => {
        console.log(err)
        alert("ERROR: No se pudo cambiar el mozo")
      }
    })
  }

  irDetallesOrden(ordenID:number) {
    this._mozoService.ordenID = ordenID
    this._adminService.tokenAdmin = this.tokenAdmin
    let dialogRef = this._dialog.open(DetallesOrdenDialogComponent)
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.obtenerOrdenes()
      }
    })
  }

}
