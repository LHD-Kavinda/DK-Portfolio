// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Navigation active state and interactive features
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Initial check for active section
    setActiveNavLink();
    
    // Navbar scroll interactions
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
    const navbarHeight = navbar.offsetHeight;
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar on scroll
        if (scrollTop > navbarHeight) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide navbar
                navbar.style.transform = `translateY(-${navbarHeight}px)`;
            } else {
                // Scrolling up - show navbar
                navbar.style.transform = 'translateY(0)';
                navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
                navbar.style.padding = '0.7rem 2rem';
            }
        } else {
            // At top of page - reset navbar
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '1rem 2rem';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active nav link
        setActiveNavLink();
    });
    
    // Set active nav link based on scroll position
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
});

// Prevent auto-scroll and ensure smooth page load
document.addEventListener('DOMContentLoaded', () => {
    // Prevent default scroll behavior
    window.scrollTo(0, 0);

    // Optional: Smooth scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    // Ensure navigation links work smoothly
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dynamic Specialization Text Rotation
    const specializationElement = document.querySelector('.tagline');
    
    const specializationTexts = [
        "Specializing in Development and Quality Engineering...",
        "Crafting Innovative Solutions with Precision...",
        "Bridging Technology and User Experience...",
        "Transforming Ideas into Robust Software...",
        "Passionate About Clean Code and Performance..."
    ];

    let currentIndex = 0;

    function createTextAnimation() {
        // Increment index
        currentIndex = (currentIndex + 1) % specializationTexts.length;

        // Create a wrapper for animated text
        const animatedWrapper = document.createElement('div');
        animatedWrapper.classList.add('tagline-animated-wrapper');
        animatedWrapper.style.position = 'relative';
        animatedWrapper.style.overflow = 'hidden';
        animatedWrapper.style.height = `${specializationElement.offsetHeight}px`;

        // Current text element
        const currentTextElement = document.createElement('div');
        currentTextElement.textContent = specializationElement.textContent;
        currentTextElement.style.position = 'absolute';
        currentTextElement.style.width = '100%';
        currentTextElement.style.color = 'inherit';

        // Next text element
        const nextTextElement = document.createElement('div');
        nextTextElement.textContent = specializationTexts[currentIndex];
        nextTextElement.style.position = 'absolute';
        nextTextElement.style.width = '100%';
        nextTextElement.style.color = 'inherit';

        // Append to wrapper
        animatedWrapper.appendChild(currentTextElement);
        animatedWrapper.appendChild(nextTextElement);

        // Replace original element
        specializationElement.innerHTML = '';
        specializationElement.appendChild(animatedWrapper);

        // Complex 3D rotation with additional effects
        const outKeyframes = [
            { 
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)', 
                opacity: 1,
                filter: 'blur(0px)'
            },
            { 
                transform: 'perspective(1000px) rotateX(-45deg) rotateY(30deg) translateZ(-200px)', 
                opacity: 0,
                filter: 'blur(10px)'
            }
        ];

        const inKeyframes = [
            { 
                transform: 'perspective(1000px) rotateX(45deg) rotateY(-30deg) translateZ(-200px)', 
                opacity: 0,
                filter: 'blur(10px)'
            },
            { 
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)', 
                opacity: 1,
                filter: 'blur(0px)'
            }
        ];

        const animationOptions = {
            duration: 1200,
            easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
            fill: 'forwards'
        };

        // Animate current text out
        currentTextElement.animate(outKeyframes, animationOptions);

        // Animate next text in
        nextTextElement.style.transform = 'perspective(1000px) rotateX(45deg) rotateY(-30deg) translateZ(-200px)';
        nextTextElement.animate(inKeyframes, animationOptions);

        // Clean up after animation
        setTimeout(() => {
            specializationElement.textContent = nextTextElement.textContent;
        }, 1200);
    }

    // Initial styling for smooth transition
    specializationElement.style.transition = 'all 1.2s cubic-bezier(0.45, 0, 0.55, 1)';
    
    // Start rotation every 3 seconds
    setInterval(createTextAnimation, 3000);
});

// Prevent page jump on load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

