import { Component, OnInit } from '@angular/core';
// Inyecciones de dependencia
import { AdminService } from "../../servicios/api/admin.service"
// Dependencias Formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-categoria-dialog',
  templateUrl: './agregar-categoria-dialog.component.html',
  styleUrls: ['./agregar-categoria-dialog.component.css']
})
export class AgregarCategoriaDialogComponent implements OnInit {

  constructor( private _AdminServiceApi:AdminService ) { }  
  
  //////////   Atributos de la clase   /////////////   
  nombre!:string
  comentario!:number
  mitad!:number
  cocina!:number
  usuarioID!:number  
  tokenAdmin!:string
  // Formulario //
  form:FormGroup = new FormGroup({
    "nombre" : new FormControl("", Validators.required),
    "comentario" : new FormControl(false),
    "mitad" : new FormControl(false),
    "cocina" : new FormControl(false),
    "comandera" : new FormControl(),
    "usuarioID" : new FormControl(),
    "tokenAdmin" : new FormControl()
  })

  ngOnInit(): void {
    this.obtenerDatos()
  }

  obtenerDatos() {
    this.form.controls["comandera"].disable()
    this.form.controls["usuarioID"].setValue(this._AdminServiceApi.usuarioID)
    this.form.controls["tokenAdmin"].setValue(this._AdminServiceApi.tokenAdmin)
  }

  agregarCategoria() {    
    this.nombre = this.form.controls["nombre"].value.trim()
    this.form.controls["comentario"].setValue(Number(this.form.controls["comentario"].value))
    this.form.controls["mitad"].setValue(Number(this.form.controls["mitad"].value))
    this.form.controls["cocina"].setValue(Number(this.form.controls["cocina"].value))
    if(this.verificarCampos(this.nombre)) {
      this.quitarEspaciosFinales(this.form.value)
      this._AdminServiceApi.agregarCategoria(this.form.value).subscribe({
        next: () => {
          alert(`Se agrego la categoria: ${this.nombre}`)
          location.reload()
        },  
        error: (err) => {
          console.log(err)
          alert(`No se pudo agregar la categoria: ${this.nombre}`)
          location.reload()
        }
      })
    } else {
      alert("El campo de categoria es requerido")
    }
  }

  cambiarComandera(checked:boolean) {
    if(!checked) {
      this.form.controls["comandera"].disable()
    } else if(checked && !Boolean(this.form.controls["comandera"].value)) {
      this.form.controls["comandera"].enable()
      this.form.controls["comandera"].setValue(1)
    } else if(checked) {
      this.form.controls["comandera"].enable()
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
      if(typeof(json[`${key}`]) == "string" )
      json[`${key}`] = json[`${key}`].trim()
    });    
  }
}
