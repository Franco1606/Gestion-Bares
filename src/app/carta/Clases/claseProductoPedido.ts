import { modeloProductoPedido } from "../ModelosCarta/modeloProductoPedido"

export class claseProductoPedido {

    constructor(producto:modeloProductoPedido) { 
        this.productoID = producto.productoID
        this.categoriaID = producto.categoriaID
        this.nombre = producto.nombre
        this.precio = Number(producto.precio)
        if(!producto.cantidad) {
            this.cantidad = 1    
        } else {
            this.cantidad = producto.cantidad
        }
        this.categoriaNombre = producto.categoriaNombre        
    }

    //////////   Atributos de la clase   /////////////
    productoID!:number
    categoriaID!:number
    categoriaNombre:string
    nombre!:string
    precio!:number
    cantidad!:number
    comentario!:string
    IDinterno!:number
}

