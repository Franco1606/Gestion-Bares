import { Component, OnInit } from '@angular/core';
//Modelos
import { modeloPedido } from '../../ModelosMozo/modeloPedido';
//Inyeccion de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"

@Component({
  selector: 'app-cerrar-mesa-dialog',
  templateUrl: './cerrar-mesa-dialog.component.html',
  styleUrls: ['./cerrar-mesa-dialog.component.css']
})
export class CerrarMesaDialogComponent implements OnInit {

  constructor( private _mozoService:MoozoService ) { }

  //////////   Atributos de la clase   /////////////
  total = 0
  peidosSinHappy!:modeloPedido[]
  pedidosConHappy!:modeloPedido[]
  // Tabla //
  displayedColumns = ["cantidad", "producto", "precio", "subtotal"]
  dataSource!:any[]

  ngOnInit(): void {
    this._mozoService.obtenerPedidosPorSesion(this._mozoService.sesion.sesionID).subscribe({
      next: (x) => {
        console.log(x)
        this.peidosSinHappy = this.pedidos(this.agruparPorProducto(x))
        this.pedidosConHappy = this.pedidosHappy(this.agruparPorCategoria(x))
        this.dataSource = this.peidosSinHappy.concat(this.pedidosConHappy)
        this.total = this.calcularTotal()
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

  calcularTotal():number {
    let total = 0
    this.dataSource.forEach(elemento => {
      total +=elemento.subtotal
    })
    return total
  }

  cerrarMesa() {

  }

  agruparPorCategoria(pedidos:modeloPedido[]):modeloPedido[][] {
    let pedidosAgrupados:modeloPedido[][] = []
    let categoriaIDs:number[] = []
    pedidos.forEach(pedido => {
      if(!categoriaIDs.includes(pedido.categoriaID)) {
        let grupo = pedidos.filter(element => element.categoriaID == pedido.categoriaID)        
        pedidosAgrupados.push(grupo)
        categoriaIDs.push(pedido.categoriaID)
      }
    })
    return pedidosAgrupados
  }

  pedidosHappy(pedidoPorCategoria:modeloPedido[][]):any {
    let pedidosHappy:any[] = []
    pedidoPorCategoria.forEach(grupo => {
      let cantidad = 0
      let precio = 0      
      grupo.forEach(pedido => {
        if(Number(pedido.happy)) {
          cantidad += Number(pedido.cantidad)
          precio = Number(pedido.precio)
        }
      })
      cantidad = Math.floor(cantidad/2)
      let subtotal = -(cantidad * precio)
      if(cantidad>0) {
        let pedidoHappy = {
          cantidad: cantidad,
          nombre: `${grupo[0].categoriaNombre} Happy ;)`,
          precio: grupo[0].precio,
          subtotal: subtotal
        }
        pedidosHappy.push(pedidoHappy)
      }
    })
    return pedidosHappy
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

  pedidos(pedidoPorProducto:modeloPedido[][]):any[] {
    let pedidos:any[] = []
    pedidoPorProducto.forEach(grupo => {
      let cantidad = 0      
      let subtotal = 0      
      grupo.forEach(producto => {
        cantidad += Number(producto.cantidad)
        subtotal += Number(producto.cantidad) * Number(producto.precio)
      })      
      let pedido = {
        cantidad: cantidad,
        nombre: grupo[0].nombre,
        precio: grupo[0].precio,
        subtotal: subtotal
      }
      pedidos.push(pedido)      
    })
    return pedidos
  }

}
