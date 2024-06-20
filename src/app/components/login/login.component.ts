import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  $isLogin;
  formLogin: FormGroup;
  showMessage = false;
  codigoVerificador = '';
  dataUser: null|any;
  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    this.$isLogin = loginService.isLogin();
    this.formLogin = this.fb.group({
      username: ['', []],
      pwd: ['', []],
      recaptchaToken: ['', Validators.required]
    })
  }
  onCaptchaResolved(token: any): void {
    this.formLogin.get('recaptchaToken')?.setValue(token);
  }

  validaLogin(): void {
    this.showMessage = false;
    this.loginService.validaCredenciales(this.formLogin.value).then(
      (success) => {
        console.info('Credenciales correctas');
        this.codigoVerificador = success.codVerificador;
        this.dataUser = success.usuario
      }, (error) => {
        this.showMessage = true;
      }
    );
  }

  validaCodigoVerificador() {
    const element: any = document.getElementById('codigoVerificador');
    const codigoVerificador = element?.value;
    console.info(codigoVerificador)
    if(this.codigoVerificador === codigoVerificador) {
      console.info('codigoVerificador correcto')
      console.info(this.dataUser)
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('dataUser', JSON.stringify(this.dataUser));
      this.loginService.setLoginTrue();
      this.loginService.setDataUser(this.dataUser);
      this.router.navigateByUrl('/inicio')
    } else {
      alert('El código ingresado no es correcto')
    }
  }
}
