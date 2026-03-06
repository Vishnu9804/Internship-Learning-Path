# Internship Task: Week 05 — Async JS/TS, Fetch & APIs

## Description
This repository contains the submission for the Week 05 internship task at intuitive.AI. The goal was to transition into asynchronous programming, mastering how JavaScript handles non-blocking operations. The project focuses on consuming third-party REST APIs using the modern Fetch API, implementing `async/await` syntax, and handling network errors gracefully. 

## Topics Covered
* **Asynchronous JavaScript:** Deep dive into Promises and `async/await` syntax to handle delayed operations.
* **Fetch API:** Making HTTP requests (GET) to external endpoints to retrieve dynamic data.
* **Error Handling:** Implementing robust `try/catch` blocks to manage failed network requests and API limits.
* **DOM Updates:** Dynamically rendering UI components based on real-time asynchronous data.

## Deliverable: Weather Application
A dynamic weather dashboard that fetches and displays real-time meteorological data using an external service like OpenWeatherMap.

### Key Features
* **Real-Time Data Fetching:** Utilizes the Fetch API to retrieve current weather conditions based on user input.
* **Loading & Error States:** Provides crucial UX feedback by displaying loading indicators while fetching data and graceful error messages if the request fails (e.g., city not found or network offline).
* **Asynchronous Micro-Projects:** Includes dedicated learning modules (`LearningMicroProject`) to isolate and demonstrate core concepts of `Promises` and `AsyncAwait` independently from the main application.
* **Modern Syntax:** Clean, readable asynchronous code replacing legacy callback chains.

### Key Learnings
* **Non-Blocking Architecture:** Understanding how the event loop manages asynchronous operations without freezing the UI.
* **API Integration:** Gained practical experience reading API documentation, handling JSON responses, and managing API keys securely.
* **Crucial UX Patterns:** Learned that managing the "in-between" states (loading and errors) is just as important as displaying the final data.