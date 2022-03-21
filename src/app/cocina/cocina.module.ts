import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantillasModule } from "../plantillas/plantillas.module"
import { UtilidadesModule } from "../utilidades/utilidades.module"

import { CocinaRoutingModule } from './cocina-routing.module';
import { LoginCocinaComponent } from './plantillas/login-cocina/login-cocina.component';
import { HeaderCocinaComponent } from './plantillas/header-cocina/header-cocina.component';
import { GestionPedidosComponent } from './vistas/gestion-pedidos/gestion-pedidos.component';


@NgModule({
  declarations: [
    LoginCocinaComponent,
    HeaderCocinaComponent,
    GestionPedidosComponent
  ],
  imports: [
    CommonModule,
    CocinaRoutingModule,
    PlantillasModule,
    UtilidadesModule
  ]
})
export class CocinaModule { }
