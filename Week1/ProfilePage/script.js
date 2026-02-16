document.addEventListener('DOMContentLoaded', () => {
    
    // Select the hamburger icon and the menu links
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menuLinks = document.querySelector('.menu-links');

    if (hamburgerIcon && menuLinks) {
        
        // Toggle menu on click
        hamburgerIcon.addEventListener('click', () => {
            hamburgerIcon.classList.toggle('open');
            menuLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked
        const links = document.querySelectorAll('.menu-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerIcon.classList.remove('open');
                menuLinks.classList.remove('open');
            });
        });
    }
});