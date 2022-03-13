import { Component, OnInit } from '@angular/core';
// Inyecciones de dependencia
import { CartaService } from "../../servicios/api/carta.service"
// Clases
import { claseProductoPedido } from '../../Clases/claseProductoPedido';
import { Pdf } from "../../Plantillas/pdf"
// Dependencias del Dialog 
import { MatDialogRef } from '@angular/material/dialog';
// Dependencias pdfMake
import pdfMake from "pdfmake/build/pdfMake"
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido-dialog.component.html',
  styleUrls: ['./pedido-dialog.component.css']
})
export class PedidoDialogComponent implements OnInit {

  constructor( private _cartaServiceApi:CartaService,  private dialogRef:MatDialogRef<PedidoDialogComponent> ) { }

    //////////   Atributos de la clase   /////////////
    total = 0
    domicilio!:string
    // Tabla //
    displayedColumns = ["cantidad", "producto", "precio", "comentario", "eliminar"]
    dataSource!:claseProductoPedido[]

  ngOnInit(): void {     
    this.dataSource = this._cartaServiceApi.pedidos
    this._cartaServiceApi.pedidos.forEach(element => {
      this.total += element.cantidad*element.precio
    })
  }

  quitarProducto(IDinterno:number) {
    this.total -= this._cartaServiceApi.pedidos.filter(element => element.IDinterno == IDinterno )[0].precio
    this._cartaServiceApi.pedidos = this._cartaServiceApi.pedidos.filter(element => element.IDinterno != IDinterno )
    this.dataSource = this._cartaServiceApi.pedidos

    if(this._cartaServiceApi.pedidos.length == 0) {
      this.dialogRef.close()
    }
  }

  emitirOrden() {    
    if(this._cartaServiceApi.mesaID == null) {      
      this._cartaServiceApi.mesaID = 0
      this.domicilio = prompt("Ingrese su domicilio") || ""
    } else {
      this.domicilio = ""      
    }
    
    if(confirm("Confirmar Pedido?")) {
      this._cartaServiceApi.generarOrden(this._cartaServiceApi.usuarioID, this._cartaServiceApi.mesaID, this.domicilio, this._cartaServiceApi.pedidos).subscribe({
        next: (x) => {
          this.crearPdf(this._cartaServiceApi.pedidos, x.result["nuevaFecha"], x.result["numOrden"])
          if(this.domicilio != "") {
          let msjWhatsApp =  this.escribirTextoWhatsapp(this._cartaServiceApi.pedidos, x.result["nuevaFecha"], x.result["numOrden"])
          window.location.href = `https://api.whatsapp.com/send?phone=+543413638536&text=${msjWhatsApp}`
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  crearPdf(pedidos:claseProductoPedido[] ,fecha:Date, numOrden:string) {
    let pdf = new Pdf()
    let contenido = pdf.crear(pedidos, fecha, numOrden)
    pdfMake.createPdf(contenido).open()    
  }

  escribirTextoWhatsapp( pedidos:claseProductoPedido[], fecha:Date, numOrden:string):string {
    let msjWhatsApp = `*IMPORTANTE:* Su pedido quedará confirmado cuando reciba un mensaje de confirmación a través de este medio.%0APedido del domicilio : ${this.domicilio}%0A${fecha}%0ACodigo de pedido: ${numOrden}%0A${this.escribirPedido(pedidos)}*Total: $ ${this.total}*`
    return msjWhatsApp
  }

  escribirPedido(pedidos:claseProductoPedido[]):string {
    let textoPedido = ""
    pedidos.forEach(pedido => {      
      let subTotal = 0
      if(pedido.comentario == null) {
        pedido.comentario = ""
      }
      subTotal = pedido.cantidad*pedido.precio
      textoPedido += `${pedido.cantidad} x ${pedido.nombre} (${pedido.comentario}) : $ ${subTotal}%0A`
  })
  return textoPedido
  }

  
}
