import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantillasModule } from "../plantillas/plantillas.module"

import { MozoRoutingModule } from './mozo-routing.module';
import { LoginMozoComponent } from './plantillas/login-mozo/login-mozo.component';


@NgModule({
  declarations: [
    LoginMozoComponent
  ],
  imports: [
    CommonModule,
    MozoRoutingModule,
    PlantillasModule
  ]
})
export class MozoModule { }
