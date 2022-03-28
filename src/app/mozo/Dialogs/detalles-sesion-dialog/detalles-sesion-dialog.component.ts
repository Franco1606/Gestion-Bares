import { Component, OnInit } from '@angular/core';
//Inyeccions de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"
import { CartaService } from "../../../carta/servicios/api/carta.service"
import { AdminService } from "../../../admin/servicios/api/admin.service"
import { Router } from "@angular/router"
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
//Modelos
import { modeloOrden } from '../../ModelosMozo/modeloOrden';
// Dependencias para Dialogs
import { DetallesOrdenDialogComponent } from "../detalles-orden-dialog/detalles-orden-dialog.component"
import { CerrarMesaDialogComponent } from '../cerrar-mesa-dialog/cerrar-mesa-dialog.component';

@Component({
  selector: 'app-detalles-sesion-dialog',
  templateUrl: './detalles-sesion-dialog.component.html',
  styleUrls: ['./detalles-sesion-dialog.component.css']
})
export class DetallesSesionDialogComponent implements OnInit {

  constructor( private _mozoService:MoozoService, private _cartaService:CartaService, private _adminService:AdminService, private _dialog:MatDialog, private _router:Router ) { }

  //////////   Atributos de la clase   /////////////   
  //Variables pasadas por servicio
  usuarioID!:number
  mesaID!:number
  sesionID!:number
  tokenMozo!:string
  tokenAdmin!:string
  llamarMozo!:number
  // Tabla //
  displayedColumns = ["numOrden", "estado"]
  dataSource!:modeloOrden[]

  ngOnInit(): void {
    this.obtenerVarPorServicio()
    this.obtenerOrdenes()
  }

  obtenerVarPorServicio() {
    this.llamarMozo = this._mozoService.sesion.llamarMozo
    this.usuarioID = this._mozoService.usuarioID
    this.mesaID = this._mozoService.sesion.mesaID
    this.sesionID = this._mozoService.sesion.sesionID
    this.tokenMozo = this._mozoService.tokenMozo
    this.tokenAdmin = this._adminService.tokenAdmin
  }

  obtenerOrdenes() {
    this._mozoService.obtenerOrdenesXSesion(this.sesionID).subscribe({
      next: (x) => {
        this.dataSource = x
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo obtener los datos de la base de datos")
      }
    })
  }  

  irDetallesOrden(ordenID:number) {
    this._mozoService.ordenID = ordenID
    let dialogRef = this._dialog.open(DetallesOrdenDialogComponent)
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.obtenerOrdenes()
      }
    })
  }

  cerrarMesa() {
    this._mozoService.obtenerOrdenesXSesion(this.sesionID).subscribe({
      next: (x) => {
        if(x.length > 0) {
          if(x.filter(element => element.estado == "nueva" || element.estado == "lista" || element.estado == "activa").length == 0) {
            this._dialog.open(CerrarMesaDialogComponent)
          } else {
            alert("No se puede cerrar la mesa con ordenes nuevas, listas o activas, debe finalizar todas las ordenes")          
          }
        } else {
          this._mozoService.cambiarEstadoSesion("cerrada", this.sesionID, this.tokenMozo, this.tokenAdmin).subscribe({
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
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)        
      }
    })        
  }

  atenderLlamada() {
    this._cartaService.llamarMozo(this.usuarioID, this.mesaID, 0).subscribe({
      next: () => {
        alert("Se atendió la llamada de esta mesa")
        location.reload()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  tomarPedido() {
    this._mozoService.pedido = []
    this._mozoService.mesaID = this.mesaID
    this._router.navigateByUrl("/mozo/pedido-mozo")
    this._dialog.closeAll()
  }
}
