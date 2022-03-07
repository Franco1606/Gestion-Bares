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
import { EliminarCategoriaDialogComponent } from './Dialogs/eliminar-categoria-dialog/eliminar-categoria-dialog.component';

@NgModule({
  declarations: [
    LoginAdminComponent,
    ListaCategoriasComponent,
    HeaderAdminComponent,
    AgregarCategoriaDialogComponent,
    EliminarCategoriaDialogComponent      
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UtilidadesModule,
    PlantillasModule
  ]  
})
export class AdminModule { }
