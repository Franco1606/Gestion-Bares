import { Component, OnInit } from '@angular/core';
// Inyecciones de dependencia
import { CartaService } from "../../servicios/api/carta.service"
// Clases
import { claseProductoPedido } from '../../Clases/claseProductoPedido';
// Dependencias del Dialog 
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido-dialog.component.html',
  styleUrls: ['./pedido-dialog.component.css']
})
export class PedidoDialogComponent implements OnInit {

  constructor( private _cartaServiceApi:CartaService,  private dialogRef:MatDialogRef<PedidoDialogComponent> ) { }

    //////////   Atributos de la clase   /////////////
    total = 0
    domicilio!:string
    // Tabla //
    displayedColumns = ["cantidad", "producto", "precio", "comentario", "eliminar"]
    dataSource!:claseProductoPedido[]

  ngOnInit(): void {     
    this.dataSource = this._cartaServiceApi.pedidos
    this._cartaServiceApi.pedidos.forEach(element => {
      this.total += element.cantidad*element.precio
    })
  }

  quitarProducto(IDinterno:number) {
    this.total -= this._cartaServiceApi.pedidos.filter(element => element.IDinterno == IDinterno )[0].precio
    this._cartaServiceApi.pedidos = this._cartaServiceApi.pedidos.filter(element => element.IDinterno != IDinterno )
    this.dataSource = this._cartaServiceApi.pedidos

    if(this._cartaServiceApi.pedidos.length == 0) {
      this.dialogRef.close()
    }
  }

  emitirOrden() {    
    if(this._cartaServiceApi.mesaID == null) {
      this.domicilio = prompt("Ingrese su domicilio") || ""
      this._cartaServiceApi.generarOrdenDomicilio(this._cartaServiceApi.usuarioID, this.domicilio, this._cartaServiceApi.pedidos, "nueva", "cliente").subscribe({
        next: (x) => {
          console.log(x.result["ordenID"])
          console.log(x.result["nuevaFecha"])
          console.log(x.result["numOrden"])
          location.reload()
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      console.log(this._cartaServiceApi.mesaID)
      this._cartaServiceApi.generarOrdenMesa(this._cartaServiceApi.usuarioID, this._cartaServiceApi.mesaID, this._cartaServiceApi.pedidos, "nueva", "cliente").subscribe({
        next: (x) => {
          console.log(x.result["ordenID"])
          console.log(x.result["nuevaFecha"])
          console.log(x.result["numOrden"])
          location.reload()
        },
        error: (err) => {
          console.log(err)
        }
      })
    }    
  }

}
