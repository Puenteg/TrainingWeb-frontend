import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataUser, LoginService } from '../services/login.service';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {

  private currentUser: DataUser = {username:'',roles: []};
  private $currentUser: Observable<DataUser> = new BehaviorSubject({username:'',roles: []});
  private permisos: Array<string> = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loginService: LoginService
  ) {
    this.loginService.getDataUser().pipe(take(1)).subscribe({
      next: (next) => {
        this.currentUser = next;
      }
    })
    this.$currentUser = this.loginService.getDataUser();
  }

  ngOnInit(): void {

  }

  @Input()
  set appRole(value: Array<string>) {
    console.info(' *** ', value);
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.permisos = value;
    this.actualizaVista();
  }

  private actualizaVista(): void {
    this.viewContainer.clear();
    if(this.validaPermisos()) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }

  private validaPermisos(): boolean {
    let tienePermisos = false;
    if(this.currentUser && this.currentUser.roles) {
      for(let rolPermiso of this.permisos) {
        const permisoEncontrado = this.currentUser.roles.find(rolUser => {
          return rolUser.toLocaleUpperCase() === rolPermiso.toUpperCase()
        });
        if(permisoEncontrado) {
          console.info('Tines permiso: ', permisoEncontrado)
          tienePermisos = true;
          break;
        }
      }

    }
    return tienePermisos;
  }

}
