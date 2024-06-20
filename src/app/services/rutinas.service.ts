import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {
  url = `${enviroment.urlBackEnd}/api/rutinas/`;

  constructor(private http: HttpClient, private httpClient: HttpClient) { }

  createRutina(rutina: any): Observable<any>{
    return this.http.post(this.url, rutina);
  }

  getRutinaId(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  getRutina(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(this.url,{})
    );
    console.info(retorno);
    return retorno;
  }
  
  deleteRutina(id: string): Observable<any> {
    return this.http.delete(this.url+id)
  }
}

