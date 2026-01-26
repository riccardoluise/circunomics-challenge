import { RepositoryId } from './types';

export interface RepositoryOwner {
  readonly login: string;
  readonly avatar_url: string;
}

export interface Repository {
  readonly id: RepositoryId;
  readonly name: string;
  readonly full_name: string;
  readonly description: string | null;
  readonly html_url: string;
  readonly stargazers_count: number;
  readonly open_issues_count: number;
  readonly created_at: string;
  readonly owner: RepositoryOwner;
}
