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
  desactivarHappy!:boolean
  // Formularios //
  form:FormGroup = new FormGroup({
    "nombre" : new FormControl("", Validators.required),
    "comentario" : new FormControl("", Validators.required),
    "mitad" : new FormControl("", Validators.required),
    "cocina" : new FormControl("", Validators.required),
    "categoriaID" : new FormControl(),
    "tokenAdmin" : new FormControl()
  })
  formHappy:FormGroup = new FormGroup({
    "estado" : new FormControl("", Validators.required),
    "inicio" : new FormControl("", Validators.required),
    "fin" : new FormControl("", Validators.required),
    "usuarioID" : new FormControl(),
    "categoriaID" : new FormControl(),
    "lunes" : new FormControl(),
    "martes" : new FormControl(),
    "miercoles" : new FormControl(),
    "jueves" : new FormControl(),
    "viernes" : new FormControl(),
    "sabado" : new FormControl(),
    "domingo" : new FormControl(),
    "tokenAdmin" : new FormControl(),
  })
  //Select
  horas = ["00:00","00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",  "04:00", "04:30",  "05:00", "05:30",  "06:00", "06:30",  "07:00", "07:30",  "08:00", "08:30",  "09:00", "09:30",  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]

  ngOnInit(): void {
    this.obtenerDatos()
    this.verificarPosibiliadHappy()
  }

  obtenerDatos() {
    this.form.controls["categoriaID"].setValue(this._AdminServiceApi.categoria.categoriaID)
    this.form.controls["tokenAdmin"].setValue(this._AdminServiceApi.tokenAdmin)
    this.form.controls["comentario"].setValue(Boolean(Number(this._AdminServiceApi.categoria.comentario)))
    this.form.controls["mitad"].setValue(Boolean(Number(this._AdminServiceApi.categoria.mitad)))
    this.form.controls["cocina"].setValue(Boolean(Number(this._AdminServiceApi.categoria.cocina)))
    this.formHappy.controls["categoriaID"].setValue(this._AdminServiceApi.categoria.categoriaID)
    this.formHappy.controls["usuarioID"].setValue(this._AdminServiceApi.usuarioID)
    this.formHappy.controls["tokenAdmin"].setValue(this._AdminServiceApi.tokenAdmin)
    this.nombre = this._AdminServiceApi.categoria.nombre
    this.form.controls["nombre"].setValue(this.nombre)
  }

  verificarPosibiliadHappy() {
    this._AdminServiceApi.obtenerProductos(this._AdminServiceApi.usuarioID, this._AdminServiceApi.categoria.categoriaID).subscribe({
      next: (productos) => {
        if(productos.length) {
          let mismoPrecio = true
          productos.forEach(producto => {
            if(productos[0].precio != producto.precio) {
              mismoPrecio = false
            }
          })
          if(mismoPrecio) {
            this._AdminServiceApi.obtenerHappy(this._AdminServiceApi.usuarioID, this._AdminServiceApi.categoria.categoriaID).subscribe({
              next: (x) => {        
                this.formHappy.controls["estado"].setValue(Boolean(Number(x.estado)))
                this.formHappy.controls["inicio"].setValue(x.inicio)
                this.formHappy.controls["fin"].setValue(x.fin)
                this.formHappy.controls["lunes"].setValue(Boolean(Number(x.lunes)))
                this.formHappy.controls["martes"].setValue(Boolean(Number(x.martes)))
                this.formHappy.controls["miercoles"].setValue(Boolean(Number(x.miercoles)))
                this.formHappy.controls["jueves"].setValue(Boolean(Number(x.jueves)))
                this.formHappy.controls["viernes"].setValue(Boolean(Number(x.viernes)))
                this.formHappy.controls["sabado"].setValue(Boolean(Number(x.sabado)))
                this.formHappy.controls["domingo"].setValue(Boolean(Number(x.domingo)))
              },  
              error: (err) => {
                console.log(err)
              }
            })
          } else {
            this.formHappy.controls["estado"].disable()
            this.formHappy.controls["inicio"].disable()
            this.formHappy.controls["fin"].disable()
            this.formHappy.controls["lunes"].disable()
            this.formHappy.controls["martes"].disable()
            this.formHappy.controls["miercoles"].disable()
            this.formHappy.controls["jueves"].disable()
            this.formHappy.controls["viernes"].disable()
            this.formHappy.controls["sabado"].disable()
            this.formHappy.controls["domingo"].disable()
            this.desactivarHappy = true
          }
        } else {
            this.formHappy.controls["estado"].disable()
            this.formHappy.controls["inicio"].disable()
            this.formHappy.controls["fin"].disable()
            this.formHappy.controls["lunes"].disable()
            this.formHappy.controls["martes"].disable()
            this.formHappy.controls["miercoles"].disable()
            this.formHappy.controls["jueves"].disable()
            this.formHappy.controls["viernes"].disable()
            this.formHappy.controls["sabado"].disable()
            this.formHappy.controls["domingo"].disable()
            this.desactivarHappy = true
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  editarCategoria() { 
    this.form.controls["comentario"].setValue(Number(this.form.controls["comentario"].value))
    this.form.controls["mitad"].setValue(Number(this.form.controls["mitad"].value))
    this.form.controls["cocina"].setValue(Number(this.form.controls["cocina"].value))    
    if(this.verificarCampos(this.nombre)) {
      this.quitarEspaciosFinales(this.form.value)
      this._AdminServiceApi.modificarCategoria(this.form.value).subscribe({
        next: () => {
          alert("Se actualizo la categoria")
          location.reload()
        },
        error: () => {        
          alert("No se pudo actualizar la categoria o no se modifico")
          location.reload()
        }
      })      
    } else {
      alert("El campo de categoria es requerido")
    }
  }

  editarHappy() {    
    if(this.formHappy.controls["estado"].value) {
      this.formHappy.controls["estado"].setValue(1)
    } else {
      this.formHappy.controls["estado"].setValue(0)
    }
    if(this.formHappy.controls["lunes"].value) {
      this.formHappy.controls["lunes"].setValue(1)
    } else {
      this.formHappy.controls["lunes"].setValue(0)
    }
    if(this.formHappy.controls["martes"].value) {
      this.formHappy.controls["martes"].setValue(2)
    } else {
      this.formHappy.controls["martes"].setValue(0)
    }
    if(this.formHappy.controls["miercoles"].value) {
      this.formHappy.controls["miercoles"].setValue(3)
    } else {
      this.formHappy.controls["miercoles"].setValue(0)
    }
    if(this.formHappy.controls["jueves"].value) {
      this.formHappy.controls["jueves"].setValue(4)
    } else {
      this.formHappy.controls["jueves"].setValue(0)
    }
    if(this.formHappy.controls["viernes"].value) {
      this.formHappy.controls["viernes"].setValue(5)
    } else {
      this.formHappy.controls["viernes"].setValue(0)
    }
    if(this.formHappy.controls["sabado"].value) {
      this.formHappy.controls["sabado"].setValue(6)
    } else {
      this.formHappy.controls["sabado"].setValue(0)
    }
    if(this.formHappy.controls["domingo"].value) {
      this.formHappy.controls["domingo"].setValue(7)
    } else {
      this.formHappy.controls["domingo"].setValue(0)
    } 

    let inicioHoras = this.formHappy.controls["inicio"].value.slice(0, 2)
    let inicioMinutos = this.formHappy.controls["inicio"].value.slice(3)
    let finHoras = this.formHappy.controls["fin"].value.slice(0, 2)
    let finMinutos = this.formHappy.controls["fin"].value.slice(3)    
    let inicio = Number(inicioHoras)*60 + Number(inicioMinutos)    
    let fin = Number(finHoras)*60 + Number(finMinutos)

    if(this.formHappy.controls["inicio"].value && this.formHappy.controls["fin"].value) {
      if(fin - inicio > 0) {
        this._AdminServiceApi.agregarHappy(this.formHappy.value).subscribe({
          next: () => {
            alert("Se actualizo el happy hour")
            location.reload()
          },
          error: (err) => {
            alert("No se pudo actualizar el happy hour o no se modifico")
            console.log(err)
            location.reload()
          }
        })
      } else {
        alert("La hora de fin debe ser mayor a la hora de inicio")
      }
    } else {
      alert("Los campos inicio y fin son requeridos")
    }

  }

  eliminarHappy() {
    console.log(this._AdminServiceApi.usuarioID)
    console.log(this._AdminServiceApi.categoria.categoriaID)
    this._AdminServiceApi.eliminarHappy(this._AdminServiceApi.usuarioID, this._AdminServiceApi.categoria.categoriaID, this._AdminServiceApi.tokenAdmin).subscribe({
      next: () => {
        alert("Se elimino el Happy Hour")
        location.reload()
      },
      error: (err) => {
        alert("No se pudo eliminar el Happy Hour")
        console.log(err)
        location.reload()
      }
    }) 
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
      if(typeof json[`${key}`] == 'string') {
        json[`${key}`] = json[`${key}`].trim()
      }
    });    
  }
}
