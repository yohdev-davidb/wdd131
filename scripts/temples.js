
const navLinks = document.querySelectorAll('nav ul li a');


navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(item => item.classList.remove('active'));

        this.classList.add('active');
    });
});


const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

