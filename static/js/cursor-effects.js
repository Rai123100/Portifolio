// Mouse Trail Effect - Based on Portfolio 2 Style
document.addEventListener('DOMContentLoaded', function() {
    let mouseTrail = [];
    const maxTrailLength = 20;

    // Add mouse trail effect
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
        
        updateMouseTrail();
    });

    function updateMouseTrail() {
        const existingTrail = document.querySelectorAll('.mouse-trail-dot');
        existingTrail.forEach(dot => dot.remove());

        mouseTrail.forEach((point, index) => {
            const dot = document.createElement('div');
            dot.className = 'mouse-trail-dot';
            dot.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${2 + index * 0.5}px;
                height: ${2 + index * 0.5}px;
                background: rgba(0, 212, 255, ${(index + 1) / maxTrailLength});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                transition: opacity 0.1s ease;
            `;
            
            document.body.appendChild(dot);
            
            setTimeout(() => {
                if (dot.parentElement) {
                    dot.style.opacity = '0';
                    setTimeout(() => {
                        if (dot.parentElement) {
                            dot.remove();
                        }
                    }, 100);
                }
            }, 100);
        });
    }

    // Hide trail on mobile devices
    if (window.matchMedia("(max-width: 768px)").matches) {
        document.removeEventListener('mousemove', updateMouseTrail);
    }
});