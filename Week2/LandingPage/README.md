# Internship Task: Week 02 — CSS Layouts & Responsive Design

## Description
This repository contains the submission for the Week 02 internship task. The objective was to build a modern, responsive landing page using a "Mobile-First" approach. The project focuses on advanced CSS architecture, layout systems (Flexbox & Grid), and media queries to ensure seamless adaptability across all device sizes.

## Topics Covered
* **CSS Layout Modules:** Extensive use of **Flexbox** (navigation, alignment) and **CSS Grid** (product cards, feature lists).
* **Responsive Design:** Implementation of Mobile-First media queries.
* **CSS Architecture:** Utilization of CSS Variables (`:root`) for consistent theming and maintainability.
* **Interactivity:** JavaScript DOM manipulation for mobile navigation and form validation.

## Deliverable: Responsive Landing Page (Greenify)
A marketing landing page for "Greenify," a fictional indoor plant delivery service, designed to look great on phones, tablets, and desktops.

### Key Features
* **Mobile-First Architecture:** Base styles are written for mobile devices first, with progressive enhancements for larger screens using `min-width` media queries (Tablet: `600px`, Desktop: `900px`).
* **Advanced Layouts:**
    * **CSS Grid:** Utilized in the "Benefits" and "Plants" sections to create responsive 1-column (mobile), 2-column (tablet), and 3-column (desktop) grids.
    * **Flexbox:** Used for the navigation bar, hero section alignment, and centering content within cards.
* **Modern Styling:** Implemented a consistent color palette (greens and off-whites) using CSS Variables for easy theme management.
* **Interactive Components:**
    * Custom animated hamburger menu for mobile navigation.
    * Client-side form validation script for the "Contact Us" section.
* **Accessibility:** Includes a "Skip to main content" link and semantic HTML structure (`<main>`, `<nav>`, `<article>`) to support keyboard navigation and screen readers.

### Key Learnings
* **Mobile-First Workflow:** Designing for smaller screens first forces prioritization of content and results in cleaner, more performant CSS.
* **Grid vs. Flexbox:** Learned to apply Grid for 2-dimensional layouts (entire page sections) and Flexbox for 1-dimensional layouts (navbars, button groups).
* **CSS Variables:** Using variables significantly speeds up development and ensures design consistency.
* **Media Queries:** Understanding breakpoints is crucial for controlling layout shifts across different devices.
