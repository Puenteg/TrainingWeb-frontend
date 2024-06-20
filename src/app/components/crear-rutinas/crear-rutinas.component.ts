import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RutinasServiceService } from 'src/app/services/services/rutinas-service.service';

@Component({
  selector: 'crear-rutinas',
  templateUrl: './crear-rutinas.component.html',
  styleUrls: ['./crear-rutinas.component.css']
})
export class CrearRutinasComponent {
  rutinaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _rutinasSerives: RutinasServiceService) {
    this.rutinaForm = this.fb.group({
    });
  }
  crearRutina() {
    
  }
}
