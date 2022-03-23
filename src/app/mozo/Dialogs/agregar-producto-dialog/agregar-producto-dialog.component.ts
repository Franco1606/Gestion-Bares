import { Component, OnInit } from '@angular/core';
// Dependencias Formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { modeloCategoria } from 'src/app/admin/ModelosAdmin/modeloCategoria';
// Inyecciones de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"
//Clases
import { claseProductoPedido } from "../../../carta/Clases/claseProductoPedido"
import { modeloProductoPedido } from 'src/app/carta/ModelosCarta/modeloProductoPedido';

@Component({
  selector: 'app-agregar-producto-dialog',
  templateUrl: './agregar-producto-dialog.component.html',
  styleUrls: ['./agregar-producto-dialog.component.css']
})
export class AgregarProductoComponent implements OnInit {

  constructor( private _mozoService:MoozoService ) { }

  //////////   Atributos de la clase   /////////////
  categoria!:modeloCategoria
  producto!:modeloProductoPedido
  // Formulario //
  form:FormGroup = new FormGroup({
    "comentario" : new FormControl(""),
  })

  ngOnInit(): void {
    this.categoria = this._mozoService.categoria
    this.producto = this._mozoService.producto
  }

  pasarCantidad(e:number) {
    this._mozoService.producto.cantidad = e
  }

  agregar() {
    let prod = new claseProductoPedido(this._mozoService.producto)
    prod.IDinterno = this._mozoService.IDinterno       
    if(this.verificarCampos(this.form.controls["comentario"].value)) {
      prod.comentario = this.form.controls["comentario"].value
      this._mozoService.pedido.push(prod)
      this._mozoService.IDinterno += 1
      console.log(this._mozoService.pedido)
    } else {
      if(this._mozoService.pedido.filter(element => element.productoID == prod.productoID && element.comentario == null).length == 0 ) {
        this._mozoService.pedido.push(prod)
        this._mozoService.IDinterno += 1
        console.log(this._mozoService.pedido)
      } else {
        alert("Este producto ya se agrego al pedido, puede agregar otro de este tipo con un comentario")
      }
    }       
  } 

  verificarCampos(...campos:string[]):boolean {
    let verificador = true
    campos.forEach(campo => {
      if(campo.trim() == "") {
        verificador = false
      }
    });
    return verificador
  }
}
