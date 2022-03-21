import { Component, ViewChild} from '@angular/core';
//Tabla
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//Modelos
import { modeloPedido } from 'src/app/mozo/ModelosMozo/modeloPedido';
//Inyeccions de dependencia
import { CocinaService } from "../../servicios/api/cocina.service"
//Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
//Dependencias dialog
import { DetallesPedidoDialogComponent } from "../../Dialogs/detalles-pedido-dialog/detalles-pedido-dialog.component"

@Component({
  selector: 'app-gestion-pedidos',
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.css']
})
export class GestionPedidosComponent {

  constructor( private _cocinaService:CocinaService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  usuarioID:number  
  cocineroID!:number   
  tokenCocina!:string
  pedidos:modeloPedido[] = []
  // Tabla //
  displayedColumns = ["cantidad", "nombre", "comentarios"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloPedido>

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]
    this.cocineroID = datosUsuario["cocineroID"]
    this.tokenCocina = datosUsuario["tokenCocina"]
    this.obtenerPedidosCocina()
    setInterval(() => {this.obtenerPedidosCocina()}, 30000)
  }

  obtenerPedidosCocina() {
    this._cocinaService.obtenerPedidosDeCocina(this.usuarioID, 1).subscribe({
      next: (x) => {
        this.pedidos = this.sumarCantidades(this.agruparPorProducto(x))
        this.dataSource = new MatTableDataSource<modeloPedido>(this.pedidos)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },  
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

  agruparPorProducto(pedidos:modeloPedido[]):modeloPedido[][] {
    let pedidosAgrupados:modeloPedido[][] = []
    let productoIDs:number[] = []
    pedidos.forEach(pedido => {
      if(!productoIDs.includes(pedido.productoID)) {
        let grupo = pedidos.filter(element => element.productoID == pedido.productoID)        
        pedidosAgrupados.push(grupo)
        productoIDs.push(pedido.productoID)
      }
    })
    return pedidosAgrupados
  }

  sumarCantidades(pedidoAgrupado:modeloPedido[][]):modeloPedido[] {
    let pedidos:any[] = []
    pedidoAgrupado.forEach(grupo => {
      let cantidad = 0
      let nombre = grupo[0].nombre
      let productoID = grupo[0].productoID
      let comentario = false
      grupo.forEach(pedido => {
        cantidad += Number(pedido.cantidad)
        if(pedido.comentario) {
          comentario = true
        }
      })
      let pedido = {
        cantidad: cantidad,
        nombre: nombre,
        productoID: productoID,
        comentarios: comentario
      }
      pedidos.push(pedido)
    })
    return pedidos
  }

  detallesPedido(productoID:number) {
    this._cocinaService.productoID = productoID
    this._dialog.open(DetallesPedidoDialogComponent)
  }

  //Filtro para el buscador de la tabla
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
