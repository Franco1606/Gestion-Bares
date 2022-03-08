import { Component, ViewChild } from '@angular/core';
// Inyecciones de dependencia
import { AppService } from "../../../servicios/api/app.service"
import { AdminService } from "../../servicios/api/admin.service"
import { Router } from "@angular/router"
// Modelos
import { modeloProducto } from '../../ModelosAdmin/modeloProducto';
// Dependencias para la tabla
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {

  constructor( private _router:Router, private _appServiceApi:AppService, private _adminServiceApi:AdminService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   ///////////// 
  nombre!:string
  usuarioID!:number  
  tokenAdmin!:string
  productos!:modeloProducto[]
  // Tabla //
  displayedColumns = ["nombre", "accion", "publicar"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloProducto>

  obtenerUsuario(usuarioID:number) {
    this.usuarioID = usuarioID
  }  

  //Filtro para el buscador de la tabla
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
