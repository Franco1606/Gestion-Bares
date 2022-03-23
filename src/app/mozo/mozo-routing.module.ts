import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginMozoComponent } from "./plantillas/login-mozo/login-mozo.component"
import { GestionMesasComponent } from "./vistas/gestion-mesas/gestion-mesas.component"
import { PedidoMozoComponent } from "./vistas/pedido-mozo/pedido-mozo.component"
import { ProductosComponent } from "./vistas/productos/productos.component"

const routes: Routes = [
  { path: "login", component:LoginMozoComponent },
  { path: "gestion-mesas", component:GestionMesasComponent },
  { path: "pedido-mozo", component:PedidoMozoComponent },
  { path: "productos/:categoriaID", component:ProductosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MozoRoutingModule { }
