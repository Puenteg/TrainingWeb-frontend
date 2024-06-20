import { Component, OnInit } from '@angular/core';
import { RecursoService } from './../../services/recurso.service';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from 'src/app/models/recurso';
import { RutinasService } from 'src/app/services/rutinas.service';
import { enviroment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';
import { DataUser, LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'rutinas',
  templateUrl: './listar-recurso.component.html',
  styleUrls: ['./listar-recurso.component.css']
})
export class ListarRecursoComponent implements OnInit{
  listRutina = false ;
  rutinas = true;
  mapaSitio = false;
  listRutinas : any [] = [];
  mostrarRutina: any;
  nombrePerfil: Observable<DataUser>;
  constructor(private loginService: LoginService, private _rutinasService: RutinasService, private toastr: ToastrService) {
    this.caragaRutinas();
    this.nombrePerfil = loginService.getDataUser();
  }
  caragaRutinas(): void {
    this._rutinasService.getRutina().then(
      (ejercicios) => {
        this.listRutinas = ejercicios;
        setTimeout(() => {
          this.listRutinas.forEach((rutina: any) => {
            setTimeout(() => {
              if(rutina.imagen) {
                const srcImage: any = document.getElementById('image' + rutina._id);
                srcImage.src = `${enviroment.urlBackEnd}/${rutina.imagen}`;
              } else {
                const srcImage: any = document.getElementById('image' + rutina._id);
                srcImage.src = `${enviroment.urlBackEnd}/default.png`;
              }
            }, 250)
          });
        }, 500)
      }
    )
  }
  mostrar(rutina: any) {
    this.listRutina = true;
    this.rutinas = false;
    this.mostrarRutina = rutina;
    setTimeout(() => {
      if(rutina.imagen) {
        const srcImage: any = document.getElementById('imagen' + rutina._id);
        srcImage.src = `${enviroment.urlBackEnd}/${rutina.imagen}`;
      } else {
        const srcImage: any = document.getElementById('imagen' + rutina._id);
        srcImage.src = `${enviroment.urlBackEnd}/default.png`;
      }
    }, 250)
    console.info('mostrarRutina:', this.mostrarRutina)
  }
  ngOnInit(): void {

  }

/*   obtenerRecursos() {
    this._recursoService.getRecursos().subscribe(data => {
      console.log(data);
      this.listRecursos = data;
    }, error => {
      console.log(error);
    })
  } */

/*   eliminarRecurso(id:any) {
    this._recursoService.eliminarRecurso(id).subscribe(data => {
      this.toastr.error('El recurso fue eliminado con exito');
      this.obtenerRecursos();
    }, error => {
      console.log(error);
    } )
  } */

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
