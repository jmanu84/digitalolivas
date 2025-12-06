document.addEventListener('DOMContentLoaded', function() {
    // ELEMENTOS DEL DOM
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sliderTrack = document.querySelector('.slider-track');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = document.querySelectorAll('.slide').length;
    
    let currentSlide = 0;
    let slideInterval;
    let isMenuOpen = false;

    // ========== MENÚ MÓVIL ==========
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        mainNav.classList.toggle('active', isMenuOpen);
        
        // Cambiar icono del menú
        const icon = this.querySelector('i');
        if (isMenuOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                isMenuOpen = false;
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && isMenuOpen) {
            if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                isMenuOpen = false;
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        }
    });

    // ========== SLIDER AUTOMÁTICO ==========
    function goToSlide(slideIndex) {
        // Validar límites
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        if (slideIndex >= totalSlides) slideIndex = 0;
        
        currentSlide = slideIndex;
        
        // Mover slider
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Eventos para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopSlider();
            goToSlide(index);
            startSlider();
        });
    });

    // Pausar slider al hover
    sliderTrack.addEventListener('mouseenter', stopSlider);
    sliderTrack.addEventListener('mouseleave', startSlider);

    // Pausar slider al tocar (móvil)
    sliderTrack.addEventListener('touchstart', stopSlider);
    sliderTrack.addEventListener('touchend', function() {
        setTimeout(startSlider, 3000);
    });

    // Iniciar slider
    startSlider();

    // ========== SCROLL SUAVE ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo procesar enlaces internos
            if (href === '#' || href === '#inicio') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========== AJUSTAR MENÚ EN RESIZE ==========
    window.addEventListener('resize', function() {
        // Cerrar menú móvil al cambiar a desktop
        if (window.innerWidth > 768 && isMenuOpen) {
            isMenuOpen = false;
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }
        
        // Ajustar altura del slider en resize
        const header = document.querySelector('header');
        const sliderHero = document.querySelector('.slider-hero');
        if (header && sliderHero) {
            sliderHero.style.height = `calc(100vh - ${header.offsetHeight}px)`;
        }
    });

    // ========== ANIMACIÓN DE ELEMENTOS AL SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.service-card, .tech-info, .tech-visual, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // ========== AJUSTE INICIAL DEL SLIDER ==========
    function adjustSliderHeight() {
        const header = document.querySelector('header');
        const sliderHero = document.querySelector('.slider-hero');
        if (header && sliderHero) {
            sliderHero.style.height = `calc(100vh - ${header.offsetHeight}px)`;
        }
    }

    // Ajustar altura inicial y cuando cambia la orientación
    adjustSliderHeight();
    window.addEventListener('orientationchange', adjustSliderHeight);
    
    // Asegurar que las imágenes se carguen correctamente
    window.addEventListener('load', function() {
        // Forzar reflow para asegurar que el slider se renderice correctamente
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        setTimeout(() => {
            sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });
});