//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UtilidadesModule } from "../utilidades/utilidades.module"
import { PlantillasModule } from "../plantillas/plantillas.module"

//Componentes
import { LoginAdminComponent } from './plantillas/login-admin/login-admin.component';
import { ListaCategoriasComponent } from './vistas/lista-categorias/lista-categorias.component';
import { HeaderAdminComponent } from './plantillas/header-admin/header-admin.component';
import { AgregarCategoriaDialogComponent } from './Dialogs/agregar-categoria-dialog/agregar-categoria-dialog.component';
import { EditarCategoriaDialogComponent } from './Dialogs/editar-categoria-dialog/editar-categoria-dialog.component';
import { ListaProductosComponent } from './vistas/lista-productos/lista-productos.component';
import { AgregarProductoDialogComponent } from './Dialogs/agregar-producto-dialog/agregar-producto-dialog.component';
import { EditarProductoDialogComponent } from './Dialogs/editar-producto-dialog/editar-producto-dialog.component';
import { EstilosCartaComponent } from './vistas/estilos-carta/estilos-carta.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { GestionMozosComponent } from './vistas/gestion-mozos/gestion-mozos.component';
import { AgregarMozoDialogComponent } from './Dialogs/agregar-mozo-dialog/agregar-mozo-dialog.component';
import { EditarMozoDialogComponent } from './Dialogs/editar-mozo-dialog/editar-mozo-dialog.component';

@NgModule({
  declarations: [
    LoginAdminComponent,
    ListaCategoriasComponent,
    HeaderAdminComponent,
    AgregarCategoriaDialogComponent,
    EditarCategoriaDialogComponent,
    ListaProductosComponent,
    AgregarProductoDialogComponent,
    EditarProductoDialogComponent,
    EstilosCartaComponent,
    InicioComponent,
    GestionMozosComponent,
    AgregarMozoDialogComponent,
    EditarMozoDialogComponent      
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UtilidadesModule,
    PlantillasModule
  ]  
})
export class AdminModule { }
