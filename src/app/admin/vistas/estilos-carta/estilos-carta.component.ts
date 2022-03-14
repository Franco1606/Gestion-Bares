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
  nombre:string
  nombreArchivo!:string
  mostrar = true
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
  }

  guardarCambios(){
    let estilos = this.obtenerValoresInputs(this.form.controls)
    this._adminServiceApi.modificarEstilos(estilos, this.usuarioID, this.tokenAdmin).subscribe({
      next: (x) => {
        alert("Se actualizaron los estilos de la carta")
      },
      error: (err) => {
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
        valor: valor
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
        this.nombre = x.nombre
        this.nombreArchivo = x.nombreArchivo
        this.mostrar = Boolean(Number(x.mostrar))
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

  cambiarMostrarImg() {
    let mostrar = Number(Boolean(!Number(this.mostrar)))
    this._adminServiceApi.actualizarMostrarImg(mostrar, this.nombre, this.usuarioID, this.tokenAdmin).subscribe({
      next: () => {
        if(mostrar) {
          alert("El logo de la cabecera se muestra en la carta")
          location.reload()
        } else {
          alert("No se muestra el logo de la cabecera de la carta")
          location.reload()
        }
      }
    })
  }

  deleteImage(inputImagenId:string) {    
  }

}
