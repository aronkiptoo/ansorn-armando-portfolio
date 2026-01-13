// Main Portfolio Script
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navbar scroll effect (add shadow when scrolled)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fade-in animation on scroll (using Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Observe sections and cards
    const fadeElements = document.querySelectorAll('.hero, .card, .progress, .project, section');
    fadeElements.forEach(el => observer.observe(el));

    // Progress bar animation on scroll
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgress = function(bar) {
        const width = bar.getAttribute('style').match(/width: (\d+)%/)[1];
        bar.style.width = '0%';
        bar.classList.add('animate');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 100);
    };

    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.progress-bar');
                if (bar) {
                    animateProgress(bar);
                }
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        const container = bar.closest('.progress');
        progressObserver.observe(container);
    });

    // Contact form handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.querySelector('input[type="text"]').value;
            const email = document.querySelector('input[type="email"]').value;
            const message = document.querySelector('textarea').value;

            if (name && email && message) {
                // Basic validation passed; in production, send to backend (e.g., via fetch to Formspree)
                alert(`Thanks, ${name}! I'll get back to you at ${email} soon.`);
                this.reset(); // Clear form
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Optional: Typing effect for hero (if you add a .typed class)
    // const typedElement = document.querySelector('.typed');
    // if (typedElement && typeof Typed !== 'undefined') { // If you add Typed.js
    //     new Typed(typedElement, {
    //         strings: ['Software Engineer', 'Web Developer', 'Network Engineer'],
    //         typeSpeed: 50,
    //         backSpeed: 30,
    //         loop: true
    //     });
    // }
});