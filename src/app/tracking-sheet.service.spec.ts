import {TestBed} from '@angular/core/testing';

import {TrackingSheetService} from './tracking-sheet.service';

describe('TrackingSheetService', () => {
  let service: TrackingSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
