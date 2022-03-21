import { Component, OnInit } from '@angular/core';
//Inyeccion de dependencias
import { CocinaService } from '../../servicios/api/cocina.service';
//Modelos
import { modeloPedido } from 'src/app/mozo/ModelosMozo/modeloPedido';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-detalles-pedido-dialog',
  templateUrl: './detalles-pedido-dialog.component.html',
  styleUrls: ['./detalles-pedido-dialog.component.css']
})
export class DetallesPedidoDialogComponent implements OnInit {

  constructor(  private _cocinaService:CocinaService ) { }

  //////////   Atributos de la clase   /////////////
  // Tabla //
  displayedColumns = ["cantidad", "nombre", "comentario"]
  dataSource!:modeloPedido[]

  ngOnInit(): void {
    this.obtenerPedidosPorProductoId()
  }

  obtenerPedidosPorProductoId() {
    this._cocinaService.obtenerPedidosPorProductoId(this._cocinaService.productoID, 1).subscribe({
      next: (x) => {
        this.dataSource = x.filter(element => element.comentario != "")
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

}
