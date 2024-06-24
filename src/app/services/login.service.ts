import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

export interface DataUser {
  usuario?: null | string;
  username?: null | string;
  nombre?: null | string;
  pwd?: null|string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private $isLogin = new BehaviorSubject(false);
  private dataUser: BehaviorSubject<DataUser>;

  private _server = enviroment.urlBackEnd;
  private _headers = new HttpHeaders().append('Content-tType', 'application/json')

  constructor(private httpClient: HttpClient) {
    this.dataUser = new BehaviorSubject({
      roles: ['']
    });
    const isLogin = localStorage.getItem('isLogin');
    if(isLogin) {
      this.$isLogin.next(new Boolean(isLogin).valueOf());
    }
    const dataUser = localStorage.getItem('dataUser') || false;
    if(dataUser) {
      this.dataUser.next(JSON.parse(dataUser))
    }
  }

  estaLogueado(): boolean {
    return this.$isLogin.value;
  }

  isLogin(): Observable<boolean> {
    return this.$isLogin.asObservable();
  }

  setLoginTrue(): void {
    this.$isLogin.next(true);
  }

  setDataUser(dataUser: any): void {
    this.dataUser.next(dataUser);
  }

  logOut(): void {
    firstValueFrom<any>(this.httpClient.get(`${this,this._server}/api/usuario/logOut`))
    this.$isLogin.next(false);
    localStorage.removeItem('isLogin')
    localStorage.removeItem('dataUser')
  }

  async validaCredenciales(data: {usuario: string, pwd: string}): Promise<any> {
    console.info('validando información de :', data.usuario, ' con pwd: ', data.pwd)
    // validaciones de logueo
    // peticion http para validar credenciales con
    const dataUser = await firstValueFrom<any>(this.httpClient.post(`${this,this._server}/api/usuario/valida_credenciales`, data))
    .catch(error => {
      console.error(error)
    })
    console.info(dataUser)
    // const dataUser = {username: 'dummy', roles: [
    //   'registrado',
    //   'experto',
    //   'normal'
    // ]}
    if(dataUser) { // Si el servicio retorna datos
      return Promise.resolve(dataUser);
    }
    return Promise.reject(false);
  }

  getRoles(): any[] {
    return this.dataUser?.value?.roles;
  }

  getDataUser(): Observable<DataUser> {
    return this.dataUser.asObservable();
  }

}
