import {
  Component,
  OnInit,
  HostListener,
  inject,
  signal,
  ChangeDetectionStrategy,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Repository } from '../../models';
import { GithubClientService } from '../../services/github-client.service';
import { RepoModalComponent } from '../repo-modal/repo-modal.component';
import { APP_CONSTANTS } from '../../constants';

@Component({
  selector: 'cir-repo-list',
  imports: [RepoModalComponent],
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoListComponent implements OnInit {
  private readonly githubClientService = inject(GithubClientService);
  private readonly destroyRef = inject(DestroyRef);

  repositories = signal<Repository[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  hasMore = signal(true);
  selectedRepo = signal<Repository | null>(null);

  ngOnInit(): void {
    this.loadRepositories();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.loading() || !this.hasMore()) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - APP_CONSTANTS.SCROLL_THRESHOLD;

    if (scrollPosition >= threshold) {
      this.loadRepositories();
    }
  }

  loadRepositories(): void {
    this.loading.set(true);
    this.githubClientService
      .searchRepositories(this.currentPage())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.repositories.update((repos) => [...repos, ...response.items]);
          this.currentPage.update((page) => page + 1);
          this.hasMore.set(response.items.length > 0);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  openModal(repo: Repository): void {
    this.selectedRepo.set(repo);
  }

  closeModal(): void {
    this.selectedRepo.set(null);
  }
}
