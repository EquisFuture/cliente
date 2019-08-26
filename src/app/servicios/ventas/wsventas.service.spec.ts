import { TestBed } from '@angular/core/testing';

import { WsventasService } from './wsventas.service';

describe('WsventasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WsventasService = TestBed.get(WsventasService);
    expect(service).toBeTruthy();
  });
});
