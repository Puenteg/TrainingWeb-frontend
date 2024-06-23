import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  template: `<re-captcha (resolved)="resolved($event)" siteKey="6LeoROApAAAAAI0GxlMQBhZvu63YlcbPlkPyr_l6"></re-captcha>`,
})
export class RegistroComponent implements OnInit {
  empleadoForm: FormGroup;
  titulo = 'Registrar Usuario'
  id: string | null;
  departamentos: { nombre: string }[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento
  gerents: { gerente: string }[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento
  captchaResolved = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _empleadoService: EmpleadoService,
    private aRouter: ActivatedRoute) {

    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      contraseña: ['', Validators.required,],
      contraseña2: ['', Validators.required,],
      apellido: ['', Validators.required],
      // telefono: ['', [Validators.required, Validators.pattern('[0-9]{10,12}')]],
      email: ['', Validators.required],
      rol: [null, Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    // this.esEditar();
    // this.loadDepartments();
    // this.loadGerents();
  }


  loadDepartments() {
    this._empleadoService.obtenerDepartamento().subscribe(
      (departamentos: { nombre: string }[]) => {
        // Actualiza las opciones de departamento en el formulario
        this.departamentos = departamentos;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadGerents() {
    this._empleadoService.obtenerGerente().subscribe(
      (gerents: { gerente: string }[]) => {
        // Actualiza las opciones de departamento en el formulario
        this.gerents = gerents;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  crearEmpleado() {
    if(this.empleadoForm.invalid) {
      alert('Los datos del usuario son incorrectos')
      return;
    }

    if(!(this.empleadoForm.get('contraseña')?.value && this.empleadoForm.get('contraseña')?.value === this.empleadoForm.get('contraseña2')?.value)) {
      alert('Las contraseñas ingresadas no coinciden')
      return
    }

    const empleado = {
      nombre: this.empleadoForm.get('nombre')?.value,
      contraseña: this.empleadoForm.get('contraseña')?.value,
      apellido: this.empleadoForm.get('apellido')?.value,
      telefono: '',
      email: this.empleadoForm.get('email')?.value,
      estatus: this.empleadoForm.get('estatus')?.value,
      roles: [this.empleadoForm.get('rol')?.value]
    }
    console.info('Empleado: ', empleado)
    this._empleadoService.crearEmpleado(empleado).subscribe(
      (data) => {
        alert('Usuario agregado con exito!');
        this.router.navigate(['/app-login']);
      },
      (error) => {
        alert(error?.error?.message);
      }
    );

  }


  // crearEmpleado() {
  //   const EMPLEADO: Empleado = {
  //     nombre: this.empleadoForm.get('nombre')?.value,
  //     contraseña: this.empleadoForm.get('contraseña')?.value,
  //     apellido: this.empleadoForm.get('apellido')?.value,
  //     telefono: this.empleadoForm.get('telefono')?.value,
  //     email: this.empleadoForm.get('email')?.value,
  //     estatus: this.empleadoForm.get('estatus')?.value
  //   }
  //   console.log(EMPLEADO);
  //   if ('Editar Empleado' === this.titulo) {
  //     if (this.id != null) {
  //       this._empleadoService.actualizarEmpleado(this.id, EMPLEADO).subscribe(data => {
  //         alert('Usuario actualizado con exito!');
  //         this.router.navigate(['/listar-empleado'])
  //         this.empleadoForm.reset();
  //       }, error => {
  //         alert(error);
  //       })
  //     }
  //   } else {
  //     this._empleadoService.crearEmpleado(EMPLEADO).subscribe(data => {
  //       alert('Usuario agregado con exito!');
  //       this.router.navigate(['/app-login'])
  //     }, error => {
  //       this.empleadoForm.reset();
  //       alert(error);
  //     })
  //   }
  // }
  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Empleado';
      this._empleadoService.obtenerEmpleado(this.id).subscribe(data => {
        this.empleadoForm.setValue({
          nombre: data.nombre,
          contraseña: data.contraseña,
          apellido: data.apellido,
          telefono: data.telefono,
          email: data.email,
          estatus: data.estatus
        })
      })
    }
  }
  resolvedCaptcha(event: any) {
    if (event) {
      this.captchaResolved = true;
    } else {
      this.captchaResolved = false;
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
