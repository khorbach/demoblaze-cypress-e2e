# Demoblaze Cypress E2E Tests

Automated E2E tests for [Demoblaze](https://www.demoblaze.com/) covering the essential authentication and laptop purchase flows.

The project was created as part of a QA Engineer technical challenge. Since the task has a tight deadline and asks to focus on essential coverage first, the suite is intentionally small and focused on the main user journey.

## Test Scope

### Authentication

- Verify successful user registration
- Verify successful login with valid credentials
- Verify login fails with invalid credentials
- Verify successful logout

### Purchase flow

- Verify a laptop can be added to the cart
- Verify successful laptop purchase
- Validate purchase cannot proceed without required data

## Test Approach

The main priority was to cover the critical user journey required by the task:

1. Create a new account
2. Log in as a registered user
3. Select a laptop
4. Add the laptop to the cart
5. Complete the purchase successfully

Two negative scenarios were added at important validation points:

- login with invalid credentials
- checkout with required information missing

I also included logout to make sure the user can properly end their session after logging in. For checkout, I added a test with missing required information to verify that incomplete orders can’t be submitted. Both test cases provide high-value coverage with minimal additional implementation effort.

I kept the scope intentionally focused on the main login and purchase flow. Scenarios such as covering all product categories, buying multiple items, removing items from the cart, detailed field validation, visual checks, broader cross-browser coverage, and additional edge cases would be considered for later iterations.

## Test Design

I used a lightweight Page Object Model to keep the tests readable and to avoid repeating page-specific selectors and actions across the suite. Selectors are kept separately from page logic to make the Page Objects easier to maintain and update.

Test data such as passwords, product names, and checkout details is stored separately in `cypress/fixtures/test-data.json`.

The application URL is configured in `cypress.config.ts`.

Demoblaze uses native JavaScript alerts for messages and errors across the application, so I added a small reusable helper in `cypress/support/helpers.ts` to handle them.

Unique usernames are generated at runtime using a timestamp, which helps avoid conflicts with accounts that may already exist on the public Demoblaze environment. 

A new account is created before the purchase scenarios, so the tests don’t depend on pre-created accounts that may be removed or reset. Normally, I would reuse a dedicated test account for such scenarios to reduce runtime and avoid unnecessary test data creation.

## Challenges

This was my first hands-on experience with Cypress, so one of the main challenges was getting used to its execution model after working mainly with Playwright.

Another challenge was that Demoblaze can be inconsistent in how quickly it responds, and the password fields were particularly flaky during automated input. I handled this by explicitly focusing and clearing the password field before typing and by adding a small typing delay. 

## AI Tool Usage

I used ChatGPT as a learning and support tool while completing this challenge. Since this was my first hands-on project with Cypress, I used it mainly to clarify Cypress-specific concepts, troubleshoot issues I faced during implementation, and review and reword parts of the README.

I made the final decisions on the test scope, project structure, test data strategy, selectors, assertions, and overall implementation. I also reviewed and ran the complete test suite myself before submission.


## Installation

Install [Node.js](https://nodejs.org/) before setting up the project.

npm is included with Node.js, so no separate npm installation is required.

After installation, you can check that both are available:

```bash
node -v
npm -v
```

Clone the repository:

```bash
git clone https://github.com/khorbach/demoblaze-cypress-e2e.git
```

Open the project folder:

```bash
cd demoblaze-cypress-e2e
```

Install the project dependencies:

```bash
npm install
```

`npm install` installs all project dependencies, including Cypress and TypeScript, so no separate Cypress installation is required.

## Running the Tests

The project includes several npm scripts in `package.json` so the tests can be run without remembering Cypress CLI commands.

### Interactive mode

Open Cypress:

```bash
npx cypress open
```

Then:

1. Select **E2E Testing**
2. Select a browser
3. Run `authentication.cy.ts` or `purchase.cy.ts`

### Headless mode

Run the complete suite from the terminal:

```bash
npm test
```

By default, Cypress runs headlessly in Electron. To run the full suite in Chrome:

```bash
npm run cy:chrome
```

### Run a single spec

```bash
npm run cy:auth
npm run cy:purchase
```

### Run a single spec in Chrome

```bash
npm run cy:chrome:auth
npm run cy:chrome:purchase
```

## Test Execution

Example of a successful test run:
<img width="1406" height="228" alt="image" src="https://github.com/user-attachments/assets/6ed4533c-305c-4b4b-bbd8-fff77e8cbb44" />
