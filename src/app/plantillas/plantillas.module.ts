import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilidadesModule } from "../utilidades/utilidades.module";

//Componentes
import { LoginComponent } from './login/login.component';
import { ContadorComponent } from "./contador/contador.component"


@NgModule({
  declarations: [
    LoginComponent,
    ContadorComponent
  ],
  imports: [
    CommonModule,
    UtilidadesModule
  ],
  exports: [
    LoginComponent,
    ContadorComponent
  ]
})
export class PlantillasModule { }
