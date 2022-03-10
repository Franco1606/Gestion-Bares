import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent {

  @Output() cantidadProdcutos = new EventEmitter<number>();
  cantidad:number = 1  

  agregar(){
    this.cantidad += 1
    this.cantidadProdcutos.emit(this.cantidad)    
  }

  quitar(){
    if(this.cantidad>1) {this.cantidad -= 1}
    this.cantidadProdcutos.emit(this.cantidad)    
  }

}
