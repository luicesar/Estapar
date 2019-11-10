import { TestBed } from '@angular/core/testing';

import { ManobristaService } from './manobrista.service';

describe('ManobristaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManobristaService = TestBed.get(ManobristaService);
    expect(service).toBeTruthy();
  });
});
