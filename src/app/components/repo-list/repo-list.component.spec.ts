import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RepoListComponent } from './repo-list.component';

describe('when displaying repository list (RepoListComponent)', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let httpMock: HttpTestingController;

  const mockResponse = {
    total_count: 1,
    incomplete_results: false,
    items: [
      {
        id: 1,
        name: 'test-repo',
        full_name: 'owner/test-repo',
        description: 'A test repository',
        html_url: 'https://github.com/owner/test-repo',
        stargazers_count: 1500,
        open_issues_count: 25,
        created_at: '2026-01-15T00:00:00Z',
        owner: {
          login: 'owner',
          avatar_url: 'https://avatars.githubusercontent.com/u/1',
        },
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create RepoListComponent', fakeAsync(() => {
    // Given
    fixture.detectChanges();

    // When
    const req = httpMock.expectOne((r) => r.url.includes('api.github.com'));
    req.flush(mockResponse);
    tick();

    // Then
    expect(component)
      .withContext('RepoListComponent should be provided via DI, it should exist, be defined')
      .toBeDefined();
  }));

  describe('when loading repositories on init', () => {
    it('should fetch and store repositories from API', fakeAsync(() => {
      // Given
      fixture.detectChanges();

      // When
      const req = httpMock.expectOne((r) => r.url.includes('api.github.com'));
      req.flush(mockResponse);
      tick();

      // Then
      expect(component.repositories().length)
        .withContext('repositories array length should match API response')
        .toBe(1);
      expect(component.repositories()[0].name)
        .withContext('repository name should match API response')
        .toBe('test-repo');
    }));

    it('should show loading state while fetching', () => {
      // When
      fixture.detectChanges();

      // Then
      expect(component.loading())
        .withContext('loading signal should be true during fetch')
        .toBeTrue();

      const req = httpMock.expectOne((r) => r.url.includes('api.github.com'));
      req.flush(mockResponse);
    });
  });

  describe('when paginating results', () => {
    it('should increment page after loading', fakeAsync(() => {
      // Given
      fixture.detectChanges();

      // When
      const req = httpMock.expectOne((r) => r.url.includes('api.github.com'));
      req.flush(mockResponse);
      tick();

      // Then
      expect(component.currentPage())
        .withContext('currentPage should increment after successful load')
        .toBe(2);
    }));

    it('should set hasMore to false when API returns empty items', fakeAsync(() => {
      // Given
      fixture.detectChanges();

      // When
      const req = httpMock.expectOne((r) => r.url.includes('api.github.com'));
      req.flush({ total_count: 0, incomplete_results: false, items: [] });
      tick();

      // Then
      expect(component.hasMore())
        .withContext('hasMore should be false when no more items available')
        .toBeFalse();
    }));
  });
});
