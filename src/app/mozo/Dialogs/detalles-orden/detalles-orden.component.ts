import { Component, OnInit } from '@angular/core';
//Form
import { FormControl, FormGroup } from '@angular/forms';
//Modelos
import { modeloPedido } from '../../ModelosMozo/modeloPedido';
//Inyeccions de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"

@Component({
  selector: 'app-detalles-orden',
  templateUrl: './detalles-orden.component.html',
  styleUrls: ['./detalles-orden.component.css']
})
export class DetallesOrdenComponent implements OnInit {

  constructor( private _mozoService:MoozoService ) { }

  //////////   Atributos de la clase   /////////////   
  estado!:string
  estados = ["activa","finalizada"]
  mesaFlag = true
  desactivarChecks!:boolean
  desactivarEliminar!:boolean
  desactivarEnvioComanda!:boolean
  // Tabla //
  displayedColumns = ["cantidad","producto","precio", "cocina", "borrar"]
  dataSource:modeloPedido[]
  // Formulario
  form:FormGroup = new FormGroup({
    "estado" : new FormControl(),
    "numOrden" : new FormControl(),
    "nuevaFecha" : new FormControl(),
    "activaFecha" : new FormControl(),
    "listaFecha" : new FormControl(),
    "finalizadaFecha" : new FormControl(),
    "mesaID" : new FormControl(), 
    "domicilio" : new FormControl(),
    "total" : new FormControl()
  })

  ngOnInit(): void {
    this.obtenerPedidos()
    this.obtenerDatos()
  }

  obtenerPedidos() {
    this._mozoService.obtenerPedidos(this._mozoService.orden.ordenID).subscribe({
      next: (x) => {
        this.dataSource = x
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

  obtenerDatos() {
    this._mozoService.obtenerOrden(this._mozoService.orden.ordenID).subscribe({
      next: (x) => {        
        this.form.controls["estado"].setValue(x.estado)
        this.form.controls["numOrden"].setValue(x.numOrden)
        this.form.controls["nuevaFecha"].setValue(x.nuevaFecha)
        this.form.controls["activaFecha"].setValue(x.activaFecha)
        this.form.controls["listaFecha"].setValue(x.listaFecha)
        this.form.controls["finalizadaFecha"].setValue(x.finalizadaFecha)
        this.form.controls["mesaID"].setValue(x.mesaID)        
        this.form.controls["domicilio"].setValue(x.domicilio)
        if(x.domicilio) {
          this.mesaFlag = false
        }
        this.form.controls["total"].setValue(x.total)
        this.estado = x.estado
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  cambiarEstado(estado:string) {    
    this._mozoService.cambiarEstado(estado, this._mozoService.orden.ordenID, this._mozoService.tokenMozo).subscribe({
      next: () => {
        alert("Se actualizo el estado de la orden")
        location.reload()
      },
      error: () => {
        alert("ERROR: No se pudo actualizar el estado de la orden")
        location.reload()
      }
    })
  }

  enviarComanda() {

  }

  toggle(e:any, productoPedido:modeloPedido) {

  }

  eliminarPedido(pedidoID:number, cantidad:number, nombre:string) {

  }

}
