import { Component, OnInit } from '@angular/core';
// Inyecciones de dependencia
import { CartaService } from "../../servicios/api/carta.service"
// Dependencias Formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comentario-dialog',
  templateUrl: './comentario-dialog.component.html',
  styleUrls: ['./comentario-dialog.component.css']
})
export class ComentarioDialogComponent {

  constructor( private _cartaServiceApi:CartaService ) { }

  //////////   Atributos de la clase   /////////////
    // Formulario //
    form:FormGroup = new FormGroup({
      "comentario" : new FormControl(),
    })

  agregarComentario() {
    this._cartaServiceApi.comentario = this.form.controls["comentario"].value || ""
  } 
}
