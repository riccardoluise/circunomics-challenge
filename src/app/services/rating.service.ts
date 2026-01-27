import { Injectable, signal, computed } from '@angular/core';
import { Rating, RepositoryId } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private _ratings = signal<Map<RepositoryId, Rating>>(new Map());

  /** Readonly access to all ratings */
  ratings = this._ratings.asReadonly();

  /** Total number of rated repositories */
  ratingCount = computed(() => this._ratings().size);

  /**
   * Sets or updates the rating for a repository.
   * @param repoId Repository identifier
   * @param rating Rating value (1-5)
   */
  setRating(repoId: RepositoryId, rating: Rating): void {
    this._ratings.update((map) => {
      // Create new Map to trigger signal reactivity
      const newMap = new Map(map);
      newMap.set(repoId, rating);
      return newMap;
    });
  }

  /**
   * Gets the rating for a repository.
   * @param repoId Repository identifier
   * @returns Rating if exists, undefined otherwise
   */
  getRating(repoId: RepositoryId): Rating | undefined {
    return this._ratings().get(repoId);
  }

  /**
   * Checks if a repository has been rated.
   * @param repoId Repository identifier
   * @returns true if repository has a rating
   */
  hasRating(repoId: RepositoryId): boolean {
    return this._ratings().has(repoId);
  }
}
