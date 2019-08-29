import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmltopdComponent } from './htmltopd.component';

describe('HtmltopdComponent', () => {
  let component: HtmltopdComponent;
  let fixture: ComponentFixture<HtmltopdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmltopdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmltopdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
