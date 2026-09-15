/* ============================================
   KOLEGA KARYA MANDIRI - MAIN JAVASCRIPT
   Multi-Page Version - Auto Active Nav
   ============================================ */

   document.addEventListener('DOMContentLoaded', function() {

    // Elements
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const revealElements = document.querySelectorAll('.service-card, .paket-card, .why-card, .portfolio-item, .about-content, .about-image, .contact-card');

    // ============================================
    // AUTO ACTIVE NAV - Detect current page
    // ============================================
    function setActiveNav() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        const isInPagesFolder = currentPath.includes('/pages/');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            // Remove any existing active class first
            link.classList.remove('active');

            const linkFile = href.split('/').pop();
            const linkIsInPages = href.includes('/pages/');

            let isActive = false;

            // Home page detection
            if ((currentFile === '' || currentFile === 'index.html') && 
                (linkFile === 'index.html' || href === '../index.html' || href === './' || href === '/')) {
                isActive = true;
            }
            // Same folder page detection
            else if (currentFile === linkFile) {
                isActive = true;
            }
            // Cross-folder detection (pages/ to root or vice versa)
            else if (isInPagesFolder && !linkIsInPages && linkFile === 'index.html' && 
                     (currentFile === '' || currentFile === 'index.html')) {
                isActive = true;
            }
            else if (!isInPagesFolder && linkIsInPages && 
                     linkFile.replace('.html','') === currentFile.replace('.html','')) {
                isActive = true;
            }

            if (isActive) {
                link.classList.add('active');
            }
        });
    }

    // Run active nav detection immediately
    setActiveNav();

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ============================================
    // MOBILE MENU
    // ============================================
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL (Same-page anchors only)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 70;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // ============================================
    // BACK TO TOP
    // ============================================
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    if ('IntersectionObserver' in window) {
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

        revealElements.forEach((el, index) => {
            el.classList.add('reveal');
            const delayClass = `reveal-delay-${(index % 4) + 1}`;
            el.classList.add(delayClass);
            revealObserver.observe(el);
        });

        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });

        document.querySelectorAll('.page-header').forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
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

    preloadImage('../images/bg/BG1.jpeg');

    // ============================================
    // CONSOLE BRANDING
    // ============================================
    console.log('%c Kolega Karya Mandiri ', 'background: #fabf2a; color: #020202; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
    console.log('%c Jasa Pengaspalan Profesional ', 'color: #fabf2a; font-size: 14px;');

});