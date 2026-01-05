// Hero Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.hero-indicator');
let autoSlideInterval;

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    
    // Loop back to start/end
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    showSlide(currentSlide);
    resetAutoSlide(); // Reset auto-slide timer when button is clicked
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetAutoSlide(); // Reset auto-slide timer when indicator is clicked
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 10000); // Changed to 10 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Start auto slide
startAutoSlide();

// Pause auto slide on hover
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Product Modal/Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all product images
    const productImages = document.querySelectorAll('.product-image img');
    const modal = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Add click event to each product image
    productImages.forEach(function(img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product data from the card
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productSubtitle = productCard.querySelector('.product-subtitle').textContent;
            const productDescription = productCard.querySelector('.product-description').textContent;
            const priceOriginal = productCard.querySelector('.price-original').textContent;
            const priceDiscount = productCard.querySelector('.price-discount').textContent;
            const discountBadge = productCard.querySelector('.discount-badge').textContent;
            const productImageSrc = this.src;
            const productBadge = productCard.querySelector('.product-badge').textContent;
            const productButton = productCard.querySelector('.product-button').href;
            
            // Populate modal with product data
            document.getElementById('modalImage').src = productImageSrc;
            document.getElementById('modalTitle').textContent = productTitle;
            document.getElementById('modalSubtitle').textContent = productSubtitle;
            document.getElementById('modalDescription').textContent = productDescription;
            document.getElementById('modalPriceOriginal').textContent = priceOriginal;
            document.getElementById('modalPriceDiscount').textContent = priceDiscount;
            document.getElementById('modalDiscountBadge').textContent = discountBadge;
            document.getElementById('modalBadge').textContent = productBadge;
            document.getElementById('modalButton').href = productButton;
            
            // Set badge class
            const modalBadgeElement = document.getElementById('modalBadge');
            if (productBadge === 'New') {
                modalBadgeElement.className = 'modal-product-badge new';
            } else {
                modalBadgeElement.className = 'modal-product-badge';
            }
            
            // Show modal with animation
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal when clicking close button
    modalClose.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .cta-button');
    navLinks.forEach(function(link) {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
});
