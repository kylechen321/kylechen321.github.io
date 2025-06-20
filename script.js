/**
 * ==========================================
 * KYLE CHEN - REVOLUTIONARY ROBOTICS PORTFOLIO
 * Advanced JavaScript for Interactive Experiences
 * ==========================================
 */

// ===========================================
// GSAP SETUP & REGISTRATION
// ===========================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

// ===========================================
// GLOBAL VARIABLES & CONFIGURATION
// ===========================================
let scene, camera, renderer, particleSystem, neuralNetwork;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const config = {
    particles: {
        count: 100,
        speed: 0.5,
        size: 2
    },
    animation: {
        duration: 1.2,
        ease: "power3.out"
    },
    performance: {
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
};

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Kyle\'s Revolutionary Portfolio...');
    
    // Initialize all systems
    initLoadingScreen();
    initCustomCursor();
    initThreeJS();
    initNeuralNetwork();
    initScrollAnimations();
    initNavigation();
    initProjectInteractions();
    initSkillsAnimations();
    initPerformanceOptimizations();
    
    console.log('✅ Portfolio systems initialized successfully!');
});

// ===========================================
// LOADING SCREEN
// ===========================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    const loadingText = document.querySelector('.loading-text');
    
    // Simulated loading sequence
    const loadingSteps = [
        'Initializing Neural Networks...',
        'Calibrating Sensors...',
        'Loading Computer Vision...',
        'Establishing Connections...',
        'Ready to Launch!'
    ];
    
    let progress = 0;
    let stepIndex = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Complete loading
            setTimeout(() => {
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                        startMainAnimations();
                    }
                });
            }, 500);
        }
        
        // Update progress bar
        gsap.to(progressBar, {
            width: `${progress}%`,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Update loading text
        if (stepIndex < loadingSteps.length - 1 && progress > (stepIndex + 1) * 20) {
            stepIndex++;
            loadingText.textContent = loadingSteps[stepIndex];
        }
        
    }, 200);
}

function startMainAnimations() {
    // Hero text animations
    const heroName = document.querySelector('.hero-name');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroActions = document.querySelector('.hero-actions');
    
    const tl = gsap.timeline();
    
    // Animate name letters
    tl.from('.name-letter', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)"
    })
    .from('.hero-title .title-line', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.5")
    .from(heroDescription, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.3")
    .from('.cta-button', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.2")
    .from('.achievement-stats .stat-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.4");
    
    // Animate stats counting
    animateStatCounters();
}

function animateStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.value);
        const counter = { value: 0 };
        
        gsap.to(counter, {
            value: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                stat.textContent = Math.round(counter.value);
            }
        });
    });
}

// ===========================================
// CUSTOM CURSOR
// ===========================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor-tracker');
    const follower = document.getElementById('cursor-follower');
    
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        // Update cursor position immediately
        gsap.to(cursor, {
            x: cursorX - 10,
            y: cursorY - 10,
            duration: 0,
            opacity: 1
        });
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (cursorX - followerX) * 0.1;
        followerY += (cursorY - followerY) * 0.1;
        
        gsap.set(follower, {
            x: followerX - 20,
            y: followerY - 20,
            opacity: 1
        });
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            gsap.to(follower, { scale: 1.2, duration: 0.3 });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, { scale: 1, duration: 0.3 });
        });
    });
}

// ===========================================
// THREE.JS 3D EFFECTS
// ===========================================
function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Particle system
    createParticleSystem();
    
    // Floating geometric shapes
    createFloatingShapes();
    
    // Camera position
    camera.position.z = 5;
    
    // Mouse interaction
    document.addEventListener('mousemove', onMouseMove);
    
    // Render loop
    animate3D();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createParticleSystem() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    for (let i = 0; i < config.particles.count; i++) {
        vertices.push(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        
        // Neon colors
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.1 + 0.5, 1, 0.5);
        colors.push(color.r, color.g, color.b);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: config.particles.size,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
}

function createFloatingShapes() {
    // Circuit board inspired shapes
    const shapes = [];
    
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.RingGeometry(0.5, 0.7, 6);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00f5ff,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        shapes.push(mesh);
        scene.add(mesh);
    }
    
    // Store for animation
    scene.userData.shapes = shapes;
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / windowHalfX;
    mouseY = (event.clientY - windowHalfY) / windowHalfY;
}

