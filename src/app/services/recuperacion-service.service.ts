import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RecuperacionServiceService {
  
  constructor(private httpClient: HttpClient) {

  }

  async recuperaContraseña(correo: string): Promise<any> {
    console.info('Recupera cotraseña:', correo)
    // validaciones de logueo
    // peticion http para validar credenciales con
    const dataUser = await firstValueFrom<any>(this.httpClient.post(`${enviroment.urlBackEnd}/api/usuario/recupera_contrasena`, {correo}))
    .catch(error => {
      console.error(error)
      return Promise.reject(false);
    })
    return Promise.resolve(true);
  }
}
