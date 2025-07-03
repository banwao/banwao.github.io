// Reality Warping Effect for the name interaction

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the name element
    const nameElement = document.querySelector('.cyber-glitch.interactive-glitch');
    if (!nameElement) return;
    
    // Add the reality warp class
    nameElement.classList.add('reality-warp');
    
    // Split text into characters for individual animation
    const text = nameElement.textContent;
    nameElement.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const char = document.createElement('span');
        char.className = 'char';
        char.style.setProperty('--char-index', i);
        char.textContent = text[i];
        nameElement.appendChild(char);
    }
    
    // Create portal elements
    createPortalElements();
    
    // Create audio elements for effect
    createAudioEffects();
    
    // Create matrix rain effect
    createMatrixRain();
    
    // Create energy field
    createEnergyField();
    
    // Mouse interaction events
    let isActive = false;
    let isAnimating = false;
    let distortionTime = 0;
    
    // ENHANCED: Hover effect is more dramatic
    nameElement.addEventListener('mouseenter', function() {
        if (isAnimating) return;
        
        // Play hover sound - ENHANCED: more dramatic sound
        playSound('hover');
        
        // Start subtle animation with significantly enhanced effects
        const chars = nameElement.querySelectorAll('.char');
        chars.forEach((char, index) => {
            // More dramatic animations for hover
            char.style.transform = `translateZ(${Math.random() * 100}px) 
                                    translateY(${Math.random() * 30 - 15}px) 
                                    rotate(${Math.random() * 20 - 10}deg)`;
            char.style.color = getRandomCyberColor();
            char.style.textShadow = `0 0 20px ${getRandomCyberColor()}`;
            char.style.transition = `all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.05}s`;
        });
        
        // Add hover energy field effect
        document.getElementById('energy-field')?.classList.add('hover');
        
        // Add subtle screen distortion on hover
        const distortion = document.getElementById('reality-distortion');
        if (distortion) {
            distortion.style.opacity = '0.2';
            setTimeout(() => {
                distortion.style.opacity = '0';
            }, 1000);
        }
    });
    
    // Enhanced interactive hover effect - letters move slightly up/down with different colors
    let isHovering = false;
    
    nameElement.addEventListener('mouseenter', function() {
        if (isAnimating) return;
        isHovering = true;
        
        // Play hover sound
        playSound('hover');
        
        // Add hover energy field effect
        document.getElementById('energy-field')?.classList.add('hover');
        
        // Make the name interactive
        nameElement.classList.add('interactive-hover');
        
        // Apply simple up/down offsets and different colors to each letter
        const chars = nameElement.querySelectorAll('.char');
        chars.forEach((char, index) => {
            // Alternating up/down movement
            const direction = index % 2 === 0 ? -1 : 1;
            const offset = 4; // pixels to move up/down
            
            // Assign a unique color to each letter based on its position
            const hue = (index * 50) % 360; // Spread colors around the color wheel
            
            // Apply the effects
            char.style.transform = `translateY(${direction * offset}px)`;
            char.style.color = `hsl(${hue}, 100%, 65%)`;
            char.style.textShadow = `0 0 12px hsl(${hue}, 100%, 60%)`;
            char.style.transition = 'transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease';
        });
    });
    
    nameElement.addEventListener('mousemove', function(e) {
        if (isAnimating || !isHovering) return;
        
        // Get mouse position relative to name element
        const rect = nameElement.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Apply avoidance effect to each character while preserving color and up/down position
        const chars = nameElement.querySelectorAll('.char');
        chars.forEach((char, index) => {
            // Get character position
            const charRect = char.getBoundingClientRect();
            const charX = charRect.left - rect.left + charRect.width / 2;
            const charY = charRect.top - rect.top + charRect.height / 2;
            
            // Calculate distance from mouse to character center
            const deltaX = mouseX - charX;
            const deltaY = mouseY - charY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // Maximum effect radius (px)
            const maxRadius = 100;
            
            if (distance < maxRadius) {
                // Calculate repulsion strength (stronger when closer)
                const repulsionStrength = (1 - distance / maxRadius) * 30;
                
                // Calculate repulsion direction (away from cursor)
                const angleX = -deltaX / distance;
                const angleY = -deltaY / distance;
                
                // Apply transform
                const translateX = angleX * repulsionStrength;
                const translateY = angleY * repulsionStrength;
                
                // Apply repulsion but preserve the original up/down offset
                const direction = index % 2 === 0 ? -1 : 1;
                const offset = 4;
                
                char.style.transform = `translate(${translateX}px, ${translateY + direction * offset}px)`;
            }
        });
    });
    
    nameElement.addEventListener('mouseleave', function() {
        if (isAnimating || isActive) return;
        isHovering = false;
        
        // Reset character positions with staggered timing
        const chars = nameElement.querySelectorAll('.char');
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.style.transform = '';
                char.style.color = '';
                char.style.textShadow = '';
                char.style.transition = `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`;
            }, index * 50);
        });
        
        // Remove hover energy field
        document.getElementById('energy-field')?.classList.remove('hover');
        nameElement.classList.remove('interactive-hover');
    });
    
    nameElement.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Play activation sound - ENHANCED: more intense sound
        playSound('activate');
        playSound('bass-drop');
        
        // EXTREME: Time stop effect before the chaos
        document.body.classList.add('time-stop');
        
        // Add immediate visual feedback on click
        createRealityFractures();
        
        setTimeout(() => {
            document.body.classList.remove('time-stop');
            
            // NEW EFFECTS: Add these before triggering the main insanity
            createFloatingSymbols();
            createDNAHelix();
            createNeuralNetwork();
            createVirtualGrid();
            
            // UNLEASH COMPLETE INSANITY
            triggerInsaneMadness();
            
            // Toggle active state
            isActive = !isActive;
            
            // Deactivate after some time if active
            if (isActive) {
                setTimeout(() => {
                    deactivateRealityWarp();
                    isActive = false;
                    isAnimating = false;
                    
                    // Play deactivation sound
                    playSound('deactivate');
                }, 20000); // Extended duration for the madness
            }
        }, 500);
    });
    
    // Animation frame for continuous effects
    function animate() {
        if (isActive) {
            distortionTime += 0.01;
            applyDistortionEffects(distortionTime);
            generateParticles(30); // ENHANCED: way more particles
            updateVortexLines();
            createLightningBolts();
            updateHolographicEffects();
            updateMatrixRain();
            spawnFractalExplosions();
        }
        requestAnimationFrame(animate);
    }
    
    // Start animation loop
    animate();
});

