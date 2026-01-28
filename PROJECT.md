# GitHub Trending Repos

A web application that displays the most starred GitHub repositories created in the last 30 days.

## Quick Start

```bash
npm install
npm start
# Open http://localhost:4200
```

## Technology Choices

| Category      | Choice     | Rationale                      |
| ------------- | ---------- | ------------------------------ |
| **Framework** | Angular 19 | Aligned with Circunomics stack |
| **Styling**   | SCSS       | Aligned with Circunomics stack |

## Code Quality Tools

- **ESLint**: TypeScript and Angular linting
- **Prettier**: Code formatting
- **Husky + lint-staged**: Pre-commit hooks

## Testing

- **Framework**: Jasmine + Karma
- **Style**: BDD with `describe('when ...')` and `it('should ...')`
- **Structure**: Given/When/Then comments inside tests
- **Assertions**: `.withContext()` on all `expect()` for clear error messages

## Features

- **Repository List**: Displays repositories with avatar, name, description, stars, issues, and owner
- **Infinite Scroll**: Automatically loads more repositories when scrolling to the bottom
- **Modal Details**: Click on a repository name to view details in a modal
- **Rating System**: 5-star rating system with hover preview and persistence

## Project Structure

_(*.spec.ts test files omitted)_

```
src/app/
├── app.component.ts                      # Root component
├── app.config.ts                         # App configuration (providers)
├── app.routes.ts                         # Route definitions
├── components/
│   ├── repo-list/
│   │   └── repo-list.component.ts        # Main repository list
│   └── repo-modal/
│       └── repo-modal.component.ts       # Repository details modal
├── constants/
│   ├── index.ts                          # Barrel export
│   ├── api-paths.ts                      # API endpoints
│   └── app.constants.ts                  # App configuration
├── models/
│   ├── index.ts                          # Barrel export
│   ├── types.ts                          # Type aliases (RepositoryId, Rating)
│   ├── repository.model.ts               # Repository interfaces
│   └── github-response.model.ts          # GitHub API response
└── services/
    ├── github-client.service.ts          # GitHub API client
    └── rating.service.ts                 # Rating state management
```
