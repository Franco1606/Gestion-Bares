import { Component, OnInit } from '@angular/core';
// Dependencias para la form
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Inyecciones de dependencia
import { AdminService } from "../../servicios/api/admin.service"

@Component({
  selector: 'app-agregar-mozo-dialog',
  templateUrl: './agregar-mozo-dialog.component.html',
  styleUrls: ['./agregar-mozo-dialog.component.css']
})
export class AgregarMozoDialogComponent implements OnInit {

  constructor( private _AdminServiceApi:AdminService ) { }

  //////////   Atributos de la clase   ///////////// 
  errorMsg!:string
  // Formulario //  
  form:FormGroup = new FormGroup({
    "usuario" : new FormControl("", Validators.required),
    "nombre" : new FormControl("", Validators.required), 
    "password" : new FormControl("", Validators.required),
    "estado" : new FormControl("", Validators.required),    
    "tokenAdmin" : new FormControl(),
    "usuarioID" : new FormControl() 
  })

  ngOnInit(): void {
    this.obtenerDatos()
  }

  obtenerDatos() {
    this.form.controls["usuarioID"].setValue(this._AdminServiceApi.usuarioID)
    this.form.controls["tokenAdmin"].setValue(this._AdminServiceApi.tokenAdmin)
  }
  
  agregarMozo() {
    let nombre = this.form.controls["nombre"].value
    let password = this.form.controls["password"].value
    let usuario = this.form.controls["usuario"].value
    let estado = this.form.controls["estado"].value    
    if(this.validarString([nombre, password, usuario, estado])) {
      this._AdminServiceApi.agregarMozo(this.form.value).subscribe({
        next: (x) => {
          if(x.status == "ok"){
            alert(`Se agrego el mozo/a: ${nombre.trim()}`)
            window.location.reload()
          } else {
            this.errorMsg = x.result["error_msg"];
          }
        },
        error: (err) => {alert("Status: " + err.status + "\n" + "Error: " + err.statusText)}        
      })
    }
    else {
      alert("Faltan campoas por completar")      
    }
  }

  private validarString(stringArray:string[]):boolean {
    let validationResult = true
    stringArray.forEach(string => {
      if(string.trim() == "") {
        validationResult = false        
      }        
    });    
    return validationResult
  }
}
