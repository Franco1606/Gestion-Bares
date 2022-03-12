import { modeloProductoPedido } from "../ModelosCarta/modeloProductoPedido"

export class claseProductoPedido {

    constructor(producto:modeloProductoPedido) { 
        this.productoID = producto.productoID
        this.nombre = producto.nombre
        this.descripcion = producto.descripcion
        this.precio = producto.precio
        this.mostrar = producto.mostrar
        this.usuarioID = producto.usuarioID
        this.categoriaID = producto.categoriaID
        if(!producto.cantidad) {
            this.cantidad = 1    
        } else {
            this.cantidad = producto.cantidad
        }        
    }

    //////////   Atributos de la clase   /////////////
    productoID!:number
    nombre!:string
    descripcion!:string
    precio!:number
    mostrar!:number
    usuarioID!:number
    categoriaID!:number
    cantidad!:number
    comentario!:string
    IDinterno!:number    
}

