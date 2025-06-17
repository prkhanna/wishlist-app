# Wishlist App Playwright Tests

This repository contains end-to-end tests for the Wishlist application using Playwright.

## Prerequisites

- Node.js (LTS version)
- npm (comes with Node.js)
- Git

## Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/prkhanna/wishlist-app.git
   cd wishlist-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## Running Tests Locally

### Basic Test Run
```bash
npm test
```

### Parallel Test Execution
```bash
npm run test:parallel
```

### Debug Mode
```bash
npm run test:debug
```

### UI Mode (Interactive)
```bash
npm run test:ui
```

### Headed Mode (Visible Browser)
```bash
npm run test:headed
```

### Parallel Tests with Headed Mode
```bash
npm run test:parallel:headed
```

## GitHub Actions

The tests are automatically run on GitHub Actions when:
- Code is pushed to `main` or `master` branch
- A pull request is created against `main` or `master` branch

### Workflow Features

1. **Parallel Execution**
   - Tests run in parallel using Playwright's built-in parallelization
   - Configured to use 2 workers for optimal performance

2. **Caching**
   - Node modules are cached for faster installation
   - Playwright browsers are cached to avoid repeated downloads

3. **Artifacts**
   - Test reports are uploaded as artifacts
   - Reports are retained for 30 days

### Viewing Test Results

1. Go to your GitHub repository
2. Click on the "Actions" tab
3. Select the workflow run you want to inspect
4. Download the "playwright-report" artifact to view detailed test results

## Test Structure

- `tests/` - Contains all test files
- `fixtures/` - Contains test fixtures (e.g., authentication)
- `testdata/` - Contains test data used in tests

## Available Scripts

- `npm test` - Run all tests
- `npm run test:parallel` - Run tests in parallel
- `npm run test:ui` - Run tests in UI mode
- `npm run test:debug` - Run tests in debug mode
- `npm run test:headed` - Run tests with visible browser
- `npm run test:parallel:headed` - Run parallel tests with visible browser
- `npm run test:parallel:debug` - Run parallel tests in debug mode

## Troubleshooting

### Common Issues

1. **Browser Installation Fails**
   ```bash
   npx playwright install --force
   ```

2. **Tests Fail Due to Authentication**
   - Verify your `.env` file has correct credentials
   - Check if the base URL is accessible

3. **Parallel Tests Fail**
   - Ensure tests are independent
   - Check for shared state between tests

### Getting Help

If you encounter any issues:
1. Check the Playwright documentation
2. Review the test reports in GitHub Actions
3. Run tests locally in debug mode for detailed investigation 