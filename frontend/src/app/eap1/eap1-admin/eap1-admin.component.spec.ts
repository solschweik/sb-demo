import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap1AdminComponent } from './eap1-admin.component';

describe('Eap1AdminComponent', () => {
  let component: Eap1AdminComponent;
  let fixture: ComponentFixture<Eap1AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Eap1AdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Eap1AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