// EXTREME: Create multiple portal layers for insane visual effect
function createPortalElements() {
    const portalContainer = document.createElement('div');
    portalContainer.className = 'portal-container';
    portalContainer.id = 'portal-container';
    
    const portal = document.createElement('div');
    portal.className = 'portal';
    portal.id = 'reality-portal';
    
    // Create portal rings
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        ring.className = 'portal-ring';
        portal.appendChild(ring);
    }
    
    // Create portal core
    const core = document.createElement('div');
    core.className = 'portal-core';
    portal.appendChild(core);
    
    // Add the vortex lines
    for (let i = 0; i < 36; i++) {
        const line = document.createElement('div');
        line.className = 'vortex-line';
        line.style.transform = `rotate(${i * 10}deg)`;
        line.style.animationDelay = `${i * 0.1}s`;
        portal.appendChild(line);
    }
    
    // Particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.id = 'particles-container';
    
    // Reality distortion filter
    const distortion = document.createElement('div');
    distortion.className = 'reality-distortion';
    distortion.id = 'reality-distortion';
    
    // Add to DOM
    portalContainer.appendChild(portal);
    document.body.appendChild(portalContainer);
    document.body.appendChild(particlesContainer);
    document.body.appendChild(distortion);
    
    // ENHANCED: Add multiple concentric portals for more depth
    for (let i = 0; i < 5; i++) {
        const additionalRing = document.createElement('div');
        additionalRing.className = 'portal-ring advanced-ring';
        additionalRing.style.animationDelay = `${i * 0.2}s`;
        additionalRing.style.zIndex = 5 - i;
        portal.appendChild(additionalRing);
    }
    
    // ENHANCED: Add dimensional rift effect
    const dimensionalRift = document.createElement('div');
    dimensionalRift.className = 'dimensional-rift';
    dimensionalRift.id = 'dimensional-rift';
    portal.appendChild(dimensionalRift);
    
    // ENHANCED: Add shockwave container
    const shockwaveContainer = document.createElement('div');
    shockwaveContainer.className = 'shockwave-container';
    shockwaveContainer.id = 'shockwave-container';
    
    // ENHANCED: Add fractal container
    const fractalContainer = document.createElement('div');
    fractalContainer.className = 'fractal-container';
    fractalContainer.id = 'fractal-container';
    
    // ENHANCED: Add lightning container
    const lightningContainer = document.createElement('div');
    lightningContainer.className = 'lightning-container';
    lightningContainer.id = 'lightning-container';
    
    // ENHANCED: Add hologram projections
    const hologramContainer = document.createElement('div');
    hologramContainer.className = 'hologram-container';
    hologramContainer.id = 'hologram-container';
    
    // ENHANCED: Add 3D objects flying around
    const objectsContainer = document.createElement('div');
    objectsContainer.className = 'flying-objects-container';
    objectsContainer.id = 'flying-objects';
    
    // Add to DOM
    document.body.appendChild(shockwaveContainer);
    document.body.appendChild(fractalContainer);
    document.body.appendChild(lightningContainer);
    document.body.appendChild(hologramContainer);
    document.body.appendChild(objectsContainer);
}

// Create Matrix rain effect - Fix to make it more reliable
function createMatrixRain() {
    // Check if matrix container already exists first
    let matrixContainer = document.getElementById('matrix-container');
    
    // Create it if needed
    if (!matrixContainer) {
        matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-container';
        matrixContainer.id = 'matrix-container';
        document.body.appendChild(matrixContainer);
    }
    
    // Set correct initial styles
    matrixContainer.style.position = 'fixed';
    matrixContainer.style.top = '0';
    matrixContainer.style.left = '0';
    matrixContainer.style.width = '100%';
    matrixContainer.style.height = '100%';
    matrixContainer.style.zIndex = '9990';
    matrixContainer.style.pointerEvents = 'none';
    matrixContainer.style.opacity = '0';
    
    // Initialize matrix rain with a slight delay to ensure DOM is ready
    setTimeout(() => {
        if (typeof initializeMatrixRain === 'function') {
            initializeMatrixRain(matrixContainer);
            console.log("Matrix rain initialized successfully");
        } else {
            console.error("Matrix rain function not available");
        }
    }, 100);
}

// Create energy field
function createEnergyField() {
    const energyField = document.createElement('div');
    energyField.className = 'energy-field';
    energyField.id = 'energy-field';
    
    // Create energy particles
    for (let i = 0; i < 50; i++) {
        const energyParticle = document.createElement('div');
        energyParticle.className = 'energy-particle';
        energyParticle.style.setProperty('--delay', `${Math.random() * 2}s`);
        energyParticle.style.setProperty('--duration', `${Math.random() * 2 + 1}s`);
        energyField.appendChild(energyParticle);
    }
    
    document.body.appendChild(energyField);
}

// ENHANCED: Audio effects with more dramatic sounds
function createAudioEffects() {
    const audioElements = {
        hover: 'https://assets.codepen.io/635/hover.mp3',
        activate: 'https://assets.codepen.io/635/warp-activate.mp3',
        ambient: 'https://assets.codepen.io/635/portal-ambient.mp3',
        deactivate: 'https://assets.codepen.io/635/warp-down.mp3',
        // ENHANCED: More dramatic sounds
        'bass-drop': 'https://assets.codepen.io/635/bass-drop.mp3',
        'reality-break': 'https://assets.codepen.io/635/glass-break.mp3',
        'energy-pulse': 'https://assets.codepen.io/635/energy-pulse.mp3',
        'dimension-tear': 'https://assets.codepen.io/635/tear.mp3',
        'thunder': 'https://assets.codepen.io/635/thunder.mp3'
    };
    
    const audioContainer = document.createElement('div');
    audioContainer.style.display = 'none';
    
    for (const [id, src] of Object.entries(audioElements)) {
        const audio = document.createElement('audio');
        audio.id = `audio-${id}`;
        audio.src = src;
        audio.preload = 'auto';
        audioContainer.appendChild(audio);
    }
    
    document.body.appendChild(audioContainer);
}

