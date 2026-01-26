import {
  Component,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Repository } from '../../models';
import { GithubClientService } from '../../services/github-client.service';

@Component({
  selector: 'cir-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoListComponent implements OnInit {
  private readonly githubClientService = inject(GithubClientService);
  private readonly destroyRef = inject(DestroyRef);

  repositories = signal<Repository[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.loadRepositories();
  }

  loadRepositories(): void {
    this.loading.set(true);
    this.githubClientService
      .searchRepositories(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.repositories.set(response.items);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }
}
