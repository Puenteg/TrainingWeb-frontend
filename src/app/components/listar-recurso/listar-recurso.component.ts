import { Component, OnInit } from '@angular/core';
import { RecursoService } from './../../services/recurso.service';
import { Recurso } from 'src/app/models/recurso';

@Component({
  selector: 'rutinas',
  templateUrl: './listar-recurso.component.html',
  styleUrls: ['./listar-recurso.component.css']
})
export class ListarRecursoComponent implements OnInit{
    mostrarSinFallos: boolean = false;
  mostrarConFallos: boolean = false;
  listRutina = false;
  rutinas = true;
  mapaSitio = false;
    mostrarDiv(opcion: string) {
        if (opcion === 'SinFallos') {
            this.mostrarSinFallos = true;
            this.mostrarConFallos = false;
        } else if (opcion === 'ConFallos') {
            this.mostrarSinFallos = false;
            this.mostrarConFallos = true;
        }
    }



  listRecursos: Recurso[] = [];

  filterPost = '';

  filter: string = '';

  constructor(private _recursoService: RecursoService) {}

  ngOnInit(): void {
    this.obtenerRecursos();
    this.mostrarDiv('SinFallos');
  }

  obtenerRecursos() {
    this._recursoService.getRecursos().subscribe(data => {
      console.log(data);
      this.listRecursos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarRecurso(id:any) {
    this._recursoService.eliminarRecurso(id).subscribe(data => {
      this.obtenerRecursos();
    }, error => {
      console.log(error);
    } )
  }

  muestra() {
    this.listRutina = true;
    this.rutinas = false;
  }
    muestraMapa() {
    this.mapaSitio = true;
    }

  cerrarMapa() {
    this.mapaSitio = false;
  }
}
