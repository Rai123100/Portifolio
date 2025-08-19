// Main JavaScript for Astronaut Portfolio
// AI Generated - Interactive functionality for space-themed portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeInteractiveElements();
    initializeFormEnhancements();
    initializeImageLazyLoading();
    initializeSmoothScrolling();
    initializeSpaceThemeEffects();
});

// Navigation enhancements
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(76, 118, 255, 0.3)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active nav link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Mobile menu enhancements
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for stat numbers
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll([
        '.project-card',
        '.achievement-card',
        '.stat-card',
        '.timeline-item',
        '.comment-item'
    ].join(','));
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Parallax effect for hero elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroElements = document.querySelectorAll('.hero-image, .astronaut-container');
        
        heroElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Add CSS for animation classes
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .fade-in {
            animation: fadeIn 0.8s ease forwards;
        }
        
        .slide-up {
            animation: slideUp 0.6s ease forwards;
        }
        
        .scale-in {
            animation: scaleIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0; 
                transform: translateY(30px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }
        
        @keyframes scaleIn {
            from { 
                opacity: 0; 
                transform: scale(0.9); 
            }
            to { 
                opacity: 1; 
                transform: scale(1); 
            }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        .glow {
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes glow {
            from { box-shadow: 0 0 10px rgba(76, 118, 255, 0.5); }
            to { box-shadow: 0 0 20px rgba(76, 118, 255, 0.8); }
        }
        
        @keyframes likeFloat {
            0% { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(-50px) scale(1.5); 
            }
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Apply initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }
        
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.classList.add('scale-in');
        }
    }, 500);
}

