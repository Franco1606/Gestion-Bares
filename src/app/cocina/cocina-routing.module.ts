import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginCocinaComponent } from "./plantillas/login-cocina/login-cocina.component"
import { GestionPedidosComponent } from "./vistas/gestion-pedidos/gestion-pedidos.component"
import { GestionOrdenesComponent } from "./vistas/gestion-ordenes/gestion-ordenes.component"

const routes: Routes = [
  { path: "login", component:LoginCocinaComponent },
  { path: "gestion-pedidos", component:GestionPedidosComponent },
  { path: "gestion-ordenes", component:GestionOrdenesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocinaRoutingModule { }
