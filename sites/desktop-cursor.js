// Desktop cursor functionality for computer interface

document.addEventListener('DOMContentLoaded', function() {
    // Create desktop cursor if it doesn't exist
    let desktopCursor = document.getElementById('desktop-cursor');
    if (!desktopCursor) {
        desktopCursor = document.createElement('div');
        desktopCursor.id = 'desktop-cursor';
        desktopCursor.className = 'desktop-cursor';
        document.body.appendChild(desktopCursor);
    }
    
    const interfaceContainer = document.getElementById('interface-container');
    
    // Style the cursor directly
    desktopCursor.style.position = 'fixed';
    desktopCursor.style.width = '24px';
    desktopCursor.style.height = '24px';
    desktopCursor.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path fill=\"%2300ff9d\" d=\"M7,2l12,11.2l-5.8,0.5l3.3,7.3l-2.2,1l-3.2-7.4L7,18.5V2\"/></svg>')";
    desktopCursor.style.backgroundSize = 'contain';
    desktopCursor.style.backgroundRepeat = 'no-repeat';
    desktopCursor.style.pointerEvents = 'none';
    desktopCursor.style.zIndex = '10000'; // Very high z-index to ensure visibility
    desktopCursor.style.filter = 'drop-shadow(0 0 3px rgba(0, 255, 157, 0.7))';
    desktopCursor.style.transform = 'translate(-3px, -3px)';
    desktopCursor.style.opacity = '0';
    desktopCursor.style.transition = 'opacity 0.3s ease';
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        // Position the cursor at mouse coordinates
        desktopCursor.style.left = e.clientX + 'px';
        desktopCursor.style.top = e.clientY + 'px';
        
        // Check if interface is visible
        if (interfaceContainer && 
            (interfaceContainer.style.display === 'block' || 
             getComputedStyle(interfaceContainer).display !== 'none')) {
            // Show custom cursor
            desktopCursor.style.opacity = '1';
            document.body.style.cursor = 'none';
        } else {
            // Hide custom cursor
            desktopCursor.style.opacity = '0';
            document.body.style.cursor = 'auto';
        }
    });
    
    // Add pointer style for interactive elements
    document.querySelectorAll('a, button, .nav-item, .pathway, .social-link, .back-btn').forEach(element => {
        element.addEventListener('mouseenter', function() {
            desktopCursor.classList.add('pointer');
            desktopCursor.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path fill=\"%2300ff9d\" d=\"M13.64,21.97C13.14,21.97 12.7,21.7 12.53,21.23L10.07,14.86L7.29,14.86C6.73,14.86 6.19,14.5 6.04,13.94C5.82,13.17 6.4,12.39 7.17,12.39L11.53,12.39L14.24,19.5L19.04,6.03L20.93,6.03L15.03,22.76C14.92,22.46 14.68,22.12 14.34,21.97L13.64,21.97Z\"/></svg>')";
        });
        
        element.addEventListener('mouseleave', function() {
            desktopCursor.classList.remove('pointer');
            desktopCursor.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path fill=\"%2300ff9d\" d=\"M7,2l12,11.2l-5.8,0.5l3.3,7.3l-2.2,1l-3.2-7.4L7,18.5V2\"/></svg>')";
        });
    });
    
    // Force show cursor initially when interface is active
    if (interfaceContainer && 
        (interfaceContainer.style.display === 'block' || 
         getComputedStyle(interfaceContainer).display !== 'none')) {
        desktopCursor.style.opacity = '1';
        document.body.style.cursor = 'none';
    }
});
