import { Component, OnInit } from '@angular/core';
//Form
import { FormControl, FormGroup } from '@angular/forms';
//Modelos
import { modeloPedido } from '../../../mozo/ModelosMozo/modeloPedido';
//Inyeccions de dependencia
import { MoozoService } from "../../../mozo/servicios/api/moozo.service"
import { AdminService } from '../../servicios/api/admin.service';
// Dependencias Angular Material
import { MatDialog, MatDialogRef } from "@angular/material/dialog"

@Component({
  selector: 'app-detalles-orden-dialog',
  templateUrl: './detalles-orden-dialog.component.html',
  styleUrls: ['./detalles-orden-dialog.component.css']
})
export class DetallesOrdenDialogComponent implements OnInit {

  constructor( private _mozoService:MoozoService, private _adminService:AdminService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  tokenAdmin!:string
  estado!:string
  mesaFlag = true
  desactivarChecks!:boolean
  desactivarEliminar!:boolean
  desactivarEnvioComanda!:boolean
  // Tabla //
  displayedColumns = ["cantidad","producto","precio", "cocina", "borrar"]
  dataSource:modeloPedido[]
  // Formulario
  form:FormGroup = new FormGroup({
    "numOrden" : new FormControl(),
    "nuevaFecha" : new FormControl(),
    "activaFecha" : new FormControl(),
    "listaFecha" : new FormControl(),
    "finalizadaFecha" : new FormControl(),
    "mesaID" : new FormControl(), 
    "domicilio" : new FormControl(),
    "solicitante" : new FormControl(),
    "finalizoMozoID" : new FormControl(),
    "total" : new FormControl()
  })

  ngOnInit(): void {
    this.obtenerPedidos()
    this.obtenerDatos()
  }

  obtenerPedidos() {
    this._mozoService.obtenerPedidos(this._mozoService.ordenID).subscribe({
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
    this.tokenAdmin = this._adminService.tokenAdmin
    this._mozoService.obtenerOrden(this._mozoService.ordenID).subscribe({
      next: (x) => {
        this.form.controls["numOrden"].setValue(x.numOrden)
        this.form.controls["nuevaFecha"].setValue(x.nuevaFecha)
        this.form.controls["activaFecha"].setValue(x.activaFecha)
        this.form.controls["listaFecha"].setValue(x.listaFecha)
        this.form.controls["finalizadaFecha"].setValue(x.finalizadaFecha)
        this.form.controls["mesaID"].setValue(x.mesaID)        
        this.form.controls["domicilio"].setValue(x.domicilio)
        this.form.controls["solicitante"].setValue(x.solicitante)
        this.form.controls["finalizoMozoID"].setValue(x.finalizoMozoID)
        if(x.domicilio) {
          this.mesaFlag = false
        }
        this.form.controls["total"].setValue(x.total)
        this.estado = x.estado
        this.inhabilitarEnvioComanda()
        this.inhabilitarEliminar()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  enviarComanda() {
    this._mozoService.enviarComanda(this.dataSource, this._mozoService.ordenID ,this._mozoService.tokenMozo).subscribe({
      next: () => {
        alert("La comanda se envio a la cocina")        
      },
      error: () => {
        alert("No se pudo enviar la comanda a la cocina")
      }
    })
  }

  eliminarPedido(pedidoID:number, cantidad:number, nombre:string, ) {
    if(confirm(`Esta por eliminar: ${cantidad} x ${nombre} del pedido`)){
      this._adminService.eliminarPedido(pedidoID, this.tokenAdmin).subscribe({
        next: (x) => {
          if(x.status == "ok"){
            alert(`Se elminino: ${cantidad} x ${nombre} del pedido`)
            this._dialog.closeAll()
            this._dialog.open(DetallesOrdenDialogComponent)
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  toggle(e:any, productoPedido:modeloPedido) {
    if(e.checked){
      productoPedido.cocina = 1   
    } else {      
      productoPedido.cocina = 0
    }
  }

  inhabilitarEnvioComanda() {
    if(this.estado == "activa") {
      this.desactivarEnvioComanda = false
      this.desactivarChecks = false      
    } else {
      this.desactivarEnvioComanda = true
      this.desactivarChecks = true            
    }
  }

  inhabilitarEliminar() {
    if(this.estado == "nueva" || this.estado == "activa") {      
      this.desactivarEliminar = false
    } else {
      this.desactivarEliminar = true                 
    }
  }
}
