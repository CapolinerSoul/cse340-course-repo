const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('#nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');

    const isOpen = navMenu.classList.contains('active');

    menuToggle.setAttribute('aria-expanded', isOpen);
});