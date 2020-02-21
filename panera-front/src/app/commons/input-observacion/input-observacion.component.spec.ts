import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputObservacionComponent } from './input-observacion.component';

describe('InputObservacionComponent', () => {
  let component: InputObservacionComponent;
  let fixture: ComponentFixture<InputObservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputObservacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
