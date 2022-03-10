import { modeloProductoPedido } from "../ModelosCarta/modeloProductoPedido"

export class prodClass {
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

    constructor(producto:modeloProductoPedido) { 
        this.productoID = producto.productoID
        this.nombre = producto.nombre
        this.descripcion = producto.descripcion
        this.precio = producto.precio
        this.mostrar = producto.mostrar
        this.usuarioID = producto.usuarioID
        this.categoriaID = producto.categoriaID
        this.cantidad = producto.cantidad
        this.comentario = producto.comentario
    }
}

