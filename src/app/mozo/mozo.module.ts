//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MozoRoutingModule } from './mozo-routing.module';
import { UtilidadesModule } from "../utilidades/utilidades.module"
import { PlantillasModule } from "../plantillas/plantillas.module"

import { LoginMozoComponent } from './plantillas/login-mozo/login-mozo.component';
import { GestionMesasComponent } from './vistas/gestion-mesas/gestion-mesas.component';
import { HeaderMozoComponent } from './plantillas/header-mozo/header-mozo.component';


@NgModule({
  declarations: [
    LoginMozoComponent,
    GestionMesasComponent,
    HeaderMozoComponent
  ],
  imports: [
    CommonModule,
    MozoRoutingModule,
    UtilidadesModule,
    PlantillasModule
  ]
})
export class MozoModule { }
