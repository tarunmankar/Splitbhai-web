// Premium Scroll Reveal
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a staggered delay based on index for a professional look
            setTimeout(() => {
                entry.target.classList.add('reveal-active');
            }, index * 100);
            revealOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Header scroll logic with smooth height transition
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Parallax effect for Hero Mockup
    const heroMockup = document.querySelector('.mockup-container');
    if (heroMockup) {
        const speed = 0.05;
        const yPos = -(window.scrollY * speed);
        heroMockup.style.transform = `perspective(1000px) rotateY(-10deg) rotateX(5deg) translateY(${yPos}px)`;
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without hash for a clean look
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    });
});

// Mobile Menu Logic
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        
        // Disable scroll when menu is open
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

// Initialize animations
window.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to cards and sections
    const itemsToReveal = document.querySelectorAll('.feature-card, .cta-card, .section-title, .hero-content');
    itemsToReveal.forEach(item => {
        item.classList.add('reveal-item');
        revealOnScroll.observe(item);
    });
});

// CSS Injection for Reveal Effect (if not in style.css)
const style = document.createElement('style');
style.textContent = `
    .reveal-item {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
