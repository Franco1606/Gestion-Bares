import { Component, OnInit } from '@angular/core';
// Clases
import { prodClass } from "../../Clases/prodClass"
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
  pedido:modeloProductoPedido[] = []
  comentario = ""
  IDinterno = 0

  ngOnInit(): void {
    this.obtenerParametros()
  }

  obtenerParametros() {
    this._route.queryParams.subscribe(params => {
      this.usuarioID = params["usuarioID"]
      this.mesaID = params["mesaID"]      
      this.obtenerCategorias()
    })     
  }

  obtenerCategorias() {
    this._adminServiceApi.obtenerCategorias(this.usuarioID).subscribe({
      next: (x) => {
        this.categorias = x
      }
    })
  }

  agregar(producto:modeloProductoPedido) {
    if(!producto.cantidad) {
      producto.cantidad = 1      
    }

    if( this.pedido.filter(element =>  element.productoID == producto.productoID && element.comentario == null).length == 0 ) {      
      let prod = new prodClass(producto)
      prod.IDinterno = this.IDinterno
      this.pedido.push(prod)
      this.IDinterno += 1
      console.log(this.pedido)
    } else {
      alert("Este producto ya se agrego al pedido")
    }
  }

  quitar(productoID:number, nombre:string) {
    if(this.pedido.filter(element => element.productoID == productoID).length != 0) {
      this._cartaServiceApi.productoID = productoID
      this._cartaServiceApi.nombre = nombre
      this._cartaServiceApi.pedido = this.pedido
      let dialogRef = this._dialog.open(QuitarDialogComponent)
      dialogRef.beforeClosed().subscribe({
        next: () => {
          this.pedido = this._cartaServiceApi.pedido
        } 
      })
    } else {
      alert("No hay pedidos de este producto")
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
          console.log(this.productos)
        }
      })
    } else {
      this._cartaServiceApi.obtenerProductos(this.usuarioID, categoriaID).subscribe({      
        next: (x) => {                          
          x.forEach(producto => {
            this.productos =  this.productos.filter(producto => producto.categoriaID != categoriaID)
          });
          console.log(this.productos)
        }
      })
    }
  }

  pasarCantidad(e: number, productoPedido:modeloProductoPedido){  
    productoPedido.cantidad = e
  }

  agregarComentario(producto:modeloProductoPedido) {   
    let dialogRef = this._dialog.open(ComentarioDialogComponent)
    dialogRef.afterClosed().subscribe({
      next: () => {
        if(this.verificarCampos(this._cartaServiceApi.comentario)){
          if(!producto.cantidad) {
            producto.cantidad = 1      
          }
          let prod = new prodClass(producto)
          prod.comentario = this._cartaServiceApi.comentario
          prod.IDinterno = this.IDinterno
          this.pedido.push(prod)
          this.IDinterno += 1
          console.log(this.pedido)
        } else {
          alert("No puede realizar un pedido con comentarios en blanco")
        }
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

  verificar(productoID:number):boolean {
    let verificador = false
    if(this.pedido.filter(element => element.productoID == productoID).length > 0){
      verificador = true  
    }
    return verificador
  }
}
