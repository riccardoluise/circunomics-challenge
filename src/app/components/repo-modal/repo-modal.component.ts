import { Component, input, output, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Repository } from '../../models';

@Component({
  selector: 'cir-repo-modal',
  templateUrl: './repo-modal.component.html',
  styleUrl: './repo-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoModalComponent {
  repo = input.required<Repository>();
  closeModal = output<void>();

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeModal.emit();
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
