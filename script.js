/* ============================================
   RAJASA UTAMA - MAIN JAVASCRIPT
   Interactions, Animations, Mobile Menu
   ============================================ */

   document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const revealElements = document.querySelectorAll('.service-card, .paket-card, .why-card, .portfolio-item, .about-content, .about-image');
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Header background
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Active nav link on scroll
        updateActiveNavOnScroll();
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // ============================================
    // MOBILE MENU
    // ============================================
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // BACK TO TOP
    // ============================================
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Add reveal class to elements and observe
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Add staggered delay for grid items
        const delayClass = `reveal-delay-${(index % 4) + 1}`;
        el.classList.add(delayClass);
        revealObserver.observe(el);
    });
    
    // Also observe section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // ============================================
    // PARALLAX EFFECT FOR WHY CHOOSE SECTION
    // ============================================
  
    
    // ============================================
    // COUNTER ANIMATION (Trust numbers if needed)
    // ============================================
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                el.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        }
        updateCounter();
    }
    
    // ============================================
    // FORM VALIDATION (if forms added later)
    // ============================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ============================================
    // PERFORMANCE: Preload critical resources
    // ============================================
    function preloadImage(url) {
        const img = new Image();
        img.src = url;
    }
    
    // Preload hero background
    preloadImage('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&h=1080&fit=crop');
    
    // ============================================
    // CONSOLE BRANDING
    // ============================================
    console.log('%c Rajasa Utama ', 'background: #d4af37; color: #0f172a; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
    console.log('%c Jasa Pengaspalan Profesional ', 'color: #d4af37; font-size: 14px;');
    
});