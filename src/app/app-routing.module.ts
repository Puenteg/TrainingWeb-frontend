import { ListarRecursoComponent } from './components/listar-recurso/listar-recurso.component';
import { CrearRecursoComponent } from './components/crear-recurso/crear-recurso.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EliminarRecursoComponent } from './components/eliminar-recurso/eliminar-recurso.component';
import { EditRecursoComponent } from './components/edit-recurso/edit-recurso.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { InicioComponent } from './components/inicio/inicio/inicio.component';
import { ListarEmpleadosComponent } from './components/listar-empleados/listar-empleados/listar-empleados.component';
import { RegistroComponent } from './registro/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { BusquedaPorEmpeladoComponent } from './components/asignacion/busqueda-por-empelado/busqueda-por-empelado.component';
import { MapaSitioComponent } from './components/mapa-sitio/mapa-sitio.component';
import { CrearProfesionalesComponent } from './components/crear-profesionales/crear-profesionales.component';
import { CrearRutinasComponent } from './components/crear-rutinas/crear-rutinas.component';
import { VistaAdminComponent } from './components/vista-admin/vista-admin.component';
import { RecuperarPswComponent } from './components/recuperar-psw/recuperar-psw.component';

const routes: Routes = [
  { path: 'app-login', component: LoginComponent},
  { path: 'inicio', component: InicioComponent, },
  { path: 'dietas', component: ListarEmpleadosComponent, },
  { path: 'registro', component: RegistroComponent, },
  { path: 'editar-empleado/:id', component: RegistroComponent, },
  { path: 'rutinas', component: ListarRecursoComponent, },
  { path: 'crear-rutinas', component: CrearRutinasComponent},
  { path: 'profesionales', component: CrearRecursoComponent, },
  { path: 'editar-recurso/:id', component: CrearRecursoComponent, },
  { path: 'crear-dietas', component: EditRecursoComponent, },
  { path: 'mapa-sitio', component: MapaSitioComponent},
  { path: 'trac', component: AsignacionComponent, },
  { path: 'app-crear-profesionales', component: CrearProfesionalesComponent },
  { path: 'vista-admin', component: VistaAdminComponent },
  { path: 'recuperar-psw', component: RecuperarPswComponent},
  { path: '', component: BusquedaPorEmpeladoComponent},
  { path: '**', component: EliminarRecursoComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      onSameUrlNavigation: "ignore",
      anchorScrolling:'enabled',
      scrollPositionRestoration: 'enabled'
  }
    
  )],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
