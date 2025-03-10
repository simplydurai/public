import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchExpComponent } from './research-exp.component';

describe('ResearchExpComponent', () => {
  let component: ResearchExpComponent;
  let fixture: ComponentFixture<ResearchExpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResearchExpComponent]
    });
    fixture = TestBed.createComponent(ResearchExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
