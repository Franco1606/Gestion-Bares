import { Component, OnInit } from '@angular/core';
//Form
import { FormControl, FormGroup } from '@angular/forms';
//Modelos
import { modeloPedido } from '../../../mozo/ModelosMozo/modeloPedido';
//Inyeccions de dependencia
import { MoozoService } from "../../../mozo/servicios/api/moozo.service"
import { CocinaService } from "../../servicios/api/cocina.service"
//Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
//Dependencias dialog
import { ComentarioDialogComponent } from "../../Dialogs/comentario-dialog/comentario-dialog.component"

@Component({
  selector: 'app-detalles-orden-dialog',
  templateUrl: './detalles-orden-dialog.component.html',
  styleUrls: ['./detalles-orden-dialog.component.css']
})
export class DetallesOrdenDialogComponent implements OnInit {

  constructor( private _mozoService:MoozoService, private _cocinaService:CocinaService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////   
  estado!:string
  estados = ["lista"]
  mesaFlag = true
  // Tabla //
  displayedColumns = ["cantidad","producto", "comentario"]
  dataSource:modeloPedido[]
  // Formulario
  form:FormGroup = new FormGroup({
    "estado" : new FormControl(),
    "numOrden" : new FormControl(),
    "nuevaFecha" : new FormControl(),
    "activaFecha" : new FormControl(),
    "mesaID" : new FormControl(), 
    "domicilio" : new FormControl(),
    "total" : new FormControl()
  })

  ngOnInit(): void {
    this.obtenerDatos()
    this.obtenerPedidos()
  }

  obtenerPedidos() {
    this._mozoService.obtenerPedidos(this._cocinaService.orden.ordenID).subscribe({
      next: (x) => {
        this.dataSource = x
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

  obtenerDatos() {
    this._mozoService.obtenerOrden(this._cocinaService.orden.ordenID).subscribe({
      next: (x) => {
        this.estado = x.estado               
        this.form.controls["estado"].setValue(x.estado)
        this.form.controls["numOrden"].setValue(x.numOrden)
        this.form.controls["nuevaFecha"].setValue(x.nuevaFecha)
        this.form.controls["activaFecha"].setValue(x.activaFecha)
        this.form.controls["mesaID"].setValue(x.mesaID)        
        this.form.controls["domicilio"].setValue(x.domicilio)
        if(x.domicilio) {
          this.mesaFlag = false
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  cambiarEstadoOrden(estado:string) {    
    this._cocinaService.cambiarEstadoOrden(estado, this._cocinaService.orden.ordenID, this._cocinaService.orden.sesionID, this._cocinaService.tokenCocina).subscribe({
      next: () => {
        alert("Se actualizo el estado de la orden")        
        location.reload()
        
      },
      error: () => {
        alert("ERROR: Hubo un error al actualizar el estado de la orden")
        location.reload()
      }
    })
  }

  verComentario(comentario:string) {
    this._cocinaService.comentario = comentario
    this._dialog.open(ComentarioDialogComponent)
  }
}
