import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'profesionales',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.css']
})
export class CrearRecursoComponent {
  mapaSitio = false;
  recursoForm: FormGroup;
  show = false;
  titulo = 'Crear recurso';
  id: string | null;
  marcas: { nombre: string }[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento
  gamas: { tipo: string }[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento
  profesionales = true;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _recursoService: RecursoService,
    private aRouter: ActivatedRoute
  ) {
    this.recursoForm = this.fb.group({
      numSerie: ['', Validators.required],
      recurso: ['', Validators.required],
      marca: ['', Validators.required],
      gama: ['', Validators.required],
      estatus: ['',],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.loadMarcas();
    this.loadGama();
  }
  loadMarcas() {
    this._recursoService.obtenerMarca().subscribe(
      (marcas: { nombre: string }[]) => {
        // Actualiza las opciones de departamento en el formulario
        this.marcas = marcas;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  loadGama() {
    this._recursoService.obtenerGama().subscribe(
      (gamas: { tipo: string }[]) => {
        // Actualiza las opciones de departamento en el formulario
        this.gamas = gamas;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  agregarRecurso(): void {
    console.log(this.recursoForm)

    console.log(this.recursoForm.get('numSerie')?.value);
    const valorPorDefectoEstatus = 'Sin Problemas';
    const RECURSO: Recurso = {
      numSerie: this.recursoForm.get('numSerie')?.value,
      recurso: this.recursoForm.get('recurso')?.value,
      marca: this.recursoForm.get('marca')?.value,
      gama: this.recursoForm.get('gama')?.value,
      estatus: valorPorDefectoEstatus,
      asignadoA: ''
    }

    if (this.id !== null) {
      //editar recurso;
      this._recursoService.editarRecurso(this.id, RECURSO).subscribe(data => {
        this.router.navigate(['/listar-recurso']);
      }, error => {
        console.log(error);
        this.recursoForm.reset();
      })
    } else {
      //agregar recurso
      console.log(RECURSO);
      this._recursoService.guardarRecurso(RECURSO).subscribe(data => {
        this.router.navigate(['/listar-recurso']);
      }, error => {
        console.log(error);
        this.recursoForm.reset();
      })
    }

  }



  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar Recurso';
      this._recursoService.obtenerRecurso(this.id).subscribe(data => {
        this.recursoForm.setValue({
          numSerie: data.numSerie,
          recurso: data.recurso,
          marca: data.marca,
          gama: data.gama,
          estatus: data.estatus,
        })
      })
    }
  }
  muestraMapa() {
    this.mapaSitio = true;
    }

  cerrarMapa() {
    this.mapaSitio = false;
  }

  showForm() {
    this.show = true;
    this.profesionales = false;
  }
  close() {
    this.show = false;
    this.profesionales = true;
  }
}
/* function ajax() {
  const http = new XMLHttpRequest();
  const url = '';

  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.readyState)
    }
  }
  http.open("GET", url);
  http.send();

  document.getElementById('btn-ajax').addEventListener("click", function() {
    ajax();
  }); */