// Play a sound effect
function playSound(type) {
    const audio = document.getElementById(`audio-${type}`);
    if (!audio) return;
    
    audio.currentTime = 0;
    
    if (type === 'ambient') {
        audio.loop = true;
    }
    
    audio.play().catch(e => console.log("Audio play failed:", e));
}

// Stop a sound effect
function stopSound(type) {
    const audio = document.getElementById(`audio-${type}`);
    if (!audio) return;
    
    audio.pause();
    audio.currentTime = 0;
}

// Trigger the full reality warp effect
function triggerRealityWarp() {
    // Activate name effect
    const nameElement = document.querySelector('.reality-warp');
    if (nameElement) {
        nameElement.classList.add('active');
    }
    
    // Activate portal
    const portal = document.getElementById('reality-portal');
    const portalContainer = document.getElementById('portal-container');
    if (portal && portalContainer) {
        portalContainer.classList.add('active');
        portal.classList.add('active');
    }
    
    // Activate distortion
    const distortion = document.getElementById('reality-distortion');
    if (distortion) {
        distortion.classList.add('active');
    }
    
    // Play ambient sound
    playSound('ambient');
    
    // Shake the screen slightly
    document.body.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// Deactivate the reality warp effect
function deactivateRealityWarp() {
    // Deactivate name effect
    const nameElement = document.querySelector('.reality-warp');
    if (nameElement) {
        nameElement.classList.remove('active');
    }
    
    // Deactivate portal
    const portal = document.getElementById('reality-portal');
    const portalContainer = document.getElementById('portal-container');
    if (portal && portalContainer) {
        portal.classList.remove('active');
        setTimeout(() => {
            portalContainer.classList.remove('active');
        }, 1000);
    }
    
    // Deactivate distortion
    const distortion = document.getElementById('reality-distortion');
    if (distortion) {
        distortion.classList.remove('active');
    }
    
    // Stop ambient sound
    stopSound('ambient');
}

// Generate particles for the effect
function generateParticles() {
    if (Math.random() > 0.2) return;
    
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position around the portal
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 200;
    const x = Math.cos(angle) * distance + window.innerWidth / 2;
    const y = Math.sin(angle) * distance + window.innerHeight / 2;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${Math.random() * 4 + 1}px`;
    particle.style.height = particle.style.width;
    
    // Add particle to DOM
    container.appendChild(particle);
    
    // Remove after animation completes
    setTimeout(() => {
        if (container.contains(particle)) {
            container.removeChild(particle);
        }
    }, 3000);
}

// Update the vortex lines appearance
function updateVortexLines() {
    const lines = document.querySelectorAll('.vortex-line');
    lines.forEach(line => {
        if (Math.random() > 0.95) {
            line.style.opacity = (Math.random() * 0.5 + 0.3).toFixed(2);
            line.style.height = `${Math.random() * 2 + 1}px`;
        }
    });
}

// EXTREME: Trigger complete insanity mode
function triggerInsaneMadness() {
    // Play EXTREME sounds with layered audio
    playSound('reality-break');
    playSound('dimension-tear');
    setTimeout(() => playSound('thunder'), 300);
    setTimeout(() => playSound('bass-drop'), 600);
    setTimeout(() => playSound('ambient'), 800);
    
    // Activate name effect with MORE EXTREME animations
    const nameElement = document.querySelector('.reality-warp');
    if (nameElement) {
        nameElement.classList.add('active');
        nameElement.classList.add('extreme');
        
        // SUPER EXTREME: Letters going absolutely ballistic
        const chars = nameElement.querySelectorAll('.char');
        chars.forEach((char, i) => {
            char.style.animation = `
                charMegaExplode 0.7s forwards,
                charWildFloat 2s infinite ${i * 0.1}s,
                charIntenseGlow 1.5s infinite ${i * 0.15}s alternate
            `;
            char.style.display = 'inline-block';
            // Add 3D transform effect for depth
            char.style.textShadow = `0 0 20px ${getRandomCyberColor()}, 0 0 40px ${getRandomCyberColor()}`;
            char.style.transform = `translateZ(${Math.random() * 500}px) rotateY(${Math.random() * 1080}deg)`;
        });
    }
    
    // SUPER EXTREME screen shake
    document.body.classList.add('mega-shake');
    setTimeout(() => document.body.classList.remove('mega-shake'), 1500);
    
    // Portal and distortion effects at maximum intensity
    const portal = document.getElementById('reality-portal');
    const portalContainer = document.getElementById('portal-container');
    const distortion = document.getElementById('reality-distortion');
    
    if (portal && portalContainer) {
        portalContainer.classList.add('active', 'extreme', 'maximum-overload');
        portal.classList.add('active', 'extreme', 'maximum-overload');
        
        // EXTREME: Trigger dimensional rift with intensity
        const dimRift = document.getElementById('dimensional-rift');
        if (dimRift) {
            dimRift.classList.add('active', 'maximum-overload');
            dimRift.style.transform = 'scale(2)';
        }
    }
    
    if (distortion) {
        distortion.classList.add('active', 'extreme', 'maximum-overload');
        distortion.style.mixBlendMode = 'screen';
    }
    
    // Generate TONS of particles instantly
    for (let i = 0; i < 300; i++) {
        setTimeout(() => generateParticles(50), i * 10);
    }
    
    // EXTREME: Activate matrix rain with higher density
    const matrixContainer = document.getElementById('matrix-container');
    if (matrixContainer) {
        matrixContainer.classList.add('active');
        matrixContainer.style.opacity = '0.9';  // Higher opacity
        console.log("Matrix rain activated");
    } else {
        console.error("Matrix container not found");
        createMatrixRain();
        setTimeout(() => {
            const newContainer = document.getElementById('matrix-container');
            if (newContainer) {
                newContainer.classList.add('active');
                newContainer.style.opacity = '0.9';
            }
        }, 200);
    }
    
    // Generate multiple shockwaves in sequence
    for (let i = 0; i < 5; i++) {
        setTimeout(createShockwave, i * 300);
    }
    
    // Launch MORE flying objects
    launchFlyingObjects(60); // Double the objects
    
    // Make the browser window shake (safely)
    if (window.navigator.vibrate) {
        try {
            window.navigator.vibrate([300, 100, 300, 100, 300]);
        } catch (e) {
            console.log("Vibration not supported");
        }
    }
    
    // EXTREME color shifting of the entire page
    document.body.style.animation = 'colorShift 2s infinite alternate';
    
    // EXTREME: Page elements wild distortion
    distortPageElements(true); // Pass true for more intense distortion
    
    // EXTREME: Start holographic projections with more intensity
    startHolographicProjections(10); // More projections
    
    // Create massive lightning storm
    createMassiveLightningStorm();
}

// Launch 3D objects flying across screen with more objects
function launchFlyingObjects(totalObjects = 30) {
    const objectsContainer = document.getElementById('flying-objects');
    if (!objectsContainer) return;
    
    const objectTypes = ['cube', 'pyramid', 'sphere', 'ring', 'diamond'];
    
    for (let i = 0; i < totalObjects; i++) {
        setTimeout(() => {
            const obj = document.createElement('div');
            const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
            obj.className = `flying-object ${type}`;
            
            // Random starting position outside the viewport
            const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
            let startX, startY, endX, endY;
            
            // Set positions based on side
            switch (side) {
                case 0: // top
                    startX = Math.random() * window.innerWidth;
                    startY = -100;
                    endX = Math.random() * window.innerWidth;
                    endY = window.innerHeight + 100;
                    break;
                case 1: // right
                    startX = window.innerWidth + 100;
                    startY = Math.random() * window.innerHeight;
                    endX = -100;
                    endY = Math.random() * window.innerHeight;
                    break;
                case 2: // bottom
                    startX = Math.random() * window.innerWidth;
                    startY = window.innerHeight + 100;
                    endX = Math.random() * window.innerWidth;
                    endY = -100;
                    break;
                case 3: // left
                    startX = -100;
                    startY = Math.random() * window.innerHeight;
                    endX = window.innerWidth + 100;
                    endY = Math.random() * window.innerHeight;
                    break;
            }
            
            // Apply styles
            obj.style.left = `${startX}px`;
            obj.style.top = `${startY}px`;
            obj.style.setProperty('--end-x', `${endX}px`);
            obj.style.setProperty('--end-y', `${endY}px`);
            obj.style.setProperty('--rotation-x', `${Math.random() * 1440}deg`);
            obj.style.setProperty('--rotation-y', `${Math.random() * 1440}deg`);
            obj.style.setProperty('--rotation-z', `${Math.random() * 1440}deg`);
            obj.style.setProperty('--duration', `${Math.random() * 4 + 2}s`);
            obj.style.setProperty('--delay', `${Math.random() * 2}s`);
            obj.style.setProperty('--size', `${Math.random() * 80 + 30}px`); // Bigger objects
            obj.style.setProperty('--color', getRandomCyberColor());
            
            objectsContainer.appendChild(obj);
            
            // Remove after animation
            setTimeout(() => {
                if (objectsContainer.contains(obj)) {
                    objectsContainer.removeChild(obj);
                }
            }, 6000);
        }, i * 50); // Faster spawn rate
    }
}

// Create a massive lightning storm
function createMassiveLightningStorm() {
    const container = document.getElementById('lightning-container');
    if (!container) return;
    
    // Create 20 lightning bolts in rapid succession
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            for (let j = 0; j < 3; j++) { // 3 bolts at once
                const lightning = document.createElement('div');
                lightning.className = 'lightning massive';
                
                // Random position
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight * 0.3; // Top third of screen
                
                // Random angle downward
                const angle = Math.random() * 60 - 30; // -30 to 30 degrees
                const length = 300 + Math.random() * 500; // Longer bolts
                
                lightning.style.top = `${startY}px`;
                lightning.style.left = `${startX}px`;
                lightning.style.width = `${length}px`;
                lightning.style.transform = `rotate(${angle + 90}deg)`; // Point downward
                
                // Create zigzag path using SVG for more realistic lightning
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '100%');
                
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                let d = `M0,0 `;
                
                const segments = 12; // More segments
                const segmentLength = length / segments;
                
                for (let k = 1; k <= segments; k++) {
                    const x = k * segmentLength;
                    const y = (Math.random() - 0.5) * 30; // Wider zigzag
                    d += `L${x},${y} `;
                }
                
                path.setAttribute('d', d);
                path.setAttribute('stroke', '#00ffff'); // Cyan color
                path.setAttribute('stroke-width', '5'); // Thicker stroke
                path.setAttribute('filter', 'drop-shadow(0 0 10px #00ffff)'); // Glow effect
                path.setAttribute('fill', 'none');
                
                svg.appendChild(path);
                lightning.appendChild(svg);
                container.appendChild(lightning);
                
                // Remove after animation
                setTimeout(() => {
                    if (container.contains(lightning)) {
                        container.removeChild(lightning);
                    }
                }, 300); // Slightly longer duration
            }
        }, i * 200); // Staggered timing
    }
}

// Distort page elements with more intensity option
function distortPageElements(intense = false) {
    // Get all major elements
    const elements = document.querySelectorAll('.container, .cyber-panel, section, .terminal-container');
    
    elements.forEach(el => {
        if (Math.random() > 0.4) { // More elements affected
            el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
            
            // More extreme transformations if intense mode
            const zDistance = intense ? Math.random() * 100 : Math.random() * 50;
            const rotateX = intense ? Math.random() * 25 - 12.5 : Math.random() * 10 - 5;
            const rotateY = intense ? Math.random() * 25 - 12.5 : Math.random() * 10 - 5;
            const scale = intense ? 0.9 + Math.random() * 0.3 : 0.95 + Math.random() * 0.1;
            
            el.style.transform = `
                perspective(1000px)
                translateZ(${zDistance}px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
            
            // Add color shifting if intense
            if (intense) {
                el.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            }
            
            // Restore later
            setTimeout(() => {
                el.style.transform = '';
                el.style.filter = '';
            }, 1500 + Math.random() * 2000);
        }
    });
    
    // Schedule more distortions
    if (document.querySelector('.reality-warp.active.extreme')) {
        setTimeout(() => distortPageElements(intense), Math.random() * 1000 + 500);
    }
}

