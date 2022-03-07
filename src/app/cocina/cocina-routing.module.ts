import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginCocinaComponent } from "./plantillas/login-cocina/login-cocina.component"

const routes: Routes = [
  { path: "login", component:LoginCocinaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocinaRoutingModule { }
