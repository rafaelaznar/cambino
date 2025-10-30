import { TestBed } from '@angular/core/testing';

import { Aleatorio } from './aleatorio';

describe('Aleatorio', () => {
  let service: Aleatorio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aleatorio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
