import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginMozoComponent } from "./plantillas/login-mozo/login-mozo.component"

const routes: Routes = [
  { path: "login", component:LoginMozoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MozoRoutingModule { }
