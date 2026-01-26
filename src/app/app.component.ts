import { Component } from '@angular/core';
import { RepoListComponent } from './components/repo-list/repo-list.component';

@Component({
  selector: 'cir-root',
  imports: [RepoListComponent],
  template: '<cir-repo-list />',
  styles: [],
})
export class AppComponent {}
