import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSitesComponent } from './social-sites.component';

describe('SocialSitesComponent', () => {
  let component: SocialSitesComponent;
  let fixture: ComponentFixture<SocialSitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialSitesComponent]
    });
    fixture = TestBed.createComponent(SocialSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
