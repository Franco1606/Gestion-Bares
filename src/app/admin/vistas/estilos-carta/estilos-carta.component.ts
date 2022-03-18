import { Component } from '@angular/core';
//Dependencias para la form
import { FormControl, FormGroup} from '@angular/forms';
//Dependencias del colorPicker
import { ThemePalette } from '@angular/material/core';
//Inyecciones de dependencias
import { AdminService } from "../../servicios/api/admin.service"
import { CartaService } from "../../../carta/servicios/api/carta.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-estilos-carta',
  templateUrl: './estilos-carta.component.html',
  styleUrls: ['./estilos-carta.component.css']
})
export class EstilosCartaComponent {

  constructor( private _adminService:AdminService, private _cartaService:CartaService, private _router:Router ) { }

  //////////   Atributos de la clase   ///////////// 
  iframe:HTMLElement
  iframeURL = "https://visita360.hopto.org/bar/carta"
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
    this.valoresMostrarEstilos()
    this.iframe = document.getElementById("iframe")    
    this.iframe.setAttribute("src", `${this.iframeURL}?usuarioID=${this.usuarioID}`)
  }

  guardarCambios(){
    let estilos = this.obtenerValoresInputs(this.form.controls)   
    this._adminService.modificarEstilos(estilos, this.usuarioID, this.tokenAdmin).subscribe({
      next: () => {        
        this.iframe.setAttribute("src", `${this.iframeURL}?usuarioID=${this.usuarioID}`)
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
    this._adminService.obtenerImagenPorNombre(nombre, this.usuarioID).subscribe({
      next: (x) => {        
        this.nombreArchivo = x.nombreArchivo
        this.mostrarHeaderImg = Boolean(Number(x.mostrar))
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  valoresMostrarEstilos() {
    this._cartaService.obtenerEstilos(this.usuarioID).subscribe({
      next: (x) => {
        if(x.filter(estilo => estilo.nombre == "headerTxt")) {
          this.mostrarEncabezado = Boolean(Number(x.filter(estilo => estilo.nombre == "headerTxt")[0].mostrar))
        }
        if(x.filter(estilo => estilo.nombre == "colorColapsar")) {
          this.mostrarColapsador = Boolean(Number(x.filter(estilo => estilo.nombre == "colorColapsar")[0].mostrar))
        }
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
        this._adminService.cambiarImagen(inputImagen.id, nombreArchivo, srcResult, this.usuarioID, this.tokenAdmin).subscribe({
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

  cambiarMostrar(nombre:string, e:any){
    let mostrar = Number(e.checked)
    this._adminService.actualizarMostrar(mostrar, nombre, this.usuarioID, this.tokenAdmin).subscribe({
      next: () => {
        location.reload()
      }
    })
  }

  cambiarMostrarImg(nombre:string, e:any) {
    let mostrar = Number(e.checked)    
    this._adminService.actualizarMostrarImg(mostrar, nombre, this.usuarioID, this.tokenAdmin).subscribe({
      next: () => {
        location.reload()        
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
