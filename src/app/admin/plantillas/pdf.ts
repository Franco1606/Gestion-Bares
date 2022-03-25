import { modeloPedido } from "../../mozo/ModelosMozo/modeloPedido";
import { DatePipe } from '@angular/common';

export class Pdf {
    //////////   Atributos de la clase   /////////////
    
    crear(pedidos:modeloPedido[], numOrden:string):any {
        const datepipe: DatePipe = new DatePipe('en-US')
        let formattedDate = datepipe.transform(new Date(), 'dd MMM YYYY, HH:mm')
        let body:any = []
        body[0] = ["Cantidad", "Producto", "Comentarios"]            
        pedidos.forEach(pedido => {
            let cantidad
            if(pedido.cantidad == 0.5) {
                cantidad = "1/2"
            } else if(pedido.cantidad >= 1) {
                cantidad = pedido.cantidad
            }
            let fila = [cantidad, pedido.nombre, pedido.comentario]
            body.push(fila)
        })            

        let contenido:any = {
            pageSize: {
                width: 250,
                height: 'auto'
            },
            pageMargins: [ 10, 20, 10, 0 ],
            content: [ 
                {
                    text: `Comandera: ${pedidos[0].comandera}`,
                    alignment: 'center',
                    margin: [0,0,0,10],
                    fontSize: 14,
                },               
                {
                    text: `Fecha: ${formattedDate}`,
                    alignment: 'center',
                    margin: [0,0,0,10],
                    fontSize: 10,
                },
                {
                    text: `Orden #: ${numOrden}`,
                    alignment: 'center',
                    margin: [0,0,0,10],
                    fontSize: 10,
                },
                {
                    columns: [
                        { width: 0, text: '' },
                        {
                            layout: 'lightHorizontalLines', 
                            width: "auto",
                            alignment: 'center',                                       
                            table: {
                                headerRows: 1,
                                widths: [ 'auto', 'auto', 'auto'],              
                                body: body,                      
                                margin: [0,20,0,0],                    
                            }
                        },
                        { width: 0, text: '' },
                    ]                                      
                }               
            ]
        }
        
        return contenido
    }
}