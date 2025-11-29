document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    let currentSlide = 0;
    let slideInterval;

    // Función para mostrar slide específico
    function showSlide(n) {
        // Quitar clase active
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Calcular índice
        currentSlide = (n + slides.length) % slides.length;
        
        // Agregar clase active
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Función siguiente slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Listeners para los indicadores (bolitas)
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    // Auto slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Iniciar
    startInterval();

    // Menú Móvil
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // Cerrar menú al clickear enlace
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    // Smooth scroll
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.classList.contains('cotizador-link')) {
                e.preventDefault();
                alert('El cotizador online estará disponible próximamente.');
                return;
            }
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Ajuste para el header sticky (80px aprox)
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cerrar menú click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
            navMenu.classList.remove('show');
        }
    });
});