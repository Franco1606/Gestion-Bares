import { Component, OnInit } from '@angular/core';
//Form
import { FormControl, FormGroup } from '@angular/forms';
//Modelos
import { modeloPedido } from '../../ModelosMozo/modeloPedido';
//Inyeccions de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"
import { AdminService } from "../../../admin/servicios/api/admin.service"
// Dependencias Angular Material
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
// Dialogs
import { DetallesSesionDialogComponent } from '../detalles-sesion-dialog/detalles-sesion-dialog.component';
//Clases
import { Pdf } from "../../../admin/plantillas/pdf"
// Dependencias pdfMake
import pdfMake from "pdfmake/build/pdfMake"
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detalles-orden',
  templateUrl: './detalles-orden-dialog.component.html',
  styleUrls: ['./detalles-orden-dialog.component.css']
})
export class DetallesOrdenDialogComponent implements OnInit {

  constructor( private _mozoService:MoozoService, private _adminService:AdminService, private _dialog:MatDialog, private dialogRef:MatDialogRef<DetallesOrdenDialogComponent> ) { }

  //////////   Atributos de la clase   /////////////   
  estado!:string
  estados = ["activa","finalizada"]
  mesaFlag!:boolean
  finalizanteFlag!:boolean
  desactivarChecks!:boolean
  desactivarEliminar!:boolean
  desactivarEnvioComanda!:boolean
  desactivarImpresionComanda = true
  numOrden!:string
  //Variables pasadas por servicio
  ordenID!:number
  sesionID!:number
  mozoID!:number
  tokenMozo!:string
  tokenAdmin!:string
  token!:string
  // Tabla //
  displayedColumns = ["cantidad","producto","precio", "cocina", "borrar"]
  dataSource:modeloPedido[]
  // Formulario
  form:FormGroup = new FormGroup({
    "estado" : new FormControl(),
    "numOrden" : new FormControl(),
    "nuevaFecha" : new FormControl(),
    "activaFecha" : new FormControl(),
    "listaFecha" : new FormControl(),
    "finalizadaFecha" : new FormControl(),
    "mesaID" : new FormControl(), 
    "domicilio" : new FormControl(),
    "finalizoMozoID" : new FormControl(),
    "total" : new FormControl()
  })

  ngOnInit(): void {
    this.obtenerVarPorServicio()
    this.obtenerOrden()    
  }

  obtenerVarPorServicio() {
    this.ordenID = this._mozoService.ordenID
    this.sesionID = this._mozoService.sesion.sesionID
    this.mozoID = this._mozoService.mozoID
    this.tokenMozo = this._mozoService.tokenMozo
    this.tokenAdmin = this._adminService.tokenAdmin
    if(this.tokenMozo){
      this.displayedColumns = this.displayedColumns.filter(element => element != "borrar")
    } else if(this.tokenAdmin){
      this.estados = ["activa", "lista","finalizada"]
    }
  } 

  obtenerOrden() {
    this._mozoService.obtenerOrden(this.ordenID).subscribe({
      next: (x) => {
        this.form.setValue({
          estado: x.estado,
          numOrden: x.numOrden,
          nuevaFecha: x.nuevaFecha,
          activaFecha: x.activaFecha,
          listaFecha: x.listaFecha,
          finalizadaFecha: x.finalizadaFecha,
          mesaID: x.mesaID,
          domicilio: x.domicilio,
          total: x.total,
          finalizoMozoID: x.finalizoMozoID
        })
        this.mesaFlag = Boolean(x.mesaID)
        this.finalizanteFlag = Boolean(x.finalizoMozoID)        
        this.estado = x.estado        
        this.numOrden = x.numOrden
        this.obtenerMozo(x.finalizoMozoID)
        this.inhabilitarActivar()
        this.inhabilitarFinalizar()
        this.inhabilitarEnvioComanda()
        this.inhabilitarEliminar()

        this.obtenerPedidos()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  obtenerMozo(mozoID:number) {
    this._adminService.obtenerMozo(mozoID).subscribe({
      next: (x) => {
        if(this.estado == "finalizada") {
          if(x) {
            this.form.controls["finalizoMozoID"].setValue(x.nombre)
          } else {
            this.form.controls["finalizoMozoID"].setValue("Administrador")
          }
        }
      },
      error: (err) => {
        alert("No se pudo obtener los datos del mozo")
      }
    })
  }

  obtenerPedidos() {
    this._mozoService.obtenerPedidos(this.ordenID).subscribe({
      next: (x) => {
        this.dataSource = x
        x.forEach(element => {          
          if(Number(element.comandera)) {
            this.desactivarImpresionComanda = false
            if(this.estado == "activa" && this.tokenMozo) {
              this.estados.pop()
            }
          }
        })
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

  cambiarEstado(estado:string) {
    if(this.mozoID) {
      this._mozoService.cambiarEstado(estado, this.ordenID, this.sesionID, this.mozoID, this.tokenMozo, this.tokenAdmin).subscribe({
        next: () => {
          alert("Se actualizo el estado de la orden")
          if(estado == "finalizada") {
            this._dialog.closeAll()
            if(this.mozoID != 9999) {
              this._dialog.open(DetallesSesionDialogComponent)
            }
          } else {
            this._dialog.closeAll()
            this._dialog.open(DetallesOrdenDialogComponent)
          }
        },
        error: () => {
          alert("ERROR: Hubo un error al actualizar el estado de la orden")
          location.reload()
        }
      })
    } else {
      alert("La mesa debe tener un mozo asignado")
    }
  }

  enviarComanda() {
    this._mozoService.enviarComanda(this.dataSource, this.ordenID ,this.token).subscribe({
      next: () => {
        alert("La comanda se envio a la cocina")
        this.dialogRef.close()
        
      },
      error: () => {
        alert("No se pudo enviar la comanda a la cocina")
      }
    })
  }

  imprimirComanda() {
    this.iprimirPdf(this.dataSource, this.numOrden)
    this._adminService.marcarImpresa(this.ordenID, 1, this.tokenAdmin).subscribe({
      next: () => {},
      error: (err) => {
          console.log(err)
      }
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

  inhabilitarFinalizar() {
    if(this.estado == "nueva") {
      this.estados = this.estados.filter(element => element != "finalizada")      
    }
  }

  inhabilitarActivar() {
    if(this.estado == "lista" || this.estado == "activa" || this.estado == "finalizada") {
      this.estados = this.estados.filter(element => element != "activa")      
    }
  }

}
