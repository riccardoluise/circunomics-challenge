import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppComponent } from './app.component';

describe('when rendering AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create AppComponent', () => {
    // Given
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Then
    expect(app)
      .withContext('AppComponent should be provided via DI, it should exist, be defined')
      .toBeDefined();
  });
});
