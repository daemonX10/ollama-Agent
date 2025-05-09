// Common Header Script

document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('common-header');
    
    if (header) {
        // Determine which page we're on to highlight the appropriate nav item
        const currentPath = window.location.pathname;
        let isHome = currentPath.endsWith('index.html') || currentPath.endsWith('/');
        let isCandidate = currentPath.includes('candidate');
        let isRecruiter = currentPath.includes('recruiter');
        let isLogin = currentPath.includes('login');
        let isSignup = currentPath.includes('signup');
        
        // Set the active class on the appropriate navigation item
        const navLinks = document.querySelectorAll('.header-nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if ((isHome && href === 'index.html') ||
                (isCandidate && href.includes('candidate')) ||
                (isRecruiter && href.includes('recruiter')) ||
                (isLogin && href.includes('login')) ||
                (isSignup && href.includes('signup'))) {
                link.classList.add('text-indigo-600');
                link.classList.remove('text-gray-600');
            }
        });
        
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }
    }
});
