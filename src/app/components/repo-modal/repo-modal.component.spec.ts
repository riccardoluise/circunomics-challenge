import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoModalComponent } from './repo-modal.component';

describe('when displaying repository details modal (RepoModalComponent)', () => {
  let component: RepoModalComponent;
  let fixture: ComponentFixture<RepoModalComponent>;

  const mockRepo = {
    id: 1,
    name: 'test-repo',
    full_name: 'owner/test-repo',
    description: 'A test repository',
    html_url: 'https://github.com/owner/test-repo',
    stargazers_count: 1500,
    open_issues_count: 25,
    created_at: '2026-01-15T00:00:00Z',
    owner: {
      login: 'owner',
      avatar_url: 'https://avatars.githubusercontent.com/u/1',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('repo', mockRepo);
    fixture.detectChanges();
  });

  it('should create RepoModalComponent', () => {
    // Then
    expect(component)
      .withContext('RepoModalComponent should be provided via DI, it should exist, be defined')
      .toBeDefined();
  });

  it('should display repository name in modal title', () => {
    // When
    const compiled = fixture.nativeElement;

    // Then
    expect(compiled.querySelector('.modal-title').textContent)
      .withContext('modal title should display repository name')
      .toContain('test-repo');
  });

  describe('when closing the modal', () => {
    it('should emit close event on backdrop click', () => {
      // Given
      spyOn(component.closeModal, 'emit');
      const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');

      // When
      backdrop.click();

      // Then
      expect(component.closeModal.emit)
        .withContext('close event should be emitted when backdrop is clicked')
        .toHaveBeenCalled();
    });

    it('should emit close event on close button click', () => {
      // Given
      spyOn(component.closeModal, 'emit');

      // When
      component.onCloseClick();

      // Then
      expect(component.closeModal.emit)
        .withContext('close event should be emitted when close button is clicked')
        .toHaveBeenCalled();
    });
  });
});
