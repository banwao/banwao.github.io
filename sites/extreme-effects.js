// Restore extreme effects functionality for the name element

// This function makes the name element go absolutely insane when clicked
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing extreme effects...");
    
    // Create effect containers
    createEffectContainers();
    
    // Initialize the name element
    initializeNameElement();
    
    // Global access to trigger effects
    window.triggerExtreme = triggerExtreme;
});

// Create required containers for effects if they don't exist
function createEffectContainers() {
    const containers = [
        { id: 'portal-container', className: 'portal-container' },
        { id: 'particles-container', className: 'particles-container' },
        { id: 'matrix-container', className: 'matrix-container' },
        { id: 'fractal-container', className: 'fractal-container' },
        { id: 'lightning-container', className: 'lightning-container' },
        { id: 'shockwave-container', className: 'shockwave-container' },
        { id: 'flying-objects', className: 'flying-objects-container' },
        { id: 'hologram-container', className: 'hologram-container' },
        { id: 'reality-distortion', className: 'reality-distortion' }
    ];
    
    containers.forEach(container => {
        if (!document.getElementById(container.id)) {
            const elem = document.createElement('div');
            elem.id = container.id;
            elem.className = container.className;
            document.body.appendChild(elem);
            console.log(`Created missing container: ${container.id}`);
        }
    });
    
    // Create portal if it doesn't exist
    const portalContainer = document.getElementById('portal-container');
    if (portalContainer && !document.getElementById('reality-portal')) {
        const portal = document.createElement('div');
        portal.id = 'reality-portal';
        portal.className = 'portal';
        
        // Create portal rings
        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            ring.className = 'portal-ring';
            portal.appendChild(ring);
        }
        
        // Create advanced rings
        for (let i = 0; i < 5; i++) {
            const ring = document.createElement('div');
            ring.className = 'portal-ring advanced-ring';
            ring.style.animationDelay = `${i * 0.2}s`;
            portal.appendChild(ring);
        }
        
        // Create portal core
        const core = document.createElement('div');
        core.className = 'portal-core';
        portal.appendChild(core);
        
        // Create dimensional rift
        const rift = document.createElement('div');
        rift.className = 'dimensional-rift';
        rift.id = 'dimensional-rift';
        portal.appendChild(rift);
        
        // Add vortex lines
        for (let i = 0; i < 36; i++) {
            const line = document.createElement('div');
            line.className = 'vortex-line';
            line.style.transform = `rotate(${i * 10}deg)`;
            line.style.animationDelay = `${i * 0.1}s`;
            portal.appendChild(line);
        }
        
        portalContainer.appendChild(portal);
        console.log("Created portal element");
    }
    
    // Initialize Matrix Rain
    const matrixContainer = document.getElementById('matrix-container');
    if (matrixContainer && !document.getElementById('matrix-canvas') && typeof initializeMatrixRain === 'function') {
        initializeMatrixRain(matrixContainer);
        console.log("Initialized matrix rain");
    }
}

// Set up the name element with click handler
function initializeNameElement() {
    const nameElement = document.querySelector('.cyber-glitch.interactive-glitch');
    if (!nameElement) return;
    
    // Ensure proper classes
    nameElement.classList.add('reality-warp');
    
    // Split text into characters if needed
    if (!nameElement.querySelector('.char')) {
        const text = nameElement.textContent;
        nameElement.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = document.createElement('span');
            char.className = 'char';
            char.style.setProperty('--char-index', i);
            char.textContent = text[i];
            nameElement.appendChild(char);
        }
    }
    
    // Set up click handler
    nameElement.addEventListener('click', function() {
        triggerExtreme();
    });
    
    console.log("Name element initialized with extreme effects");
}

// Main function to trigger all the extreme effects
function triggerExtreme() {
    console.log("Triggering extreme effects!");
    
    // Time stop effect
    document.body.classList.add('time-stop');
    setTimeout(() => document.body.classList.remove('time-stop'), 500);
    
    // Get effect elements
    const nameElement = document.querySelector('.reality-warp');
    const portal = document.getElementById('reality-portal');
    const portalContainer = document.getElementById('portal-container');
    const matrixContainer = document.getElementById('matrix-container');
    const distortion = document.getElementById('reality-distortion');
    const dimensionalRift = document.getElementById('dimensional-rift');
    
    // Apply effects to name
    if (nameElement) {
        nameElement.classList.add('active', 'extreme');
        
        // Animate letters
        const chars = nameElement.querySelectorAll('.char');
        chars.forEach((char, i) => {
            char.style.animation = `
                charExplode 0.5s forwards,
                charFloat 3s infinite ${i * 0.1}s,
                charGlow 2s infinite ${i * 0.2}s alternate
            `;
        });
    }
    
    // Extreme screen shake
    document.body.classList.add('extreme-shake');
    setTimeout(() => document.body.classList.remove('extreme-shake'), 1000);
    
    // Portal effects
    if (portal && portalContainer) {
        portalContainer.classList.add('active', 'extreme');
        portal.classList.add('active', 'extreme');
        if (dimensionalRift) dimensionalRift.classList.add('active');
    }
    
    // Matrix rain
    if (matrixContainer) matrixContainer.classList.add('active');
    
    // Distortion effects
    if (distortion) distortion.classList.add('active', 'extreme');
    
    // Trigger additional effects
    createShockwave();
    launchFlyingObjects();
    startHolographicProjections();
    distortPageElements();
    
    // Auto deactivate after a while
    setTimeout(() => {
        deactivateEffects();
    }, 12000);
}

