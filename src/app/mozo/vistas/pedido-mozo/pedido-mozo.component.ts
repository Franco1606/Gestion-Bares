import { Component, OnInit, ViewChild } from '@angular/core';
// Inyecciones de dependencia
import { AdminService } from "../../../admin/servicios/api/admin.service"
import { MoozoService } from "../../servicios/api/moozo.service"
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// Modelos
import { modeloCategoria } from '../../../admin/ModelosAdmin/modeloCategoria';
import { claseProductoPedido } from 'src/app/carta/Clases/claseProductoPedido';
// Dependencias para la tabla
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// Dependencia para dialogs
import { VerPedidoDialogComponent } from "../../Dialogs/ver-pedido-dialog/ver-pedido-dialog.component"

@Component({
  selector: 'app-pedido-mozo',
  templateUrl: './pedido-mozo.component.html',
  styleUrls: ['./pedido-mozo.component.css']
})
export class PedidoMozoComponent implements OnInit{

  constructor( private _router:Router, private _adminService:AdminService, private _mozoService:MoozoService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  usuarioID!:number
  mozoID!:number
  tokenMozo!:string
  categorias!:modeloCategoria[]
  pedido:claseProductoPedido[] = []
  mesaID!:number
  IDinterno!:number
  // Tabla //
  displayedColumns = ["nombre"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!:MatTableDataSource<modeloCategoria>

  ngOnInit(): void {
    this.mesaID = this._mozoService.mesaID
  }

  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]
    this.mozoID = datosUsuario["mozoID"]
    this.tokenMozo = datosUsuario["tokenMozo"]
    this.pedido = this._mozoService.pedido
    this.verificarIDinterno()
    this.obtenerCategorias()
  }  

  obtenerCategorias(){
    this._adminService.obtenerCategorias(this.usuarioID).subscribe({
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

  irListaProductos(categoria:modeloCategoria) {
    this._router.navigateByUrl(`mozo/productos/${categoria.categoriaID}`)
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

  verificarIDinterno() { 
    if(this.pedido.length){
      let mayor
      for (let i = 0; i < this.pedido.length-1; i++) {
        if(this.pedido[i].IDinterno > this.pedido[i+1].IDinterno) {
          mayor = this.pedido[i].IDinterno
        } else {
          mayor = this.pedido[i+1].IDinterno
        }
      }
      this.IDinterno = mayor + 1     
    } else {
      this.IDinterno = 0
    }
  }

  //Filtro para el buscador de la tabla
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