function animate3D() {
    requestAnimationFrame(animate3D);
    
    // Rotate particle system
    if (particleSystem) {
        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.001;
    }
    
    // Animate floating shapes
    if (scene.userData.shapes) {
        scene.userData.shapes.forEach((shape, index) => {
            shape.rotation.x += 0.01 + index * 0.002;
            shape.rotation.y += 0.005 + index * 0.001;
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
        });
    }
    
    // Camera movement based on mouse
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===========================================
// NEURAL NETWORK VISUALIZATION
// ===========================================
function initNeuralNetwork() {
    const svg = document.querySelector('.network-svg');
    if (!svg) return;
    
    const width = 800;
    const height = 600;
    
    // Create neural network nodes and connections
    const nodes = [];
    const connections = [];
    
    // Generate nodes in layers
    const layers = [6, 8, 6, 4];
    let nodeId = 0;
    
    layers.forEach((layerSize, layerIndex) => {
        const layerX = (layerIndex / (layers.length - 1)) * (width - 100) + 50;
        const startY = (height - (layerSize - 1) * 60) / 2;
        
        for (let i = 0; i < layerSize; i++) {
            nodes.push({
                id: nodeId++,
                x: layerX,
                y: startY + i * 60,
                layer: layerIndex
            });
        }
    });
    
    // Generate connections
    for (let layer = 0; layer < layers.length - 1; layer++) {
        const currentLayerNodes = nodes.filter(n => n.layer === layer);
        const nextLayerNodes = nodes.filter(n => n.layer === layer + 1);
        
        currentLayerNodes.forEach(node1 => {
            nextLayerNodes.forEach(node2 => {
                if (Math.random() > 0.3) { // 70% connection probability
                    connections.push({
                        from: node1,
                        to: node2,
                        strength: Math.random()
                    });
                }
            });
        });
    }
    
    // Render connections
    connections.forEach((conn, index) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', conn.from.x);
        line.setAttribute('y1', conn.from.y);
        line.setAttribute('x2', conn.to.x);
        line.setAttribute('y2', conn.to.y);
        line.setAttribute('stroke', 'url(#networkGradient)');
        line.setAttribute('stroke-width', conn.strength * 2);
        line.setAttribute('opacity', 0.4);
        line.style.animationDelay = `${index * 0.1}s`;
        svg.appendChild(line);
    });
    
    // Render nodes
    nodes.forEach((node, index) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', 4);
        circle.setAttribute('fill', '#00f5ff');
        circle.setAttribute('opacity', 0.8);
        circle.style.animationDelay = `${index * 0.05}s`;
        svg.appendChild(circle);
    });
}

// ===========================================
// SCROLL ANIMATIONS
// ===========================================
function initScrollAnimations() {
    // Fade in sections
    gsap.utils.toArray('.projects-section, .experience-section, .skills-section, .contact-section').forEach(section => {
        gsap.fromTo(section, 
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Project cards animation
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
            { y: 80, opacity: 0, rotateX: 45 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            }
        );
    });
    
    // Experience timeline
    gsap.utils.toArray('.experience-item').forEach((item, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        
        gsap.fromTo(item,
            { x: direction, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Skills animation
    gsap.utils.toArray('.skill-item').forEach((skill, index) => {
        gsap.fromTo(skill,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: skill,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.05
            }
        );
    });
    
    // Parallax effect for hero
    gsap.to('.hero-visual', {
        y: -100,
        scrollTrigger: {
            trigger: '.hero-section',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

// ===========================================
// NAVIGATION
// ===========================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navigation = document.querySelector('.navigation');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Function to get precise navigation offset
    function getNavOffset() {
        const navHeight = navigation ? navigation.offsetHeight : 80;
        // Use exact nav height to position section exactly at top edge below nav
        return navHeight;
    }
    
    // Instant mobile menu close
    function closeMobileMenuInstant() {
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
            // Remove classes immediately
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            // Set height to 0 instantly
            gsap.set(navMenu, { maxHeight: 0 });
        }
    }
    
    // Precise smooth scrolling
    function scrollToTarget(target) {
        // Close mobile menu instantly if open
        closeMobileMenuInstant();
        
        // Calculate exact position: target top - nav height
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const navHeight = navigation ? navigation.offsetHeight : 80;
        const scrollPosition = targetPosition - navHeight;
        
        // Scroll to exact position
        gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: scrollPosition },
            ease: "power2.out"
        });
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                scrollToTarget(target);
            }
        });
    });
    
    // Active section highlighting with precise positioning
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 100px", // Account for nav height
            end: "bottom 100px",
            onEnter: () => updateActiveNavLink(section.id),
            onEnterBack: () => updateActiveNavLink(section.id)
        });
    });
    
    // CTA buttons functionality
    document.querySelectorAll('.cta-button, .project-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const section = button.dataset.section;
            if (section) {
                e.preventDefault();
                const target = document.getElementById(section);
                if (target) {
                    scrollToTarget(target);
                }
            }
        });
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                // Close with faster GSAP
                gsap.to(navMenu, {
                    maxHeight: 0,
                    duration: 0.2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    }
                });
            } else {
                // Open with faster GSAP
                navMenu.classList.add('active');
                navToggle.classList.add('active');
                gsap.fromTo(navMenu, 
                    { maxHeight: 0 },
                    { 
                        maxHeight: 400,
                        duration: 0.25,
                        ease: "power2.out"
                    }
                );
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    gsap.to(navMenu, {
                        maxHeight: 0,
                        duration: 0.2,
                        ease: "power2.inOut",
                        onComplete: () => {
                            navMenu.classList.remove('active');
                            navToggle.classList.remove('active');
                        }
                    });
                }
            }
        });
    }
}

