import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent {

  @Input() mitad = 0
  @Output() cantidadProdcutos = new EventEmitter<number>();
  cantidad:number = 1  

  agregar(){
    if(this.cantidad >= 1) {
      this.cantidad += 1
    } else if (this.cantidad == 0.5 && this.mitad == 1) {
      this.cantidad = 1
    }    
    this.cantidadProdcutos.emit(this.cantidad)    
  }

/*   agregar(){
    this.cantidad += 1
    this.cantidadProdcutos.emit(this.cantidad)    
  } */

/*   quitar(){
    if(this.cantidad>1) {this.cantidad -= 1}
    this.cantidadProdcutos.emit(this.cantidad)    
  } */

  quitar(){
    if(this.cantidad > 1) {
      this.cantidad -=1
    } else if(this.cantidad == 1 && this.mitad == 1) 
    {this.cantidad = 0.5}
    this.cantidadProdcutos.emit(this.cantidad)    
  }

}
