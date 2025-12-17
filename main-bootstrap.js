// JavaScript optimizado para efecto fade

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar el carousel de Bootstrap con efecto fade
    const heroCarousel = document.getElementById('heroSlider');
    
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 4000,
            wrap: true,
            touch: true,
            pause: 'hover'
        });
        
        // Mejorar la transición fade
        heroCarousel.addEventListener('slide.bs.carousel', function(e) {
            // Asegurar que todas las transiciones sean suaves
            const items = this.querySelectorAll('.carousel-item');
            items.forEach(item => {
                item.style.transition = 'opacity 0.8s ease-in-out';
            });
        });
        
        // Ajustar altura para móvil
        function adjustCarouselForMobile() {
            if (window.innerWidth <= 768) {
                const carouselElement = document.querySelector('.carousel');
                if (carouselElement) {
                    const isPortrait = window.innerHeight > window.innerWidth;
                    const maxHeight = isPortrait ? '70vh' : '90vh';
                    
                    carouselElement.style.maxHeight = maxHeight;
                    carouselElement.style.height = 'auto';
                }
            }
        }
        
        adjustCarouselForMobile();
        
        window.addEventListener('resize', function() {
            setTimeout(adjustCarouselForMobile, 100);
        });
        
        window.addEventListener('orientationchange', function() {
            setTimeout(adjustCarouselForMobile, 300);
        });
    }
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#inicio') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    if (window.innerWidth <= 768) {
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                            navbarToggler.click();
                        }
                    }
                    
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animar elementos al hacer scroll
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.service-card, .tech-info, .tech-visual, .stat-item').forEach(el => {
        if (el.classList.contains('service-card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s, transform 0.5s';
        }
        observer.observe(el);
    });
});