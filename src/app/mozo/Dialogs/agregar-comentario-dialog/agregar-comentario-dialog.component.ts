import { Component } from '@angular/core';
// Clases
import { claseProductoPedido } from "../../../carta/Clases/claseProductoPedido"
// Inyecciones de dependencia
import { MoozoService } from "../../servicios/api/moozo.service"
// Dependencias Formulario
import { FormControl, FormGroup } from '@angular/forms';
// Dependencias del Dialog 
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-comentario-dialog',
  templateUrl: './agregar-comentario-dialog.component.html',
  styleUrls: ['./agregar-comentario-dialog.component.css']
})
export class AgregarComentarioComponent {

  constructor( private _mozoService:MoozoService, private dialogRef:MatDialogRef<AgregarComentarioComponent> ) { }

  //////////   Atributos de la clase   /////////////
  // Formulario //
  form:FormGroup = new FormGroup({
    "comentario" : new FormControl("")
  })

  agregarComentario() {
    let prod = new claseProductoPedido(this._mozoService.producto)
    prod.IDinterno = this._mozoService.IDinterno       
    if(this.verificarCampos(this.form.controls["comentario"].value)) {
      prod.comentario = this.form.controls["comentario"].value
      this._mozoService.pedido.push(prod)
      this._mozoService.IDinterno += 1
    } else {
      if(this._mozoService.pedido.filter(element => element.productoID == prod.productoID && element.comentario == null).length == 0 ) {
        this._mozoService.pedido.push(prod)
        this._mozoService.IDinterno += 1
      } else {
        alert("Este producto ya se agrego al pedido, puede agregar otro de este tipo con un comentario")
      }
    }
    console.log(this._mozoService.pedido)
    this.dialogRef.close()    
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
