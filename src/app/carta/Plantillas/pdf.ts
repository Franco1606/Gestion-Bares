import { claseProductoPedido } from "../Clases/claseProductoPedido"
import { DatePipe } from '@angular/common';

export class Pdf {
    //////////   Atributos de la clase   /////////////
    
    crear(pedidos:claseProductoPedido[], nuevaFecha:Date, numOrden:string, imgData:string):any {
        const datepipe: DatePipe = new DatePipe('en-US')
        let formattedDate = datepipe.transform(nuevaFecha, 'dd MMM YYYY, HH:mm')
        let total = 0
        let body:any = []
        body[0] = ["Cantidad", "Producto", "Comentarios", "Precio"]            
        pedidos.forEach(pedido => {
            total += pedido.cantidad*pedido.precio
            if(pedido.comentario == null) {
                pedido.comentario = "n/a"
            }
            let cantidad
            if(pedido.cantidad == 0.5) {
                cantidad = "1/2"
            } else if(pedido.cantidad >= 1) {
                cantidad = pedido.cantidad
            }
            let fila = [cantidad, pedido.nombre, pedido.comentario, pedido.precio]
            body.push(fila)
        })

        let contenido:any = {
            pageSize: {
                width: 400,
                height: 'auto'
              },
            pageMargins: [ 10, 0, 10, 10 ],
            content: [
                {                    
                    image: imgData,
                    width: 400,
                    alignment: 'center',
                    margin: [0,0,0,10],                    
                },
                {
                    text: `Fecha: ${formattedDate}`,
                    margin: [0,0,0,10],
                    fontSize: 10,
                },
                {
                    text: `Orden #: ${numOrden}`,
                    margin: [0,0,0,10],
                    fontSize: 10,
                },
                {
                    columns: [
                        { width: '*', text: '' },
                        {
                            layout: 'lightHorizontalLines', 
                            width: "auto",
                            alignment: 'center',                                       
                            table: {
                                headerRows: 1,
                                widths: [ 'auto', 'auto', 'auto', 'auto' ],              
                                body: body,                      
                                margin: [0,20,0,20],                    
                            }
                        },
                        { width: '*', text: '' },
                    ]                                      
                },                
                {                    
                    text: `TOTAL: ${total}`,
                    alignment: "right",
                    fontSize: 15,
                    bold: true,
                    margin: [0,30,0,0],
                }
                
            ]
        }
        
        return contenido
    }
}