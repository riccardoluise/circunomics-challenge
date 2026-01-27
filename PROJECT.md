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

## Project Structure

```
src/app/
├── components/
│   └── repo-list/                # Main repository list
├── constants/
│   ├── api-paths.ts              # API endpoints
│   └── app.constants.ts          # App configuration
├── models/
│   ├── types.ts                  # Type aliases (RepositoryId, Rating)
│   ├── repository.model.ts       # Repository interfaces
│   └── github-response.model.ts
├── services/
│   └── github-client.service.ts  # GitHub API client
```
