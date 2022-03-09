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
  usuarioID!:number  
  tokenAdmin!:string   
  // Formulario //
  form:FormGroup = new FormGroup({
    "nombre" : new FormControl("", Validators.required),
    "usuarioID" : new FormControl(),
    "tokenAdmin" : new FormControl()
  })

  ngOnInit(): void {
    this.obtenerDatos()
  }

  obtenerDatos() {
    this.form.controls["usuarioID"].setValue(this._AdminServiceApi.usuarioID)
    this.form.controls["tokenAdmin"].setValue(this._AdminServiceApi.tokenAdmin)
  }

  agregarCategoria() {    
    this.nombre = this.form.controls["nombre"].value.trim()
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
