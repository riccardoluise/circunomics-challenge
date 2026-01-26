import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubSearchResponse } from '../models';
import { API_PATHS, APP_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class GithubClientService {
  private readonly http = inject(HttpClient);

  /**
   * Fetches trending repositories created in the last N days, sorted by stars.
   * @param page Page number for pagination (default: 1)
   * @returns Observable with search results
   */
  searchRepositories(page = 1): Observable<GitHubSearchResponse> {
    const dateThreshold = this.getDateThreshold(APP_CONSTANTS.DAYS_THRESHOLD);
    const url = `${API_PATHS.GITHUB.BASE_URL}${API_PATHS.GITHUB.SEARCH_REPOSITORIES}?q=created:>${dateThreshold}&sort=stars&order=desc&page=${page}`;
    return this.http.get<GitHubSearchResponse>(url);
  }

  // Returns date N days ago in YYYY-MM-DD format
  private getDateThreshold(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  }
}
