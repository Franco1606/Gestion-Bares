import { modeloPedido } from "../../mozo/ModelosMozo/modeloPedido";
import { DatePipe } from '@angular/common';

export class Pdf {
    //////////   Atributos de la clase   /////////////    
    crear(pedidos:modeloPedido[], numOrden:string):any {        
        let comanderas:number[] = []
        pedidos.forEach(pedido => {
            if(!comanderas.includes(pedido.comandera) && Number(pedido.comandera)) {
                comanderas.push(pedido.comandera)
            }
        })        
        let content:any[] = []

        comanderas.forEach(comandera => {
            const datepipe: DatePipe = new DatePipe('en-US')
            let formattedDate = datepipe.transform(new Date(), 'dd MMM YYYY, HH:mm')
            let body:any = []
            let pedidosComanda = pedidos.filter(element => element.comandera == comandera)
            body[0] = ["Cantidad", "Producto", "Comentarios"]
            pedidosComanda.forEach(pedidoComanda => {
            let cantidad
            
            if(pedidoComanda.cantidad == 0.5) {
                cantidad = "1/2"
            } else if(pedidoComanda.cantidad >= 1) {
                cantidad = pedidoComanda.cantidad
            }

            let fila = [cantidad, pedidoComanda.nombre, pedidoComanda.comentario]
            body.push(fila)
            })            

            let tituloComandera = {         
                text: `Comandera: ${comandera}`,
                alignment: 'center',
                margin: [0,0,0,10],
                fontSize: 14,                
            }

            let fechaImpresa = {
                text: `Fecha: ${formattedDate}`,
                alignment: 'center',
                margin: [0,0,0,10],
                fontSize: 13
            }

            let numeroDeOrden = {
                text: `Orden #: ${numOrden}`,
                alignment: 'center',
                margin: [0,0,0,10],
                fontSize: 13
            }

            let tablaConPedidos = {                
                columns: [
                    { width: "*", text: '' },
                    {
                        layout: 'lightHorizontalLines', 
                        width: 'auto',
                        alignment: 'center',                                       
                        table: {
                            headerRows: 1,
                            widths: [ 'auto', 'auto', 'auto'],              
                            body: body,
                            margin: [0,20,0,0],                    
                        }
                    },
                    { width: "*", text: '' },
                ]                
            }

            let separador = {
                text: '',
                margin: [0,0,0,50]
            }

            
            content.push(tituloComandera)
            content.push(fechaImpresa)
            content.push(numeroDeOrden)
            content.push(tablaConPedidos)
            content.push(separador)
           
        })

        let contenido:any = {                       
            pageSize: {
                width: 300,
                height: 'auto'                
            },
            pageMargins: [ 10, 20, 10, 20 ],
            content: content           
        }
        
        return contenido
    }
}