import { Component, OnInit } from '@angular/core';
//Form
import { FormControl, FormGroup } from '@angular/forms';
//Modelos
import { modeloPedido } from '../../../mozo/ModelosMozo/modeloPedido';
//Clases
import { claseProductoPedido } from '../../../carta/Clases/claseProductoPedido';
import { Pdf } from '../../plantillas/pdf';
//Inyeccions de dependencia
import { MoozoService } from "../../../mozo/servicios/api/moozo.service"
import { AdminService } from '../../servicios/api/admin.service';
// Dependencias Angular Material
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
// Dependencias pdfMake
import pdfMake from "pdfmake/build/pdfMake"
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detalles-orden-dialog',
  templateUrl: './detalles-orden-dialog.component.html',
  styleUrls: ['./detalles-orden-dialog.component.css']
})
export class DetallesOrdenDialogComponent implements OnInit {

  constructor( private _mozoService:MoozoService, private _adminService:AdminService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  tokenAdmin!:string
  estado!:string
  mesaFlag = true
  desactivarChecks!:boolean
  desactivarEliminar!:boolean
  desactivarEnvioComanda!:boolean
  productosCocina = false
  desactivarImpresionComanda = true
  numOrden!:string
  // Tabla //
  displayedColumns = ["cantidad","producto","precio", "cocina", "borrar"]
  dataSource:modeloPedido[]
  // Formulario
  form:FormGroup = new FormGroup({
    "numOrden" : new FormControl(),
    "nuevaFecha" : new FormControl(),
    "activaFecha" : new FormControl(),
    "listaFecha" : new FormControl(),
    "finalizadaFecha" : new FormControl(),
    "mesaID" : new FormControl(), 
    "domicilio" : new FormControl(),
    "solicitante" : new FormControl(),
    "finalizoMozoID" : new FormControl(),
    "total" : new FormControl()
  })

  ngOnInit(): void {
    this.obtenerPedidos()    
  }

  obtenerPedidos() {
    this._mozoService.obtenerPedidos(this._mozoService.ordenID).subscribe({
      next: (x) => {
        this.dataSource = x
        this.verificarProductosCocina(x)
        this.obtenerDatos()
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

  verificarProductosCocina(pedidos:modeloPedido[]) {
    console.log(pedidos)
    pedidos.forEach(pedido => {
      if(pedido.productoCocina == 1) {
        this.productosCocina = true
      }
    })
  }

  obtenerDatos() {
    this.tokenAdmin = this._adminService.tokenAdmin
    this._mozoService.obtenerOrden(this._mozoService.ordenID).subscribe({
      next: (x) => {
        this.form.controls["numOrden"].setValue(x.numOrden)
        this.numOrden = x.numOrden
        this.form.controls["nuevaFecha"].setValue(x.nuevaFecha)
        this.form.controls["activaFecha"].setValue(x.activaFecha)
        this.form.controls["listaFecha"].setValue(x.listaFecha)
        this.form.controls["finalizadaFecha"].setValue(x.finalizadaFecha)
        this.form.controls["mesaID"].setValue(x.mesaID)        
        this.form.controls["domicilio"].setValue(x.domicilio)
        this.form.controls["solicitante"].setValue(x.solicitante)        
        this.obtenerMozo(x.finalizoMozoID)
        if(x.domicilio) {
          this.mesaFlag = false
        }
        this.form.controls["total"].setValue(x.total)
        this.estado = x.estado
        if(this.productosCocina) {
          this.desactivarImpresionComanda = false
        }
        this.inhabilitarEnvioComanda()
        this.inhabilitarEliminar()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  obtenerMozo(mozoID:number) {
    this._adminService.obtenerMozo(mozoID).subscribe({
      next: (x) => {
        this.form.controls["finalizoMozoID"].setValue(x.nombre)
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

  enviarComanda() {
    this._mozoService.enviarComanda(this.dataSource, this._mozoService.ordenID ,this._mozoService.tokenMozo).subscribe({
      next: () => {
        alert("La comanda se envio a la cocina")        
      },
      error: () => {
        alert("No se pudo enviar la comanda a la cocina")
      }
    })
  }

  imprimirComanda() {
    let comanderas:number[] = []
    this.dataSource.forEach(pedido => {
      if(!comanderas.includes(pedido.comandera) && Number(pedido.comandera)) {
        comanderas.push(pedido.comandera)
      }
    })    
    comanderas.forEach(comandera => {
    let pedidoComandera = this.dataSource.filter(element => element.comandera == comandera)  
    this.iprimirPdf(pedidoComandera, this.numOrden)
    })
  }

  iprimirPdf(pedidos:modeloPedido[], numOrden:string) {
    let pdf = new Pdf()
    let contenido = pdf.crear(pedidos, numOrden)
    pdfMake.createPdf(contenido).print()
  }

  eliminarPedido(pedidoID:number, cantidad:number, nombre:string, ) {
    if(confirm(`Esta por eliminar: ${cantidad} x ${nombre} del pedido`)){
      this._adminService.eliminarPedido(pedidoID, this.tokenAdmin).subscribe({
        next: (x) => {
          if(x.status == "ok"){
            alert(`Se elminino: ${cantidad} x ${nombre} del pedido`)
            this._dialog.closeAll()
            this._dialog.open(DetallesOrdenDialogComponent)
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  toggle(e:any, productoPedido:modeloPedido) {
    if(e.checked){
      productoPedido.cocina = 1   
    } else {      
      productoPedido.cocina = 0
    }
  }

  inhabilitarEnvioComanda() {
    if(this.estado == "activa") {
      this.desactivarEnvioComanda = false
      this.desactivarChecks = false      
    } else {
      this.desactivarEnvioComanda = true
      this.desactivarChecks = true            
    }
  }

  inhabilitarEliminar() {
    if(this.estado == "nueva" || this.estado == "activa") {      
      this.desactivarEliminar = false
    } else {
      this.desactivarEliminar = true                 
    }
  }
}
