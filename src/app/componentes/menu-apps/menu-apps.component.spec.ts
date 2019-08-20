import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAppsComponent } from './menu-apps.component';

describe('MenuAppsComponent', () => {
  let component: MenuAppsComponent;
  let fixture: ComponentFixture<MenuAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
