import { Component, OnInit } from '@angular/core';
// Dependencias para la form
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Inyecciones de dependencia
import { AdminService } from "../../servicios/api/admin.service"

@Component({
  selector: 'app-editar-mozo-dialog',
  templateUrl: './editar-mozo-dialog.component.html',
  styleUrls: ['./editar-mozo-dialog.component.css']
})
export class EditarMozoDialogComponent implements OnInit {

  constructor( private _AdminServiceApi:AdminService ) { }

  //////////   Atributos de la clase   /////////////
  errorMsg!:string
  resetFlag = false
  estado = false
  // Formulario //  
  form:FormGroup = new FormGroup({
    "usuario" : new FormControl("", Validators.required),
    "nombre" : new FormControl("", Validators.required), 
    "password" : new FormControl("", Validators.required),
    "newPassword" : new FormControl(""),
    "estado" : new FormControl("", Validators.required),    
    "tokenAdmin" : new FormControl(),
    "mozoID" : new FormControl() 
  })

  ngOnInit(): void {
    this.obtenerDatos()
  }

  obtenerDatos() {
    this.form.controls["mozoID"].setValue(this._AdminServiceApi.mozoID)
    this.form.controls["tokenAdmin"].setValue(this._AdminServiceApi.tokenAdmin)
    this.obtenerMozo()
  }

  obtenerMozo() {
    this._AdminServiceApi.obtenerMozo(this._AdminServiceApi.mozoID).subscribe({
      next: (x) => {        
        this.form.controls["usuario"].setValue(x.usuario)
        this.form.controls["nombre"].setValue(x.nombre)
        this.form.controls["estado"].setValue(x.estado)
        this.form.controls["password"].setValue(x.password)
        if(x.estado == 1) {
          this.estado = true
        }
      },
      error: (err) => {
        alert("No se pudo obtener los datos de la base de datos")
        console.log(err)
      }
    })
  }

  editarMozo() {    
    console.log(this.form.value)
    this._AdminServiceApi.modificarMozo(this.form.value).subscribe({
      next: (x) => {
        if(x.status == "error") {
          this.errorMsg = x.result["error_msg"]
        } else {
          alert("Se actualizaron los datos del mozo")
          location.reload()
        }
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo actualizar los datos o no hubo modificaciones")
        location.reload()
      }
    })
  }

  reset(){    
    this.resetFlag = true
  }

}
