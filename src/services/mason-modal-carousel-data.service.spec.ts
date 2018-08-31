import { TestBed, inject } from '@angular/core/testing';

import { MasonModalCarouselDataService } from './mason-modal-carousel-data.service';

describe('MasonModalCarouselDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasonModalCarouselDataService]
    });
  });

  it('should be created', inject([MasonModalCarouselDataService], (service: MasonModalCarouselDataService) => {
    expect(service).toBeTruthy();
  }));
});
