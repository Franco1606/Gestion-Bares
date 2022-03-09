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
    "nombre" : new FormControl("", Validators.required),
    "categoriaID" : new FormControl(),
    "tokenAdmin" : new FormControl()
  })

  ngOnInit(): void {
    this.obtenerDatos()
    this.msotrarDatosEnInputs()
  }

  obtenerDatos() {
    this.form.controls["categoriaID"].setValue(this._AdminServiceApi.categoria.categoriaID)
    this.form.controls["tokenAdmin"].setValue(this._AdminServiceApi.tokenAdmin)
    this.nombre = this._AdminServiceApi.categoria.nombre    
  }

  msotrarDatosEnInputs(){
    this.form.controls["nombre"].patchValue(this.nombre)
  }

  editarCategoria() {    
    if(this.verificarCampos(this.nombre)) {
      this.quitarEspaciosFinales(this.form.value)
      this._AdminServiceApi.modificarCategoria(this.form.value).subscribe({
        next: () => {
          alert("Se actualizo el nombre de la categoria")
          location.reload()
        },
        error: () => {        
          alert("No se pudo actualizar el nombre de la categoria o no se modifico")
          location.reload()
        }
      })
    } else {
      alert("El campo de categoria es requerido")
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

  quitarEspaciosFinales(json:any){
    let keys = Object.keys(json);
    keys.forEach(key => {
      json[`${key}`] = json[`${key}`].trim()
    });    
  }

}
