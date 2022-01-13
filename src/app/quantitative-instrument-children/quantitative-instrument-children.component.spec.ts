import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativeInstrumentChildrenComponent } from './quantitative-instrument-children.component';

describe('QuantitativeInstrumentChildrenComponent', () => {
  let component: QuantitativeInstrumentChildrenComponent;
  let fixture: ComponentFixture<QuantitativeInstrumentChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantitativeInstrumentChildrenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitativeInstrumentChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
