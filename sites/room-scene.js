// Enhanced 3D Room Scene with improved initialization

// Global variables
let scene, camera, renderer;
let table, computer, computerScreen, computerTexture, stool;
let raycaster, mouse;
let controls;
let isComputerHovered = false;
let isSceneLoaded = false;
let clock;
let isTransitioning = false;

// Initialize the system
document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded, initializing system");
    
    // Set up event listener for start button
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const loadingIndicator = document.getElementById('loading-indicator');
    const roomScene = document.getElementById('room-scene');
    
    if (!startButton || !startScreen) {
        console.error("Critical elements missing. Check HTML structure.");
        return;
    }

    // Click event for start button - immediately load the room
    startButton.addEventListener('click', function() {
        console.log("Start button clicked");
        
        // Hide start screen with fade effect
        startScreen.classList.add('hidden');
        
        // Brief loading animation
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
            
            // Show room after a short delay
            setTimeout(function() {
                loadingIndicator.style.display = 'none';
                
                // Make room visible immediately
                if (roomScene) {
                    roomScene.style.display = 'block';
                    roomScene.style.opacity = '1';
                    
                    // Initialize 3D scene
                    try {
                        initScene();
                    } catch (e) {
                        console.error("Error initializing 3D scene:", e);
                        showFallbackContent();
                    }
                }
            }, 800);
        } else {
            // If no loading indicator, initialize immediately
            if (roomScene) {
                roomScene.style.display = 'block';
                roomScene.style.opacity = '1';
                
                try {
                    initScene();
                } catch (e) {
                    console.error("Error initializing 3D scene:", e);
                    showFallbackContent();
                }
            }
        }
    });

    // Add back-to-room functionality
    const backButton = document.getElementById('back-to-room');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Hide interface
            const interfaceContainer = document.getElementById('interface-container');
            if (interfaceContainer) {
                interfaceContainer.classList.remove('active');
                
                setTimeout(function() {
                    interfaceContainer.style.display = 'none';
                    
                    // Show room scene
                    const roomScene = document.getElementById('room-scene');
                    if (roomScene) {
                        roomScene.classList.remove('hidden');
                        roomScene.style.display = 'block';
                        roomScene.style.opacity = '1';
                        
                        // Reset camera position
                        if (camera && controls) {
                            // Smooth transition back to original position
                            const startPos = camera.position.clone();
                            const endPos = new THREE.Vector3(0, 1.8, 3.5);
                            
                            animateCameraPosition(startPos, endPos, 1000, function() {
                                controls.enabled = true;
                            });
                        }
                    }
                }, 500);
            }
        });
    }
});

// Initialize scene
function initScene() {
    console.log("Initializing 3D scene");
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded properly');
        showFallbackContent();
        return;
    }

    // Get room scene container
    const roomScene = document.getElementById('room-scene');
    if (!roomScene) {
        console.error('Room scene container not found');
        return;
    }
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212); // Dark background instead of walls
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.8, 3.5); // Position further back
    
    try {
        // Create renderer
        renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        
        // Clear any previous content
        while(roomScene.firstChild) {
            roomScene.removeChild(roomScene.firstChild);
        }
        
        roomScene.appendChild(renderer.domElement);
        console.log("Renderer added to DOM");
        
        // Initialize clock for animations
        clock = new THREE.Clock();
        
        // Create orbit controls if available
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 1.5;
            controls.maxDistance = 10;
            controls.maxPolarAngle = Math.PI / 1.5;
            controls.target.set(0, 1.2, 0);
        } else {
            console.warn('OrbitControls not available, using static camera');
        }
        
        // Setup lights
        setupLights();
        
        // Create the website texture for computer screen
        createWebsiteTexture();
        
        // Create minimalist scene - just floor, table, and peripherals
        createFloor();
        createFurniture();
        createComputer();
        createKeyboard();
        createMouse();
        createStool();
        
        // Setup interaction
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        
        // Add event listeners
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onMouseClick);
        
        // Mark as loaded
        isSceneLoaded = true;
        
        // Start animation loop
        animate();
        
    } catch (error) {
        console.error("Error in 3D initialization:", error);
        showFallbackContent();
    }
}

// Create website texture for computer screen
function createWebsiteTexture() {
    // Create a canvas element to render the website preview
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 384;
    
    const ctx = canvas.getContext('2d');
    
    // Fill background with black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid pattern (very subtle)
    ctx.strokeStyle = 'rgba(0, 255, 157, 0.05)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Draw INITIALIZE SYSTEM text
    ctx.fillStyle = '#00ff9d';
    ctx.font = 'bold 30px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('> INITIALIZE SYSTEM', canvas.width / 2, canvas.height / 2 - 80);
    
    // Draw terminal-like text
    ctx.font = '16px monospace';
    ctx.textAlign = 'left';
    const terminalLines = [
        '> Establishing secure connection...',
        '> Authenticating user credentials...',
        '> Access granted to personal profile',
        '> Loading interface modules...',
        '_'
    ];
    
    // Draw text with line spacing
    terminalLines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2 - 170, canvas.height / 2 - 10 + index * 25);
    });
    
    // Draw ACCESS button
    ctx.strokeStyle = '#00ff9d';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width / 2 - 70, canvas.height / 2 + 80, 140, 40);
    
    ctx.fillStyle = '#00ff9d';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ACCESS', canvas.width / 2, canvas.height / 2 + 105);
    
    // Create texture from canvas
    try {
        computerTexture = new THREE.CanvasTexture(canvas);
        computerTexture.needsUpdate = true;
    } catch (e) {
        console.error("Error creating computer texture:", e);
    }
}

