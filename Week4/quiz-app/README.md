# Internship Task: Week 04 — Modern JavaScript, Modules & Testing

## Description
This repository contains the submission for the Week 04 internship task. The goal was to refactor the existing Quiz Application to adhere to modern **ES6+ standards**. This involved breaking the monolithic code into reusable **ES Modules**, implementing efficient build tooling with **Node/NPM**, and ensuring code reliability through **Unit Testing** with Jest.

## Topics Covered
* **Modern ES6+ Syntax:** Implementation of `let`/`const`, arrow functions (`=>`), destructuring, and template literals.
* **ES Modules:** Separating concerns by splitting code into logic, data, and UI layers using `import`/`export`.
* **Tooling & Configuration:** Dependency management using **NPM**, and configuring **Babel** to support modern JavaScript in testing environments.
* **Unit Testing:** Writing modular tests with **Jest** to verify core business logic (scoring, game states) with coverage reporting.

## Deliverable: Modularized Quiz App + Unit Tests
A modernized version of the Quiz App that is easier to maintain, test, and scale.

### Key Features
* **Modular Architecture:**
    * `src/data/questions.js`: Isolated data layer for quiz content.
    * `src/utils/quizLogic.js`: Pure functions for scoring and logic (testable).
    * `src/app.js`: UI controller handling DOM manipulation and event listeners.
* **Automated Testing:**
    * Includes a `tests/quizLogic.test.js` suite that verifies the accuracy of the scoring algorithm and "game over" checks.
    * Achieved code coverage goals for utility functions.
* **Modern Syntax:** Replaced legacy `var` with block-scoped `let` and `const`. Used arrow functions for cleaner event handlers and callbacks.
* **NPM Integration:** Utilizes `package.json` to manage developer dependencies (`jest`, `babel-jest`) and scripts.

### Key Learnings
* **Modularity:** Breaking code into small, single-responsibility modules drastically improves readability and maintainability.
* **Testing Confidence:** Unit tests allow for safe refactoring; if I break the logic, Jest lets me know immediately.
* **Build Ecosystem:** Learned how Babel is necessary to bridge the gap between modern ES6 modules and the Node.js testing environment.
* **State Management:** improved handling of application state (timer, score, user answers) using a centralized state object.