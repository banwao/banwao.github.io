// Enhanced name effect with matrix rain

document.addEventListener('DOMContentLoaded', function() {
  console.log("Initializing name effect with matrix rain");
  
  // Get the name element
  const nameElement = document.querySelector('.cyber-glitch.interactive-glitch');
  if (!nameElement) {
    console.error("Name element not found!");
    return;
  }
  
  // Create necessary containers
  createEffectContainers();
  
  // Set up click event
  nameElement.addEventListener('click', function() {
    activateEffects();
  });
  
  // Set up hover effect
  nameElement.addEventListener('mouseenter', function() {
    nameElement.classList.add('hover-glow');
  });
  
  nameElement.addEventListener('mouseleave', function() {
    nameElement.classList.remove('hover-glow');
  });
});

// Create containers for effects
function createEffectContainers() {
  // Create matrix container if it doesn't exist
  if (!document.getElementById('matrix-container')) {
    const matrixContainer = document.createElement('div');
    matrixContainer.id = 'matrix-container';
    matrixContainer.className = 'matrix-container';
    document.body.appendChild(matrixContainer);
    
    // Initialize matrix rain
    if (typeof initializeMatrixRain === 'function') {
      initializeMatrixRain(matrixContainer);
    } else {
      console.error("Matrix rain function not available!");
    }
  }
  
  // Create particle container
  if (!document.getElementById('particles-container')) {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-container';
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '9995';
    document.body.appendChild(particlesContainer);
  }
  
  // Make sure there's a style tag for dynamic styles
  if (!document.getElementById('dynamic-effects-style')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'dynamic-effects-style';
    document.head.appendChild(styleTag);
    
    // Add basic effect styles
    styleTag.textContent = `
      .matrix-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9990;
        opacity: 0;
        transition: opacity 1s;
      }
      
      .matrix-container.active {
        opacity: 0.7;
      }
      
      .hover-glow {
        text-shadow: 0 0 20px var(--light-green), 0 0 40px var(--light-green) !important;
        letter-spacing: 10px !important;
        transform: scale(1.05);
      }
      
      .name-effect-active {
        animation: nameColorCycle 2s infinite alternate;
      }
      
      .letter-explode {
        display: inline-block;
        animation: letterExplode 1.5s forwards;
      }
      
      @keyframes nameColorCycle {
        0% { color: #00ff9d; text-shadow: 0 0 20px #00ff9d; }
        33% { color: #ff00ff; text-shadow: 0 0 30px #ff00ff; }
        66% { color: #00ffff; text-shadow: 0 0 25px #00ffff; }
        100% { color: #ffff00; text-shadow: 0 0 35px #ffff00; }
      }
      
      @keyframes letterExplode {
        0% { transform: translateY(0) rotate(0); opacity: 1; }
        30% { transform: translateY(-20px) rotate(-10deg); opacity: 0.8; }
        60% { transform: translateY(15px) rotate(20deg); opacity: 0.6; }
        100% { transform: translateY(0) rotate(0); opacity: 1; }
      }
      
      .screen-pulse {
        animation: screenPulse 0.5s;
      }
      
      @keyframes screenPulse {
        0% { filter: brightness(1) contrast(1); }
        50% { filter: brightness(1.5) contrast(1.2); }
        100% { filter: brightness(1) contrast(1); }
      }
    `;
  }
}

// Main function to activate effects
function activateEffects() {
  console.log("Activating matrix rain effect");
  
  // Add screen pulse effect
  document.body.classList.add('screen-pulse');
  setTimeout(() => {
    document.body.classList.remove('screen-pulse');
  }, 500);
  
  // Activate the name effect
  const nameElement = document.querySelector('.cyber-glitch.interactive-glitch');
  if (nameElement) {
    // Apply color cycling effect
    nameElement.classList.add('name-effect-active');
    
    // Apply letter explosion effect
    const text = nameElement.textContent;
    nameElement.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.className = 'letter-explode';
      span.style.animationDelay = `${i * 0.1}s`;
      nameElement.appendChild(span);
    }
    
    // Reset after animation
    setTimeout(() => {
      nameElement.classList.remove('name-effect-active');
      nameElement.textContent = text;
    }, 3000);
  }
  
  // Activate matrix rain
  const matrixContainer = document.getElementById('matrix-container');
  if (matrixContainer) {
    matrixContainer.classList.add('active');
    
    // Hide matrix rain after some time
    setTimeout(() => {
      matrixContainer.classList.remove('active');
    }, 6000);
  }
  
  // Create explosion particles
  createParticles();
  
  // Play sound effect
  playSound();
}

// Create particles
function createParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  
  const nameElement = document.querySelector('.cyber-glitch.interactive-glitch');
  if (!nameElement) return;
  
  const rect = nameElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Create many particles
  for (let i = 0; i < 100; i++) {
    const particle = document.createElement('div');
    
    // Styling
    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 6 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = getRandomColor();
    particle.style.borderRadius = '50%';
    particle.style.boxShadow = `0 0 10px ${getRandomColor()}`;
    particle.style.zIndex = '9996';
    
    // Starting position
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    
    // Add to container
    container.appendChild(particle);
    
    // Animate with random direction and speed
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 4;
    const distance = Math.random() * 300 + 100;
    
    particle.animate([
      { 
        left: `${centerX}px`, 
        top: `${centerY}px`, 
        opacity: 1,
        transform: 'scale(1)'
      },
      { 
        left: `${centerX + Math.cos(angle) * distance}px`, 
        top: `${centerY + Math.sin(angle) * distance}px`, 
        opacity: 0,
        transform: 'scale(0)'
      }
    ], {
      duration: speed * 300,
      easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
    });
    
    // Remove particle after animation
    setTimeout(() => {
      if (container.contains(particle)) {
        container.removeChild(particle);
      }
    }, speed * 300);
  }
}

// Play sound effect
function playSound() {
  try {
    const audio = new Audio();
    audio.src = 'https://assets.codepen.io/635/whoosh.mp3';
    audio.volume = 0.4;
    audio.play().catch(e => console.log("Audio play failed:", e));
  } catch (e) {
    console.log("Audio creation failed:", e);
  }
}

// Get random bright color
function getRandomColor() {
  const colors = [
    '#00ff9d', // green
    '#ff00ff', // magenta
    '#00ffff', // cyan
    '#ffff00', // yellow
    '#ff3377', // pink
    '#ffffff'  // white
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
