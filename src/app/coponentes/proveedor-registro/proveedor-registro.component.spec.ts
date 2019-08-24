import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorRegistroComponent } from './proveedor-registro.component';

describe('ProveedorRegistroComponent', () => {
  let component: ProveedorRegistroComponent;
  let fixture: ComponentFixture<ProveedorRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
