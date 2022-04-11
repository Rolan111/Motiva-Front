import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareRasmComponent } from './care-rasm.component';

describe('CareRasmComponent', () => {
  let component: CareRasmComponent;
  let fixture: ComponentFixture<CareRasmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareRasmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareRasmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
