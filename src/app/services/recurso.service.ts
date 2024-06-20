import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Recurso } from '../models/recurso';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  url = `${enviroment.urlBackEnd}/api/recursos/`;
  url2 = `${enviroment.urlBackEnd}/api/marca/`;
  url3 = `${enviroment.urlBackEnd}/api/gama/`;




  constructor(private http: HttpClient) { }

  getRecursos(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarRecurso(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarRecurso(vrecurso: Recurso): Observable<any> {
    return this.http.post(this.url, vrecurso);
  }

  obtenerRecurso(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarRecurso(id: string, vrecurso: Recurso): Observable<any> {
    return this.http.put(this.url + id, vrecurso);
  }
  obtenerMarca(): Observable<{ nombre: string }[]> {
    return this.http.get<{ nombre: string }[]>(this.url2);
  }
  obtenerGama(): Observable<{ tipo: string }[]> {
    return this.http.get<{ tipo: string }[]>(this.url3);
  }
}
