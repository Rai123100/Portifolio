// Interactive Cursor Effects
document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('interactive-cursor');
    document.body.appendChild(cursor);

    const trails = [];
    const trailCount = 5;

    // Create cursor trails
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            opacity: 0
        });
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Update mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor and trails
    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Update trails
        trails.forEach((trail, index) => {
            const delay = (index + 1) * 0.05;
            trail.x += (mouseX - trail.x) * (0.1 - delay);
            trail.y += (mouseY - trail.y) * (0.1 - delay);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
            trail.element.style.opacity = (1 - index * 0.2) * 0.6;
        });

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Enhanced hover effects
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .carousel-control, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'rgba(0, 212, 255, 1)';
            cursor.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
            
            trails.forEach(trail => {
                trail.element.style.opacity = '0.8';
                trail.element.style.background = 'rgba(0, 212, 255, 0.8)';
            });
        });

        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'rgba(76, 118, 255, 0.8)';
            cursor.style.boxShadow = 'none';
            
            trails.forEach(trail => {
                trail.element.style.background = 'rgba(0, 212, 255, 0.6)';
            });
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
        trails.forEach(trail => {
            trail.element.style.opacity = '0';
        });
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
});