// Add these new styles to your CSS
const styleElement = document.createElement('style');
styleElement.innerHTML = `
    @keyframes charMegaExplode {
        0% { transform: translateZ(0) rotateY(0) scale(1); opacity: 1; }
        50% { transform: translateZ(600px) rotateY(720deg) scale(3); opacity: 0.8; }
        75% { transform: translateZ(300px) rotateY(360deg) scale(2); opacity: 0.9; }
        100% { transform: translateZ(80px) rotateY(0) scale(1.2); opacity: 1; }
    }
    
    @keyframes charWildFloat {
        0%, 100% { transform: translateZ(80px) translateY(0) rotate(0); color: var(--light-green); }
        25% { transform: translateZ(250px) translateY(-60px) rotateX(360deg) rotateY(180deg); color: #ff00ff; }
        50% { transform: translateZ(-120px) translateY(100px) rotateX(180deg) rotateZ(-360deg); color: #ffff00; }
        75% { transform: translateZ(180px) translateY(-30px) rotateZ(540deg) scale(1.8); color: #00ffff; }
    }
    
    @keyframes charIntenseGlow {
        0% { text-shadow: 0 0 20px var(--light-green), 0 0 30px var(--light-green); }
        50% { text-shadow: 0 0 40px #ff00ff, 0 0 80px #ff00ff, 0 0 120px #ff00ff; }
        100% { text-shadow: 0 0 50px var(--highlight-green), 0 0 100px var(--highlight-green), 0 0 150px var(--highlight-green); }
    }
    
    @keyframes colorShift {
        0% { filter: hue-rotate(0deg) brightness(1.2); }
        50% { filter: hue-rotate(180deg) brightness(1.5); }
        100% { filter: hue-rotate(360deg) brightness(1.2); }
    }
    
    .mega-shake {
        animation: megaShake 0.8s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    @keyframes megaShake {
        0%, 100% { transform: translate3d(0, 0, 0); }
        10%, 30%, 50%, 70%, 90% { transform: translate3d(-15px, -8px, 0) rotate(-2deg); }
        20%, 40%, 60%, 80% { transform: translate3d(15px, 8px, 0) rotate(2deg); }
    }
    
    .lightning.massive {
        height: 6px !important;
        opacity: 1 !important;
        z-index: 9996 !important;
    }
    
    .maximum-overload {
        animation: overload-pulse 0.5s infinite alternate !important;
    }
    
    @keyframes overload-pulse {
        0% { filter: brightness(1) contrast(1.2); }
        100% { filter: brightness(1.5) contrast(1.5) saturate(1.5); }
    }
`;
document.head.appendChild(styleElement);

