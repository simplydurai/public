import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProffExpComponent } from './proff-exp.component';

describe('ProffExpComponent', () => {
  let component: ProffExpComponent;
  let fixture: ComponentFixture<ProffExpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProffExpComponent]
    });
    fixture = TestBed.createComponent(ProffExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
