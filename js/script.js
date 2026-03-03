/* COPYRIGHT SIGNATURE: Omkar R. Ghare | Front-End & Web Developer | Designed and Built January 2026 */

// Runtime integrity check — verifies signature exists in key files and shows a persistent overlay if missing.
;(async function pageIntegrityCheck(){
    const token = 'Omkar R. Ghare | Front-End & Web Developer | Designed and Built January 2026';
    const files = ['index.html', 'css/style.css', 'js/script.js'];
    try {
        const texts = await Promise.all(files.map(f => fetch(f).then(r => r.ok ? r.text() : '')));
        const missing = files.filter((f, i) => !texts[i] || !texts[i].includes(token));
        if (missing.length) {
            const overlay = document.createElement('div');
            overlay.id = 'integrity-overlay';
            Object.assign(overlay.style, {
                position: 'fixed',
                inset: '0',
                background: 'rgba(10,10,15,0.95)',
                color: '#0b0035',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '2147483647',
                padding: '20px',
                textAlign: 'center',
                fontFamily: 'sans-serif',
                lineHeight: '1.4'
            });
            overlay.innerHTML = '<div><h2 style="margin-bottom:8px;">Integrity Check Failed</h2><p style="opacity:0.9;">This page has been modified and the required copyright signature is missing from: ' + missing.join(', ') + '.</p></div>';
            document.documentElement.appendChild(overlay);
            console.error('Integrity check failed. Missing signature in: ', missing);
            document.documentElement.style.pointerEvents = 'none';
            overlay.style.pointerEvents = 'auto';
        }
    } catch (e) {
        console.warn('Integrity check error', e);
    }
})();


// ==================== PRELOADER ====================
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('preloader').classList.add('hidden');
                document.body.classList.remove('loading');
            }, 1800);
        });

        // ==================== NAVBAR SCROLL ====================
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // ==================== THEME TOGGLE ====================
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // ==================== MOBILE MENU ====================
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMobile = document.getElementById('navMobile');
        const mobileLinks = navMobile.querySelectorAll('a');

        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMobile.classList.toggle('active');
            document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMobile.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // ==================== SMOOTH SCROLL ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ==================== FAQ ACCORDION ====================
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // ==================== SCROLL REVEAL ANIMATION ====================
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = function() {
            const windowHeight = window.innerHeight;
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const revealPoint = 150;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        };

        // Initial check
        revealOnScroll();

        // Check on scroll with throttling for performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    revealOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // ==================== FORM SUBMISSION ====================
        const ctaForm = document.getElementById('ctaForm');
        
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            // Show success message
            const btn = this.querySelector('.btn');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribed! ✓';
            btn.style.background = '#00c9a7';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                this.reset();
            }, 3000);
        });

        // ==================== PARALLAX EFFECT FOR HERO ORBS ====================
        document.addEventListener('mousemove', function(e) {
            const orbs = document.querySelectorAll('.hero-orb');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });

        // ==================== STAT COUNTER ANIMATION ====================
        const animateValue = (element, start, end, duration) => {
            const range = end - start;
            const increment = end > start ? 1 : -1;
            const stepTime = Math.abs(Math.floor(duration / range));
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                element.textContent = current;
                if (current === end) {
                    clearInterval(timer);
                }
            }, stepTime);
        };

        // ==================== INTERSECTION OBSERVER FOR STATS ====================
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.hero-stat').forEach(stat => {
            statsObserver.observe(stat);
        });

        // ==================== KEYBOARD NAVIGATION ====================
        document.addEventListener('keydown', function(e) {
            // ESC to close mobile menu
            if (e.key === 'Escape' && navMobile.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMobile.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // ==================== PERFORMANCE: LAZY LOAD ANIMATIONS ====================
        if ('IntersectionObserver' in window) {
            const lazyAnimations = document.querySelectorAll('[data-animate]');
            
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        animationObserver.unobserve(entry.target);
                    }
                });
            });

            lazyAnimations.forEach(el => animationObserver.observe(el));
        }

        // ==================== REDUCE MOTION FOR ACCESSIBILITY ====================
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }

        console.log('🚀 NexusChain Website Loaded Successfully!');
