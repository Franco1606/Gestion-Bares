import { Component, OnInit, ViewChild } from '@angular/core';
// Inyecciones de dependencia
import { AdminService } from "../../../admin/servicios/api/admin.service"
import { MoozoService } from "../../servicios/api/moozo.service"
import { ActivatedRoute, Router } from "@angular/router"
// Modelos
import { modeloProducto } from '../../../admin/ModelosAdmin/modeloProducto';
import { modeloProductoPedido } from 'src/app/carta/ModelosCarta/modeloProductoPedido';
import { modeloCategoria } from 'src/app/admin/ModelosAdmin/modeloCategoria';
// Dependencias para la tabla
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
// Dependencias para Dialogs
import { AgregarComentarioComponent } from "../../Dialogs/agregar-comentario-dialog/agregar-comentario-dialog.component"
import { VerPedidoDialogComponent } from '../../Dialogs/ver-pedido-dialog/ver-pedido-dialog.component';
//Clases
import { claseProductoPedido } from 'src/app/carta/Clases/claseProductoPedido';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{  

  constructor( private _adminService:AdminService, private _mozoService:MoozoService, private _route:ActivatedRoute, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  usuarioID!:number
  mozoID!:number
  tokenMozo!:string
  categoria!:modeloCategoria
  categoriaID!:number 
  productos!:modeloProducto[]
  pedido:claseProductoPedido[] = []
  IDinterno = 0 
  // Tabla //
  displayedColumns = ["nombre", "accion"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloProducto>

  ngOnInit(): void {
    this.obtenerDatos()
  }

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]
    this.mozoID = datosUsuario["mozoID"]
    this.tokenMozo = datosUsuario["tokenMozo"]
    this.pedido = this._mozoService.pedido
    this.obtenerProductos()    
  }

  obtenerDatos() {
    this.categoriaID = this._route.snapshot.params["categoriaID"]
    this.obtenerCategoria()        
  }

  obtenerCategoria() {
    this._adminService.obtenerCategoria(this.categoriaID).subscribe({
      next: (x) => {
        this._mozoService.categoria = x
        this.categoria = x
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

  obtenerProductos(){
    this._adminService.obtenerProductos(this.usuarioID, this.categoriaID).subscribe({
      next: (x) => {
        this.productos = x
        this.dataSource = new MatTableDataSource<modeloProducto>(this.productos)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo obtener los datos del servidor")
      }
    })
  }

  verPedido() {
    this._mozoService.usuarioID = this.usuarioID
    this._mozoService.mozoID = this.mozoID
    this._mozoService.tokenMozo = this.tokenMozo
    let dialogRef = this._dialog.open(VerPedidoDialogComponent)
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.pedido = this._mozoService.pedido
      }
    })
  }

  pasarCantidad(e:number, productoPedido:modeloProductoPedido) {
    productoPedido.cantidad = e
  }

  agregar(producto:modeloProductoPedido, comentario:number) {    
    if(comentario == 1) {      
      let dialogRef = this._dialog.open(AgregarComentarioComponent)
      this._mozoService.pedido = this.pedido
      this._mozoService.producto = producto
      this._mozoService.IDinterno = this.IDinterno
      dialogRef.afterClosed().subscribe({
        next: () => {
          this.pedido = this._mozoService.pedido
          this.IDinterno = this._mozoService.IDinterno        
        }
      })
      console.log(this._mozoService.pedido)

    } else {
      if( this.pedido.filter(element =>  element.productoID == producto.productoID && element.comentario == null).length == 0 ) {      
        let prod = new claseProductoPedido(producto)
        prod.IDinterno = this.IDinterno
        this.pedido.push(prod)
        this.IDinterno += 1
      } else {
        alert("Este producto ya se agrego al pedido")
      }
      console.log(this._mozoService.pedido)
    }
  }

  //Filtro para el buscador de la tabla
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
