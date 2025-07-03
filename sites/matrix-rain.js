// Matrix rain effect for the reality warp insanity

// Initialize matrix rain
function initializeMatrixRain(container) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Character set for the matrix rain
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Create columns for the rain
    const fontSize = 16; // Slightly smaller characters for higher density
    const columns = Math.floor(width / fontSize);
    
    // Store the position of each drop in each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    // Set up animation variables
    let animationFrame;
    let isActive = false;
    
    // Draw the matrix rain
    function draw() {
        if (!isActive) return;
        
        // Semi-transparent black background to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'; // More transparent for faster trails
        ctx.fillRect(0, 0, width, height);
        
        // Green text color - brighter
        ctx.fillStyle = '#00ffaa';
        ctx.font = `bold ${fontSize}px monospace`; // Make text bold
        
        // Loop through each drop
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Calculate x position (column * font size)
            const x = i * fontSize;
            
            // Calculate y position
            const y = drops[i] * fontSize;
            
            // Draw the character
            ctx.fillText(text, x, y);
            
            // More characters are brighter for a more dramatic effect
            if (Math.random() > 0.9) { // Increased probability
                ctx.fillStyle = '#ffffff';
                ctx.fillText(text, x, y);
                ctx.fillStyle = '#00ffaa';
            }
            
            // Randomly reset the drop or move it down - more frequent resets
            if (y > height && Math.random() > 0.95) {
                drops[i] = 0;
            }
            
            // Move the drop down faster
            drops[i] += 1.5; // Faster falling speed
        }
        
        // Continue the animation
        animationFrame = requestAnimationFrame(draw);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Recalculate columns
        const newColumns = Math.floor(width / fontSize);
        
        // Adjust drops array to match new column count
        if (newColumns > columns) {
            for (let i = columns; i < newColumns; i++) {
                drops[i] = Math.random() * -100;
            }
        }
        
        // Update columns count
        columns = newColumns;
    });
    
    // Start and stop the animation based on container class
    function checkStatus() {
        const shouldBeActive = container.classList.contains('active');
        
        if (shouldBeActive && !isActive) {
            isActive = true;
            animationFrame = requestAnimationFrame(draw);
        } else if (!shouldBeActive && isActive) {
            isActive = false;
            cancelAnimationFrame(animationFrame);
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
        }
        
        // Check again after a short delay
        setTimeout(checkStatus, 1000);
    }
    
    // Start status checks
    checkStatus();
}

// Update matrix rain effect
function updateMatrixRain() {
    // This function is called from the animation loop
    // The matrix rain is self-updating, so we don't need to do anything here
}