// Setup lighting
function setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    // Main directional light (like ceiling light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Computer screen glow
    const computerLight = new THREE.PointLight(0x00ff9d, 0.8, 5);
    computerLight.position.set(0, 1.2, 0);
    scene.add(computerLight);
    
    // Add subtle spotlights to create depth
    const spotLight1 = new THREE.SpotLight(0xffffff, 0.5, 10, Math.PI / 4, 0.5);
    spotLight1.position.set(-3, 5, 3);
    scene.add(spotLight1);
    
    const spotLight2 = new THREE.SpotLight(0xffffff, 0.5, 10, Math.PI / 4, 0.5);
    spotLight2.position.set(3, 5, -3);
    scene.add(spotLight2);
}

// Create just a floor without walls
function createFloor() {
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x111111,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Add some grid lines on the floor to give perspective
    const gridHelper = new THREE.GridHelper(20, 20, 0x00ff9d, 0x004d29);
    gridHelper.position.y = 0.01;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
}

// Create furniture
function createFurniture() {
    // Table group
    table = new THREE.Group();
    
    // Create texture loader for wood grain
    const textureLoader = new THREE.TextureLoader();
    
    // Load wood textures
    const woodTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/hardwood2_diffuse.jpg');
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(2, 1);
    
    // Enhanced table top with realistic wood material
    const tableTopGeometry = new THREE.BoxGeometry(2.2, 0.05, 1.2);
    const tableTopMaterial = new THREE.MeshStandardMaterial({
        map: woodTexture,
        color: 0xA07050, // Warm wood tone
        roughness: 0.6,
        metalness: 0.2,
        bumpMap: woodTexture,
        bumpScale: 0.02
    });
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.position.y = 0.75;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    table.add(tableTop);
    
    // Add beveled edge detail
    const bevelSize = 0.02;
    const topBevelGeom = new THREE.BoxGeometry(2.2 + bevelSize*2, bevelSize, 1.2 + bevelSize*2);
    const bevelMaterial = new THREE.MeshStandardMaterial({
        map: woodTexture,
        color: 0x8B5A2B, // Darker trim color
        roughness: 0.7,
        metalness: 0.1
    });
    const topBevel = new THREE.Mesh(topBevelGeom, bevelMaterial);
    topBevel.position.y = 0.75 + 0.05/2 + bevelSize/2;
    topBevel.castShadow = true;
    table.add(topBevel);
    
    // Create darker wood texture for legs
    const darkWoodMaterial = new THREE.MeshStandardMaterial({
        map: woodTexture,
        color: 0x6D4C41, // Darker stain for contrast
        roughness: 0.8,
        metalness: 0.1,
        bumpMap: woodTexture,
        bumpScale: 0.01
    });
    
    // Table legs with more detailed design
    const legPositions = [
        [-1.05, 0.375, 0.55],  // Front left
        [1.05, 0.375, 0.55],   // Front right
        [-1.05, 0.375, -0.55], // Back left
        [1.05, 0.375, -0.55]   // Back right
    ];
    
    legPositions.forEach((pos, index) => {
        const legGroup = new THREE.Group();
        legGroup.position.set(pos[0], pos[1], pos[2]);
        
        // Tapered leg design (narrower at bottom)
        const legGeometry = new THREE.CylinderGeometry(0.04, 0.03, 0.75, 8);
        const leg = new THREE.Mesh(legGeometry, darkWoodMaterial);
        leg.castShadow = true;
        legGroup.add(leg);
        
        // Decorative leg cap at top
        const capGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.03, 8);
        const cap = new THREE.Mesh(capGeometry, bevelMaterial);
        cap.position.y = 0.37;
        cap.castShadow = true;
        legGroup.add(cap);
        
        // Leg foot (slightly wider at base)
        const footGeometry = new THREE.CylinderGeometry(0.03, 0.04, 0.04, 8);
        const foot = new THREE.Mesh(footGeometry, bevelMaterial);
        foot.position.y = -0.37;
        foot.castShadow = true;
        legGroup.add(foot);
        
        table.add(legGroup);
    });
    
    // Add email text to the table surface
    addEmailToTable(darkWoodMaterial);
    
    // Add decorative items to table
    addTableDecorations();
    
    // Add table to scene
    scene.add(table);
}

// Add email text to the table
function addEmailToTable(woodMaterial) {
    // Create a canvas for the text
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // Transparent
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the email text with sleeker font
    ctx.fillStyle = '#3E2723'; // Dark brown for the engraving look
    ctx.font = 'bold 32px "Helvetica Neue", Arial, sans-serif'; // Sleeker font
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('zayn@cmu.edu', canvas.width / 2, canvas.height / 2);
    
    // Create texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    // Create material with the texture
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8 // Slightly higher opacity for better visibility
    });
    
    // Create a plane geometry for the text
    const geometry = new THREE.PlaneGeometry(0.6, 0.12); // Slightly smaller for more sleek appearance
    const textMesh = new THREE.Mesh(geometry, material);
    
    // Position the text on the table surface - moved to edge near chair
    // The chair is at position.z = 1.1, table is centered at z=0
    // Table is 1.2 units deep, so the front edge is around z=0.6
    textMesh.position.set(0.2, 0.779, 0.55); // Moved toward front edge of table, slightly offset to right
    textMesh.rotation.x = -Math.PI / 2; // Lay flat on the table
    textMesh.rotation.z = Math.PI / 24; // Slight angle for style
    
    table.add(textMesh);
}

