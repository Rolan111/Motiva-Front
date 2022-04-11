import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InactiveAlertsComponent} from './inactive-alerts.component';

describe('InactiveAlertsComponent', () => {
  let component: InactiveAlertsComponent;
  let fixture: ComponentFixture<InactiveAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InactiveAlertsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
