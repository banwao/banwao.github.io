// Navigation and interactive elements for futuristic portfolio

// Enhance section transitions with smoother animations
const animateSection = (oldSection, newSection) => {
  // Add artistic transition
  oldSection.style.opacity = '0';
  oldSection.style.transform = 'scale(0.98) translateY(10px)';
  
  setTimeout(() => {
    // Remove active class from all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active-section');
    });
    
    // Add active class to new section
    oldSection.style.display = 'none';
    newSection.classList.add('active-section');
    newSection.style.opacity = '0';
    newSection.style.transform = 'scale(0.98) translateY(10px)';
    newSection.style.display = 'block';
    
    // Force reflow
    void newSection.offsetWidth;
    
    // Fade and slide in new section
    newSection.style.opacity = '1';
    newSection.style.transform = 'scale(1) translateY(0)';
  }, 400);
};

// Initialize the navigation
document.addEventListener('DOMContentLoaded', () => {
  // Set glitch effect attributes
  document.querySelectorAll('.cyber-glitch').forEach(heading => {
    heading.setAttribute('data-text', heading.textContent);
  });
  
  // Add click event listeners to navigation menu
  document.querySelectorAll('.nav-item, .pathway, .back-btn').forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      const currentSection = document.querySelector('.active-section');
      const targetSection = document.getElementById(targetId);
      
      if (targetSection && currentSection !== targetSection) {
        animateSection(currentSection, targetSection);
        
        // Add network connection animation between sections
        if (item.classList.contains('pathway')) {
          const pathwayNode = item.querySelector('.node');
          pathwayNode.classList.add('active-node');
          
          setTimeout(() => {
            pathwayNode.classList.remove('active-node');
          }, 800);
        }
      }
    });
  });
  
  // Add subtle parallax effects to the background
  document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('.cyber-panel');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    
    document.querySelectorAll('.particle').forEach((particle, index) => {
      const depth = Math.random() * 0.5 + 0.5; // Random depth between 0.5 and 1
      particle.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
    });
    
    container.style.backgroundPosition = `${moveX * 0.05}px ${moveY * 0.05}px`;
  });
  
  // Add artistic animations to award items
  const awardItems = document.querySelectorAll('.award-item');
  awardItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.5s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
  
  // Enhanced hover effects for categories
  const categories = document.querySelectorAll('.category');
  categories.forEach(category => {
    if (!category.classList.contains('featured')) {
      category.addEventListener('mouseenter', () => {
        category.style.transform = 'scale(1.03) translateY(-5px)';
        category.style.boxShadow = '0 10px 25px rgba(0, 255, 157, 0.2)';
        category.style.borderColor = 'var(--light-green)';
      });
      
      category.addEventListener('mouseleave', () => {
        category.style.transform = '';
        category.style.boxShadow = '';
        category.style.borderColor = 'rgba(0,255,157,0.3)';
      });
    }
  });
  
  // Add subtle animations to the main header elements
  const headerElements = document.querySelectorAll('.header *');
  headerElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.5s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100 * index);
  });
  
  // Add typewriter effect to terminal text
  const typewriterElements = document.querySelectorAll('.terminal-text');
  typewriterElements.forEach(terminal => {
    const lines = terminal.querySelectorAll('p:not(.blinking-cursor)');
    
    lines.forEach((line, index) => {
      const text = line.textContent;
      line.textContent = '';
      line.style.opacity = '0';
      
      setTimeout(() => {
        line.style.opacity = '1';
        let charIndex = 0;
        
        const typing = setInterval(() => {
          if (charIndex < text.length) {
            line.textContent += text.charAt(charIndex);
            charIndex++;
          } else {
            clearInterval(typing);
          }
        }, 30);
      }, index * 1000);
    });
  });
  
  // Create particle background effect
  function createParticleBackground() {
    const container = document.querySelector('.cyber-panel');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Randomize particle properties
      const size = Math.random() * 3 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}%;
        top: ${posY}%;
        animation: float ${duration}s ${delay}s infinite linear;
        background-color: rgba(0, 255, 157, ${Math.random() * 0.5 + 0.1});
        box-shadow: 0 0 ${size * 2}px rgba(0, 255, 157, 0.4);
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
      `;
      
      container.appendChild(particle);
    }
  }
  
  // Add this style for the particles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0% {
        transform: translate(0, 0);
      }
      25% {
        transform: translate(10px, 10px);
      }
      50% {
        transform: translate(-5px, 20px);
      }
      75% {
        transform: translate(-15px, 5px);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    
    .active-node {
      animation: node-pulse 0.8s ease;
    }
    
    @keyframes node-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); box-shadow: 0 0 20px var(--light-green); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  // Enhanced pathway effects
  const pathways = document.querySelectorAll('.pathway');
  
  pathways.forEach(pathway => {
    // Create particle effects for each pathway
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('span');
      particle.classList.add('pathway-particle');
      
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
      
      pathway.appendChild(particle);
    }
    
    // 3D effect on hover
    pathway.addEventListener('mousemove', (e) => {
      const rect = pathway.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 15;
      const angleY = (centerX - x) / 15;
      
      pathway.style.transform = `translateY(-10px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    pathway.addEventListener('mouseleave', () => {
      pathway.style.transform = '';
      setTimeout(() => {
        pathway.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }, 100);
    });
    
    // Click effect
    pathway.addEventListener('click', () => {
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      pathway.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });

  // Add interactive publication hover effects
  const publicationItems = document.querySelectorAll('.publication-item');
  publicationItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-10px)';
      item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 255, 157, 0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.boxShadow = '';
    });
  });
});

