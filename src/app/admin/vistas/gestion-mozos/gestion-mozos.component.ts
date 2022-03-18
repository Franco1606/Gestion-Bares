import { Component, OnInit, ViewChild } from '@angular/core';
//Modelos
import { modeloMozo } from '../../ModelosAdmin/modeloMozo';
//Inyecciones de dependencias
import { AdminService } from "../../servicios/api/admin.service"
// Dependencias para la tabla
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
// Dependencias para Dialogs
import { AgregarMozoDialogComponent } from "../../Dialogs/agregar-mozo-dialog/agregar-mozo-dialog.component"
import { EditarMozoDialogComponent } from "../../Dialogs/editar-mozo-dialog/editar-mozo-dialog.component"


@Component({
  selector: 'app-gestion-mozos',
  templateUrl: './gestion-mozos.component.html',
  styleUrls: ['./gestion-mozos.component.css']
})
export class GestionMozosComponent implements OnInit {

  constructor( private _adminService:AdminService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   ///////////// 
  usuarioID!:number   
  tokenAdmin!:string
  // Tabla //
  displayedColumns = ["nombre", "accion"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloMozo>

  ngOnInit(): void {
  }

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]
    this.tokenAdmin = datosUsuario["tokenAdmin"]
    this.obtenerMozos()
  }

  obtenerMozos() {
    this._adminService.obtenerMozos(this.usuarioID).subscribe({
      next: (x) => {
        this.dataSource = new MatTableDataSource<modeloMozo>(x)    
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      },
      error: () => {
        alert("No se pudo obtener los datos de la base de datos")
      }
     })
  }

  irAgregarMozo() {
    this._adminService.usuarioID = this.usuarioID
    this._adminService.tokenAdmin = this.tokenAdmin
    this._dialog.open(AgregarMozoDialogComponent);
  }

  IrEditarMozo(mozoID:number) {
    this._adminService.mozoID = mozoID
    this._adminService.tokenAdmin = this.tokenAdmin
    this._dialog.open(EditarMozoDialogComponent)
  }

  eliminarMozo(mozoID:number, nombre:string) {
    if(confirm(`Esta por eliminar al mozo/a: ${nombre}`)){         
      this._adminService.eliminarMozo(mozoID, this.tokenAdmin).subscribe({
        next: (x) => {
          if(x.status == "ok"){
            alert(`Se elminino al mozo/a: ${nombre}`)
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
