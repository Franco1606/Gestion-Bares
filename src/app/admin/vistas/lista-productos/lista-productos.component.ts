import { Component, ViewChild } from '@angular/core';
// Inyecciones de dependencia
import { AdminService } from "../../servicios/api/admin.service"
import { Router, ActivatedRoute } from "@angular/router"
// Modelos
import { modeloProducto } from '../../ModelosAdmin/modeloProducto';
// Dependencias para la tabla
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
// Dependencias para Dialogs
import { AgregarProductoDialogComponent } from "../../Dialogs/agregar-producto-dialog/agregar-producto-dialog.component"
import { EditarProductoDialogComponent } from "../../Dialogs/editar-producto-dialog/editar-producto-dialog.component"

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {

  constructor( private _router:Router, private _route:ActivatedRoute, private _adminServiceApi:AdminService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   ///////////// 
  nombre!:string
  usuarioID!:number
  categoriaID!:number
  tokenAdmin!:string
  productos!:modeloProducto[]
  // Tabla //
  displayedColumns = ["nombre", "accion", "publicar"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloProducto>

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]
    this.tokenAdmin = datosUsuario["tokenAdmin"]
    this.obtenerProductos()
  }
  
  obtenerProductos() {
    this.categoriaID = this._route.snapshot.params["categoriaID"]
    this._adminServiceApi.obtenerProductos(this.usuarioID, this.categoriaID).subscribe({
      next: (x) => {
        if(x.length != 0){
          this.productos = x
          this.dataSource = new MatTableDataSource<modeloProducto>(this.productos)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } 
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo conectar con la base de datos")
      }
    })
  }

  agregarProducto() {
    this._adminServiceApi.usuarioID = this.usuarioID
    this._adminServiceApi.categoria.categoriaID = this.categoriaID
    this._adminServiceApi.tokenAdmin = this.tokenAdmin
    this._dialog.open(AgregarProductoDialogComponent)
  }

  editarProducto(producto:modeloProducto) {
    this._adminServiceApi.producto = producto    
    this._adminServiceApi.tokenAdmin = this.tokenAdmin
    this._dialog.open(EditarProductoDialogComponent)
  }

  borrarProducto(productoID:number, nombre:string) {
    if(confirm(`Esta por eliminar el producto: ${nombre}`)){        
      this._adminServiceApi.eliminarProducto(productoID, this.tokenAdmin).subscribe({
        next: (x) => {
          if(x.status == "ok"){
            alert(`Se elminino el producto: ${nombre}`)
            window.location.reload()
          }
        },
        error: (err) => {
          console.log(err)
          alert("No se pudo eliminar el producto")
        }
      })
    }
  }

  cambiarMostrar(datos:modeloProducto) {
    let body = {
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      precio: datos.precio,
      mostrar: Number(!Boolean(Number(datos.mostrar))),
      productoID: datos.productoID,
      tokenAdmin: this.tokenAdmin,
    }  
    this._adminServiceApi.modificarProducto(body).subscribe({
      next: () => {
        if(body.mostrar){
          alert("Se cambio el producto a publicado")
          location.reload()
        } else {
          alert("El producto dejó de estar publicado")
          location.reload()
        }
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo actualizar el producto")
        location.reload()
      }
    })
  }

  //Filtro para el buscador de la tabla
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
