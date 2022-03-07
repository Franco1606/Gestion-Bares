import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantillasModule } from "../plantillas/plantillas.module"

import { CocinaRoutingModule } from './cocina-routing.module';
import { LoginCocinaComponent } from './plantillas/login-cocina/login-cocina.component';


@NgModule({
  declarations: [
    LoginCocinaComponent
  ],
  imports: [
    CommonModule,
    CocinaRoutingModule,
    PlantillasModule
  ]
})
export class CocinaModule { }
