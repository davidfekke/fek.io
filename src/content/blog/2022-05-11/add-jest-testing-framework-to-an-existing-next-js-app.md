---
title: "Add Jest testing framework to an existing Next.js app"
tags: ["Node.js", "JavaScript", "Jest", "React", "Unit testing"]
description: ""
category: 
date: 2022-05-11
cover_image: "./next_jest.png"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/jQT0Xhgbql8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I have been using [Next.js](https://nextjs.org/) for a new project I am currently working. Most of my Node.js experience working with web apps has been using the [Express.js](https://expressjs.com/) framework. One of the tools I like using for my testing is [Jest](https://jestjs.io/). 

If you have not had a chance to use Jest, it is definitely worth checking out. It is very popular with the React community and it has test coverage built into the framework.

## The easy way to add Jest to Next.js

The easiest way to add Jest to Next.js is to do so when scaffolding out a new app using the `create-next-app` command line tool. Here is an example of how you can create a Next app using that tool:

```shell
npx create-next-app --example with-jest with-jest-app
# or
yarn create next-app --example with-jest with-jest-app
# or
pnpm create next-app -- --example with-jest with-jest-app
```

This will create an example Next.js app with Jest already configured and ready to go.

## The not so hard way to add Jest to Next.js

If you have a pre-existing Next.js app, jest can be added fairly easily. We are going to add Jest to a Next.js 12 app by using the following steps;

### Add Testing Modules
 
Add the `@testing-library/react`, `@testing-library/jest-dom`, `jest-environment-jsdom` modules using your package manger of choice. I am going to use `yarn` for my examples:

```shell
yarn add jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom --dev
```

### Add Jest Config

The next thing we need to do is add a `jest.config.js` file to the root directory of our project, and code the following configuration:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

```

### Add Unit Test

Now we will add out first unit test for the landing page. We will create a folder in the root directory for all of our tests. Jest uses the following convention of a `__tests__` directory for storing all of your Jest tests. We will create this directory and add a test file called `index.test.js` for our test. Add the following code to this file:

```javascript
// __tests__/index.test.js

import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
});
```

### Add a Test Runner to package.json

Our last step will be to modify our `package.json` file to add a test runner script to the scripts section. My scripts section look like the following example:

```json
...
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"
  },
...
```

## Running our unit test

Now that we have made these four changes we can run our first test:

```shell
> yarn test
yarn run v1.22.18
$ jest
 PASS  __tests__/index.test.js
  Home
    ✓ renders a heading (94 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.419 s
Ran all test suites.
✨  Done in 3.29s.
```

Now if we want to add a test coverage report, we can add the `--coverage` flag in the test command in the scripts section of our `package.json` file.

```
"test": "jest --coverage"
```

If you run the test runner again, your output should look like the following:

```shell
❯ yarn test
yarn run v1.22.18
$ jest --coverage
 PASS  __tests__/index.test.js
  Home
    ✓ renders a heading (90 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 index.js |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.382 s
Ran all test suites.
✨  Done in 3.13s.
```

## Conclusion

Next.js offers a lot of options when it comes to testing and mocking. Along with Jest, you can also test using [Cypress](https://docs.cypress.io/guides/getting-started/writing-your-first-test#What-you-ll-learn), [Playwright](https://playwright.dev/docs/intro) or [Vitest](https://github.com/vitest-dev/vitest).

The example of using Jest in this post is using the Rust compiler, but you can also set up Jest to run using Babel if you prefer. Have fun testing!