import { Component } from '@angular/core';
import { DataUser, LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';


export interface Sugerencia {
  ruta: string;
  nombre: string;
}

const rutasLocales: Sugerencia[]  = [
  { ruta: 'dietas', nombre: 'Dietas' },
  { ruta: 'rutinas', nombre: 'Rutinas' },
  { ruta: 'crear-rutinas', nombre: 'Crear Rutinas' },
  { ruta: 'crear-dietas', nombre: 'Crear Dietas' },
  { ruta: 'profesionales', nombre: 'Profesionales' },
  { ruta: 'mapa-sitio', nombre: 'Mapa Sitio' },
  { ruta: 'inicio', nombre: 'Inicio' },
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  title = 'cliente';
  perfil = true;
  $isLogin;
  opcionPerfil = false;
  nombrePerfil: Observable<any>;
  isPerfilVisible = false;

  ctrlSearch = new FormControl();

  sugerencias: Sugerencia[] = [];

  constructor(private loginService: LoginService, private router: Router) {
    this.$isLogin = loginService.isLogin();
    this.nombrePerfil = loginService.getDataUser();
    this.ctrlSearch.valueChanges.subscribe({
      next: (value) => this.buscadorGlobal(value)
    })
  }

  buscadorGlobal(input: string) {
    const filtro = input.toLowerCase().trim();
    this.sugerencias = []
    let busquedas: Sugerencia[] = [];
    if( input.length === 0) {
      return
    }
    const searchRutasLocales: Sugerencia[] = rutasLocales.filter(f => {
      return f.nombre.toLowerCase().trim().includes(filtro) || f.ruta.toLowerCase().trim().includes(filtro)
    });
    busquedas = searchRutasLocales;
    this.sugerencias = busquedas;
  }

  navegar(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  logOut(): void {
    this.loginService.logOut();
    this.router.navigateByUrl('/')
  }

  muestra() {
    this.opcionPerfil = true;
  }
  cerrar() {
    this.opcionPerfil = false;
  }

  showPerfil() {
    this.isPerfilVisible = true;
  }

  hiddenPerfil() {
    this.isPerfilVisible = false;
  }


}
