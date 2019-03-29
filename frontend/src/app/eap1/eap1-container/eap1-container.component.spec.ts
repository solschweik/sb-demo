import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Eap1ContainerComponent } from './eap1-container.component';

describe('Eap1ContainerComponent', () => {
  let component: Eap1ContainerComponent;
  let fixture: ComponentFixture<Eap1ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Eap1ContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Eap1ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
