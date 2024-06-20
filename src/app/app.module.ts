import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearRecursoComponent } from './components/crear-recurso/crear-recurso.component';
import { ListarRecursoComponent } from './components/listar-recurso/listar-recurso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { EliminarRecursoComponent } from './components/eliminar-recurso/eliminar-recurso.component';
import { EditRecursoComponent } from './components/edit-recurso/edit-recurso.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component'
import { BusquedaPorEmpeladoComponent } from './components/asignacion/busqueda-por-empelado/busqueda-por-empelado.component';
import { BusquedaPorRecursoComponent } from './components/asignacion/busqueda-por-recurso/busqueda-por-recurso.component';
import { AsignarComponent } from './components/asignacion/asignar/asignar.component';
import { ModalFallaComponent } from './components/asignacion/modal-falla/modal-falla.component';
import { DatePipe } from '@angular/common';
import { InicioComponent } from './components/inicio/inicio/inicio.component';
import { ListarEmpleadosComponent } from './components/listar-empleados/listar-empleados/listar-empleados.component';
import { EmpleadofilterPipe } from './pipes/empleadofilter.pipe';
import { RegistroComponent } from './registro/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { RoleDirective } from './directivas/role.directive';
import { MapaSitioComponent } from './components/mapa-sitio/mapa-sitio.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { CrearProfesionalesComponent } from './components/crear-profesionales/crear-profesionales.component';
import { CrearRutinasComponent } from './components/crear-rutinas/crear-rutinas.component';
import { VistaAdminComponent } from './components/vista-admin/vista-admin.component';
import { HttpInterceptorService } from './interceptor/http-interceptor.service';
import { RecuperarPswComponent } from './components/recuperar-psw/recuperar-psw.component';
/* import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha"; */

@NgModule({
  declarations: [
    AppComponent,
    CrearRecursoComponent,
    ListarRecursoComponent,
    FilterPipe,
    EliminarRecursoComponent,
    EditRecursoComponent,
    AsignacionComponent,
    BusquedaPorEmpeladoComponent,
    BusquedaPorRecursoComponent,
    AsignarComponent,
    ModalFallaComponent,
    InicioComponent,
    ListarEmpleadosComponent,
    EmpleadofilterPipe,
    RegistroComponent,
    LoginComponent,
    RoleDirective,
    MapaSitioComponent,
    CrearProfesionalesComponent,
    CrearRutinasComponent,
    VistaAdminComponent,
    RecuperarPswComponent,
    // CaptchaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
/*     RecaptchaModule,
    RecaptchaFormsModule */
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
    /* RecaptchaV3Module,
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: "<6LeoROApAAAAAI0GxlMQBhZvu63YlcbPlkPyr_l6>" }
 */  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
