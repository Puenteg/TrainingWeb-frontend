import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  mapaSitio = false;
    muestra() {
    this.mapaSitio = true;
    }
  
  cerrar() {
    this.mapaSitio = false;
  }
}
