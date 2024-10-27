document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons
    feather.replace();

    // Initialize all components
    initializeContactForm();
    initializeAnimations();
    setupScrollEffects();
});

function initializeContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Validate form data
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Simulate sending the message (replace with actual API call)
            await simulateMessageSend(data);

            // Show success message
            showAlert('Message sent successfully! We\'ll get back to you soon.', 'success');

            // Reset form
            form.reset();
        } catch (error) {
            showAlert('Failed to send message. Please try again later.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

function validateForm(data) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous errors
    clearErrors();

    // Validate name
    if (!data.name.trim()) {
        showError('name', 'Name is required');
        isValid = false;
    }

    // Validate email
    if (!data.email.trim()) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (!data.message.trim()) {
        showError('message', 'Message is required');
        isValid = false;
    }

    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.classList.add('error');
    field.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    // Remove all error messages
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const container = document.querySelector('.contact .container');
    container.insertBefore(alertDiv, container.firstChild);

    // Remove alert after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function simulateMessageSend(data) {
    // Simulate API call with a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Message sent:', data);
            resolve();
        }, 1500);
    });
}

function initializeAnimations() {
    // Animate features cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Animate team members on scroll
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'all 0.5s ease';
        member.style.transitionDelay = `${index * 0.1}s`;
    });
}

function setupScrollEffects() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Observe team members
    document.querySelectorAll('.team-member').forEach(member => {
        observer.observe(member);
    });
}

// Handle mobile navigation if needed
function initializeMobileNav() {
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});