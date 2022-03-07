import { Component, OnInit } from '@angular/core';
// Inyecciones de dependencia
import { AdminService } from "../../servicios/api/admin.service"
// Dependencias Formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Dependencia para navegar a otra url
import { Router } from "@angular/router"

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
    "nombre" : new FormControl("", Validators.required)
  })

  ngOnInit(): void {
    this.obtenerDatos()
  }

  obtenerDatos() {
    this.usuarioID = this._AdminServiceApi.usuarioID    
    this.tokenAdmin = this._AdminServiceApi.tokenAdmin
  }

  agregarCategoria() {    
    this.nombre = this.form.controls["nombre"].value.trim()
    this._AdminServiceApi.agregarCategoria(this.usuarioID, this.tokenAdmin, this.nombre).subscribe({
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
  }

}
