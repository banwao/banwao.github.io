// Character-scrambling effect for cyberpunk UI

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#_$%@&0123456789';
    this.originalText = el.innerText;
    this.update = this.update.bind(this);
    this.active = true;
    this.frameId = null;
  }
  
  setText() {
    const oldText = this.el.innerText;
    const length = oldText.length;
    const scrambledText = this.originalText.split('').map((char, i) => {
      // Keep spaces as spaces
      if (char === ' ') return ' ';
      // Random chance to scramble each character
      return Math.random() < 0.3 ? this.chars[Math.floor(Math.random() * this.chars.length)] : char;
    }).join('');
    
    this.el.innerText = scrambledText;
  }
  
  start() {
    if (!this.frameId) {
      this.active = true;
      this.frameId = setInterval(this.update, 100);
    }
  }
  
  stop() {
    clearInterval(this.frameId);
    this.frameId = null;
    this.active = false;
    this.el.innerText = this.originalText;
  }
  
  update() {
    if (this.active) {
      this.setText();
    }
  }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Create the click to start text if it doesn't exist
  if (!document.querySelector('.start-text')) {
    const startScreen = document.getElementById('start-screen');
    if (startScreen) {
      const startText = document.createElement('div');
      startText.className = 'start-text';
      
      const clickText = document.createElement('span');
      clickText.className = 'click-text';
      clickText.textContent = 'CLICK TO START';
      
      startText.appendChild(clickText);
      startScreen.appendChild(startText);
      
      // Style the added elements
      startText.style.marginTop = '30px';
      startText.style.textAlign = 'center';
      
      clickText.style.fontFamily = "'Courier New', monospace";
      clickText.style.fontSize = '1.5rem';
      clickText.style.fontWeight = 'bold';
      clickText.style.letterSpacing = '4px';
      clickText.style.color = '#00ff9d';
      clickText.style.textShadow = '0 0 10px #00ff9d';
    }
  }
  
  // Initialize text scramble effect for "Click to Start"
  const clickText = document.querySelector('.click-text');
  if (clickText) {
    const scrambler = new TextScramble(clickText);
    
    // Start the scrambling effect
    scrambler.start();
    
    // Set up hover and click interactions
    const startButton = document.getElementById('start-button');
    if (startButton) {
      startButton.addEventListener('mouseenter', function() {
        // Increase scramble intensity on hover
        clearInterval(scrambler.frameId);
        scrambler.frameId = setInterval(scrambler.update, 50);
      });
      
      startButton.addEventListener('mouseleave', function() {
        // Return to normal scramble rate
        clearInterval(scrambler.frameId);
        scrambler.frameId = setInterval(scrambler.update, 100);
      });
      
      startButton.addEventListener('click', function() {
        // Stop scrambling when clicked
        scrambler.stop();
      });
    }
  }
});
