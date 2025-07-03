document.addEventListener("DOMContentLoaded", () => {
    // Initialize Three.js starry background
    initStarryBackground();

    // Mouse follower radial gradient
    let mouseX = 0,
        mouseY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update CSS variables for card glow effects
        const cards = document.querySelectorAll(
            ".service-card, .portfolio-item"
        );
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty("--mouse-x", `${x}%`);
            card.style.setProperty("--mouse-y", `${y}%`);
        });
    });

    // Only initialize cursor on devices with fine pointer (desktop with mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.querySelector(".cursor-dot");

        document.addEventListener("mousemove", (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    // Parallax scroll effect
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll("section");

        sections.forEach((section, index) => {
            const speed = 0.1 * (index + 1);
            section.style.transform = `translateY(${scrolled * speed * -0.1}px)`;
        });

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
        button.addEventListener("mousemove", (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1
                }px)`;
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });

    // Animate elements on scroll
    const animationObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in");
            }
        });
    }, animationObserverOptions);

    document
        .querySelectorAll(
            ".service-card, .portfolio-item, .process-step"
        )
        .forEach((el) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            observer.observe(el);
        });

    // Add CSS for animations
    const style = document.createElement("style");
    style.textContent = `
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }
            `;
    document.head.appendChild(style);

    // Mobile menu handling
    const mobileMenuToggle =
        document.getElementById("mobile-menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const navItems = document.querySelectorAll(".nav-item");

    mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("active");
        sidebar.classList.toggle("active");
    });

    // Close mobile menu when clicking nav item
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove("active");
                sidebar.classList.remove("active");
            }
        });
    });

    // TOS Modal handling
    const tosLink = document.getElementById("tos-link");
    const tosModal = document.getElementById("tos-modal");
    const tosClose = document.getElementById("tos-close");

    tosLink.addEventListener("click", (e) => {
        e.preventDefault();
        tosModal.classList.add("active");
    });

    tosClose.addEventListener("click", () => {
        tosModal.classList.remove("active");
    });

    tosModal.addEventListener("click", (e) => {
        if (e.target === tosModal) {
            tosModal.classList.remove("active");
        }
    });

    // Update active nav on scroll using IntersectionObserver
    const sections = document.querySelectorAll("section");
    
    // Floating contact button functionality
    const floatingContactBtn = document.getElementById("floating-contact-btn");
    const contactSection = document.getElementById("contact");
    
    // Add click handler for smooth scrolling
    floatingContactBtn.addEventListener("click", () => {
        contactSection.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
        });
    });
    
    // Create an IntersectionObserver to detect which section is in view
    const sectionObserverOptions = {
        root: null, // viewport
        rootMargin: "-10% 0px -10% 0px", // smaller buffer for more accurate detection
        threshold: 0.3 // require 30% of section to be visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nav items
                navItems.forEach(item => item.classList.remove("active"));
                
                // Add active class to corresponding nav item
                const activeSection = entry.target.id;
                const activeNavItem = document.querySelector(`.nav-item[data-section="${activeSection}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add("active");
                }
                
                // Hide floating button when in contact section
                if (activeSection === "contact") {
                    floatingContactBtn.classList.add("hidden");
                    console.log("Hiding contact button - in contact section");
                } else {
                    floatingContactBtn.classList.remove("hidden");
                    console.log("Showing contact button - not in contact section");
                }
            }
        });
    }, sectionObserverOptions);

    // Ensure button starts visible
    floatingContactBtn.classList.remove("hidden");

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scrolling navigation
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const section = item.dataset.section;
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Email button – assemble address at click to avoid raw exposure
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const { user, domain } = emailBtn.dataset;
            window.open(`mailto:${user}@${domain}`, '_blank');
        });
    }

    // Find both shuffle elements
    const codingElement = document.querySelector('.coding-choro'); // Adjust selector as needed
    const ideaElement = document.querySelector('.idea-socho');     // Adjust selector as needed

    // Add hover event listeners to both elements
    codingElement.addEventListener('mouseenter', () => {
      // Start shuffle animation on both elements
      startShuffleAnimation(codingElement);
      startShuffleAnimation(ideaElement);
    });

    codingElement.addEventListener('mouseleave', () => {
      // Stop shuffle animation on both elements
      stopShuffleAnimation(codingElement);
      stopShuffleAnimation(ideaElement);
    });

    ideaElement.addEventListener('mouseenter', () => {
      // Start shuffle animation on both elements
      startShuffleAnimation(codingElement);
      startShuffleAnimation(ideaElement);
    });

    ideaElement.addEventListener('mouseleave', () => {
      // Stop shuffle animation on both elements
      stopShuffleAnimation(codingElement);
      stopShuffleAnimation(ideaElement);
    });

    // Your existing shuffle animation functions
    function startShuffleAnimation(element) {
      // ...existing shuffle start code...
    }

    function stopShuffleAnimation(element) {
      // ...existing shuffle stop code...
    }

    // Service card glow effect
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// Three.js star background implementation
function initStarryBackground() {
    const container = document.getElementById('star-container');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Set background to match the website's gray theme
    scene.background = new THREE.Color(0x18181b);
    
    // Camera position
    camera.position.z = 20;
    
    // Create a circular texture for the stars
    const starTexture = createCircularTexture();
    
    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 4000; // Increased from 2500 to 4000 for denser star field
    
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const colors = new Float32Array(starCount * 3); // Color array for random colors
    
    for (let i = 0; i < starCount; i++) {
        // Create stars in a sphere around the camera
        const i3 = i * 3;
        const radius = Math.random() * 60 + 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Varied star sizes, but slightly smaller for subtlety
        sizes[i] = Math.random() * 0.8 + 0.1;
        
        // Random colors for each star
        colors[i3] = Math.random() * 0.5 + 0.5; // R - brighter range
        colors[i3 + 1] = Math.random() * 0.5 + 0.5; // G - brighter range
        colors[i3 + 2] = Math.random() * 0.5 + 0.5; // B - brighter range
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3)); // Add color attribute
    
    // Star material with circular texture and vertex colors
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.15,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
        depthWrite: false,
        map: starTexture,
        alphaTest: 0.1,
        vertexColors: true // Enable vertex colors
    });
    
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Handle mouse movement
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = (event.clientY / window.innerHeight) * 2 - 1; // Removed negative sign to invert vertical movement
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Subtle rotation even without mouse movement
        starField.rotation.y += 0.0003;
        
        // Mouse-based interaction
        targetX = mouseX * 0.1;
        targetY = mouseY * 0.1;
        
        // Smooth camera movement
        camera.rotation.y += (targetX - camera.rotation.y) * 0.02;
        camera.rotation.x += (targetY - camera.rotation.x) * 0.02;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Function to create a circular texture for stars
function createCircularTexture() {
    const canvas = document.createElement('canvas');
    const size = 64; // Size of the texture
    canvas.width = size;
    canvas.height = size;
    
    const context = canvas.getContext('2d');
    
    // Create a radial gradient for a soft circular look
    const gradient = context.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
    );
    
    // Center is bright white, edges are transparent
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    // Fill with the gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    
    // Create a texture from the canvas
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    
    return texture;
}
