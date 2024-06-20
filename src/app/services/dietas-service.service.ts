import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Dietas } from '../models/dietas';
import { enviroment } from 'src/enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class DietasServiceService {
  url = `${enviroment.urlBackEnd}/api/dietas/`;

  constructor(private http: HttpClient, private httpClient: HttpClient) { }

  createDieta(dieta: any): Observable<any>{
    return this.http.post(this.url, dieta);
  }

  deleteDieta(id: string): Observable<any> {
    return this.http.delete(this.url+id)
  }

/*   getDietas(): Observable<any> {
    return this.http.get(this.url);
  } */
  getDietaId(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  getDietas(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(this.url,{})
    );
    console.info(retorno);
    return retorno;
  }
}
