import { TestBed } from '@angular/core/testing';

import { ImageVoitureService } from './image-voiture.service';

describe('ImageVoitureService', () => {
  let service: ImageVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