// Create reality fractures - cracks in the fabric of reality
function createRealityFractures() {
    // Create container if it doesn't exist
    let container = document.getElementById('fracture-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'fracture-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9995';
        document.body.appendChild(container);
    }
    
    // Create the source point based on the name position
    const nameElement = document.querySelector('.cyber-glitch.interactive-glitch');
    const rect = nameElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create 8-12 cracks spreading out from the name
    const numCracks = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numCracks; i++) {
        // Create a crack element
        const crack = document.createElement('div');
        crack.className = 'reality-crack';
        
        // Calculate angle for this crack
        const angle = (i / numCracks) * 2 * Math.PI;
        
        // Set starting position at the name
        crack.style.position = 'absolute';
        crack.style.top = `${centerY}px`;
        crack.style.left = `${centerX}px`;
        crack.style.width = '0';
        crack.style.height = '3px';
        crack.style.backgroundColor = '#ffffff';
        crack.style.boxShadow = '0 0 15px 2px #00ffff, 0 0 30px 5px rgba(0, 255, 255, 0.5)';
        crack.style.transformOrigin = 'left center';
        crack.style.transform = `rotate(${angle}rad)`;
        crack.style.opacity = '0.9';
        crack.style.borderRadius = '2px';
        crack.style.zIndex = '9995';
        
        // Add to container
        container.appendChild(crack);
        
        // Animate crack spreading
        const length = 150 + Math.random() * 250;
        const duration = 300 + Math.random() * 200;
        const segments = 3 + Math.floor(Math.random() * 3);
        
        // Create segments with slight variations in angle
        let currentLength = 0;
        let currentAngle = angle;
        
        for (let j = 0; j < segments; j++) {
            const segmentLength = length / segments;
            
            // Add a small random angle change for each segment
            currentAngle += (Math.random() * 0.5 - 0.25);
            
            setTimeout(() => {
                // Create a new crack segment
                const segment = document.createElement('div');
                segment.className = 'reality-crack-segment';
                segment.style.position = 'absolute';
                segment.style.top = `${centerY + Math.sin(currentAngle) * currentLength}px`;
                segment.style.left = `${centerX + Math.cos(currentAngle) * currentLength}px`;
                segment.style.width = '0';
                segment.style.height = '2px';
                segment.style.backgroundColor = '#ffffff';
                segment.style.boxShadow = '0 0 10px 1px #00ffff, 0 0 20px 3px rgba(0, 255, 255, 0.5)';
                segment.style.transformOrigin = 'left center';
                segment.style.transform = `rotate(${currentAngle}rad)`;
                segment.style.opacity = '0.8';
                segment.style.zIndex = '9995';
                
                container.appendChild(segment);
                
                // Animate this segment growing
                segment.animate([
                    { width: '0' },
                    { width: `${segmentLength}px` }
                ], {
                    duration: duration / segments,
                    fill: 'forwards',
                    easing: 'cubic-bezier(0.6, 0, 0.4, 1)'
                });
                
                // Remove segment after effect completes
                setTimeout(() => {
                    if (container.contains(segment)) {
                        container.removeChild(segment);
                    }
                }, 1500);
                
                // Update current length for next segment positioning
                currentLength += segmentLength;
                
            }, j * (duration / segments));
        }
        
        // Remove crack after effect completes
        setTimeout(() => {
            if (container.contains(crack)) {
                container.removeChild(crack);
            }
        }, 1500);
    }
}

