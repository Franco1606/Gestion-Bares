import { Component, OnInit } from '@angular/core';
// Clases
import { claseProductoPedido } from "../../Clases/claseProductoPedido"
// Inyecciones de dependencia
import { AdminService } from "../../../admin/servicios/api/admin.service"
import { CartaService } from "../../servicios/api/carta.service"
import { ActivatedRoute } from "@angular/router"
// Modelos
import { modeloCategoria } from 'src/app/admin/ModelosAdmin/modeloCategoria';
import { modeloProductoPedido } from "../../ModelosCarta/modeloProductoPedido"
// Dependencias Angular Material
import { MatDialog } from "@angular/material/dialog"
// Dependencias para Dialogs
import { ComentarioDialogComponent } from "../../Dialogs/comentario-dialog/comentario-dialog.component"
import { QuitarDialogComponent } from '../../Dialogs/quitar-dialog/quitar-dialog.component';
import { PedidoDialogComponent } from "../../Dialogs/pedido-dialog/pedido-dialog.component"

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  constructor( private _route:ActivatedRoute, private _adminServiceApi:AdminService, private _cartaServiceApi:CartaService, private _dialog:MatDialog ) { }

  //////////   Atributos de la clase   /////////////
  usuarioID!:number
  mesaID!:number
  categorias!:modeloCategoria[]
  productos:modeloProductoPedido[] = []
  pedido:claseProductoPedido[] = []
  IDinterno = 0
  //Atributos de estilo de la carta
  estilos = {
    headerTxt : {nombre: "headerTxt", valor: "", mostrar: true},
    colorHeaderTxt : {nombre: "colorHeaderTxt", valor: "", mostrar: true},
    colorHeader : {nombre: "colorHeader", valor: "", mostrar: true},
    colorCategoriaTxt : {nombre: "colorCategoriaTxt", valor: "", mostrar: true},
    colorCategoriaHeader : {nombre: "colorCategoriaHeader", valor: "", mostrar: true},
    colorColapsar : {nombre: "colorColapsar", valor: "", mostrar: true},
    colorFondo : {nombre: "colorFondo", valor: "", mostrar: true}
  }
  mostrarHeaderImg = true 
  mostrarHeaderTxt!:boolean
  //Atributos para imagenes
  headerImg!:string

  ngOnInit(): void {
    this.obtenerParametros()
  }

  obtenerParametros() {
    this._route.queryParams.subscribe(params => {
      this.usuarioID = params["usuarioID"]
      this.mesaID = params["mesaID"]      
      this.obtenerCategorias()
      this.obtenerEstilos()
      this.obtenerImagenPorNombre("headerImg")
    })     
  }

  obtenerCategorias() {
    this._adminServiceApi.obtenerCategorias(this.usuarioID).subscribe({
      next: (x) => {
        this.categorias = x
      }
    })
  }

  agregar(producto:modeloProductoPedido, comentario:number) {    
    if(comentario == 1) {      
      let dialogRef = this._dialog.open(ComentarioDialogComponent)
      this._cartaServiceApi.pedidos = this.pedido
      this._cartaServiceApi.producto = producto
      this._cartaServiceApi.IDinterno = this.IDinterno
      dialogRef.afterClosed().subscribe({
        next: () => {
          this.pedido = this._cartaServiceApi.pedidos
          this.IDinterno = this._cartaServiceApi.IDinterno        
        }
      })

    } else {
      if( this.pedido.filter(element =>  element.productoID == producto.productoID && element.comentario == null).length == 0 ) {      
        let prod = new claseProductoPedido(producto)
        prod.IDinterno = this.IDinterno
        this.pedido.push(prod)
        this.IDinterno += 1        
      } else {
        alert("Este producto ya se agrego al pedido")
      }
    }
  }

  quitar(productoID:number, nombre:string, comentario:number) {
    if(comentario == 1){
      if(this.pedido.filter(element => element.productoID == productoID).length != 0) {
        this._cartaServiceApi.productoID = productoID
        this._cartaServiceApi.nombre = nombre
        this._cartaServiceApi.pedidos = this.pedido
        let dialogRef = this._dialog.open(QuitarDialogComponent)
        dialogRef.afterClosed().subscribe({
          next: () => {
            this.pedido = this._cartaServiceApi.pedidos
          } 
        })
      } else {
        alert("No hay pedidos de este producto")
      }
    } else {
      if(this.pedido.filter(element => element.productoID == productoID).length != 0) {
        this.pedido = this.pedido.filter(element => element.productoID != productoID)
      } else {
        alert("No hay pedidos de este producto")
      }
    }    
  }

  colapsar(e: boolean, categoriaID:number) {
    if(!e) {
      this._cartaServiceApi.obtenerProductos(this.usuarioID, categoriaID).subscribe({      
        next: (x) => {                                    
          x.forEach(producto => {
            if(producto.mostrar == 1) {
              this.productos.push(producto)
            }
          });           
        }
      })
    } else {
      this._cartaServiceApi.obtenerProductos(this.usuarioID, categoriaID).subscribe({      
        next: (x) => {                          
          x.forEach(producto => {
            this.productos =  this.productos.filter(producto => producto.categoriaID != categoriaID)
          });         
        }
      })
    }    
  }

  pasarCantidad(e: number, productoPedido:modeloProductoPedido){  
    productoPedido.cantidad = e
  }  

  verificarExistencia(productoID:number):boolean {
    let verificador = false
    if(this.pedido.filter(element => element.productoID == productoID).length > 0){
      verificador = true  
    }
    return verificador
  }

  verPedido() {
    this._cartaServiceApi.mesaID = this.mesaID
    this._cartaServiceApi.usuarioID = this.usuarioID
    this._cartaServiceApi.pedidos = this.pedido
    let dialogRef = this._dialog.open(PedidoDialogComponent)
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.pedido = this._cartaServiceApi.pedidos
      }
    })
  }

  obtenerEstilos() {
    this._cartaServiceApi.obtenerEstilos(this.usuarioID).subscribe({
      next: (x) => {
        if(x.length) {
          let keys = Object.keys(this.estilos);
          keys.forEach(key => {
            if(x.filter(estilo => estilo.nombre == key)) {
              if(this.estilos[key].nombre != "headerTxt"){
                this.estilos[key].valor = `#${x.filter(estilo => estilo.nombre == key)[0].valor}`
              } else if (this.estilos[key].nombre == "headerTxt") {
                this.estilos[key].valor = x.filter(estilo => estilo.nombre == key)[0].valor
                this.mostrarHeaderTxt = Boolean(Number(x.filter(estilo => estilo.nombre == key)[0].mostrar))
              }
            }
          })
        }            
      },
      error: (err) => {
        alert("No se pudieron obtener los estilos de la base de datos")
      }
    })
  }

  obtenerImagenPorNombre(nombre:string) {
    this._adminServiceApi.obtenerImagenPorNombre(nombre, this.usuarioID).subscribe({
      next: (x) => {        
        this.headerImg = `url("${x.imgData}")`
        this.mostrarHeaderImg = Boolean(Number(x.mostrar))
      },
      error: (err) => {
        alert("No se pudo obtener la iamgen de la base de datos")
      }
    })
  }
}
