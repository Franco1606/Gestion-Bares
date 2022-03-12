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
    // Tabla //
    displayedColumns = ["cantidad", "producto", "precio", "comentario", "eliminar"]
    dataSource!:claseProductoPedido[]

  ngOnInit(): void {     
    this.dataSource = this._cartaServiceApi.pedido
    this._cartaServiceApi.pedido.forEach(element => {
      this.total += element.cantidad*element.precio
    })
  }

  quitarProducto(IDinterno:number) {
    this._cartaServiceApi.pedido = this._cartaServiceApi.pedido.filter(element => element.IDinterno != IDinterno )
    this.dataSource = this._cartaServiceApi.pedido
    if(this._cartaServiceApi.pedido.length == 0) {
      this.dialogRef.close()
    }
  }

  emitirOrden() {

  }

}
