# Internship Task: Week 07 & 08 — Advanced Data Structures & TypeScript

## Description
This repository contains the submission for the combined Week 07 and 08 internship tasks. This two-week phase marks the transition into strongly typed programming using **TypeScript**. The project focuses on utilizing advanced data structures, implementing functional programming patterns like immutability, and ensuring code reliability through rigorous unit testing.

## Topics Covered
* **TypeScript Integration:** Static typing, interfaces, compiling to JS, and configuring `tsconfig.json`.
* **Advanced Data Structures:** Utilizing Arrays, Maps, and Sets for optimized data querying and manipulation.
* **Functional Patterns:** Emphasizing pure functions and immutable state updates to prevent side effects.
* **Unit Testing:** Configuring and writing comprehensive test suites using **Jest** to achieve high code coverage.

## Deliverable: TypeScript To-Do Application
A robust, enterprise-grade task management application built entirely in TypeScript, featuring advanced filtering, persistence, and automated tests.

### Key Features
* **Strongly Typed Models:** Utilizes `src/models/models.ts` to strictly define the shape of task objects and application state, catching errors at compile-time.
* **Advanced State Management:** Employs optimal data structures (Maps/Sets) within `src/services/TodoService.ts` for efficient task retrieval and updates.
* **Functional Immutability:** State changes (adding, toggling, or deleting tasks) are handled by returning new object references rather than mutating existing data.
* **Complex Filtering & Persistence:** Allows users to view All, Active, or Completed tasks, with all states synchronized to local storage.
* **Comprehensive Test Coverage:** Includes rigorous unit tests (`test/TododService.test.ts`) configured with Jest, verifying core logic and ensuring ≥ 70% code coverage.

### Key Learnings
* **The Power of TypeScript:** Static typing acts as active documentation and eliminates an entire class of runtime errors.
* **Predictable State:** Treating data as immutable makes tracking bugs and understanding application flow vastly simpler.
* **Test-Driven Confidence:** Writing unit tests for services ensures that refactoring or adding new features won't break existing functionality.