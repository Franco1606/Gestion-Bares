import { Component, OnInit } from '@angular/core';
// Inyecciones de dependencia
import { AdminService } from "../../servicios/api/admin.service"
// Dependencias Formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-producto-dialog',
  templateUrl: './agregar-producto-dialog.component.html',
  styleUrls: ['./agregar-producto-dialog.component.css']
})
export class AgregarProductoDialogComponent implements OnInit {

  constructor( private _AdminServiceApi:AdminService ) { }

  //////////   Atributos de la clase   /////////////  
  usuarioID!:number
  categoriaID!:number
  tokenAdmin!:string   
  // Formulario //
  form:FormGroup = new FormGroup({
    "nombre" : new FormControl("", Validators.required),
    "descripcion" : new FormControl(),
    "precio" : new FormControl("", Validators.required),
    "usuarioID" : new FormControl(),
    "categoriaID" : new FormControl(),
    "categoriaNombre" : new FormControl(),
    "tokenAdmin" : new FormControl()
  })

  ngOnInit(): void {
    this.obtenerDatos()
    this.obtenerCategoria()
  }

  obtenerDatos() {
    this.form.controls["usuarioID"].setValue(this._AdminServiceApi.usuarioID)
    this.form.controls["categoriaID"].setValue(this._AdminServiceApi.categoriaID)
    this.form.controls["tokenAdmin"].setValue(this._AdminServiceApi.tokenAdmin)
  }

  obtenerCategoria() {
    this._AdminServiceApi.obtenerCategoria(this._AdminServiceApi.categoriaID).subscribe({
      next: (x) => {
        this.form.controls["categoriaNombre"].setValue(x.nombre)        
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  agregarProducto() {    
    let nombre = this.form.controls["nombre"].value
    let precio = this.form.controls["precio"].value    
    if(this.validarString(nombre, precio)) {
      this.quitarEspaciosFinales(this.form.value)
      this._AdminServiceApi.agregarProducto(this.form.value).subscribe({
        next: () => {
          alert(`Se agrego el producto: ${this.form.controls["nombre"].value}`)
          location.reload()
        },  
        error: (err) => {
          console.log(err)
          alert(`No se pudo agregar el producto: ${this.form.controls["nombre"].value}`)
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
