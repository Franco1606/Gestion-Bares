import { Component, ViewChild} from '@angular/core';
//Tabla
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//Modelos
import { modeloOrden } from 'src/app/mozo/ModelosMozo/modeloOrden';
//Inyeccions de dependencia
import { CocinaService } from "../../servicios/api/cocina.service"
//Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
//Dependencias dialog
import { DetallesOrdenDialogComponent } from "../../Dialogs/detalles-orden-dialog/detalles-orden-dialog.component"

@Component({
  selector: 'app-gestion-ordenes',
  templateUrl: './gestion-ordenes.component.html',
  styleUrls: ['./gestion-ordenes.component.css']
})
export class GestionOrdenesComponent {

  constructor( private _cocinaService:CocinaService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  usuarioID:number  
  cocineroID!:number   
  tokenCocina!:string
  ordenes:modeloOrden[] = []
  // Tabla //
  displayedColumns = ["numOrden", "lugar"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloOrden>

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]
    this.cocineroID = datosUsuario["cocineroID"]
    this.tokenCocina = datosUsuario["tokenCocina"]
    this.obtenerOrdenesCocina()
    setInterval(() => {this.obtenerOrdenesCocina()}, 30000)
  }

  obtenerOrdenesCocina() {
    this._cocinaService.obtenerOrdenesDeCocina(this.usuarioID, 1).subscribe({
      next: (x) => {
        if(x.length) {
          this.ordenes = x
          this.dataSource = new MatTableDataSource<modeloOrden>(this.ordenes.reverse())
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        }
      },  
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

  detallesOrden(orden:modeloOrden) {
    this._cocinaService.orden = orden
    this._cocinaService.tokenCocina = this.tokenCocina
    this._dialog.open(DetallesOrdenDialogComponent)
  }

  //Filtro para el buscador de la tabla
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
