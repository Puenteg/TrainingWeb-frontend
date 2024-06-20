import { Component } from '@angular/core';
import { AsignacionService } from './asignacion.service';

@Component({
  selector: 'trac',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css'],
  providers: [AsignacionService]
})
export class AsignacionComponent {
  mapaSitio = false;
  collapseEmpleado = false;
      muestraMapa() {
    this.mapaSitio = true;
    }
  
  cerrarMapa() {
    this.mapaSitio = false;
  }
}
