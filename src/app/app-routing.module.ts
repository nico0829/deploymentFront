import { FormularioComponent } from './Usuario/formulario/formulario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './Usuario/add/add.component';
import { EditarComponent } from './Usuario/editar/editar.component';
import { ListarComponent } from './Usuario/listar/listar.component';

const routes: Routes = [
  {path:'listar',component:ListarComponent},
  {path:'add',component:AddComponent},
  {path:'editar',component:EditarComponent},
  {path:'formulario',component:FormularioComponent},
  {path:'',component:ListarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
