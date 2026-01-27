import { TestBed } from '@angular/core/testing';
import { RatingService } from './rating.service';

describe('when managing repository ratings (RatingService)', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingService);
  });

  it('should create RatingService', () => {
    expect(service)
      .withContext('RatingService should be provided via DI, it should exist, be defined')
      .toBeDefined();
  });

  describe('when setting and getting ratings', () => {
    it('should store and retrieve rating for a repository', () => {
      // When
      service.setRating(1, 5);

      // Then
      expect(service.getRating(1))
        .withContext('rating for repo id 1 should match stored value')
        .toBe(5);
    });

    it('should return undefined for unrated repository', () => {
      expect(service.getRating(999))
        .withContext('unrated repo should return undefined')
        .toBeUndefined();
    });
  });

  describe('when tracking rating count', () => {
    it('should increment count when new ratings are added', () => {
      // Given
      expect(service.ratingCount()).withContext('initial rating count should be 0').toBe(0);

      // When
      service.setRating(1, 4);
      service.setRating(2, 5);

      // Then
      expect(service.ratingCount())
        .withContext('rating count should reflect number of rated repos')
        .toBe(2);
    });
  });
});