// Add small decorative items to the table
function addTableDecorations() {
    // Small notebook
    const notebookGroup = new THREE.Group();
    notebookGroup.position.set(0.7, 0.78, 0.3);
    notebookGroup.rotation.y = Math.PI/6;
    
    // Notebook base
    const notebookGeometry = new THREE.BoxGeometry(0.2, 0.02, 0.3);
    const notebookMaterial = new THREE.MeshStandardMaterial({
        color: 0x263238, // Dark navy
        roughness: 0.9,
        metalness: 0.1
    });
    const notebook = new THREE.Mesh(notebookGeometry, notebookMaterial);
    notebook.castShadow = true;
    notebookGroup.add(notebook);
    
    // Notebook pages
    const pagesGeometry = new THREE.BoxGeometry(0.19, 0.015, 0.29);
    const pagesMaterial = new THREE.MeshStandardMaterial({
        color: 0xEFEFEF, // White pages
        roughness: 0.9,
        metalness: 0.0
    });
    const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
    pages.position.y = 0.017;
    pages.castShadow = true;
    notebookGroup.add(pages);
    
    table.add(notebookGroup);
    
    // Add water bowl (new item) - moved to cactus position
    const waterBowlGroup = new THREE.Group();
    waterBowlGroup.position.set(-0.8, 0.8, -0.4); // Moved to where the cactus was
    
    // Bowl exterior - made deeper for more water
    const bowlGeometry = new THREE.CylinderGeometry(0.1, 0.06, 0.1, 24); // Increased height
    const bowlMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xCCCCDD,  // Light blue-gray
        roughness: 0.2,
        metalness: 0.1,
        transparent: true,
        opacity: 0.7,
        transmission: 0.2  // Decreased for more visible bowl
    });
    const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
    bowl.castShadow = true;
    waterBowlGroup.add(bowl);
    
    // Water surface - raised higher to appear more filled
    const waterGeometry = new THREE.CircleGeometry(0.09, 24);
    const waterMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x3399FF,  // More vivid blue water
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.9,
        transmission: 0.6,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.8
    });
    const waterSurface = new THREE.Mesh(waterGeometry, waterMaterial);
    waterSurface.rotation.x = -Math.PI / 2;
    waterSurface.position.y = 0.04;  // Raised higher to show more filled bowl
    waterBowlGroup.add(waterSurface);
    
    // Multiple reflections for more realistic water appearance
    const reflectionSizes = [0.03, 0.02, 0.015];
    const reflectionPositions = [
        [-0.02, 0.041, 0.02],
        [0.025, 0.041, -0.01],
        [-0.01, 0.041, -0.025]
    ];
    
    reflectionPositions.forEach((pos, i) => {
        const reflectionGeometry = new THREE.CircleGeometry(reflectionSizes[i], 16);
        const reflectionMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.3 + (i * 0.1)
        });
        const reflection = new THREE.Mesh(reflectionGeometry, reflectionMaterial);
        reflection.rotation.x = -Math.PI / 2;
        reflection.position.set(...pos);
        waterBowlGroup.add(reflection);
    });
    
    // Add a soft light to make water glow slightly - brighter blue
    const waterLight = new THREE.PointLight(0x0055FF, 0.7, 0.5);
    waterLight.position.set(0, 0.1, 0);
    waterBowlGroup.add(waterLight);
    
    // Add a second water layer slightly below the surface for depth effect - more vibrant blue
    const deepWaterGeometry = new THREE.CircleGeometry(0.088, 24);
    const deepWaterMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0055FF,  // More vibrant blue for depth
        roughness: 0.1, 
        metalness: 0.3,
        transparent: true,
        opacity: 0.8,
        transmission: 0.3
    });
    const deepWaterSurface = new THREE.Mesh(deepWaterGeometry, deepWaterMaterial);
    deepWaterSurface.rotation.x = -Math.PI / 2;
    deepWaterSurface.position.y = 0.02;
    waterBowlGroup.add(deepWaterSurface);
    
    // Add ripple effect for more realistic water
    const rippleGeometry = new THREE.RingGeometry(0.03, 0.06, 20);
    const rippleMaterial = new THREE.MeshBasicMaterial({
        color: 0x0099FF,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
    ripple.rotation.x = -Math.PI / 2;
    ripple.position.y = 0.042;
    waterBowlGroup.add(ripple);
    
    table.add(waterBowlGroup);
    
    // Coffee mug
    const mugGroup = new THREE.Group();
    mugGroup.position.set(-0.5, 0.82, 0.2);
    
    // Mug body
    const mugGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.12, 16);
    const mugMaterial = new THREE.MeshStandardMaterial({
        color: 0xc0c0c0, // Silver/gray
        roughness: 0.2,
        metalness: 0.8
    });
    const mug = new THREE.Mesh(mugGeometry, mugMaterial);
    mug.castShadow = true;
    mugGroup.add(mug);
    
    // Mug handle
    const handleGeometry = new THREE.TorusGeometry(0.03, 0.01, 8, 16, Math.PI);
    const handle = new THREE.Mesh(handleGeometry, mugMaterial);
    handle.position.set(-0.05, 0, 0);
    handle.rotation.y = Math.PI/2;
    handle.castShadow = true;
    mugGroup.add(handle);
    
    table.add(mugGroup);
    
    // Replace Manchester United trophy with larger, better one - raised higher
    const trophyGroup = new THREE.Group();
    trophyGroup.position.set(0.8, 0.83, -0.4); // Raised y position from 0.78 to 0.83
    
    // Larger trophy base
    const baseGeometry = new THREE.CylinderGeometry(0.07, 0.08, 0.03, 32);
    const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFD700, // Gold
        roughness: 0.15,
        metalness: 0.9,
        envMapIntensity: 1.0
    });
    const base = new THREE.Mesh(baseGeometry, goldMaterial);
    base.castShadow = true;
    trophyGroup.add(base);
    
    // Add base platform
    const platformGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.01, 32);
    const platformMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513, // Dark wood color
        roughness: 0.8,
        metalness: 0.2
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -0.015;
    platform.castShadow = true;
    trophyGroup.add(platform);
    
    // Trophy stem - taller and more elegant
    const stemGeometry = new THREE.CylinderGeometry(0.015, 0.025, 0.08, 16);
    const stem = new THREE.Mesh(stemGeometry, goldMaterial);
    stem.position.y = 0.05;
    stem.castShadow = true;
    trophyGroup.add(stem);
    
    // Trophy middle ornament
    const middleOrnamentGeometry = new THREE.SphereGeometry(0.03, 16, 16);
    const middleOrnament = new THREE.Mesh(middleOrnamentGeometry, goldMaterial);
    middleOrnament.position.y = 0.09;
    middleOrnament.castShadow = true;
    trophyGroup.add(middleOrnament);
    
    // Trophy cup - larger and more detailed
    const cupGeometry = new THREE.CylinderGeometry(0.06, 0.03, 0.1, 32);
    
    // Premier League trophy-inspired red material with more shine
    const redMaterial = new THREE.MeshStandardMaterial({
        color: 0xDA020E, // Manchester United red
        roughness: 0.2,
        metalness: 0.7,
        emissive: 0xDA020E,
        emissiveIntensity: 0.2
    });
    
    const cup = new THREE.Mesh(cupGeometry, redMaterial);
    cup.position.y = 0.18;
    cup.castShadow = true;
    trophyGroup.add(cup);
    
    // Trophy handles - more ornate
    const handleShape = new THREE.TorusGeometry(0.025, 0.007, 12, 32, Math.PI);
    
    // Left handle
    const leftHandle = new THREE.Mesh(handleShape, goldMaterial);
    leftHandle.position.set(-0.06, 0.18, 0);
    leftHandle.rotation.y = Math.PI/2;
    leftHandle.castShadow = true;
    trophyGroup.add(leftHandle);
    
    // Right handle
    const rightHandle = new THREE.Mesh(handleShape, goldMaterial);
    rightHandle.position.set(0.06, 0.18, 0);
    rightHandle.rotation.y = -Math.PI/2;
    rightHandle.castShadow = true;
    trophyGroup.add(rightHandle);
    
    // Trophy top rim
    const rimGeometry = new THREE.TorusGeometry(0.06, 0.01, 16, 32);
    const rim = new THREE.Mesh(rimGeometry, goldMaterial);
    rim.position.y = 0.23;
    rim.rotation.x = Math.PI/2;
    rim.castShadow = true;
    trophyGroup.add(rim);
    
    // Trophy crown-like top
    const crownGeometry = new THREE.CylinderGeometry(0.02, 0.04, 0.03, 16);
    const crown = new THREE.Mesh(crownGeometry, goldMaterial);
    crown.position.y = 0.25;
    crown.castShadow = true;
    trophyGroup.add(crown);
    
    // Ball on top (football)
    const ballGeometry = new THREE.SphereGeometry(0.025, 16, 16);
    const ballMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF, // White football
        roughness: 0.4,
        metalness: 0.1
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.y = 0.29;
    ball.castShadow = true;
    trophyGroup.add(ball);
    
    // Add black pentagonal patterns to the ball for football look
    const pentGeometry = new THREE.CircleGeometry(0.008, 5);
    const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    // Add a few pentagons in different positions
    const pentPositions = [
        [0, 0.29, 0.025],
        [0.018, 0.3, 0.018],
        [-0.018, 0.28, 0.018],
        [0, 0.29, -0.025]
    ];
    
    pentPositions.forEach(pos => {
        const pentagon = new THREE.Mesh(pentGeometry, blackMaterial);
        pentagon.position.set(...pos);
        pentagon.lookAt(new THREE.Vector3(pos[0]*2, pos[1], pos[2]*2));
        trophyGroup.add(pentagon);
    });
    
    // Enhanced Manchester United badge on front of trophy
    const badgeGeometry = new THREE.CircleGeometry(0.035, 32);
    const badgeMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFD700, // Gold badge
        roughness: 0.3,
        metalness: 0.7
    });
    const badge = new THREE.Mesh(badgeGeometry, badgeMaterial);
    badge.position.set(0, 0.18, 0.04);
    badge.castShadow = true;
    trophyGroup.add(badge);
    
    // Red devil silhouette on badge - more detailed
    const devilGeometry = new THREE.CircleGeometry(0.025, 32);
    const devilMaterial = new THREE.MeshStandardMaterial({
        color: 0xDA020E, // Red devil
        roughness: 0.3,
        metalness: 0.5
    });
    const devil = new THREE.Mesh(devilGeometry, devilMaterial);
    devil.position.set(0, 0.18, 0.041);
    devil.castShadow = true;
    trophyGroup.add(devil);
    
    // Add text "MUFC" on the base
    const textGeometry = new THREE.CircleGeometry(0.025, 32);
    const textMaterial = new THREE.MeshStandardMaterial({
        color: 0xDA020E,
        roughness: 0.3,
        metalness: 0.5,
    });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.set(0, 0.01, 0.05);
    text.rotation.x = -Math.PI / 2;
    text.scale.set(1, 0.3, 1);
    trophyGroup.add(text);
    
    // Add trophy with slight rotation for better view
    trophyGroup.rotation.y = Math.PI/6;
    table.add(trophyGroup);
    
    // Slytherin themed potion bottle - positioned at bottom left area
    const potionGroup = new THREE.Group();
    potionGroup.position.set(-0.8, 0.82, 0.4); // Bottom left area
    potionGroup.rotation.y = Math.PI / 6; // Slight rotation for interest
    
    // Bottle base with darker Slytherin green
    const bottleGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.15, 12);
    const bottleGlassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1A472A, // Darker Slytherin green
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.7,
        transmission: 0.5 // Glass-like transparency
    });
    const bottle = new THREE.Mesh(bottleGeometry, bottleGlassMaterial);
    bottle.castShadow = true;
    potionGroup.add(bottle);
    
    // Bottle neck
    const neckGeometry = new THREE.CylinderGeometry(0.015, 0.03, 0.05, 12);
    const neck = new THREE.Mesh(neckGeometry, bottleGlassMaterial);
    neck.position.y = 0.1;
    neck.castShadow = true;
    potionGroup.add(neck);
    
    // Bottle cork
    const corkGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 12);
    const corkMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513, // Brown cork
        roughness: 0.9,
        metalness: 0.0
    });
    const cork = new THREE.Mesh(corkGeometry, corkMaterial);
    cork.position.y = 0.135;
    cork.castShadow = true;
    potionGroup.add(cork);
    
    // Silver snake wrapping around bottle
    const snakeGroup = new THREE.Group();
    
    // Create a silver snake that wraps around the bottle
    const silverMaterial = new THREE.MeshStandardMaterial({
        color: 0xC0C0C0, // Silver
        roughness: 0.2,
        metalness: 0.8
    });
    
    // Create a more intricate snake using a helix shape
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.05, -0.05, 0),
        new THREE.Vector3(0.05, 0, 0.04),
        new THREE.Vector3(0, 0.04, 0.05),
        new THREE.Vector3(-0.04, 0.08, 0),
        new THREE.Vector3(0, 0.12, -0.04),
        new THREE.Vector3(0.04, 0.08, 0)
    ]);
    
    const tubeGeometry = new THREE.TubeGeometry(curve, 32, 0.007, 8, false);
    const snake = new THREE.Mesh(tubeGeometry, silverMaterial);
    snake.castShadow = true;
    snakeGroup.add(snake);
    
    // Add snake head
    const snakeHeadGeometry = new THREE.ConeGeometry(0.01, 0.025, 8);
    const snakeHead = new THREE.Mesh(snakeHeadGeometry, silverMaterial);
    snakeHead.position.set(0.04, 0.08, 0);
    snakeHead.rotation.z = Math.PI / 2;
    snakeHead.castShadow = true;
    snakeGroup.add(snakeHead);
    
    // Add green gemstone eyes
    const eyeGeometry = new THREE.SphereGeometry(0.003, 8, 8);
    const eyeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FF00, // Bright green for the eyes
    });
    
    [-0.004, 0.004].forEach(offset => {
        const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        eye.position.set(0.053, 0.08 + offset, 0);
        snakeGroup.add(eye);
    });
    
    // Add small Slytherin emblem on bottle
    const emblemGeometry = new THREE.CircleGeometry(0.02, 16);
    const emblemMaterial = new THREE.MeshBasicMaterial({
        color: 0xC0C0C0, // Silver for base
    });
    const emblem = new THREE.Mesh(emblemGeometry, emblemMaterial);
    emblem.position.set(0, 0.05, 0.051);
    emblem.rotation.x = 0;
    
    // Add green 'S' (simplified as a green circle)
    const sGeometry = new THREE.CircleGeometry(0.012, 16);
    const sMaterial = new THREE.MeshBasicMaterial({
        color: 0x1A472A, // Slytherin green
    });
    const s = new THREE.Mesh(sGeometry, sMaterial);
    s.position.set(0, 0.05, 0.052);
    
    potionGroup.add(snakeGroup);
    potionGroup.add(emblem);
    potionGroup.add(s);
    
    table.add(potionGroup);
}

