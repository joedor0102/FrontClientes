import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';

const routes: Routes = [
  { path: "clientes", component: ClientesComponent },
  { path: "clientes/agregar", component: AgregarClienteComponent },
  { path: "clientes/buscar/:id", component: BuscarClienteComponent },
  { path: "", redirectTo: "/clientes", pathMatch: "full" },
  { path: "**", redirectTo: "/clientes" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