// Create floating symbols that explode outward from the name
function createFloatingSymbols() {
    // Create container if it doesn't exist
    let container = document.getElementById('symbols-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'symbols-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9994';
        document.body.appendChild(container);
    }
    
    // Get the name position
    const nameElement = document.querySelector('.cyber-glitch.interactive-glitch');
    const rect = nameElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Define sets of symbols to use
    const mathSymbols = '∫∮∑∏√∛∜∝∞∟∠∡∢∴∵∶∷≈≉≠≡≤≥⊂⊃⊆⊇⊕⊗';
    const greekSymbols = 'αβγδεζηθικλμνξοπρστυφχψω';
    const dataSymbols = '⌬⌘⌗⌁⌂⌑⌖⌌⌍⌎⌏⌐⌙⌚⌛⌠⌡';
    const codeSymbols = '{}[]()<>*&^%$#@!|\\/"\'+-=;:,.?';
    const binaryDigits = '01';
    
    // All symbols combined
    const symbolSets = [mathSymbols, greekSymbols, dataSymbols, codeSymbols, binaryDigits];
    
    // Create many symbols (75-150)
    const numSymbols = 75 + Math.floor(Math.random() * 75);
    
    for (let i = 0; i < numSymbols; i++) {
        // Choose a random symbol set and symbol
        const symbolSet = symbolSets[Math.floor(Math.random() * symbolSets.length)];
        const symbol = symbolSet[Math.floor(Math.random() * symbolSet.length)];
        
        // Create symbol element
        const symbolElement = document.createElement('div');
        symbolElement.className = 'floating-symbol';
        symbolElement.textContent = symbol;
        
        // Style the symbol
        symbolElement.style.position = 'absolute';
        symbolElement.style.top = `${centerY}px`;
        symbolElement.style.left = `${centerX}px`;
        symbolElement.style.color = getRandomCyberColor();
        symbolElement.style.fontSize = `${16 + Math.random() * 20}px`;
        symbolElement.style.fontWeight = 'bold';
        symbolElement.style.textShadow = `0 0 10px ${getRandomCyberColor()}`;
        symbolElement.style.opacity = '0.9';
        symbolElement.style.zIndex = '9994';
        
        // Add to container
        container.appendChild(symbolElement);
        
        // Calculate random trajectory
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 300;
        const duration = 1000 + Math.random() * 2000;
        
        // Animate the symbol flying outward
        symbolElement.animate([
            { 
                top: `${centerY}px`,
                left: `${centerX}px`,
                opacity: 1,
                transform: 'scale(0.2) rotate(0deg)'
            },
            { 
                top: `${centerY + Math.sin(angle) * distance}px`,
                left: `${centerX + Math.cos(angle) * distance}px`,
                opacity: 0,
                transform: `scale(1.5) rotate(${Math.random() * 720 - 360}deg)`
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            fill: 'forwards'
        });
        
        // Remove symbol after animation
        setTimeout(() => {
            if (container.contains(symbolElement)) {
                container.removeChild(symbolElement);
            }
        }, duration);
    }
}

// Create DNA double helix effect around the name
function createDNAHelix() {
    // Create container if it doesn't exist
    let container = document.getElementById('dna-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'dna-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9993';
        document.body.appendChild(container);
    }
    
    // Get the name position
    const nameElement = document.querySelector('.cyber-glitch.interactive-glitch');
    const rect = nameElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create DNA container
    const dnaElement = document.createElement('div');
    dnaElement.className = 'dna-helix';
    dnaElement.style.position = 'absolute';
    dnaElement.style.top = `${centerY - 120}px`;
    dnaElement.style.left = `${centerX - 50}px`;
    dnaElement.style.width = '100px';
    dnaElement.style.height = '240px';
    dnaElement.style.transformStyle = 'preserve-3d';
    dnaElement.style.perspective = '1000px';
    dnaElement.style.zIndex = '9993';
    
    container.appendChild(dnaElement);
    
    // Create two strands with base pairs
    const numPairs = 15;
    const baseColors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff9d'];
    
    // Create strands
    for (let strand = 0; strand < 2; strand++) {
        for (let i = 0; i < numPairs; i++) {
            // Create a node on the strand
            const node = document.createElement('div');
            node.className = 'dna-node';
            
            // Style the node
            node.style.position = 'absolute';
            node.style.width = '12px';
            node.style.height = '12px';
            node.style.borderRadius = '50%';
            node.style.backgroundColor = getRandomCyberColor();
            node.style.boxShadow = `0 0 8px ${getRandomCyberColor()}`;
            
            // Position based on strand and height
            const heightPercent = i / (numPairs - 1);
            const angleOffset = strand === 0 ? 0 : Math.PI;
            const twistAmount = 4 * Math.PI; // How many twists in the helix
            const angle = heightPercent * twistAmount + angleOffset;
            
            const radius = 40;
            const offsetX = Math.cos(angle) * radius;
            const posY = heightPercent * 240;
            
            node.style.left = `${50 + offsetX}px`;
            node.style.top = `${posY}px`;
            
            dnaElement.appendChild(node);
            
            // Create base pair connector if this is the first strand
            if (strand === 0) {
                const baseConnect = document.createElement('div');
                baseConnect.className = 'dna-base';
                
                // Style the base connector
                baseConnect.style.position = 'absolute';
                baseConnect.style.width = `${2 * radius}px`;
                baseConnect.style.height = '4px';
                baseConnect.style.backgroundColor = baseColors[i % baseColors.length];
                baseConnect.style.boxShadow = `0 0 5px ${baseColors[i % baseColors.length]}`;
                baseConnect.style.left = `${50 - radius + offsetX / 2}px`;
                baseConnect.style.top = `${posY + 4}px`;
                baseConnect.style.transformOrigin = 'center';
                baseConnect.style.transform = `rotate(${angle}rad)`;
                
                dnaElement.appendChild(baseConnect);
            }
        }
    }
    
    // Animate the DNA helix
    dnaElement.animate([
        { opacity: 0, transform: 'scale(0) rotateY(0deg)' },
        { opacity: 1, transform: 'scale(1) rotateY(360deg)' }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        fill: 'forwards'
    });
    
    // Make the DNA rotate
    let rotation = 0;
    const rotateInterval = setInterval(() => {
        dnaElement.style.transform = `rotateY(${rotation}deg)`;
        rotation += 2;
        
        // Stop the rotation when the effect should end
        if (rotation > 720) {
            clearInterval(rotateInterval);
            
            // Fade out and remove
            dnaElement.animate([
                { opacity: 1, transform: `rotateY(${rotation}deg) scale(1)` },
                { opacity: 0, transform: `rotateY(${rotation + 180}deg) scale(0)` }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                fill: 'forwards'
            });
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (container.contains(dnaElement)) {
                    container.removeChild(dnaElement);
                }
            }, 1000);
        }
    }, 16);
}

