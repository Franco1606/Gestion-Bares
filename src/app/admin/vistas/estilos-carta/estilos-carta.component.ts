import { Component } from '@angular/core';
//Dependencias para la form
import { FormControl, FormGroup} from '@angular/forms';
//Dependencias del colorPicker
import { ThemePalette } from '@angular/material/core';
//Inyecciones de dependencias
import { AdminService } from "../../servicios/api/admin.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-estilos-carta',
  templateUrl: './estilos-carta.component.html',
  styleUrls: ['./estilos-carta.component.css']
})
export class EstilosCartaComponent {

  constructor( private _adminServiceApi:AdminService, private _router:Router ) { }

  //////////   Atributos de la clase   /////////////  
  usuarioID!:number   
  tokenAdmin!:string
  nombreArchivo!:string
  mostrarHeaderImg = false
  mostrarEncabezado = false
  mostrarColapsador = false  
  // ColorPicker
  color:ThemePalette = 'primary'
  // Form 
  form:FormGroup = new FormGroup({
    "headerTxt": new FormControl(),
    "colorHeaderTxt": new FormControl(),
    "colorHeader": new FormControl(),
    "colorCategoriaTxt": new FormControl(),
    "colorCategoriaHeader": new FormControl(),
    "colorColapsar": new FormControl(),
    "colorFondo": new FormControl(),
  })
  //Variables usadas para el cdkCopyToClipboard
  colorCtrHeaderTxt = this.form.controls["colorHeaderTxt"]
  colorCtrHeader = this.form.controls["colorHeader"]
  colorCtrCategoriaTxt = this.form.controls["colorCategoriaTxt"]
  colorCtrCategoriaHeader = this.form.controls["colorCategoriaHeader"]
  colorCtrColapsar = this.form.controls["colorColapsar"]
  colorCtrFondo = this.form.controls["colorFondo"]
  
  obtenerUsuario(datosUsuario:any) {
    this.usuarioID = datosUsuario["usuarioID"]
    this.tokenAdmin = datosUsuario["tokenAdmin"]
    this.obtenerImagenPorNombre("headerImg")
    this.obtenerEstiloPorNombre("headerTxt")
  }

  guardarCambios(){
    let estilos = this.obtenerValoresInputs(this.form.controls)   
    this._adminServiceApi.modificarEstilos(estilos, this.usuarioID, this.tokenAdmin).subscribe({
      next: () => {        
        let iframe = document.getElementById("iframe")
        iframe.setAttribute("src", "http://localhost:4200/carta?usuarioID=1")
      },
      error: () => {
        alert("No se pudo actualizar todos o alguno de lo estilos")        
      }
    })
  }

  obtenerValoresInputs(formControls:any):any[] {
    let estilos:any = []
    let keys = Object.keys(formControls);
    keys.forEach(key => {
      let valor = ""      
      if(typeof formControls[`${key}`].value == 'string') {
        try {
          valor = formControls[`${key}`].value
        } catch (error) {}        
      } else {
        try {
          valor = formControls[`${key}`].value.hex
        } catch (error) {}        
      }
      let json = {
        nombre: key,
        valor: valor,
        mostrar: 1
      }
      if(valor != "") {
        estilos.push(json)
      }
    });
    return estilos
  }

  obtenerImagenPorNombre(nombre:string) {
    this._adminServiceApi.obtenerImagenPorNombre(nombre, this.usuarioID).subscribe({
      next: (x) => {        
        this.nombreArchivo = x.nombreArchivo
        this.mostrarHeaderImg = Boolean(Number(x.mostrar))
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  obtenerEstiloPorNombre(nombre:string) {
    this._adminServiceApi.obtenerEstiloPorNombre(nombre, this.usuarioID).subscribe({
      next: (x) => {
        this.mostrarEncabezado = Boolean(Number(x.mostrar))
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  archivoSeleccionado(inputImagen:any){ 
    let srcResult:any    
    let nombreArchivo = inputImagen.files[0].name
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
    
      reader.onload = (e: any) => {
        srcResult = e.target.result;
        //el nombre es el id del input del html
        this._adminServiceApi.cambiarImagen(inputImagen.id, nombreArchivo, srcResult, this.usuarioID, this.tokenAdmin).subscribe({
          next: () => {            
            alert("Se actualizo la imagen")
            location.reload()
          },
          error: () => {
            alert("No se pudo actualizar la imagen")
          }
        })
      }    
      reader.readAsDataURL(inputImagen.files[0]);            
    }   
  }

  cambiarMostrar(nombre:string){
    let mostrar = Number(Boolean(!Number(this.mostrarEncabezado)))
    this._adminServiceApi.actualizarMostrarEncabezado(mostrar, nombre, this.usuarioID, this.tokenAdmin).subscribe({
      next: () => {
        location.reload()
      }
    })
  }

  cambiarMostrarImg(nombre:string) {
    let mostrar = Number(Boolean(!Number(this.mostrarHeaderImg)))
    this._adminServiceApi.actualizarMostrarImg(mostrar, nombre, this.usuarioID, this.tokenAdmin).subscribe({
      next: () => {
        location.reload()        
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
