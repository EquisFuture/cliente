import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarcompraComponent } from './registrarcompra.component';

describe('RegistrarcompraComponent', () => {
  let component: RegistrarcompraComponent;
  let fixture: ComponentFixture<RegistrarcompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarcompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarcompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
