document.addEventListener('DOMContentLoaded', function() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const slides = document.querySelectorAll('.portfolio-item');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoplayInterval;
    const autoplayDelay = 4000; // 4 seconds
    
    function updateSlidePosition() {
        const slideWidth = slides[0].offsetWidth;
        const gap = 32; // 2rem gap
        const offset = -currentSlide * (slideWidth + gap);
        portfolioGrid.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlidePosition();
        resetAutoplay();
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Pause autoplay on hover
    portfolioGrid.addEventListener('mouseenter', stopAutoplay);
    portfolioGrid.addEventListener('mouseleave', startAutoplay);
    
    // Start autoplay
    startAutoplay();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    portfolioGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    portfolioGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left, go to next slide
            } else {
                prevSlide(); // Swipe right, go to previous slide
            }
            resetAutoplay();
        }
    }
});