// Create computer with improved stand position
function createComputer() {
    // Computer group
    computer = new THREE.Group();
    
    // Base materials
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.5,
        metalness: 0.7
    });
    
    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x555555,
        roughness: 0.3,
        metalness: 0.8
    });
    
    // Computer base
    const baseGeometry = new THREE.BoxGeometry(0.6, 0.03, 0.4);
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.835;
    base.castShadow = true;
    computer.add(base);
    
    // MODIFIED: Stand support - moved to the back to not block the view
    const standGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.05);
    const stand = new THREE.Mesh(standGeometry, metalMaterial);
    stand.position.y = 0.98;
    stand.position.z = -0.2; // Moved further back
    stand.castShadow = true;
    computer.add(stand);
    
    // Screen frame
    const frameGeometry = new THREE.BoxGeometry(0.9, 0.6, 0.05);
    const frame = new THREE.Mesh(frameGeometry, baseMaterial);
    frame.position.y = 1.2;
    frame.position.z = -0.12;
    frame.castShadow = true;
    computer.add(frame);
    
    // Computer screen with website texture
    const screenGeometry = new THREE.PlaneGeometry(0.8, 0.5);
    let screenMaterial;
    
    if (computerTexture) {
        screenMaterial = new THREE.MeshBasicMaterial({
            map: computerTexture,
            emissive: 0x00ff9d,
            emissiveIntensity: 0.5
        });
    } else {
        // Fallback if texture wasn't created
        screenMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            emissive: 0x00ff9d,
            emissiveIntensity: 0.2
        });
    }
    
    computerScreen = new THREE.Mesh(screenGeometry, screenMaterial);
    computerScreen.position.y = 1.2;
    computerScreen.position.z = -0.085;
    computerScreen.userData = { isInteractive: true };
    computer.add(computerScreen);
    
    // Position computer on table
    computer.position.z = -0.3;
    
    scene.add(computer);
}

