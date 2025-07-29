# CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions for continuous integration and delivery, focusing on testing, quality checks, and dependency management without automatic deployment.

## 🚀 GitHub Actions Workflow

### Workflow File: `.github/workflows/ci.yml`

The CI/CD pipeline includes the following jobs:

#### 1. **Dependency Check**

- Checks for outdated dependencies using `npm-check-updates`
- Runs security audit with `npm audit`
- Fails if critical vulnerabilities are found

#### 2. **Quality Checks**

- TypeScript type checking
- ESLint code linting
- Prettier formatting check
- Console.log statement detection

#### 3. **Testing**

- Unit tests with Jest
- Integration tests for API endpoints
- Build verification
- E2E tests with Playwright

#### 4. **Performance & Accessibility**

- Lighthouse CI for performance metrics
- Bundle analysis for size optimization
- Accessibility testing

#### 5. **Dependency Updates**

- Weekly automated dependency checks
- Creates PRs for safe updates
- Groups minor and patch updates

## 🧪 Testing Strategy

### Unit Tests

- **Location**: `tests/unit/`
- **Framework**: Jest + React Testing Library
- **Coverage**: Components, utilities, hooks
- **Command**: `npm test`

### Integration Tests

- **Location**: `tests/integration/`
- **Framework**: Jest + node-mocks-http
- **Coverage**: API endpoints, data flow
- **Command**: `npm run test:integration`

### E2E Tests

- **Location**: `tests/e2e/`
- **Framework**: Playwright
- **Coverage**: User workflows, cross-browser testing
- **Command**: `npm run test:e2e`

## 📋 Available Scripts

```bash
# Testing
npm test                    # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage
npm run test:integration   # Run integration tests
npm run test:e2e          # Run E2E tests
npm run test:e2e:ui       # Run E2E tests with UI

# Quality Checks
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint issues
npm run format            # Format code with Prettier
npm run format:check      # Check code formatting
npm run type-check        # Run TypeScript checks

# Dependencies
npm run audit             # Security audit
npm run deps:check        # Check for outdated deps
npm run deps:update       # Update dependencies

# Build & Development
npm run build             # Build for production
npm run test:build        # Test build output
```

## 🔧 Configuration Files

### Jest Configuration (`jest.config.js`)

- Next.js integration
- JSDOM environment
- Coverage collection
- Module mapping

### Playwright Configuration (`playwright.config.ts`)

- Multiple browser support
- Mobile testing
- Screenshot and video capture
- Parallel execution

### ESLint Configuration (`.eslintrc.json`)

- Next.js rules
- TypeScript support
- Prettier integration
- Custom rules

### Prettier Configuration (`.prettierrc`)

- Consistent code formatting
- Single quotes
- 80 character line length
- Trailing commas

## 🤖 Dependabot Configuration

### File: `.github/dependabot.yml`

**Features:**

- Weekly dependency checks (Mondays at 9 AM)
- Groups minor and patch updates
- Ignores major version updates (manual review)
- Automatic PR creation
- Reviewer assignment

**Settings:**

- Package ecosystem: npm
- Schedule: Weekly
- Open PR limit: 10
- Labels: dependencies, automated

## 📊 Quality Gates

### Code Quality

- ✅ No TypeScript errors
- ✅ ESLint passes
- ✅ Prettier formatting
- ✅ No console.log statements
- ✅ Security audit passes

### Testing

- ✅ Unit tests pass
- ✅ Integration tests pass
- ✅ E2E tests pass
- ✅ Build verification
- ✅ Coverage thresholds met

### Performance

- ✅ Lighthouse scores > 90
- ✅ Bundle size within limits
- ✅ No performance regressions

## 🚨 Failure Handling

### Dependency Updates

- Security vulnerabilities block merge
- Major updates require manual review
- Minor/patch updates can be auto-merged

### Test Failures

- All tests must pass before merge
- E2E failures trigger investigation
- Performance regressions block deployment

### Quality Issues

- Linting errors must be fixed
- TypeScript errors block build
- Console.log statements are warnings

## 🔄 Workflow Triggers

### Automatic Triggers

- **Push to main**: Full CI/CD pipeline
- **Pull Request**: Quality checks and tests
- **Weekly Schedule**: Dependency updates

### Manual Triggers

- **Dependency Updates**: Weekly automated PRs
- **Security Audits**: Continuous monitoring
- **Performance Tests**: On every build

## 📈 Monitoring & Reporting

### GitHub Actions

- Build status badges
- Test coverage reports
- Performance metrics
- Security alerts

### Artifacts

- Test results (30-day retention)
- Bundle analysis reports
- Screenshot captures
- Video recordings

## 🛠️ Local Development

### Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all checks
npm run lint && npm run test && npm run test:e2e
```

### Pre-commit Hooks

- Lint staged files
- Run unit tests
- Check formatting
- Type checking

## 🔐 Security

### Automated Checks

- `npm audit` on every build
- Dependency vulnerability scanning
- Security-focused linting rules
- Regular dependency updates

### Manual Reviews

- Major dependency updates
- Security-related changes
- Performance-impacting changes

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Jest Testing Framework](https://jestjs.io/)
- [Playwright E2E Testing](https://playwright.dev/)
- [ESLint Configuration](https://eslint.org/)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
