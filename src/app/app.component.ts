import { Component } from '@angular/core';
import { DataUser, LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  constructor(private loginService: LoginService, private router: Router) {
    this.$isLogin = loginService.isLogin();
    this.nombrePerfil = loginService.getDataUser();
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
