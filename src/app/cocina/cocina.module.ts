import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantillasModule } from "../plantillas/plantillas.module"
import { UtilidadesModule } from "../utilidades/utilidades.module"

import { CocinaRoutingModule } from './cocina-routing.module';
import { LoginCocinaComponent } from './plantillas/login-cocina/login-cocina.component';
import { HeaderCocinaComponent } from './plantillas/header-cocina/header-cocina.component';
import { GestionPedidosComponent } from './vistas/gestion-pedidos/gestion-pedidos.component';
import { DetallesPedidoDialogComponent } from './Dialogs/detalles-pedido-dialog/detalles-pedido-dialog.component';
import { GestionOrdenesComponent } from './vistas/gestion-ordenes/gestion-ordenes.component';
import { DetallesOrdenDialogComponent } from './Dialogs/detalles-orden-dialog/detalles-orden-dialog.component';
import { ComentarioDialogComponent } from './Dialogs/comentario-dialog/comentario-dialog.component';


@NgModule({
  declarations: [
    LoginCocinaComponent,
    HeaderCocinaComponent,
    GestionPedidosComponent,
    DetallesPedidoDialogComponent,
    GestionOrdenesComponent,
    DetallesOrdenDialogComponent,
    ComentarioDialogComponent
  ],
  imports: [
    CommonModule,
    CocinaRoutingModule,
    PlantillasModule,
    UtilidadesModule
  ]
})
export class CocinaModule { }
