import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPswComponent } from './recuperar-psw.component';

describe('RecuperarPswComponent', () => {
  let component: RecuperarPswComponent;
  let fixture: ComponentFixture<RecuperarPswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarPswComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarPswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