// Create keyboard for the desk - repositioned to be in front of the computer
function createKeyboard() {
    const keyboard = new THREE.Group();
    
    // Keyboard base
    const keyboardBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.03, 0.3),
        new THREE.MeshStandardMaterial({
            color: 0x333333,
            roughness: 0.8,
            metalness: 0.2
        })
    );
    keyboard.add(keyboardBase);
    
    // Key material
    const keyMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.9,
        metalness: 0.1
    });
    
    // Create keys - main key area
    const keySize = 0.035;
    const keySpacing = 0.04;
    const keyRows = 5;
    const keyCols = 15;
    
    for (let row = 0; row < keyRows; row++) {
        for (let col = 0; col < keyCols; col++) {
            const key = new THREE.Mesh(
                new THREE.BoxGeometry(keySize, 0.01, keySize),
                keyMaterial
            );
            
            // Position keys with proper spacing
            key.position.set(
                -0.35 + col * keySpacing,
                0.02,
                -0.12 + row * keySpacing
            );
            
            keyboard.add(key);
        }
    }
    
    // Add space bar
    const spaceBar = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.01, keySize),
        keyMaterial
    );
    spaceBar.position.set(0, 0.02, 0.08);
    keyboard.add(spaceBar);
    
    // MODIFIED: Position keyboard directly in front of the computer
    keyboard.position.set(0, 0.79, 0); // Centered in X, in front of computer in Z
    keyboard.rotation.y = 0; // No rotation for better alignment
    keyboard.castShadow = true;
    
    table.add(keyboard);
}