// Create shockwave effect
function createShockwave() {
    const container = document.getElementById('shockwave-container');
    if (!container) return;
    
    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave';
    container.appendChild(shockwave);
    
    // Remove after animation completes
    setTimeout(() => {
        if (container.contains(shockwave)) {
            container.removeChild(shockwave);
        }
    }, 2000);
}

// Launch flying objects
function launchFlyingObjects() {
    const container = document.getElementById('flying-objects');
    if (!container) return;
    
    const objectTypes = ['cube', 'pyramid', 'sphere', 'ring', 'diamond'];
    const totalObjects = 30;
    
    for (let i = 0; i < totalObjects; i++) {
        setTimeout(() => {
            const obj = document.createElement('div');
            const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
            obj.className = `flying-object ${type}`;
            
            // Random position and movement
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const endX = Math.random() * window.innerWidth;
            const endY = Math.random() * window.innerHeight;
            
            obj.style.left = `${startX}px`;
            obj.style.top = `${startY}px`;
            obj.style.setProperty('--end-x', `${endX}px`);
            obj.style.setProperty('--end-y', `${endY}px`);
            obj.style.setProperty('--rotation-x', `${Math.random() * 1440}deg`);
            obj.style.setProperty('--rotation-y', `${Math.random() * 1440}deg`);
            obj.style.setProperty('--rotation-z', `${Math.random() * 1440}deg`);
            obj.style.setProperty('--duration', `${Math.random() * 4 + 2}s`);
            obj.style.setProperty('--delay', `${Math.random() * 2}s`);
            obj.style.setProperty('--size', `${Math.random() * 60 + 20}px`);
            obj.style.setProperty('--color', getRandomCyberColor());
            
            container.appendChild(obj);
            
            // Remove after animation
            setTimeout(() => {
                if (container.contains(obj)) {
                    container.removeChild(obj);
                }
            }, 6000);
        }, i * 100);
    }
}

// Show holographic projections
function startHolographicProjections() {
    const container = document.getElementById('hologram-container');
    if (!container) return;
    
    const texts = [
        'SYSTEM OVERRIDE', 
        'DIMENSIONAL SHIFT', 
        'REALITY ERROR', 
        'MATRIX BREACH',
        'NEURAL INTERFACE'
    ];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const hologram = document.createElement('div');
            hologram.className = 'holographic-projection';
            
            const textElem = document.createElement('div');
            textElem.className = 'hologram-text';
            textElem.textContent = texts[i % texts.length];
            hologram.appendChild(textElem);
            
            // Random position
            hologram.style.top = `${20 + Math.random() * 60}%`;
            hologram.style.left = `${10 + Math.random() * 80}%`;
            hologram.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(${0.5 + Math.random() * 1.5})`;
            
            container.appendChild(hologram);
            
            // Remove after some time
            setTimeout(() => {
                if (container.contains(hologram)) {
                    hologram.style.opacity = '0';
                    setTimeout(() => {
                        container.removeChild(hologram);
                    }, 2000);
                }
            }, 5000);
        }, i * 1000);
    }
}

// Distort page elements
function distortPageElements() {
    const elements = document.querySelectorAll('.container, .cyber-panel, section, .terminal-container');
    
    elements.forEach(el => {
        if (Math.random() > 0.7) {
            el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
            el.style.transform = `
                perspective(1000px)
                translateZ(${Math.random() * 50}px)
                rotateX(${Math.random() * 10 - 5}deg)
                rotateY(${Math.random() * 10 - 5}deg)
                scale(${0.95 + Math.random() * 0.1})
            `;
            
            // Restore later
            setTimeout(() => {
                el.style.transform = '';
            }, 2000 + Math.random() * 3000);
        }
    });
}

// Deactivate all effects
function deactivateEffects() {
    // Name element
    const nameElement = document.querySelector('.reality-warp');
    if (nameElement) {
        nameElement.classList.remove('active', 'extreme');
        const chars = nameElement.querySelectorAll('.char');
        chars.forEach(char => {
            char.style.animation = '';
        });
    }
    
    // Portal
    const portal = document.getElementById('reality-portal');
    const portalContainer = document.getElementById('portal-container');
    if (portal && portalContainer) {
        portal.classList.remove('active', 'extreme');
        portalContainer.classList.remove('active', 'extreme');
    }
    
    // Dimensional rift
    const dimensionalRift = document.getElementById('dimensional-rift');
    if (dimensionalRift) dimensionalRift.classList.remove('active');
    
    // Matrix rain
    const matrixContainer = document.getElementById('matrix-container');
    if (matrixContainer) matrixContainer.classList.remove('active');
    
    // Distortion
    const distortion = document.getElementById('reality-distortion');
    if (distortion) distortion.classList.remove('active', 'extreme');
}

// Utility function to get random cyber color
function getRandomCyberColor() {
    const colors = [
        '#00ff9d', // green
        '#ff00ff', // magenta
        '#00ffff', // cyan
        '#ffff00', // yellow
        '#ff3377', // pink
        '#3377ff', // blue
        '#ff2222'  // red
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
