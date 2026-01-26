import { Repository } from './repository.model';

export interface GitHubSearchResponse {
  readonly total_count: number;
  readonly incomplete_results: boolean;
  readonly items: Repository[];
}
