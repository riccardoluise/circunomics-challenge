# GitHub Trending Repos

A web application that displays the most starred GitHub repositories created in the last 30 days.

## Quick Start

```bash
npm install
npm start
# Open http://localhost:4200
```

## Technology Choices

| Category      | Choice     | Rationale                          |
| ------------- | ---------- | ---------------------------------- |
| **Framework** | Angular 19 | Aligned with Circunomics stack     |
| **Styling**   | SCSS       | Aligned with Circunomics stack     |

## Code Quality Tools

- **ESLint**: TypeScript and Angular linting
- **Prettier**: Code formatting
- **Husky + lint-staged**: Pre-commit hooks

## Project Structure

```
src/app/
├── models/
│   ├── types.ts              # Type aliases (RepositoryId, Rating)
│   ├── repository.model.ts   # Repository interfaces
│   └── github-response.model.ts
```
