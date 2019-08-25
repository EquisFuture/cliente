import { TestBed } from '@angular/core/testing';

import { WscomprasService } from './wscompras.service';

describe('WscomprasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WscomprasService = TestBed.get(WscomprasService);
    expect(service).toBeTruthy();
  });
});
