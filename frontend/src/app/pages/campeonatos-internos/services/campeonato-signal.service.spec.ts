import { TestBed } from '@angular/core/testing';

import { CampeonatoSignalService } from './campeonato-signal.service';

describe('CampeonatoSignalService', () => {
  let service: CampeonatoSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampeonatoSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