// Create mouse for the desk - repositioned to be beside the keyboard
function createMouse() {
    const mouse = new THREE.Group();
    
    // Mouse body
    const mouseMaterial = new THREE.MeshStandardMaterial({
        color: 0x2c2c2c,
        roughness: 0.5,
        metalness: 0.3
    });
    
    // Create mouse using merged geometries for a better shape
    const mouseBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.02, 0.1),
        mouseMaterial
    );
    mouse.add(mouseBase);
    
    // Mouse top/curved part
    const mouseTop = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        mouseMaterial
    );
    mouseTop.scale.set(0.6, 0.6, 1);
    mouseTop.rotation.x = -Math.PI / 2;
    mouseTop.position.set(0, 0.02, 0);
    mouse.add(mouseTop);
    
    // Left button
    const leftButton = new THREE.Mesh(
        new THREE.BoxGeometry(0.028, 0.008, 0.045),
        new THREE.MeshStandardMaterial({
            color: 0x1e1e1e,
            roughness: 0.5
        })
    );
    leftButton.position.set(-0.015, 0.028, -0.025);
    mouse.add(leftButton);
    
    // Right button
    const rightButton = new THREE.Mesh(
        new THREE.BoxGeometry(0.028, 0.008, 0.045),
        new THREE.MeshStandardMaterial({
            color: 0x1e1e1e,
            roughness: 0.5
        })
    );
    rightButton.position.set(0.015, 0.028, -0.025);
    mouse.add(rightButton);
    
    // MODIFIED: Position the mouse to the right of the keyboard
    mouse.position.set(0.5, 0.79, 0.05);
    mouse.rotation.y = 0; // No rotation for better alignment
    
    table.add(mouse);
}

