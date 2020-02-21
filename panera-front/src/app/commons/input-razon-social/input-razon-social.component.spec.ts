import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRazonSocialComponent } from './input-razon-social.component';

describe('InputRazonSocialComponent', () => {
  let component: InputRazonSocialComponent;
  let fixture: ComponentFixture<InputRazonSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRazonSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRazonSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
