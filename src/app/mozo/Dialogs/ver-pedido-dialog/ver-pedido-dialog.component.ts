import { Component, OnInit } from '@angular/core';
// Inyecciones de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"
// Clases
import { claseProductoPedido } from '../../../carta/Clases/claseProductoPedido';
//Dependencia Dialog
import { MatDialogRef } from '@angular/material/dialog';
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
//Form
import { FormControl, FormGroup, Validators } from '@angular/forms';
//Dialogs
import { DetallesOrdenComponent } from "../../Dialogs/detalles-orden/detalles-orden.component"

@Component({
  selector: 'app-ver-pedido-dialog',
  templateUrl: './ver-pedido-dialog.component.html',
  styleUrls: ['./ver-pedido-dialog.component.css']
})
export class VerPedidoDialogComponent implements OnInit {

  constructor( private _mozoService:MoozoService, private dialogRef:MatDialogRef<VerPedidoDialogComponent>, private _dialog:MatDialog ) {}

  //////////   Atributos de la clase   /////////////
  total = 0
  usuarioID!:number
  mozoID!:number
  mesaID!:number
  tokenMozo!:string
  // Tabla //
  displayedColumns = ["cantidad", "producto", "precio", "comentario", "eliminar"]
  dataSource!:claseProductoPedido[]
  // Formulario //
  form:FormGroup = new FormGroup({
    "mesaID" : new FormControl("", Validators.required),
  })

  ngOnInit(): void {    
    this.dataSource = this._mozoService.pedido
    this.usuarioID = this._mozoService.usuarioID
    this.mozoID = this._mozoService.mozoID
    this.tokenMozo = this._mozoService.tokenMozo
    this._mozoService.pedido.forEach(element => {
      this.total += element.cantidad*element.precio
    })
  }
  
  emitirOrden() {    
    if(parseInt(this.form.controls["mesaID"].value)) {
    this.mesaID = this.form.controls["mesaID"].value
      this._mozoService.generarOrdenMozo(this._mozoService.usuarioID, this.mesaID, this._mozoService.pedido, this.total, this.mozoID, this.tokenMozo).subscribe({
        next: (x) => {          
        alert("Se emitio la orden con exito")
        console.log(x.result["ordenID"])
        this._mozoService.pedido = []
        this._mozoService.ordenID = x.result["ordenID"]
        this._dialog.open(DetallesOrdenComponent)
        this.dialogRef.close()
        },
        error: (err) => {
          alert("EROOR: No se pudo emitir la orden")
          console.log(err)
          this.dialogRef.close()
        }
      })
    } else {
      alert("Debe ingresar un numero de mesa para tomar el pedido")
      this.form.controls["mesaID"].reset()
    }
  }

  quitarProducto(IDinterno:number) {
    this.total -= this._mozoService.pedido.filter(element => element.IDinterno == IDinterno )[0].precio
    this._mozoService.pedido = this._mozoService.pedido.filter(element => element.IDinterno != IDinterno )
    this.dataSource = this._mozoService.pedido

    if(this._mozoService.pedido.length == 0) {
      this.dialogRef.close()
    }
  }
}
