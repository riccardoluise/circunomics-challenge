import {
  Component,
  input,
  output,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { Rating, Repository } from '../../models';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'cir-repo-modal',
  templateUrl: './repo-modal.component.html',
  styleUrl: './repo-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoModalComponent {
  private readonly ratingService = inject(RatingService);

  repo = input.required<Repository>();
  closeModal = output<void>();

  hoverRating = signal(0);

  currentRating = computed(() => this.ratingService.getRating(this.repo().id) ?? 0);
  displayRating = computed(() => this.hoverRating() || this.currentRating());

  stars: Rating[] = [1, 2, 3, 4, 5];

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeModal.emit();
  }

  onStarHover(rating: number): void {
    this.hoverRating.set(rating);
  }

  onStarLeave(): void {
    this.hoverRating.set(0);
  }

  onStarClick(rating: Rating): void {
    this.ratingService.setRating(this.repo().id, rating);
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  onCloseClick(): void {
    this.closeModal.emit();
  }
}
