import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProfesionalesComponent } from './crear-profesionales.component';

describe('CrearProfesionalesComponent', () => {
  let component: CrearProfesionalesComponent;
  let fixture: ComponentFixture<CrearProfesionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProfesionalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
