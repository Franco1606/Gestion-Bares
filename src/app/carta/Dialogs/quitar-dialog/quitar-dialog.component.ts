import { Component, OnInit } from '@angular/core';
// Inyecciones de dependencia
import { CartaService } from "../../servicios/api/carta.service"
// Modelos
import { modeloProductoPedido } from '../../ModelosCarta/modeloProductoPedido';
// Dependencias del Dialog 
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quitar-dialog',
  templateUrl: './quitar-dialog.component.html',
  styleUrls: ['./quitar-dialog.component.css']
})
export class QuitarDialogComponent implements OnInit {

  constructor( private _cartaServiceApi:CartaService,  private dialogRef:MatDialogRef<QuitarDialogComponent> ) { }

    //////////   Atributos de la clase   /////////////
    nombre!:string
    // Tabla //
    displayedColumns = ["cantidad", "comentario", "eliminar"]
    dataSource!:modeloProductoPedido[]

  ngOnInit(): void {
    this.nombre = this._cartaServiceApi.nombre
    this.dataSource = this._cartaServiceApi.pedido.filter(element => element.productoID == this._cartaServiceApi.productoID)
  }

  quitarProducto(IDinterno:number) {
    this._cartaServiceApi.pedido = this._cartaServiceApi.pedido.filter(element => element.IDinterno != IDinterno )
    this.dataSource = this._cartaServiceApi.pedido.filter(element => element.productoID == this._cartaServiceApi.productoID)
    if(this._cartaServiceApi.pedido.filter(element => element.productoID == this._cartaServiceApi.productoID).length == 0) {
      this.dialogRef.close()
    }
  }
}