// Create neural network visualization radiating from the name
function createNeuralNetwork() {
    // Create container if it doesn't exist
    let container = document.getElementById('neural-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'neural-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9992';
        document.body.appendChild(container);
    }
    
    // Get the name position
    const nameElement = document.querySelector('.cyber-glitch.interactive-glitch');
    const rect = nameElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create neurons and connections
    const neurons = [];
    const numNeurons = 40;
    
    // Create the nodes (neurons)
    for (let i = 0; i < numNeurons; i++) {
        // Calculate position - start from center and expand out
        let x, y;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 300 + 50;
        
        x = centerX + Math.cos(angle) * distance;
        y = centerY + Math.sin(angle) * distance;
        
        // Create neuron element
        const neuron = document.createElement('div');
        neuron.className = 'neural-node';
        
        // Style the neuron
        neuron.style.position = 'absolute';
        neuron.style.width = '8px';
        neuron.style.height = '8px';
        neuron.style.borderRadius = '50%';
        neuron.style.backgroundColor = '#00ffff';
        neuron.style.boxShadow = '0 0 10px #00ffff';
        neuron.style.top = `${y}px`;
        neuron.style.left = `${x}px`;
        neuron.style.opacity = '0';
        
        // Add to container and track
        container.appendChild(neuron);
        neurons.push({
            element: neuron,
            x: x,
            y: y
        });
        
        // Animate the neuron appearing
        neuron.animate([
            { opacity: 0, transform: 'scale(0.3)' },
            { opacity: 1, transform: 'scale(1)' }
        ], {
            duration: 500,
            delay: i * 50,
            fill: 'forwards',
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
        });
    }
    
    // Create connections between neurons
    setTimeout(() => {
        // Each neuron connects to a few others
        for (let i = 0; i < neurons.length; i++) {
            // Connect to 2-4 other neurons
            const connectionsCount = 2 + Math.floor(Math.random() * 3);
            
            for (let j = 0; j < connectionsCount; j++) {
                // Select a random neuron to connect to
                const targetIndex = Math.floor(Math.random() * neurons.length);
                if (targetIndex !== i) { // Don't connect to self
                    const start = neurons[i];
                    const end = neurons[targetIndex];
                    
                    // Create connection line
                    const connection = document.createElement('div');
                    connection.className = 'neural-connection';
                    
                    // Calculate position and rotation
                    const deltaX = end.x - start.x;
                    const deltaY = end.y - start.y;
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    const angle = Math.atan2(deltaY, deltaX);
                    
                    // Style the connection
                    connection.style.position = 'absolute';
                    connection.style.width = `${distance}px`;
                    connection.style.height = '2px';
                    connection.style.backgroundColor = '#00ffff';
                    connection.style.opacity = '0';
                    connection.style.top = `${start.y + 4}px`;
                    connection.style.left = `${start.x + 4}px`;
                    connection.style.transformOrigin = 'left center';
                    connection.style.transform = `rotate(${angle}rad)`;
                    
                    container.appendChild(connection);
                    
                    // Animate connection forming
                    connection.animate([
                        { opacity: 0, width: '0px' },
                        { opacity: 0.5, width: `${distance}px` }
                    ], {
                        duration: 500,
                        fill: 'forwards',
                        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
                    });
                    
                    // Animate data pulse along connection (repeating)
                    const pulse = document.createElement('div');
                    pulse.className = 'neural-pulse';
                    
                    // Style the pulse
                    pulse.style.position = 'absolute';
                    pulse.style.width = '8px';
                    pulse.style.height = '8px';
                    pulse.style.borderRadius = '50%';
                    pulse.style.backgroundColor = '#ffffff';
                    pulse.style.boxShadow = '0 0 15px 5px rgba(255, 255, 255, 0.8)';
                    pulse.style.top = `-3px`;
                    pulse.style.left = `0px`;
                    
                    connection.appendChild(pulse);
                    
                    // Animate pulse traveling
                    pulse.animate([
                        { left: '0px' },
                        { left: `${distance - 8}px` }
                    ], {
                        duration: 1000 + Math.random() * 1000,
                        iterations: 3,
                        easing: 'linear'
                    });
                }
            }
        }
    }, numNeurons * 50);
    
    // Fade out and remove the neural network after a while
    setTimeout(() => {
        const elements = container.querySelectorAll('div');
        elements.forEach(element => {
            element.animate([
                { opacity: element.style.opacity || '1' },
                { opacity: '0' }
            ], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-out'
            });
        });
        
        // Clear the container after fade out
        setTimeout(() => {
            container.innerHTML = '';
        }, 1000);
    }, 5000);
}