// Create office chair (replaces the stool but keeps the same variable name for compatibility)
function createStool() {
    stool = new THREE.Group();
    
    // Materials
    const fabricMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111, // Dark fabric
        roughness: 0.9,
        metalness: 0.1
    });
    
    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x777777,
        roughness: 0.3,
        metalness: 0.8
    });
    
    const accentMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.4,
        metalness: 0.5
    });
    
    // Five-star base
    const baseGroup = new THREE.Group();
    
    // Central hub of the base
    const hubGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.03, 16);
    const hub = new THREE.Mesh(hubGeometry, metalMaterial);
    hub.position.y = 0.015;
    hub.castShadow = true;
    baseGroup.add(hub);
    
    // Create 5 legs for the base
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        
        // Create leg
        const legGeometry = new THREE.BoxGeometry(0.05, 0.02, 0.2);
        const leg = new THREE.Mesh(legGeometry, metalMaterial);
        leg.position.set(Math.cos(angle) * 0.15, 0, Math.sin(angle) * 0.15);
        leg.rotation.y = angle;
        leg.castShadow = true;
        baseGroup.add(leg);
        
        // Create wheel at the end of each leg
        const wheelGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.01, 8);
        wheelGeometry.rotateX(Math.PI / 2);
        const wheel = new THREE.Mesh(wheelGeometry, accentMaterial);
        wheel.position.set(Math.cos(angle) * 0.25, -0.01, Math.sin(angle) * 0.25);
        wheel.castShadow = true;
        baseGroup.add(wheel);
    }
    
    stool.add(baseGroup);
    
    // Hydraulic column
    const columnGroup = new THREE.Group();
    
    // Main cylinder
    const mainColumnGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 12);
    const mainColumn = new THREE.Mesh(mainColumnGeometry, metalMaterial);
    mainColumn.position.y = 0.2;
    mainColumn.castShadow = true;
    columnGroup.add(mainColumn);
    
    // Column cover (hydraulic mechanism)
    const coverGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.1, 12);
    const cover = new THREE.Mesh(coverGeometry, accentMaterial);
    cover.position.y = 0.05;
    cover.castShadow = true;
    columnGroup.add(cover);
    
    stool.add(columnGroup);
    
    // Seat assembly
    const seatGroup = new THREE.Group();
    seatGroup.position.y = 0.4;
    
    // Seat pan base
    const seatPanGeometry = new THREE.BoxGeometry(0.4, 0.03, 0.4);
    const seatPan = new THREE.Mesh(seatPanGeometry, accentMaterial);
    seatPan.position.y = 0.02;
    seatPan.castShadow = true;
    seatGroup.add(seatPan);
    
    // Seat cushion with ergonomic shape
    const seatGeometry = new THREE.BoxGeometry(0.38, 0.05, 0.38);
    // Round the corners by creating a custom shape
    seatGeometry.translate(0, 0.025, 0);
    const seatCushion = new THREE.Mesh(seatGeometry, fabricMaterial);
    seatCushion.position.y = 0.04;
    // Add slight tilt for ergonomics
    seatCushion.rotation.x = -0.05;
    seatCushion.castShadow = true;
    seatGroup.add(seatCushion);
    
    // Backrest assembly
    const backrestGroup = new THREE.Group();
    backrestGroup.position.set(0, 0.1, -0.18);
    
    // Backrest support
    const backSupportGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.02);
    const backSupport = new THREE.Mesh(backSupportGeometry, metalMaterial);
    backSupport.position.y = 0.2;
    backSupport.castShadow = true;
    backrestGroup.add(backSupport);
    
    // Backrest cushion
    const backGeometry = new THREE.BoxGeometry(0.38, 0.3, 0.05);
    const backCushion = new THREE.Mesh(backGeometry, fabricMaterial);
    backCushion.position.set(0, 0.3, -0.03);
    // Add curve to back by scaling parts differently
    backCushion.geometry.translate(0, 0, 0.02);
    backCushion.castShadow = true;
    backrestGroup.add(backCushion);
    
    // Lumbar support
    const lumbarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 12, 1, false, -Math.PI/2, Math.PI);
    const lumbarSupport = new THREE.Mesh(lumbarGeometry, fabricMaterial);
    lumbarSupport.rotation.x = Math.PI / 2;
    lumbarSupport.position.set(0, 0.22, 0.01);
    lumbarSupport.scale.set(1, 0.6, 1);
    backrestGroup.add(lumbarSupport);
    
    seatGroup.add(backrestGroup);
    
    // Armrests
    [-0.22, 0.22].forEach(xPos => {
        const armGroup = new THREE.Group();
        
        // Armrest support
        const armSupportGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8);
        const armSupport = new THREE.Mesh(armSupportGeometry, metalMaterial);
        armSupport.position.set(0, 0.1, 0);
        armSupport.castShadow = true;
        armGroup.add(armSupport);
        
        // Armrest pad
        const armPadGeometry = new THREE.BoxGeometry(0.12, 0.03, 0.2);
        const armPad = new THREE.Mesh(armPadGeometry, fabricMaterial);
        armPad.position.set(0, 0.2, 0);
        // Round front edges
        armPad.geometry.translate(0, 0, -0.02);
        armPad.castShadow = true;
        armGroup.add(armPad);
        
        armGroup.position.set(xPos, 0.05, -0.08);
        seatGroup.add(armGroup);
    });
    
    stool.add(seatGroup);
    
    // Position chair in front of table
    stool.position.set(0, 0, 1.1);
    stool.rotation.y = Math.PI; // Rotate 180 degrees to face the computer/table
    
    scene.add(stool);
}

// Window resize handler
function onWindowResize() {
    if (!camera || !renderer) return;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mouse move handler
function onMouseMove(event) {
    if (!camera || !raycaster || !computerScreen) return;
    
    // Calculate normalized mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Check for intersections
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(computerScreen);
    
    if (intersects.length > 0) {
        if (!isComputerHovered) {
            isComputerHovered = true;
            document.body.style.cursor = 'pointer';
        }
    } else {
        if (isComputerHovered) {
            isComputerHovered = false;
            document.body.style.cursor = 'default';
        }
    }
}

// Animate camera position
function animateCameraPosition(startPos, endPos, duration, callback) {
    const startTime = Date.now();
    
    function updatePosition() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease function - smooth transition
        const easeProgress = progress < 0.5 ? 
            2 * progress * progress : 
            -1 + (4 - 2 * progress) * progress;
        
        // Interpolate position
        const newX = startPos.x + (endPos.x - startPos.x) * easeProgress;
        const newY = startPos.y + (endPos.y - startPos.y) * easeProgress;
        const newZ = startPos.z + (endPos.z - startPos.z) * easeProgress;
        
        camera.position.set(newX, newY, newZ);
        
        if (progress < 1) {
            requestAnimationFrame(updatePosition);
        } else {
            if (callback) callback();
        }
    }
    
    updatePosition();
}

// Mouse click handler - now with zoom animation
function onMouseClick() {
    if (!isSceneLoaded || !raycaster || !computerScreen || isTransitioning) return;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(computerScreen);
    
    if (intersects.length > 0) {
        // Computer clicked - zoom in and then show interface
        zoomToComputer();
    }
}

// Add smooth zoom animation to computer with direct transition
function zoomToComputer() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    console.log("Zooming to computer screen");
    
    // Save original position
    const startPosition = camera.position.clone();
    const startRotation = camera.rotation.clone();
    
    // Position directly in front of computer screen (very close)
    const targetPosition = new THREE.Vector3(0, 1.2, -0.04);
    
    // Disable controls during animation
    if (controls) {
        controls.enabled = false;
    }
    
    // Animation duration in milliseconds
    const duration = 1200;
    const startTime = Date.now();
    
    function animateCamera() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease in and out for smoother animation
        const easeProgress = progress < 0.5 ? 
            2 * progress * progress : 
            -1 + (4 - 2 * progress) * progress;
        
        // Update camera position
        camera.position.x = startPosition.x + (targetPosition.x - startPosition.x) * easeProgress;
        camera.position.y = startPosition.y + (targetPosition.y - startPosition.y) * easeProgress;
        camera.position.z = startPosition.z + (targetPosition.z - startPosition.z) * easeProgress;
        
        // Look directly at the computer screen
        camera.lookAt(0, 1.2, -0.1);
        
        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        } else {
            // Animation complete, show interface directly over the screen
            showInterfaceOverScreen();
            isTransitioning = false;
        }
    }
    
    // Start animation
    animateCamera();
}

