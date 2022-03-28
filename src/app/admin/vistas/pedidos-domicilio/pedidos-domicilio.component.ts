import { Component, ViewChild } from '@angular/core';
//Modelos
import { modeloSesion } from '../../../mozo/ModelosMozo/modeloSesion'
import { modeloPedido } from '../../../mozo/ModelosMozo/modeloPedido';
//Inyeccions de dependencia
import { AdminService } from "../../servicios/api/admin.service"
import { MoozoService } from "../../../mozo/servicios/api/moozo.service"
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
// Dependencias para la tabla
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
//Dependencia Dialogs
import { DetallesOrdenDialogComponent } from "../../../mozo/Dialogs/detalles-orden-dialog/detalles-orden-dialog.component"
// Dependencias pdfMake
import pdfMake from "pdfmake/build/pdfMake"
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//Clases
import { Pdf } from '../../../mozo/plantillas/pdf';

@Component({
  selector: 'app-pedidos-domicilio',
  templateUrl: './pedidos-domicilio.component.html',
  styleUrls: ['./pedidos-domicilio.component.css']
})
export class PedidosDomicilioComponent {

  constructor( private _adminService:AdminService, private _mozoService:MoozoService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  usuarioID!:number
  tokenAdmin!:string 
  sesiones!:modeloSesion[]
  // Tabla //
  displayedColumns = ["domicilio", "solicitada", "borrar", "imprimir"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloSesion>

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]
    this.tokenAdmin = datosUsuario["tokenAdmin"]
    this.obtenerSesionesDomicilio()
    setInterval(() => {this.obtenerSesionesDomicilio()}, 30000)
  }

  obtenerSesionesDomicilio() {
    this._mozoService.obtenerSesiones(this.usuarioID, "domicilio").subscribe({
      next: (x) => {        
        if(x.length) {
          this.sesiones = x
          this.dataSource = new MatTableDataSource<modeloSesion>(this.sesiones.reverse())
          this.dataSource.paginator = this.paginator
        } else {
          this.sesiones = x
        }         
      }
    })   
  }

  irDetallesOrden(sesion:modeloSesion) {    
    this._mozoService.obtenerOrdenesXSesion(sesion.sesionID).subscribe({
      next: (x) => {
        this._mozoService.ordenID = x[0].ordenID
        this._mozoService.sesion = sesion
        this._mozoService.mozoID = 9999
        this._adminService.tokenAdmin = this.tokenAdmin
        this._dialog.open(DetallesOrdenDialogComponent)
      },  
      error: (err) => { 
        console.log(err)
        alert("No se pudo obtener los datos de la base de datos")
      }
    })
  }

  eliminarSesion(sesionID:number) {
    if(confirm("Desea eliminar este cierre de mesa?")) {
      this._adminService.eliminarSesion(sesionID, this.tokenAdmin).subscribe({
        next: () => {
          location.reload()
        },
        error: (err) => {
          console.log(err)
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

  imprimir(sesion:modeloSesion) {
    this._mozoService.obtenerPedidosPorSesion(sesion.sesionID).subscribe({
      next: (x) => {
        let peidosSinHappy = this.pedidos(this.agruparPorProducto(x))
        let pedidosConHappy = this.pedidosHappy(this.agruparPorCategoria(x))
        let pedidos = peidosSinHappy.concat(pedidosConHappy)
        this.imprimirPdf(pedidos, sesion.domicilio)
      }
    })
  }

  imprimirPdf(pedidos:any[], domicilio:string) {
    let pdf = new Pdf()
    let contenido = pdf.crear(pedidos, 0, domicilio)
    pdfMake.createPdf(contenido).print()    
  }

}
