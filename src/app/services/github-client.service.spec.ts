import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { GithubClientService } from './github-client.service';

describe('when fetching data from GitHub API (GithubClientService)', () => {
  let service: GithubClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GithubClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create GithubClientService', () => {
    expect(service)
      .withContext('GithubClientService should be provided via DI, it should exist, be defined')
      .toBeDefined();
  });

  describe('when searching repositories', () => {
    it('should call GitHub API with correct parameters', () => {
      // Given
      const mockResponse = { total_count: 1, incomplete_results: false, items: [] };

      // When
      service.searchRepositories(1).subscribe((response) => {
        // Then
        expect(response.total_count)
          .withContext('number of repos found should match mock value')
          .toBe(1);
      });

      const req = httpMock.expectOne((r) => r.url.includes('api.github.com'));
      expect(req.request.method)
        .withContext('repository search should make GET HTTP request to GitHub API')
        .toBe('GET');
      req.flush(mockResponse);
    });
  });
});
