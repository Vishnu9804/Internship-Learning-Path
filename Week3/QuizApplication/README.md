# Internship Task: Week 03 — JavaScript Basics & DOM Manipulation

## Description
This repository contains the submission for the Week 03 internship task. The objective was to build a fully functional, interactive Quiz Application using vanilla JavaScript. The project demonstrates a strong grasp of core JavaScript concepts (types, control flow, functions) and dynamic DOM manipulation without relying on external frameworks.

## Topics Covered
* **JavaScript Fundamentals:** Usage of Arrays (`[]`) and Objects (`{}`) to structure quiz data.
* **Control Flow:** Loops (`for`) for rendering options and conditional logic (`if/else`) for score tracking and navigation.
* **DOM Manipulation:** Dynamic creation of HTML elements (`document.createElement`), class toggling (`classList`), and content updates.
* **Event Handling:** Event listeners for button clicks (`onclick`) and option selection.
* **Timing Events:** Implementation of a countdown timer using `setInterval` and `clearInterval`.

## Deliverable: Interactive Quiz Application
A timed, 10-question JavaScript quiz that tests general web development knowledge.

### Key Features
* **Dynamic Content Rendering:** Questions and answer options are loaded dynamically from a JavaScript object array, allowing for easy scalability.
* **State Management:** Tracks the user's current question index, score, and specific answers selected.
* **Timer Functionality:** A 60-second countdown timer that automatically ends the quiz when time expires.
* **Navigation System:**
    * **Next/Previous Buttons:** Allows users to navigate back and change answers before submitting.
    * **Question Palette:** A visual indicator showing the total number of questions, highlighting the current question and marking answered ones.
* **Review System:** Upon completion, users receive a detailed review showing:
    * Their final score.
    * A breakdown of every question.
    * **Color-coded feedback:** Correct answers in green, wrong answers in red (with the correct answer displayed).
* **Restart Capability:** Users can reset the state and try the quiz again without reloading the page.

### Key Learnings
* **Separation of Concerns:** Keeping logic (`script.js`), presentation (`style.css`), and structure (`index.html`) distinct.
* **DOM Traversal:** Efficiently selecting and updating elements to create a single-page application (SPA) feel.
* **Data Structures:** Using arrays of objects is the standard way to handle structured data like quiz questions.
* **Asynchronous Logic:** Handling timers requires understanding how JavaScript handles intervals alongside user interaction.