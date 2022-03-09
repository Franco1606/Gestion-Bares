import { Component, OnInit, Type } from '@angular/core';
// Inyecciones de dependencia
import { AdminService } from "../../servicios/api/admin.service"
// Dependencias Formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-producto-dialog',
  templateUrl: './editar-producto-dialog.component.html',
  styleUrls: ['./editar-producto-dialog.component.css']
})
export class EditarProductoDialogComponent implements OnInit {

  constructor( private _AdminServiceApi:AdminService ) { }

    //////////   Atributos de la clase   /////////////  
    tokenAdmin!:string
    mostrar!:boolean
    // Formulario //
    form:FormGroup = new FormGroup({
      "nombre" : new FormControl("", Validators.required),
      "descripcion" : new FormControl(),
      "precio" : new FormControl("", Validators.required),
      "mostrar" : new FormControl(),
      "productoID" : new FormControl(),
      "tokenAdmin" : new FormControl()
    })

  ngOnInit(): void {
    this.obtenerDatos()    
  }

  obtenerDatos() {
    this.form.controls["productoID"].setValue(this._AdminServiceApi.producto.productoID)
    this.form.controls["tokenAdmin"].setValue(this._AdminServiceApi.tokenAdmin)
    this._AdminServiceApi.obtenerProducto(this._AdminServiceApi.producto.productoID).subscribe({
      next: (x) => {
        this.form.controls["nombre"].setValue(x.nombre)
        this.form.controls["descripcion"].setValue(x.descripcion)
        this.form.controls["precio"].setValue(x.precio)
        this.form.controls["mostrar"].setValue(Boolean(Number(x.mostrar)))
        this.mostrar = Boolean(Number(x.mostrar))
      }
    })
  }

  editarProducto() {
    this.form.controls["mostrar"].setValue(Number(this.form.controls["mostrar"].value))    
    let nombre = this.form.controls["nombre"].value
    let precio = this.form.controls["precio"].value
    if(this.validarString(nombre, precio)){
      this.quitarEspaciosFinales(this.form.value)
      this._AdminServiceApi.modificarProducto(this.form.value).subscribe({
        next: () => {
          alert("Se actualizo el producto")
          location.reload()
        },
        error: (err) => {
          console.log(err)
          alert("No se pudo actualizar el producto o no hubo modificiaciones")
          location.reload()
        }
      })
    } else {
      alert("Los campos nombre y precio son requeridos")
    }
  }

  validarString(...campos:string[]):boolean {
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
      if(typeof json[`${key}`] == 'string') {
        json[`${key}`] = json[`${key}`].trim()
      }
    });    
  }
}
