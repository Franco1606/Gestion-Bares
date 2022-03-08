import { Component, OnInit } from '@angular/core';
// Inyecciones de dependencia
import { AdminService } from "../../servicios/api/admin.service"
// Dependencias Formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-categoria-dialog',
  templateUrl: './editar-categoria-dialog.component.html',
  styleUrls: ['./editar-categoria-dialog.component.css']
})
export class EditarCategoriaDialogComponent implements OnInit {

  constructor( private _AdminServiceApi:AdminService ) { }

  //////////   Atributos de la clase   /////////////   
  nombre!:string
  categoriaID!:number  
  tokenAdmin!:string   
  // Formulario //
  form:FormGroup = new FormGroup({
    "nombre" : new FormControl("", Validators.required)
  })

  ngOnInit(): void {
    this.obtenerDatos()
    this.msotrarDatosEnInputs()
  }

  obtenerDatos() {
    this.categoriaID = this._AdminServiceApi.categoriaID
    this.nombre = this._AdminServiceApi.nombre    
    this.tokenAdmin = this._AdminServiceApi.tokenAdmin
  }

  msotrarDatosEnInputs(){
    this.form.controls["nombre"].patchValue(this.nombre)
  }

  editarCategoria() {
    this.nombre = this.form.controls["nombre"].value
    this._AdminServiceApi.modificarCategoria(this.categoriaID, this.tokenAdmin, this.nombre).subscribe({
      next: () => {
        alert("Se actualizo el nombre de la categoria")
        location.reload()
      },
      error: () => {        
        alert("No se pudo actualizar el nombre de la categoria o no se modifico")
        location.reload()
      }
    })
  }

}
