import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RecuperacionServiceService } from 'src/app/services/recuperacion-service.service';

@Component({
  selector: 'recuperar-psw',
  templateUrl: './recuperar-psw.component.html',
  styleUrls: ['./recuperar-psw.component.css']
})
export class RecuperarPswComponent {
  correo = '';
  dataUser: null | any;
  constructor(private recuperacionService: RecuperacionServiceService,private router: Router, private fb: FormBuilder) {
    
  }

  recuperaContrasenia() {
    const element: any = document.getElementById('correoRecupera');
    const correo = element?.value;
    console.info(correo);
    this.recuperacionService.recuperaContraseña(correo).then(success => {
      alert('Contraseña recuperada con exito! Favor de revisar tu correo')
      this.router.navigateByUrl('/app-login')
    },
      error => {
        alert('Correo Incorrecto!')
      }
    );

    /* console.info(codigoRecuperacion)
    if (this.codigoRecuperacion === codigoRecuperacion) {
      console.info('El codigo de recuperacion es correcto');
      
    } else {
      alert('El codigo ingresado no es correcto')
    } */
  }
}
