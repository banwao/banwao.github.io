document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const imageContainer = item.querySelector('.portfolio-image-container');
        const image = item.querySelector('.portfolio-image');
        
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate movement based on mouse position (more subtle)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 30; // Reduced movement
            const moveY = (y - centerY) / 30; // Reduced movement
            
            // Apply subtle transform to image
            image.style.transform = `
                translate(${moveX}px, ${moveY}px)
            `;
            
            // Update mouse position for gradient effect
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
        
        item.addEventListener('mouseleave', () => {
            // Reset transforms
            image.style.transform = '';
            item.style.setProperty('--mouse-x', '50%');
            item.style.setProperty('--mouse-y', '50%');
        });
    });
}); 