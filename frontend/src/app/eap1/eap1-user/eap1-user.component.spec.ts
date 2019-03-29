import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap1UserComponent } from './eap1-user.component';

describe('Eap1UserComponent', () => {
  let component: Eap1UserComponent;
  let fixture: ComponentFixture<Eap1UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Eap1UserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Eap1UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