// Enhanced About section with interactive elements

document.addEventListener('DOMContentLoaded', () => {
  // Initialize skill bars animation
  setTimeout(() => {
    document.querySelectorAll('.skill-fill').forEach(skill => {
      const width = skill.style.width;
      skill.style.width = '0';
      
      setTimeout(() => {
        skill.style.width = width;
      }, 300);
    });
  }, 1000);
  
  // Create interactive backdrop particles
  const heroBackdrop = document.querySelector('.hero-backdrop');
  
  if (heroBackdrop) {
    for (let i = 0; i < 50; i++) {
      createParticle(heroBackdrop);
    }
    
    // Add parallax effect to hero backdrop
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
      
      heroBackdrop.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }
  
  // Interactive glitch effect on avatar hover
  const profileAvatar = document.querySelector('.profile-avatar');
  const nameElement = document.querySelector('#about .cyber-glitch');
  
  if (profileAvatar && nameElement) {
    profileAvatar.addEventListener('mouseenter', () => {
      nameElement.classList.add('active-glitch');
      
      // Add pulse effect to avatar
      profileAvatar.querySelector('.avatar-ring').style.boxShadow = '0 0 30px var(--light-green)';
    });
    
    profileAvatar.addEventListener('mouseleave', () => {
      nameElement.classList.remove('active-glitch');
      profileAvatar.querySelector('.avatar-ring').style.boxShadow = '';
    });
  }
});

// Create floating particles for hero backdrop
function createParticle(parent) {
  const particle = document.createElement('div');
  particle.className = 'hero-particle';
  
  // Randomize particle properties
  const size = Math.random() * 4 + 2;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const opacity = Math.random() * 0.5 + 0.1;
  const animDuration = Math.random() * 20 + 10;
  const animDelay = Math.random() * 10;
  
  // Apply styles
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background-color: rgba(0, 255, 157, ${opacity});
    border-radius: 50%;
    left: ${posX}%;
    top: ${posY}%;
    box-shadow: 0 0 ${size * 2}px rgba(0, 255, 157, 0.5);
    animation: float-particle ${animDuration}s ${animDelay}s infinite linear;
    pointer-events: none;
    z-index: 0;
  `;
  
  parent.appendChild(particle);
  return particle;
}

// Add custom animation styles
const customStyles = document.createElement('style');
customStyles.textContent = `
  @keyframes float-particle {
    0%, 100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(30px, -20px);
    }
    50% {
      transform: translate(-20px, -40px);
    }
    75% {
      transform: translate(-30px, 20px);
    }
  }
  
  .active-glitch {
    animation: text-glitch 0.5s infinite;
  }
  
  @keyframes text-glitch {
    0%, 100% { 
      text-shadow: 0 0 5px var(--light-green), 0 0 10px rgba(0, 255, 157, 0.5);
      transform: translateX(0);
    }
    25% {
      text-shadow: -2px 0 5px #ff00ff, 2px 0 5px #00ffff;
      transform: translateX(-2px);
    }
    50% {
      text-shadow: 2px 0 5px #ff00ff, -2px 0 5px #00ffff;
      transform: translateX(2px);
    }
    75% {
      text-shadow: -2px 0 5px #00ffff, 2px 0 5px #ff00ff;
      transform: translateX(-1px);
    }
  }