// Create virtual grid/matrix effect
function createVirtualGrid() {
    // Create container if it doesn't exist
    let container = document.getElementById('grid-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'grid-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9991';
        document.body.appendChild(container);
    }
    
    // Get name position as the origin
    const nameElement = document.querySelector('.cyber-glitch.interactive-glitch');
    const rect = nameElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create SVG element for grid lines
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.opacity = "0";
    
    container.appendChild(svg);
    
    // Create expanding grid
    const gridSize = 50; // Size of grid cells
    const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.5;
    const totalCircles = Math.ceil(maxRadius / gridSize);
    
    // Create concentric circles
    for (let i = 1; i <= totalCircles; i++) {
        const radius = i * gridSize;
        
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", centerX);
        circle.setAttribute("cy", centerY);
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "#00ffff");
        circle.setAttribute("stroke-width", "1");
        circle.setAttribute("stroke-opacity", "0.3");
        
        svg.appendChild(circle);
    }
    
    // Create radial lines
    const numLines = 36; // Every 10 degrees
    
    for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const endX = centerX + Math.cos(angle) * maxRadius;
        const endY = centerY + Math.sin(angle) * maxRadius;
        
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", centerX);
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", endX);
        line.setAttribute("y2", endY);
        line.setAttribute("stroke", "#00ffff");
        line.setAttribute("stroke-width", "1");
        line.setAttribute("stroke-opacity", "0.3");
        
        svg.appendChild(line);
    }
    
    // Animate grid expanding 
    svg.animate([
        { opacity: 0, transform: 'scale(0.1)' },
        { opacity: 0.8, transform: 'scale(1)' }
    ], {
        duration: 1500,
        fill: 'forwards',
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
    });
    
    // Create grid intersection points with data
    setTimeout(() => {
        // Create data points at some intersections
        const numDataPoints = 50;
        const pointsArray = [];
        
        for (let i = 0; i < numDataPoints; i++) {
            // Pick a random circle and line
            const circleIndex = 1 + Math.floor(Math.random() * (totalCircles - 1));
            const lineIndex = Math.floor(Math.random() * numLines);
            
            // Calculate position
            const radius = circleIndex * gridSize;
            const angle = (lineIndex / numLines) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Create data point element
            const dataPoint = document.createElement('div');
            dataPoint.className = 'grid-data-point';
            
            // Style the data point
            dataPoint.style.position = 'absolute';
            dataPoint.style.width = '6px';
            dataPoint.style.height = '6px';
            dataPoint.style.borderRadius = '50%';
            dataPoint.style.backgroundColor = getRandomCyberColor();
            dataPoint.style.boxShadow = `0 0 8px ${getRandomCyberColor()}`;
            dataPoint.style.top = `${y - 3}px`;
            dataPoint.style.left = `${x - 3}px`;
            dataPoint.style.opacity = '0';
            dataPoint.style.zIndex = '9992';
            
            container.appendChild(dataPoint);
            pointsArray.push(dataPoint);
            
            // Animate data point appearing
            dataPoint.animate([
                { opacity: 0, transform: 'scale(0)' },
                { opacity: 1, transform: 'scale(1.5)' },
                { opacity: 1, transform: 'scale(1)' }
            ], {
                duration: 500,
                delay: i * 30,
                fill: 'forwards',
                easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
            });
        }
        
        // After all points appear, create connections between some of them
        setTimeout(() => {
            // Create 20-30 connections
            const numConnections = 20 + Math.floor(Math.random() * 11);
            
            for (let i = 0; i < numConnections; i++) {
                // Pick two random points
                const point1 = Math.floor(Math.random() * pointsArray.length);
                let point2 = Math.floor(Math.random() * pointsArray.length);
                // Ensure we pick two different points
                while (point2 === point1) {
                    point2 = Math.floor(Math.random() * pointsArray.length);
                }
                
                // Get positions from the computed style
                const rect1 = pointsArray[point1].getBoundingClientRect();
                const rect2 = pointsArray[point2].getBoundingClientRect();
                
                // Calculate center points
                const x1 = rect1.left + rect1.width / 2;
                const y1 = rect1.top + rect1.height / 2;
                const x2 = rect2.left + rect2.width / 2;
                const y2 = rect2.top + rect2.height / 2;
                
                // Calculate line parameters
                const deltaX = x2 - x1;
                const deltaY = y2 - y1;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const angle = Math.atan2(deltaY, deltaX);
                
                // Create connection line
                const connection = document.createElement('div');
                connection.className = 'grid-connection';
                
                // Style the connection
                connection.style.position = 'absolute';
                connection.style.width = '0px'; // Start at 0 for animation
                connection.style.height = '2px';
                connection.style.backgroundColor = getRandomCyberColor();
                connection.style.opacity = '0.7';
                connection.style.top = `${y1}px`;
                connection.style.left = `${x1}px`;
                connection.style.transformOrigin = 'left center';
                connection.style.transform = `rotate(${angle}rad)`;
                
                container.appendChild(connection);
                
                // Animate connection forming
                connection.animate([
                    { width: '0px' },
                    { width: `${distance}px` }
                ], {
                    duration: 500,
                    delay: i * 50,
                    fill: 'forwards',
                    easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
                });
            }
        }, numDataPoints * 30 + 500);
        
        // Fade out the entire grid after a while
        setTimeout(() => {
            const elements = container.querySelectorAll('div, svg');
            elements.forEach(element => {
                element.animate([
                    { opacity: element.style.opacity || '1' },
                    { opacity: '0' }
                ], {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'ease-out'
                });
            });
            
            // Clear the container after fade out
            setTimeout(() => {
                container.innerHTML = '';
            }, 1000);
        }, 7000);
    }, 1500);
}

// Get random cyber color - helper function already exists
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
