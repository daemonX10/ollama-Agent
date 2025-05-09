// TalentAI UI Enhancements

// Animate elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon i');
            icon.classList.add('fa-bounce');
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon i');
            icon.classList.remove('fa-bounce');
        });
    });
    
    // Add active class to current navigation link
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-indigo-600');
                    link.classList.add('text-gray-600');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('text-gray-600');
                        link.classList.add('text-indigo-600');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Run on page load
    
    // Add fancy cursor effect on hero section
    const heroBanner = document.querySelector('#hero');
    if (heroBanner) {
        heroBanner.addEventListener('mousemove', (e) => {
            const rect = heroBanner.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const spotlight = document.createElement('div');
            spotlight.classList.add('hero-spotlight');
            spotlight.style.left = `${x}px`;
            spotlight.style.top = `${y}px`;
            
            heroBanner.appendChild(spotlight);
            
            setTimeout(() => {
                spotlight.remove();
            }, 1000);
        });
    }
});
