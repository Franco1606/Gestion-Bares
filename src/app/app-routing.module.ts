import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "carta",
    loadChildren: () => import("../app/carta/carta.module").then(x => x.CartaModule)
  },
  {
    path: "admin",
    loadChildren: () => import("../app/admin/admin.module").then(x => x.AdminModule)
  },
  {
    path: "mozo",
    loadChildren: () => import("../app/mozo/mozo.module").then(x => x.MozoModule)
  },
  {
    path: "cocina",
    loadChildren: () => import("../app/cocina/cocina.module").then(x => x.CocinaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
