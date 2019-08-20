import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoRegistroComponent } from './concepto-registro.component';

describe('ConceptoRegistroComponent', () => {
  let component: ConceptoRegistroComponent;
  let fixture: ComponentFixture<ConceptoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
