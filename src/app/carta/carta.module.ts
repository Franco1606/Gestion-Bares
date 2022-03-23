import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilidadesModule } from "../utilidades/utilidades.module"
import { PlantillasModule } from "../plantillas/plantillas.module"

import { CartaRoutingModule } from './carta-routing.module';
import { CartaComponent } from './Vistas/carta/carta.component';
import { ColapsadorComponent } from './Plantillas/colapsador/colapsador.component';
import { ComentarioDialogComponent } from './Dialogs/comentario-dialog/comentario-dialog.component';
import { QuitarDialogComponent } from './Dialogs/quitar-dialog/quitar-dialog.component';
import { PedidoDialogComponent } from './Dialogs/pedido-dialog/pedido-dialog.component';


@NgModule({
  declarations: [
    CartaComponent,
    ColapsadorComponent,
    ComentarioDialogComponent,
    QuitarDialogComponent,
    PedidoDialogComponent    
  ],
  imports: [
    CommonModule,
    CartaRoutingModule,
    UtilidadesModule,
    PlantillasModule
  ]
})
export class CartaModule { }
