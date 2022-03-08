import { Component, ViewChild } from '@angular/core';
// Inyecciones de dependencia
import { AppService } from "../../../servicios/api/app.service"
import { AdminService } from "../../servicios/api/admin.service"
import { Router } from "@angular/router"
// Modelos
import { modeloCategoria } from '../../ModelosAdmin/modeloCategoria';
// Dependencias para la tabla
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog" 
// Dependencias para Dialogs
import { AgregarCategoriaDialogComponent } from "../../Dialogs/agregar-categoria-dialog/agregar-categoria-dialog.component"
import { EditarCategoriaDialogComponent } from "../../Dialogs/editar-categoria-dialog/editar-categoria-dialog.component"

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent {

  constructor( private _router:Router, private _appServiceApi:AppService, private _adminServiceApi:AdminService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////  
  categoriaID!:number
  nombre!:string
  usuarioID!:number   
  tokenAdmin!:string
  categorias!:modeloCategoria[]
  // Tabla //
  displayedColumns = ["nombre", "accion"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloCategoria>

  obtenerUsuario(usuarioID:number) {
    this.usuarioID = usuarioID
    this.obtenerCategorias()
  }  

  obtenerCategorias(){
    this._adminServiceApi.obtenerCategorias(this.usuarioID).subscribe({
      next: (x) => {
        this.categorias = x
        this.dataSource = new MatTableDataSource<modeloCategoria>(this.categorias)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo obtener los datos del servidor")
      }
    })
  }

  agregarCategoria() {
    this._dialog.open(AgregarCategoriaDialogComponent)
    this._adminServiceApi.usuarioID = this.usuarioID    
    this._adminServiceApi.tokenAdmin = this.tokenAdmin
  }

  editarNombreCategoria(categoriaID:number, nombre:string) {
    this._dialog.open(EditarCategoriaDialogComponent)    
    this._adminServiceApi.categoriaID = categoriaID
    this._adminServiceApi.nombre = nombre    
    this._adminServiceApi.tokenAdmin = this.tokenAdmin
  }

  borrarCategoria(categoriaID:number, nombre:string) {
    if(confirm(`Esta por eliminar la categoria: ${nombre}`)){        
      this._adminServiceApi.eliminarCategoria(categoriaID, this.tokenAdmin).subscribe({
        next: (x) => {
          if(x.status == "ok"){
            alert(`Se elminino la categoria: ${nombre}`)
            window.location.reload()
          }
        },
        error: (err) => {
          console.log(err)
          alert("No se pudo eliminar la categoria")
        }
      })
    }
  }

  irListaProductos(productoID:number) {    
    this._adminServiceApi.productoID = productoID
    this._router.navigateByUrl(`admin/lista-productos/${productoID}`)
  }

  //Filtro para el buscador de la tabla
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