`;
document.head.appendChild(customStyles);

// Add styles for the enhanced particle and ripple effects
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
  .pathway-particle {
    position: absolute;
    background-color: rgba(0, 255, 157, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
    animation: float-particle 3s infinite linear;
  }
  
  @keyframes float-particle {
    0% { transform: translateY(0) translateX(0); opacity: 0.1; }
    25% { transform: translateY(-10px) translateX(10px); opacity: 0.4; }
    50% { transform: translateY(-20px) translateX(-5px); opacity: 0.2; }
    75% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
    100% { transform: translateY(0) translateX(0); opacity: 0.1; }
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 255, 157, 0.4);
    transform: scale(0);
    animation: ripple-effect 0.8s linear;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    z-index: 0;
    pointer-events: none;
  }
  
  @keyframes ripple-effect {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
  
  .publication-item {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;
document.head.appendChild(enhancedStyles);

// Add this style for the smoother transitions
const styleTransitions = document.createElement('style');
styleTransitions.textContent = `
  .section {
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  
  .edu-item, .exp-item {
    transition: all 0.3s ease;
  }
  
  .edu-item:hover, .exp-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 255, 157, 0.2);
  }
`;
document.head.appendChild(styleTransitions);

// Enhanced interactive elements

document.addEventListener('DOMContentLoaded', () => {
  // Interactive name glitch effect
  const nameElement = document.querySelector('.interactive-glitch');
  if (nameElement) {
    // Set data-text attribute for the glitch effect
    nameElement.setAttribute('data-text', nameElement.textContent);
    
    nameElement.addEventListener('click', function() {
      this.classList.add('active');
      
      // Add temporary intense glitch effect
      this.style.animation = 'intense-glitch 0.5s forwards';
      
      // Reset after animation completes
      setTimeout(() => {
        this.classList.remove('active');
        this.style.animation = '';
      }, 500);
    });
  }
  
  // Remove or hide profile avatar/circle as requested
  const profileAvatar = document.querySelector('.profile-avatar');
  if (profileAvatar) {
    profileAvatar.style.display = 'none';
  }
  
  // Enhanced publications interaction
  const publications = document.querySelectorAll('.publication-item');
  publications.forEach(pub => {
    pub.addEventListener('mouseenter', () => {
      // Create subtle particle effects around publication items
      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.classList.add('pub-particle');
        
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position randomly along the left border
        particle.style.left = '0';
        particle.style.top = `${Math.random() * 100}%`;
        
        // Add animation
        particle.style.animation = `pub-particle-move ${Math.random() * 2 + 1}s forwards ease-out`;
        
        pub.appendChild(particle);
        
        // Clean up particles
        setTimeout(() => {
          if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 3000);
      }
    });
  });
  
  // Dynamic pathway selection effect
  const pathwayContainers = document.querySelectorAll('.pathways-container');
  
  pathwayContainers.forEach(container => {
    container.addEventListener('mousemove', (e) => {
      const paths = container.querySelectorAll('.pathway');
      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      
      paths.forEach(path => {
        const pathRect = path.getBoundingClientRect();
        const pathCenterX = (pathRect.left + pathRect.right) / 2 - containerRect.left;
        
        // Calculate distance from mouse to pathway center (horizontal only)
        const distance = Math.abs(mouseX - pathCenterX);
        const maxDistance = containerRect.width / 2;
        
        // Calculate scale based on proximity (closer = larger)
        const scale = Math.max(1, 1.1 - (distance / maxDistance) * 0.2);
        const brightness = 100 + (1 - distance / maxDistance) * 40;
        
        // Apply transformation
        path.style.transform = `scale(${scale})`;
        path.style.filter = `brightness(${brightness}%)`;
      });
    });
    
    // Reset on mouse leave
    container.addEventListener('mouseleave', () => {
      const paths = container.querySelectorAll('.pathway');
      paths.forEach(path => {
        path.style.transform = '';
        path.style.filter = '';
      });
    });
  });
});

// Add styles for publication particles
const pubParticleStyles = document.createElement('style');
pubParticleStyles.textContent = `
  .pub-particle {
    position: absolute;
    background-color: var(--light-green);
    border-radius: 50%;
    z-index: 3;
    pointer-events: none;
  }
  
  @keyframes pub-particle-move {
    0% { 
      transform: translateX(0) translateY(0);
      opacity: 0.8; 
    }
    100% { 
      transform: translateX(100px) translateY(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 50}px);
      opacity: 0; 
    }
  }
  
  @keyframes intense-glitch {
    0%, 100% { 
      text-shadow: 0 0 5px var(--light-green), 0 0 10px var(--light-green);
      transform: translateX(0); 
    }
    10%, 30%, 50%, 70%, 90% {
      text-shadow: -2px 0 5px #ff00ff, 2px 0 5px #00ffff;
      transform: translateX(-3px) skewX(10deg);
    }
    20%, 40%, 60%, 80% {
      text-shadow: 2px 0 5px #00ffff, -2px 0 5px #ff00ff;
      transform: translateX(3px) skewX(-10deg);
    }
  }
