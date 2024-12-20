document.addEventListener('DOMContentLoaded', () => {
    feather.replace();

    initializeSidebarNavigation();
    initializeSmoothScroll();
    initializeFAQInteractions();
    setupScrollSpy();
});

function initializeSidebarNavigation() {
    const navLinks = document.querySelectorAll('.guide-nav a');
    const sections = document.querySelectorAll('.guide-section');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('.guide-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                history.pushState(null, '', targetId);
            }
        });
    });
}

function initializeFAQInteractions() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');

        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out';
        item.setAttribute('data-expanded', 'false');

        question.addEventListener('click', () => {
            const isExpanded = item.getAttribute('data-expanded') === 'true';

            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('p');
                    otherAnswer.style.maxHeight = '0';
                    otherItem.setAttribute('data-expanded', 'false');
                }
            });

            if (isExpanded) {
                answer.style.maxHeight = '0';
                item.setAttribute('data-expanded', 'false');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                item.setAttribute('data-expanded', 'true');
            }
        });
    });
}

function setupScrollSpy() {
    const sections = document.querySelectorAll('.guide-section');
    const navItems = document.querySelectorAll('.guide-nav a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // Adjust these values to change when the active state triggers
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(item => item.classList.remove('active'));

                const targetId = entry.target.getAttribute('id');
                const correspondingNavItem = document.querySelector(`.guide-nav a[href="#${targetId}"]`);
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

function initializeMobileNav() {
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
}

function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.clientHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;

        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

function initializeCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i data-feather="clipboard"></i>';

        block.parentNode.style.position = 'relative';
        block.parentNode.appendChild(copyButton);

        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.innerHTML = '<i data-feather="check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i data-feather="clipboard"></i>';
                    feather.replace();
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
            feather.replace();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeReadingProgress();
    initializeCodeCopy();
    initializeMobileNav();
});