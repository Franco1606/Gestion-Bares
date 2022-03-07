import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilidadesModule } from "../utilidades/utilidades.module";

//Componentes
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    UtilidadesModule
  ],
  exports: [
    LoginComponent
  ]
})
export class PlantillasModule { }
