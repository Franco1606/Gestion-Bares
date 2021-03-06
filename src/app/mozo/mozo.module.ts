//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MozoRoutingModule } from './mozo-routing.module';
import { UtilidadesModule } from "../utilidades/utilidades.module"
import { PlantillasModule } from "../plantillas/plantillas.module"

//Componentes
import { LoginMozoComponent } from './plantillas/login-mozo/login-mozo.component';
import { GestionMesasComponent } from './vistas/gestion-mesas/gestion-mesas.component';
import { HeaderMozoComponent } from './plantillas/header-mozo/header-mozo.component';
import { DetallesSesionDialogComponent } from './Dialogs/detalles-sesion-dialog/detalles-sesion-dialog.component';
import { DetallesOrdenDialogComponent } from './Dialogs/detalles-orden-dialog/detalles-orden-dialog.component';
import { CerrarMesaDialogComponent } from './Dialogs/cerrar-mesa-dialog/cerrar-mesa-dialog.component';
import { PedidoMozoComponent } from './vistas/pedido-mozo/pedido-mozo.component';
import { ProductosComponent } from './vistas/productos/productos.component';
import { AgregarComentarioComponent } from './Dialogs/agregar-comentario-dialog/agregar-comentario-dialog.component';
import { VerPedidoDialogComponent } from './Dialogs/ver-pedido-dialog/ver-pedido-dialog.component';

@NgModule({
  declarations: [
    LoginMozoComponent,
    GestionMesasComponent,
    HeaderMozoComponent,
    DetallesSesionDialogComponent,
    DetallesOrdenDialogComponent,
    CerrarMesaDialogComponent,
    PedidoMozoComponent,
    ProductosComponent,
    AgregarComentarioComponent,
    VerPedidoDialogComponent
  ],
  imports: [
    CommonModule,
    MozoRoutingModule,
    UtilidadesModule,
    PlantillasModule
  ]
})
export class MozoModule { }
