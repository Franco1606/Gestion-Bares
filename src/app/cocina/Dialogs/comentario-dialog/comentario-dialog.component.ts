import { Component, OnInit } from '@angular/core';
//Inyeccion de dependencia
import { CocinaService } from "../../servicios/api/cocina.service"

@Component({
  selector: 'app-comentario-dialog',
  templateUrl: './comentario-dialog.component.html',
  styleUrls: ['./comentario-dialog.component.css']
})
export class ComentarioDialogComponent implements OnInit {

  constructor( private _cocinaService:CocinaService) { }

  comentario!:string

  ngOnInit(): void {
    this.comentario = this._cocinaService.comentario
  }

}