`;
document.head.appendChild(pubParticleStyles);

// Add script for handling the portfolio navigation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize section navigation
    const navItems = document.querySelectorAll('.nav-item');
    const pathways = document.querySelectorAll('.pathway');
    const backButtons = document.querySelectorAll('.back-btn');
    
    function showSection(targetId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active-section');
        });
        
        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }
    }
    
    // Set up navigation event listeners
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            showSection(targetId);
        });
    });
    
    pathways.forEach(pathway => {
        pathway.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            showSection(targetId);
        });
    });
    
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            showSection(targetId);
        });
    });
    
    // Animate skill bars when visible
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        skillBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        });
    }
    
    // Run skill bar animation when about section is shown
    animateSkillBars();
});

// Enhanced Contact section with interactive elements

document.addEventListener('DOMContentLoaded', () => {
  // Add animated background effect to contact section
  const contactSection = document.querySelector('#contact');
  if (contactSection) {
    for (let i = 0; i < 20; i++) {
      createParticle(contactSection);
    }
    
    // Subtle zoom and fade in for the contact section
    contactSection.style.opacity = '0';
    contactSection.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      contactSection.style.transition = 'opacity 1s ease, transform 1s ease';
      contactSection.style.opacity = '1';
      contactSection.style.transform = 'scale(1)';
    }, 300);
  }
  
  // Interactive form inputs
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentNode.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentNode.classList.remove('active');
      }
    });
  });
  
  // Add glowing effect to social icons on hover
  const socialIcons = document.querySelectorAll('.social-link i');
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.2)';
      icon.style.color = 'var(--light-green)';
      icon.style.textShadow = '0 0 10px var(--light-green)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = '';
      icon.style.color = '';
      icon.style.textShadow = '';
    });
  });
});

// Enhance CMU logo to fill space better
document.addEventListener('DOMContentLoaded', () => {
  const cmuLogo = document.querySelector('.school-logo.cmu img');
  if (cmuLogo) {
    // Make the CMU logo fill the space better
    cmuLogo.style.width = '95%';
    cmuLogo.style.height = '95%';
    cmuLogo.style.objectFit = 'contain';
    cmuLogo.style.padding = '2px';
    cmuLogo.style.transform = 'scale(1.1)';
    
    // Add a subtle glow effect
    cmuLogo.style.filter = 'brightness(1.05) drop-shadow(0 0 3px rgba(0, 255, 157, 0.4))';
    
    // Add a slight zoom on hover
    cmuLogo.parentElement.addEventListener('mouseenter', () => {
      cmuLogo.style.transform = 'scale(1.15)';
      cmuLogo.style.transition = 'transform 0.3s ease';
    });
    
    cmuLogo.parentElement.addEventListener('mouseleave', () => {
      cmuLogo.style.transform = 'scale(1.1)';
    });
  }
});

// Add styles for enhanced logo display
const logoEnhancementStyles = document.createElement('style');
logoEnhancementStyles.textContent = `
  .school-logo.cmu {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(15, 77, 50, 0.15);
    overflow: visible;
    border-radius: 8px;
  }
  
  .school-logo.cmu img {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(logoEnhancementStyles);
