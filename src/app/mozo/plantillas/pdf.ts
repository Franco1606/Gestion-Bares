import { modeloPedido } from "../ModelosMozo/modeloPedido";
import { DatePipe } from '@angular/common';

export class Pdf {
    //////////   Atributos de la clase   /////////////
    
    crear(pedidos:any[], mesaID:number, domicilio:string):any {
        const datepipe: DatePipe = new DatePipe('en-US')
        let formattedDate = datepipe.transform(new Date(), 'dd MMM YYYY, HH:mm')
        let total = 0  
        let cantidad
        let lugar
        if(domicilio != "") {
            lugar = `Domicilio: ${domicilio}`
        } else {
            lugar = `Mesa: ${mesaID}`
        }
        let body:any = []
        body[0] = ["Cant.", "Producto", "$", "Subt."]            
        pedidos.forEach(pedido => {
            if(pedido.cantidad == 0.5) {
                cantidad = "1/2"
            } else if(pedido.cantidad >= 1) {
                cantidad = pedido.cantidad
            }
            let fila = [cantidad, pedido.nombre, pedido.precio, pedido.subtotal]
            total += pedido.subtotal
            body.push(fila)
        })        

        let contenido:any = {
            pageSize: {
                width: 250,
                height: 'auto'
              },
            pageMargins: [ 10, 20, 10, 10 ],
            content: [                
                {
                    text: `Fecha: ${formattedDate}`,
                    margin: [0,0,0,10],
                    fontSize: 10,
                    alignment: "center",
                },
                {
                    text: lugar,
                    margin: [0,0,0,10],
                    fontSize: 10,
                    alignment: "center",
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
                                widths: [ 'auto', 'auto', 'auto', 'auto' ],              
                                body: body,                      
                                margin: [0,20,0,20],                    
                            }
                        },
                        { width: 0, text: '' },
                    ]                                      
                },                
                {                    
                    text: `TOTAL: ${total}`,
                    alignment: "center",
                    fontSize: 15,
                    bold: true,
                    margin: [0,30,0,0],
                }                
            ]
        }
        
        return contenido
    }
}