function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });
}

// ===========================================
// PROJECT INTERACTIONS
// ===========================================
function initProjectInteractions() {
    // Volley Vision ball animation
    const trajectories = document.querySelectorAll('.ball-trajectory');
    trajectories.forEach(trajectory => {
        const points = trajectory.querySelectorAll('.trajectory-point');
        
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(points, {
            scale: 1.5,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.inOut"
        });
    });
    
    // Music Robot waveform animation
    const waveforms = document.querySelectorAll('.waveform');
    waveforms.forEach(waveform => {
        const bars = waveform.querySelectorAll('.wave-bar');
        
        gsap.to(bars, {
            scaleY: () => Math.random() * 0.5 + 0.5,
            duration: 0.3,
            repeat: -1,
            yoyo: true,
            stagger: {
                each: 0.1,
                repeat: -1,
                yoyo: true
            }
        });
    });
    
    // CARLA vehicle simulation
    const roadLines = document.querySelectorAll('.road-line');
    roadLines.forEach(line => {
        gsap.to(line, {
            backgroundPosition: '40px 0',
            duration: 2,
            repeat: -1,
            ease: "none"
        });
    });
    
    // FPGA clock signals
    const clockPulses = document.querySelectorAll('.clock-pulse');
    clockPulses.forEach(pulse => {
        gsap.to(pulse, {
            opacity: 1,
            duration: 0.1,
            repeat: -1,
            yoyo: true,
            repeatDelay: 0.9
        });
    });
    
    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: '0 20px 40px rgba(0, 245, 255, 0.2)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 5px 15px rgba(0, 245, 255, 0.1)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// ===========================================
// SKILLS ANIMATIONS
// ===========================================
function initSkillsAnimations() {
    // Skill proficiency bars
    const skillBars = document.querySelectorAll('.skill-proficiency');
    
    ScrollTrigger.batch(skillBars, {
        onEnter: (elements) => {
            elements.forEach(bar => {
                const level = bar.dataset.level;
                gsap.fromTo(bar, 
                    { '--width': '0%' },
                    { 
                        '--width': `${level}%`,
                        duration: 1.5,
                        ease: "power3.out",
                        delay: Math.random() * 0.3
                    }
                );
            });
        },
        start: "top 80%"
    });
    
    // Skill category hover effects
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', () => {
            gsap.to(category, {
                scale: 1.02,
                borderColor: '#00f5ff',
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        category.addEventListener('mouseleave', () => {
            gsap.to(category, {
                scale: 1,
                borderColor: 'rgba(0, 245, 255, 0.2)',
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// ===========================================
// PERFORMANCE OPTIMIZATIONS
// ===========================================
function initPerformanceOptimizations() {
    // Intersection Observer for efficient animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    document.querySelectorAll('.project-card, .skill-item, .experience-item').forEach(el => {
        observer.observe(el);
    });
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            onWindowResize();
        }, 100);
    });
    
    // Preload critical assets
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Reduce animations on low-powered devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        config.particles.count = Math.floor(config.particles.count * 0.5);
    }
    
    // Battery API optimization
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2) {
                config.performance.reducedMotion = true;
                document.body.classList.add('reduced-motion');
            }
        });
    }
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===========================================
// ERROR HANDLING
// ===========================================
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e);
    // Fallback for critical failures
    if (e.message.includes('WebGL')) {
        document.getElementById('hero-canvas').style.display = 'none';
    }
});

// ===========================================
// CONSOLE SIGNATURE
// ===========================================
console.log(`
🚀 Kyle Chen's Revolutionary Robotics Portfolio
Built with cutting-edge technology:
• Three.js for 3D graphics
• GSAP for smooth animations  
• Advanced performance optimizations
• Accessibility-first design

Ready to build the future of robotics!
`);

// Export for external use
window.KylePortfolio = {
    config,
    initThreeJS,
    initNeuralNetwork,
    animateStatCounters
};