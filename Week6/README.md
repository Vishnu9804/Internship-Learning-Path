# Internship Task: Week 06 — Storage, Optimization & UX Polish

## Description
This repository contains the submission for the Week 06 internship task. Building on the API knowledge from the previous week, this module focuses on performance optimization and client-side data persistence. The project demonstrates advanced techniques to minimize unnecessary network requests and improve the overall user experience.

## Topics Covered
* **Web Storage API:** Utilizing `LocalStorage` and `SessionStorage` for persisting user data across browser sessions.
* **Performance Optimization:** Implementing `debouncing` and `throttling` to control the rate at which functions are executed.
* **UX Polish:** Enhancing interactivity and responsiveness during heavy data retrieval.
* **Modular JavaScript:** Splitting logic into dedicated files (`api.js`, `app.js`, `storage.js`, `ui.js`) for better maintainability.

## Deliverable: Movie Search Application
An optimized movie search platform featuring real-time, rate-limited querying and paginated results.

### Key Features
* **Debounced Search:** The search input waits until the user finishes typing before triggering the Fetch API, significantly reducing unnecessary server calls and improving frontend performance.
* **Pagination Integration:** Handles large datasets by fetching and displaying results page by page.
* **Data Persistence:** Utilizes LocalStorage (`js/storage.js`) to remember user preferences or search history, ensuring data survives page reloads.
* **Modular Architecture:** Business logic, UI manipulation, and API calls are separated into distinct modules, adhering to clean code principles.
* **Concept Micro-Projects:** Includes isolated implementations of `Debouncing`, `Throttling`, and an `UnforgettableNotepad` to demonstrate core concepts in action.

### Key Learnings
* **Rate Limiting Functions:** Debouncing is essential for search bars, while throttling is ideal for scroll or resize events.
* **Client-Side Storage:** LocalStorage is a powerful, lightweight tool for maintaining state and improving perceived load times.
* **Separation of Concerns:** Dividing a vanilla JavaScript project into specialized modules makes debugging and scaling significantly easier.