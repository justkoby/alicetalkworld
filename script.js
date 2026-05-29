document.addEventListener('DOMContentLoaded', function() {
    // --- Hero Carousel Logic ---
    const scrollContainer = document.querySelector('.hero-scroll-container');
    const textSlides = document.querySelectorAll('.hero-text-slide');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (scrollContainer && textSlides.length > 1 && dotsContainer) {
        let currentIndex = 0;
        const slideCount = textSlides.length;
        let slideInterval;

        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                showSlide(i);
                resetTimer();
            });
            dotsContainer.appendChild(dot);
        }
        const dots = document.querySelectorAll('.dot');

        function showSlide(index) {
            currentIndex = index;
            const slideWidth = scrollContainer.offsetWidth;
            scrollContainer.scrollLeft = index * slideWidth;
            textSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }

        const startTimer = () => {
            slideInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % slideCount;
                showSlide(nextIndex);
            }, 6000);
        };

        const resetTimer = () => {
            clearInterval(slideInterval);
            startTimer();
        };

        showSlide(0);
        startTimer();
    }

    // --- Scroll Animation Logic ---
    const animatedElements = document.querySelectorAll(
        '.fade-in-on-scroll, .slide-in-from-left, .slide-in-from-right'
    );

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // --- Navbar Search Bar Logic (SAFE CHECKS) ---
    const searchWrapper = document.getElementById('search-wrapper');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('searchInput');
    const donateButton = document.querySelector('.btn-donate');

    if (searchWrapper && searchButton && searchInput && donateButton) {
        // Toggle the search bar on button click
        searchButton.addEventListener('click', () => {
            searchWrapper.classList.toggle('active-search');
            if (searchWrapper.classList.contains('active-search')) {
                searchInput.focus();
                donateButton.style.display = 'none';
            } else {
                searchInput.value = '';
                donateButton.style.display = 'block';
            }
        });

        // Handle closing the search bar if the user clicks outside
        document.addEventListener('click', (event) => {
            if (
                !searchWrapper.contains(event.target) &&
                searchWrapper.classList.contains('active-search') &&
                event.target !== searchButton
            ) {
                searchWrapper.classList.remove('active-search');
                searchInput.value = '';
                donateButton.style.display = 'block';
            }
        });
    }
});