// Interactive elements
function initializeInteractiveElements() {
    // Like button functionality
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.dataset.projectId;
            const likeCount = this.querySelector('.like-count');
            const heartIcon = this.querySelector('i');
            
            // Add loading state
            this.disabled = true;
            heartIcon.classList.add('fa-spinner', 'fa-spin');
            heartIcon.classList.remove('fa-heart');
            
            // Get CSRF token
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            
            fetch(`/like/${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken || ''
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showNotification('Faça login para curtir projetos', 'error');
                    return;
                }
                
                // Update UI
                likeCount.textContent = data.like_count;
                
                if (data.liked) {
                    this.classList.remove('btn-outline-primary');
                    this.classList.add('btn-primary');
                    heartIcon.classList.add('pulse');
                } else {
                    this.classList.remove('btn-primary');
                    this.classList.add('btn-outline-primary');
                    heartIcon.classList.remove('pulse');
                }
                
                // Show success animation
                showLikeAnimation(this);
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Algo deu errado. Tente novamente.', 'error');
            })
            .finally(() => {
                // Remove loading state
                this.disabled = false;
                heartIcon.classList.remove('fa-spinner', 'fa-spin');
                heartIcon.classList.add('fa-heart');
            });
        });
    });
    
    // Copy to clipboard functionality
    document.querySelectorAll('.copy-link').forEach(button => {
        button.addEventListener('click', function() {
            const url = this.dataset.url || window.location.href;
            
            navigator.clipboard.writeText(url).then(() => {
                const originalIcon = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.classList.add('btn-success');
                
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                    this.classList.remove('btn-success');
                }, 2000);
                
                showNotification('Link copiado para a área de transferência!', 'success');
            }).catch(() => {
                showNotification('Falha ao copiar link', 'error');
            });
        });
    });
    
    // Image modal functionality
    document.querySelectorAll('.project-main-image, .current-project-image').forEach(image => {
        image.addEventListener('click', function() {
            showImageModal(this.src, this.alt);
        });
        image.style.cursor = 'pointer';
    });
    
    // Search functionality if search input exists
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 500);
        });
    }
}

// Form enhancements
function initializeFormEnhancements() {
    // Auto-resize textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        function resizeTextarea() {
            textarea.style.height = 'auto';
            textarea.style.height = Math.max(textarea.scrollHeight, 100) + 'px';
        }
        
        textarea.addEventListener('input', resizeTextarea);
        resizeTextarea(); // Initial resize
    });
    
    // Form validation enhancements
    document.querySelectorAll('form').forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission with loading state
        form.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
                
                // Re-enable after 5 seconds as failsafe
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }, 5000);
            }
        });
    });
    
    // Character counters
    document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        const counter = document.createElement('div');
        counter.className = 'char-counter text-muted small mt-1';
        textarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counter.classList.add('text-warning');
            } else {
                counter.classList.remove('text-warning');
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    });
}

// Image lazy loading
function initializeImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Smooth scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just '#' or empty
            if (!targetId || targetId === '#') {
                return;
            }
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Space theme effects
function initializeSpaceThemeEffects() {
    // Add glow effects to interactive elements
    document.querySelectorAll('.btn-primary, .text-gradient').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('glow');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('glow');
        });
    });
    
    // Random twinkling effect for star icons
    document.querySelectorAll('.fa-star').forEach(star => {
        const delay = Math.random() * 5000;
        setTimeout(() => {
            star.classList.add('pulse');
        }, delay);
    });
    
    // Constellation cursor trail effect
    let mouseX = 0, mouseY = 0;
    const trail = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.push({x: mouseX, y: mouseY});
        if (trail.length > 10) {
            trail.shift();
        }
    });
    
    // Create rocket boost effect on CTA buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            createRocketBoostEffect(e.target, e.clientX, e.clientY);
        });
    });
}

// Utility functions

// Animate numbers
function animateNumber(element) {
    const finalNumber = parseInt(element.textContent);
    let currentNumber = 0;
    const increment = finalNumber / 50;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentNumber);
    }, 30);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fade');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Show like animation
function showLikeAnimation(button) {
    const heart = document.createElement('div');
    heart.innerHTML = '💙';
    heart.style.cssText = `
        position: fixed;
        pointer-events: none;
        font-size: 2rem;
        z-index: 9999;
        animation: likeFloat 2s ease forwards;
    `;
    
    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Show image modal
function showImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function() {
        this.remove();
        document.body.style.overflow = '';
    });
    
    document.body.style.overflow = 'hidden';
}

// Validate form field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Required validation
    if (field.required && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // URL validation
    if (field.type === 'url' && value) {
        try {
            new URL(value);
        } catch {
            isValid = false;
            message = 'Please enter a valid URL';
        }
    }
    
    // Update field appearance
    field.classList.remove('is-valid', 'is-invalid');
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
    
    // Show/hide error message
    let errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    
    return isValid;
}

// Create rocket boost effect
function createRocketBoostEffect(button, x, y) {
    const boost = document.createElement('div');
    boost.innerHTML = '🚀';
    boost.style.cssText = `
        position: fixed;
        pointer-events: none;
        font-size: 1.5rem;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        animation: rocketBoost 1s ease forwards;
    `;
    
    document.body.appendChild(boost);
    
    setTimeout(() => {
        boost.remove();
    }, 1000);
}

// Search functionality
function performSearch(query) {
    const searchResults = document.querySelectorAll('.searchable');
    const noResults = document.querySelector('.no-results');
    let hasResults = false;
    
    searchResults.forEach(element => {
        const text = element.textContent.toLowerCase();
        const matches = text.includes(query.toLowerCase());
        
        element.style.display = matches ? '' : 'none';
        if (matches) hasResults = true;
    });
    
    if (noResults) {
        noResults.style.display = hasResults ? 'none' : 'block';
    }
}

// Add required CSS animations
const mainStyles = document.createElement('style');
mainStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes likeFloat {
        0% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
        }
        100% { 
            transform: translateY(-50px) scale(1.5); 
            opacity: 0; 
        }
    }
    
    @keyframes rocketBoost {
        0% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 1; 
        }
        100% { 
            transform: translateY(-100px) rotate(45deg); 
            opacity: 0; 
        }
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(mainStyles);

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker for offline capabilities
        // This would be implemented if PWA features are needed
    });
}

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
        console.log(`${entry.name}: ${entry.duration}ms`);
    });
});

try {
    performanceObserver.observe({ entryTypes: ['navigation', 'paint'] });
} catch (e) {
    // Performance Observer not supported
}

// Error handling for failed image loads
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjMUExQTFBIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyNSIgcj0iNDAiIGZpbGw9IiM0Qzc2RkYiLz4KPHN2Zz4K';
        e.target.alt = 'Image not available';
    }
}, true);
