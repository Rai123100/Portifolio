// Particles.js Configuration for Space Theme
// AI Generated - Space particle system for astronaut portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize particles if the particles-js element exists
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 120,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#4c76ff", "#00d4ff", "#ffffff"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4c76ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Add special effects for space elements
    createFloatingElements();
    initializeSpaceEffects();
});

// Create floating space elements
function createFloatingElements() {
    const floatingElements = ['🚀', '⭐', '🛸', '🌟', '✨'];
    const container = document.body;

    // Create random floating elements
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            element.className = 'floating-space-element';
            element.innerHTML = floatingElements[Math.floor(Math.random() * floatingElements.length)];
            element.style.cssText = `
                position: fixed;
                pointer-events: none;
                z-index: 1;
                font-size: ${Math.random() * 20 + 15}px;
                opacity: 0.3;
                animation: floatAcross ${Math.random() * 20 + 15}s linear infinite;
                top: ${Math.random() * 100}%;
                left: -50px;
            `;
            
            container.appendChild(element);
            
            // Remove element after animation
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 25000);
            
        }, i * 3000);
    }
}

// Initialize space-themed effects
function initializeSpaceEffects() {
    // Add twinkling stars effect
    createTwinklingStars();
    
    // Add meteor shower effect occasionally
    setInterval(createMeteorShower, 30000);
    
    // Add nebula glow effect
    addNebulaGlow();
}

// Create twinkling stars
function createTwinklingStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'twinkling-stars';
    starsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    // Create individual stars
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'twinkling-star';
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: 0;
        `;
        starsContainer.appendChild(star);
    }
    
    document.body.appendChild(starsContainer);
}

// Create meteor shower effect
function createMeteorShower() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.style.cssText = `
                position: fixed;
                width: 2px;
                height: 2px;
                background: linear-gradient(45deg, #4c76ff, #00d4ff);
                border-radius: 50%;
                box-shadow: 0 0 10px #4c76ff, 0 0 20px #00d4ff;
                top: ${Math.random() * 50}%;
                left: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 1;
                animation: meteor 3s linear forwards;
            `;
            
            document.body.appendChild(meteor);
            
            setTimeout(() => {
                if (meteor.parentNode) {
                    meteor.parentNode.removeChild(meteor);
                }
            }, 3000);
        }, i * 500);
    }
}

// Add nebula glow effect to hero section
function addNebulaGlow() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula-glow';
        nebula.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, rgba(76, 118, 255, 0.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            animation: nebulaGlow 10s ease-in-out infinite alternate;
        `;
        
        heroSection.style.position = 'relative';
        heroSection.appendChild(nebula);
    }
}

// Add CSS animations for space effects
const spaceStyleSheet = document.createElement('style');
spaceStyleSheet.textContent = `
    @keyframes floatAcross {
        0% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateX(calc(100vw + 50px)) translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    
    @keyframes meteor {
        0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateX(300px) translateY(300px);
            opacity: 0;
        }
    }
    
    @keyframes nebulaGlow {
        0% {
            opacity: 0.3;
            transform: scale(1);
        }
        100% {
            opacity: 0.6;
            transform: scale(1.1);
        }
    }
    
    .floating-space-element {
        user-select: none;
        filter: drop-shadow(0 0 5px rgba(76, 118, 255, 0.5));
    }
    
    .meteor {
        transform-origin: left top;
    }
    
    .meteor::after {
        content: '';
        position: absolute;
        top: 0;
        left: -30px;
        width: 30px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #4c76ff);
        opacity: 0.7;
    }
`;

document.head.appendChild(spaceStyleSheet);

// Parallax effect for space elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Move particles container slightly for parallax effect
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.style.transform = `translateY(${rate}px)`;
    }
    
    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.floating-elements i');
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Responsive particles adjustment
function adjustParticlesForDevice() {
    if (window.innerWidth < 768) {
        // Reduce particles on mobile
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.particles.number.value = 60;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
}

// Adjust particles on window resize
window.addEventListener('resize', adjustParticlesForDevice);
adjustParticlesForDevice();

// Add constellation effect for special sections
function createConstellation(container) {
    if (!container) return;
    
    const constellation = document.createElement('canvas');
    constellation.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    const ctx = constellation.getContext('2d');
    constellation.width = container.offsetWidth;
    constellation.height = container.offsetHeight;
    
    const stars = [];
    const numStars = 20;
    
    // Create star positions
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * constellation.width,
            y: Math.random() * constellation.height,
            size: Math.random() * 2 + 1
        });
    }
    
    // Draw constellation
    function drawConstellation() {
        ctx.clearRect(0, 0, constellation.width, constellation.height);
        
        // Draw stars
        ctx.fillStyle = 'rgba(76, 118, 255, 0.6)';
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#4c76ff';
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(76, 118, 255, 0.3)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                const dx = stars[i].x - stars[j].x;
                const dy = stars[i].y - stars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(stars[j].x, stars[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    drawConstellation();
    container.appendChild(constellation);
    
    // Animate constellation
    setInterval(() => {
        stars.forEach(star => {
            star.x += (Math.random() - 0.5) * 0.5;
            star.y += (Math.random() - 0.5) * 0.5;
            
            // Keep stars within bounds
            star.x = Math.max(0, Math.min(constellation.width, star.x));
            star.y = Math.max(0, Math.min(constellation.height, star.y));
        });
        drawConstellation();
    }, 100);
}

// Initialize constellations for special sections
document.addEventListener('DOMContentLoaded', function() {
    // Add constellation to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        setTimeout(() => createConstellation(heroSection), 2000);
    }
    
    // Add constellation to about section if it exists
    const aboutSection = document.querySelector('.about-content');
    if (aboutSection) {
        setTimeout(() => createConstellation(aboutSection), 3000);
    }
});
