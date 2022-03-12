import { Component, OnInit } from '@angular/core';
// Inyecciones de dependencia
import { CartaService } from "../../servicios/api/carta.service"
// Clases
import { claseProductoPedido } from '../../Clases/claseProductoPedido';
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
    dataSource!:claseProductoPedido[]

  ngOnInit(): void {
    this.nombre = this._cartaServiceApi.nombre
    this.dataSource = this._cartaServiceApi.pedidos.filter(element => element.productoID == this._cartaServiceApi.productoID)
  }

  quitarProducto(IDinterno:number) {
    this._cartaServiceApi.pedidos = this._cartaServiceApi.pedidos.filter(element => element.IDinterno != IDinterno )
    this.dataSource = this._cartaServiceApi.pedidos.filter(element => element.productoID == this._cartaServiceApi.productoID)
    if(this._cartaServiceApi.pedidos.filter(element => element.productoID == this._cartaServiceApi.productoID).length == 0) {
      this.dialogRef.close()
    }
  }
}
