import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { RutinasService } from 'src/app/services/rutinas.service';

@Component({
  selector: 'crear-rutinas',
  templateUrl: './crear-rutinas.component.html',
  styleUrls: ['./crear-rutinas.component.css']
})
export class CrearRutinasComponent {
  rutinaForm: FormGroup;
  id: string | null;
  titulo = 'Registrar Rutina';
  imagen: File | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _rutinasSerives: RutinasService,
    private aRouter: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.rutinaForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      lunes: [''],
      martes: [''],
      miercoles: [''],
      jueves: [''],
      viernes: [''],
      sabado: [''],
      domingo: [''],
      autor: ['']
    });
    loginService.getDataUser().pipe(take(1)).subscribe((next) => {
      this.rutinaForm.get('autor')?.patchValue(next.usuario)
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');

  }
  createRutina() {
    const formData = new FormData();
    formData.append('nombre', this.rutinaForm.get('nombre')?.value)
    formData.append('descripcion', this.rutinaForm.get('descripcion')?.value)
    formData.append('lunes', this.rutinaForm.get('lunes')?.value)
    formData.append('martes', this.rutinaForm.get('martes')?.value)
    formData.append('miercoles', this.rutinaForm.get('miercoles')?.value)
    formData.append('jueves', this.rutinaForm.get('jueves')?.value)
    formData.append('viernes', this.rutinaForm.get('viernes')?.value)
    formData.append('sabado', this.rutinaForm.get('sabado')?.value)
    formData.append('domingo', this.rutinaForm.get('domingo')?.value)
    formData.append('autor', this.rutinaForm.get('autor')?.value)
    if(this.imagen) {
      formData.append('imagen', this.imagen);
    }
    if ('Edit Rutina' === this.titulo) {
      if(this.id != null) {
        this._rutinasSerives.deleteRutina(this.id).subscribe(data =>{
          alert('Rutina eliminada con exito!');
          this.router.navigate(['/rutinas'])
          this.rutinaForm.reset();
        }, error => {
          alert(error);
        })
      }
    } else {
      this._rutinasSerives.createRutina(formData).subscribe(data => {
        alert('Rutina agregada con exito!');
        this.router.navigate(['/rutinas'])
      }, error => {
        this.rutinaForm.reset();
        alert(error);
      })
    }
  }
  onFileChange(event: any): void {
    [this.imagen] = event.target.files
    console.info(this.imagen)
  }
}
