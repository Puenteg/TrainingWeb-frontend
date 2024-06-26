import { AfterViewInit, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { DietasServiceService } from 'src/app/services/dietas-service.service';
import { Dietas } from 'src/app/models/dietas';
import { enviroment } from 'src/enviroments/enviroment';
import { LoginService } from 'src/app/services/login.service';
import { take } from 'rxjs';

@Component({
  selector: 'dietas',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit{
  listEmpleados: Empleado [] = [];
  filterEmpleado = '';
  listDieta = false;
  Dietas = true;
  listDietas: any [] = [];
  mapaSitio = false;
  dataUser: any = {};

  mostrarDieta: any;

  constructor(private _empleadoService: EmpleadoService, private _dietasService: DietasServiceService, private loginService: LoginService) {
    this.caragaDietas();
    this.loginService.getDataUser().pipe(take(1)).subscribe({
      next: (value) => this.dataUser = value
    })
  }

  caragaDietas(): void {
    this._dietasService.getDietas().then(
      (meseros) => {
        this.listDietas = meseros;
        setTimeout(() => {
          this.listDietas.forEach((dieta: any) => {
            setTimeout(() => {
              if(dieta.imagen) {
                const srcImage: any = document.getElementById('image' + dieta._id);
                srcImage.src = `${enviroment.urlBackEnd}/${dieta.imagen}`;
              } else {
                const srcImage: any = document.getElementById('image' + dieta._id);
                srcImage.src = `${enviroment.urlBackEnd}/default.png`;
              }
            }, 250)
          });
        }, 500)
      }
    )
  }

  mostrar(dieta: any) {
    this.listDieta = true;
    this.Dietas = false;
    this.mostrarDieta = dieta;
    setTimeout(() => {
      if(dieta.imagen) {
        const srcImage: any = document.getElementById('imagen' + dieta._id);
        srcImage.src = `${enviroment.urlBackEnd}/${dieta.imagen}`;
      } else {
        const srcImage: any = document.getElementById('imagen' + dieta._id);
        srcImage.src = `${enviroment.urlBackEnd}/default.png`;
      }
    }, 250)
    console.info('mostrarDieta:', this.mostrarDieta)
  }
  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      console.log(data);
      this.listEmpleados = data;
    }, error => {
      console.log(error);
    })
  }
/*     getDietas() {
    this._dietasService.getDietas().subscribe(data => {
      console.log(data);
      this.listDietas = data;
    }, error => {
      console.log(error);
    })
} */

  eliminar(id: string): void {
    this._dietasService.deleteDieta(id).subscribe(() => {
      alert('Eliminación exitosa')
      this.caragaDietas();
    })
  }

  muestraMapa() {
  this.mapaSitio = true;
  }

  cerrarMapa() {
    this.mapaSitio = false;
  }

  coincideAutorConUser(autor: string): boolean {
    return this.dataUser.usuario === autor;
  }

}
