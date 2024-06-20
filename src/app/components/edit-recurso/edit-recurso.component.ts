import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dietas } from 'src/app/models/dietas';
import { DietasServiceService } from 'src/app/services/dietas-service.service';
import { DataUser, LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'crear-dietas',
  templateUrl: './edit-recurso.component.html',
  styleUrls: ['./edit-recurso.component.css']
})
export class EditRecursoComponent {
  dietaForm: FormGroup;
  id: string | null;
  titulo = 'Registrar Dieta';
  mapaSitio = false;
  imagen: File | null = null;
  nombrePerfil: Observable<DataUser>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _dietaService: DietasServiceService,
    private aRouter: ActivatedRoute,
    private loginService: LoginService
  ) {
    
    this.nombrePerfil = loginService.getDataUser();

    this.dietaForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      autor: [''],
      contribucion: [''],
      lunesDesayuno: [''],
      lunesComida: [''],
      lunesCena: [''],
      martesDesayuno: [''],
      martesComida: [''],
      martesCena: [''],
      miercolesDesayuno: [''],
      miercolesComida: [''],
      miercolesCena: [''],
      juevesDesayuno: [''],
      juevesComida: [''],
      juevesCena: [''],
      viernesDesayuno: [''],
      viernesComida: [''],
      viernesCena: [''],
      sabadoDesayuno: [''],
      sabadoComida: [''],
      sabadoCena: [''],
      domingoDesayuno: [''],
      domingoComida: [''],
      domingoCena: [''],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  createDieta() {
    const formData = new FormData();
    formData.append('nombre', this.dietaForm.get('nombre')?.value)
    formData.append('descripcion', this.dietaForm.get('descripcion')?.value)
    formData.append('autor', this.dietaForm.get('autor')?.value)
    formData.append('contribucion', this.dietaForm.get('contribucion')?.value)
    formData.append('lunesDesayuno', this.dietaForm.get('lunesDesayuno')?.value)
    formData.append('lunesComida', this.dietaForm.get('lunesComida')?.value)
    formData.append('lunesCena', this.dietaForm.get('lunesCena')?.value)
    formData.append('martesDesayuno', this.dietaForm.get('martesDesayuno')?.value)
    formData.append('martesComida', this.dietaForm.get('martesComida')?.value)
    formData.append('martesCena', this.dietaForm.get('martesCena')?.value)
    formData.append('miercolesDesayuno', this.dietaForm.get('miercolesDesayuno')?.value)
    formData.append('miercolesComida', this.dietaForm.get('miercolesComida')?.value)
    formData.append('miercolesCena', this.dietaForm.get('miercolesCena')?.value)
    formData.append('juevesDesayuno', this.dietaForm.get('juevesDesayuno')?.value)
    formData.append('juevesComida', this.dietaForm.get('juevesComida')?.value)
    formData.append('juevesCena', this.dietaForm.get('juevesCena')?.value)
    formData.append('viernesDesayuno', this.dietaForm.get('viernesDesayuno')?.value)
    formData.append('viernesComida', this.dietaForm.get('viernesComida')?.value)
    formData.append('viernesCena', this.dietaForm.get('viernesCena')?.value)
    formData.append('sabadoDesayuno', this.dietaForm.get('sabadoDesayuno')?.value)
    formData.append('sabadoComida', this.dietaForm.get('sabadoComida')?.value)
    formData.append('sabadoCena', this.dietaForm.get('sabadoCena')?.value)
    formData.append('domingoDesayuno', this.dietaForm.get('domingoDesayuno')?.value)
    formData.append('domingoComida', this.dietaForm.get('domingoComida')?.value)
    formData.append('domingoCena', this.dietaForm.get('domingoCena')?.value)
    if(this.imagen) {
      formData.append('imagen', this.imagen);
    }
    if ('Edit Dieta' === this.titulo) {
      if(this.id != null) {
        this._dietaService.deleteDieta(this.id).subscribe(data =>{
          alert('Dieta eliminada con exito!');
          this.router.navigate(['/dietas'])
          this.dietaForm.reset();
        }, error => {
          alert(error);
        })
      }
    } else {
      this._dietaService.createDieta(formData).subscribe(data => {
        alert('Dieta agregada con exito!');
        this.router.navigate(['/dietas'])
      }, error => {
        this.dietaForm.reset();
        alert(error);
      })
    }
  }

  onFileChange(event: any): void {
    // if (event.target.files.length > 0) {
    //   this.imagen = event.target.files[0];
    // }
    [ this.imagen ] = event.target.files
    console.info(this.imagen)
    // if (FileReader && this.imagen && this.imagen.size) {
    //   const fr = new FileReader();
    //   fr.onload = () => {
    //     const imageBase64 = fr.result
    //     console.info(imageBase64);
    //     this.dietaForm.get('image')?.setValue(imageBase64);
    //   }
    //   fr.readAsDataURL(this.imagen);
    // }
  }

  muestraMapa() {
    this.mapaSitio = true;
  }

  cerrarMapa() {
    this.mapaSitio = false;
  }
}
