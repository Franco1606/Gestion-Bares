import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginAdminComponent } from "./plantillas/login-admin/login-admin.component"
import { ListaCategoriasComponent } from "./vistas/lista-categorias/lista-categorias.component"
import { ListaProductosComponent } from "./vistas/lista-productos/lista-productos.component"

const routes: Routes = [
  { path: "login", component:LoginAdminComponent },
  { path: "lista-categorias", component:ListaCategoriasComponent },
  { path: "lista-productos/:categoriaID", component:ListaProductosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]  
})
export class AdminRoutingModule { }
