import { Component, OnInit, ViewChild } from '@angular/core';
//Modelos
import { modeloCocinero } from '../../ModelosAdmin/modeloCocinero';
//Inyecciones de dependencias
import { AdminService } from "../../servicios/api/admin.service"
// Dependencias para la tabla
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
// Dependencias para Dialogs
import { AgregarCocineroDialogComponent } from "../../Dialogs/agregar-cocinero-dialog/agregar-cocinero-dialog.component"
import { EditarCocineroDialogComponent } from "../../Dialogs/editar-cocinero-dialog/editar-cocinero-dialog.component"

@Component({
  selector: 'app-gestion-cocineros',
  templateUrl: './gestion-cocineros.component.html',
  styleUrls: ['./gestion-cocineros.component.css']
})
export class GestionCocinerosComponent implements OnInit {

  constructor( private _adminService:AdminService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   ///////////// 
  usuarioID!:number   
  tokenAdmin!:string
  // Tabla //
  displayedColumns = ["nombre", "accion"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloCocinero>

  ngOnInit(): void {
  }

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]    
    this.tokenAdmin = datosUsuario["tokenAdmin"]
    this.obtenerCocineros()
  }

  obtenerCocineros() {
    this._adminService.obtenerCocineros(this.usuarioID).subscribe({
      next: (x) => {        
        this.dataSource = new MatTableDataSource<modeloCocinero>(x)    
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo obtener los datos de la base de datos")
      }
     })
  }

  irAgregarCocinero() {
    this._adminService.usuarioID = this.usuarioID
    this._adminService.tokenAdmin = this.tokenAdmin
    this._dialog.open(AgregarCocineroDialogComponent);
  }

  IrEditarCocinero(cocineroID:number) {
    this._adminService.cocineroID = cocineroID
    this._adminService.tokenAdmin = this.tokenAdmin
    this._dialog.open(EditarCocineroDialogComponent)
  }

  eliminarCocinero(cocineroID:number, nombre:string) {    
    if(confirm(`Esta por eliminar al cocinero/a: ${nombre}`)){         
      this._adminService.eliminarCocinero(cocineroID, this.tokenAdmin).subscribe({
        next: (x) => {
          if(x.status == "ok"){
            alert(`Se elminino al cocinero/a: ${nombre}`)
            window.location.reload()
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  //Filtro para el buscador de la tabla
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();    
  }

}