// Show interface directly over the computer screen
function showInterfaceOverScreen() {
    // Get the interface container
    const interfaceContainer = document.getElementById('interface-container');
    if (interfaceContainer) {
        // Position interface over the 3D scene
        interfaceContainer.style.display = 'block';
        interfaceContainer.style.opacity = '1';
        interfaceContainer.classList.add('screen-overlay');
        
        // Keep 3D scene visible but make it non-interactive
        const roomScene = document.getElementById('room-scene');
        if (roomScene) {
            roomScene.style.pointerEvents = 'none';
        }
        
        // Match the computer screen exactly - create the init screen dynamically to ensure it matches
        createMatchingInitScreen();
        
        // Show initialization screen and set up access button
        const initScreen = document.getElementById('system-init-screen');
        const accessButton = document.getElementById('access-button');
        
        if (initScreen && accessButton) {
            initScreen.style.display = 'flex';
            
            // Add click event for access button
            accessButton.addEventListener('click', function() {
                // Hide initialization screen with fade
                initScreen.classList.add('hidden');
                
                // After fade out, hide completely and show main content
                setTimeout(function() {
                    initScreen.style.display = 'none';
                    
                    // Show main content
                    const mainPanel = document.getElementById('main-panel');
                    if (mainPanel) {
                        mainPanel.style.display = 'block';
                        mainPanel.style.opacity = '1';
                    }
                    
                    // Initialize skill bars
                    animateSkillBars();
                }, 800);
            });
        }
        
        // Add screen effects for realism
        const screenGlare = document.getElementById('screen-glare');
        const screenScanlines = document.getElementById('screen-scanlines');
        if (screenGlare) screenGlare.style.opacity = '0.3';
        if (screenScanlines) screenScanlines.style.opacity = '0.1';
    }
}

// Create an init screen that exactly matches the 3D computer texture
function createMatchingInitScreen() {
    const initScreen = document.getElementById('system-init-screen');
    if (!initScreen) return;
    
    // Match the styling to the exact texture we created earlier
    initScreen.innerHTML = `
        <div class="init-content">
            <h1 class="init-title">> INITIALIZE SYSTEM</h1>
            <div class="terminal-content">
                <p class="init-text">> Establishing secure connection...</p>
                <p class="init-text">> Authenticating user credentials...</p>
                <p class="init-text">> Access granted to personal profile</p>
                <p class="init-text">> Loading interface modules...</p>
                <p class="init-text blinking-cursor">_</p>
            </div>
            <button class="access-button" id="access-button">ACCESS</button>
        </div>
    `;
}

// Reset camera position and prepare system for next use
function resetCameraPosition() {
    const currentPos = camera.position.clone();
    const originalPos = new THREE.Vector3(0, 1.6, 3);
    const startTime = Date.now();
    const duration = 1000;
    
    // Reset the initialization screen for next time
    const initScreen = document.getElementById('system-init-screen');
    const mainPanel = document.getElementById('main-panel');
    if (initScreen && mainPanel) {
        // Recreate the init screen to ensure it matches
        createMatchingInitScreen();
        
        // Reset visibility
        initScreen.classList.remove('hidden');
        initScreen.style.display = 'flex';
        mainPanel.style.display = 'none';
        mainPanel.style.opacity = '0';
    }
    
    function resetCamera() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing
        const easeProgress = progress < 0.5 ? 
            2 * progress * progress : 
            -1 + (4 - 2 * progress) * progress;
        
        camera.position.x = currentPos.x + (originalPos.x - currentPos.x) * easeProgress;
        camera.position.y = currentPos.y + (originalPos.y - currentPos.y) * easeProgress;
        camera.position.z = currentPos.z + (originalPos.z - currentPos.z) * easeProgress;
        
        // Reset camera rotation
        camera.lookAt(0, 1.2, 0);
        
        if (progress < 1) {
            requestAnimationFrame(resetCamera);
        } else {
            // Re-enable controls after animation
            if (controls) {
                controls.enabled = true;
            }
        }
    }
    
    resetCamera();
}

// Animate skill bars when visible
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width') || bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Replace activateInterface with custom function
function activateInterface() {
    // This function is now replaced by zoomToComputer and showInterfaceOverScreen
    zoomToComputer();
}

// Animation loop
function animate() {
    if (!renderer || !scene || !camera) return;
    
    requestAnimationFrame(animate);
    
    // Update controls
    if (controls && controls.enabled) {
        controls.update();
    }
    
    // Render scene
    try {
        renderer.render(scene, camera);
    } catch (e) {
        console.error("Render error:", e);
    }
}

// Show fallback content if 3D fails
function showFallbackContent() {
    // Make interface directly accessible
    const roomScene = document.getElementById('room-scene');
    if (roomScene) {
        roomScene.innerHTML = `
            <div style="padding: 20px; color: var(--light-green); text-align: center;">
                <h2>3D Environment could not be loaded</h2>
                <p>Click the button below to continue to the portfolio</p>
                <button id="fallback-button" style="background: transparent; border: 2px solid var(--light-green); 
                color: var(--light-green); padding: 10px 20px; margin-top: 20px; cursor: pointer;">
                    Continue
                </button>
            </div>
        `;
        
        const fallbackButton = document.getElementById('fallback-button');
        if (fallbackButton) {
            fallbackButton.addEventListener('click', function() {
                activateInterface();
            });
        }
    }
}

// Make the function globally available
window.activateInterface = activateInterface;
