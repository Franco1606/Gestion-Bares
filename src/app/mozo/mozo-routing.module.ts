import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginMozoComponent } from "./plantillas/login-mozo/login-mozo.component"
import { GestionMesasComponent } from "./vistas/gestion-mesas/gestion-mesas.component"

const routes: Routes = [
  { path: "login", component:LoginMozoComponent },
  { path: "gestion-mesas", component:GestionMesasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MozoRoutingModule { }
