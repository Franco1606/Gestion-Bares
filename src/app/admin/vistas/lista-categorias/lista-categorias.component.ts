import { Component, OnInit, ViewChild } from '@angular/core';
// Inyecciones de dependencia
import { AppService } from "../../../servicios/api/app.service"
import { AdminService } from "../../servicios/api/admin.service"
import { Router } from "@angular/router"
import { modeloCategoria } from '../../ModelosAdmin/modeloCategoria';
// Dependencias para la tabla
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog" 
// Dependencias para Dialogs
import { AgregarCategoriaDialogComponent } from "../../Dialogs/agregar-categoria-dialog/agregar-categoria-dialog.component"

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  constructor( private _router:Router, private _appServiceApi:AppService, private _adminServiceApi:AdminService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////  
  categoriaID!:number
  nombre!:string
  usuarioID!:number  
  usuario!:string  
  tokenAdmin!:string
  categorias!:modeloCategoria[]
  // Tabla //
  displayedColumns = ["nombre", "Accion"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloCategoria>

  ngOnInit(): void {
    if(localStorage.getItem("tokenAdmin")){
      this.tokenAdmin = localStorage.getItem("tokenAdmin") || ""
      this.obtenerUsuario()      
    } else {
      alert("Sesion expirada")
      this._router.navigateByUrl("admin/login")
    }
  }

  obtenerUsuario(){    
    this._appServiceApi.obtenerUsuarioPorToken("tokenAdmin", this.tokenAdmin).subscribe({
      next: (x) => {
        if(x.usuarioID != null) {
          this.usuarioID = x.usuarioID
          this.usuario = x.usuario
          this.obtenerCategorias()
        } else {
          alert("Sesion expirada")
          localStorage.removeItem("tokenAdmin")       
          this._router.navigateByUrl("admin/login")
        }                 
      },
      error: () => {
        alert("Sesion expirada")
        localStorage.removeItem("tokenAdmin")       
        this._router.navigateByUrl("admin/login")
      }
    })
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

  editarNombreCategoria(categoriaID:number) {

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

  }

  //Filtro para el buscador de la tabla
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
