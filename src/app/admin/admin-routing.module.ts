import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginAdminComponent } from "./plantillas/login-admin/login-admin.component"
import { InicioComponent } from "./vistas/inicio/inicio.component"
import { ListaCategoriasComponent } from "./vistas/lista-categorias/lista-categorias.component"
import { ListaProductosComponent } from "./vistas/lista-productos/lista-productos.component"
import { EstilosCartaComponent } from "./vistas/estilos-carta/estilos-carta.component"
import { GestionMozosComponent } from "./vistas/gestion-mozos/gestion-mozos.component"
import { GestionCocinerosComponent } from "./vistas/gestion-cocineros/gestion-cocineros.component"
import { GestionMesasComponent } from "./vistas/gestion-mesas/gestion-mesas.component"

const routes: Routes = [
  { path: "login", component:LoginAdminComponent },
  { path: "inicio", component:InicioComponent },
  { path: "lista-categorias", component:ListaCategoriasComponent },
  { path: "lista-productos/:categoriaID", component:ListaProductosComponent },
  { path: "estilos-carta", component:EstilosCartaComponent },
  { path: "gestion-mozos", component:GestionMozosComponent },
  { path: "gestion-cocineros", component:GestionCocinerosComponent },
  { path: "gestion-mesas", component:GestionMesasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]  
})
export class AdminRoutingModule { }
