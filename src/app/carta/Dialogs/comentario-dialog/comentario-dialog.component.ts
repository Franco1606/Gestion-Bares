import { Component } from '@angular/core';
// Clases
import { claseProductoPedido } from "../../Clases/claseProductoPedido"
// Inyecciones de dependencia
import { CartaService } from "../../servicios/api/carta.service"
// Dependencias Formulario
import { FormControl, FormGroup } from '@angular/forms';
// Dependencias del Dialog 
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comentario-dialog',
  templateUrl: './comentario-dialog.component.html',
  styleUrls: ['./comentario-dialog.component.css']
})
export class ComentarioDialogComponent {

  constructor( private _cartaServiceApi:CartaService, private dialogRef:MatDialogRef<ComentarioDialogComponent> ) { }

  //////////   Atributos de la clase   /////////////
    // Formulario //
    form:FormGroup = new FormGroup({
      "comentario" : new FormControl("")
    })

  agregarComentario() {
    let prod = new claseProductoPedido(this._cartaServiceApi.producto)
    prod.IDinterno = this._cartaServiceApi.IDinterno       
    if(this.verificarCampos(this.form.controls["comentario"].value)) {
      prod.comentario = this.form.controls["comentario"].value
      this._cartaServiceApi.pedidos.push(prod)
      this._cartaServiceApi.IDinterno += 1
    } else {
      if(this._cartaServiceApi.pedidos.filter(element => element.productoID == prod.productoID && element.comentario == null).length == 0 ) {
        this._cartaServiceApi.pedidos.push(prod)
        this._cartaServiceApi.IDinterno += 1
      } else {
        alert("Este producto ya se agrego al pedido, puede agregar otro de este tipo con un comentario")
      }
    }
    console.log(this._cartaServiceApi.pedidos)
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
