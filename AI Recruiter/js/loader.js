// Page loader
window.addEventListener('load', function() {
    const pageLoader = document.getElementById('pageLoader');
    setTimeout(() => {
        pageLoader.style.opacity = '0';
        pageLoader.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 300);
    }, 500);
});
