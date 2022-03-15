import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-colapsador',
  templateUrl: './colapsador.component.html',
  styleUrls: ['./colapsador.component.css']
})
export class ColapsadorComponent {

  constructor() { }

  //////////   Atributos de la clase   /////////////
  @Input() colorBtnColapsar!:string
  @Input() mostrarBtnColapsar!:boolean
  @Input() colorCategoriaHeader!:string
  @Input() colorCategoriaTxt!:string
  @Input() titulo!:string
  @Output() colapsador = new EventEmitter<boolean>();
  colapsar = true

  conmutar() {
    this.colapsar = !this.colapsar
    this.colapsador.emit(this.colapsar)
  }
}
