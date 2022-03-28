import { Component, OnInit } from '@angular/core';
//Modelos
import { modeloPedido } from '../../ModelosMozo/modeloPedido';
import { modeloSesion } from '../../ModelosMozo/modeloSesion';
//Clases
import { Pdf } from '../../plantillas/pdf';
//Inyeccion de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"
import { AdminService } from "../../../admin/servicios/api/admin.service"
// Dependencias pdfMake
import pdfMake from "pdfmake/build/pdfMake"
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-cerrar-mesa-dialog',
  templateUrl: './cerrar-mesa-dialog.component.html',
  styleUrls: ['./cerrar-mesa-dialog.component.css']
})
export class CerrarMesaDialogComponent implements OnInit {

  constructor( private _mozoService:MoozoService, private _adminService:AdminService ) { }

  //////////   Atributos de la clase   /////////////
  total = 0
  peidosSinHappy!:modeloPedido[]
  pedidosConHappy!:modeloPedido[]
  //Paso de variable por servicio
  sesion!:modeloSesion
  tokenMozo!:string
  tokenAdmin!:string
  // Tabla //
  displayedColumns = ["cantidad", "producto", "precio", "subtotal"]
  dataSource!:any[]

  ngOnInit(): void {
    this.obtenerVarPorServicio()
    this.obtenerPedidosXSesion()
  }

  obtenerVarPorServicio() {
    this.sesion = this._mozoService.sesion
    this.tokenMozo = this._mozoService.tokenMozo
    this.tokenAdmin = this._adminService.tokenAdmin    
  }

  obtenerPedidosXSesion() {
    this._mozoService.obtenerPedidosPorSesion(this.sesion.sesionID).subscribe({
      next: (x) => {        
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
    if(confirm("¿Desea cerrar la mesa?")) {
      this._mozoService.cambiarEstadoSesion("cerrada", this.sesion.sesionID, this.tokenMozo, this.tokenAdmin).subscribe({
        next:() => {              
          location.reload()
        },
        error: (err) => {
          console.log(err)
          alert("ERROR: No se pudo cerrar la mesa")
          location.reload()
        }
      })
    }
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

  imprimir() {
    this.imprimirPdf(this.dataSource, this.sesion.mesaID)
  }
  
  imprimirPdf(pedidos:any[], mesaID:number) {
    let pdf = new Pdf()
    let contenido = pdf.crear(pedidos, mesaID)
    pdfMake.createPdf(contenido).print()    
  }
}
