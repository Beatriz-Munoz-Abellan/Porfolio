document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleccionamos todos los activadores de navegación
    // Incluimos .nav-link, los botones del hero y cualquier enlace interno (#)
    const links = document.querySelectorAll('.nav-link, .btn-primary[href^="#"], .btn-outline[href^="#"]');
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector("header ul");

    const closeMenu = () => {
        if (navLinks) navLinks.classList.remove("open");
        if (hamburger) hamburger.classList.remove("active");
    };

    /**
     * Función principal de navegación
     * @param {string} targetId - El ID de la sección (ej: "#proyectos")
     */
    const navigateTo = (targetId) => {
        const id = targetId.replace("#", "");
        const targetSection = document.getElementById(id);
        const currentSection = document.querySelector("section.active");

        // Si la sección no existe o ya es la activa, no hacemos nada
        if (!targetSection || currentSection === targetSection) return;

        // --- GESTIÓN DE SALIDA ---
        if (currentSection) {
            currentSection.classList.remove("active");
            currentSection.classList.add("exit");

            // Limpiamos la clase de salida después de que termine la animación (0.6s según tu CSS)
            setTimeout(() => {
                currentSection.classList.remove("exit");
                currentSection.style.display = 'none'; // Aseguramos que no interfiera
            }, 600);
        }

        // --- GESTIÓN DE ENTRADA ---
        // Forzamos el display antes de activar la animación
        targetSection.style.display = (id === 'hero') ? 'flex' : 'block'; 
        
        // Pequeño timeout para que el navegador registre el cambio de display antes de la opacidad
        setTimeout(() => {
            targetSection.classList.add("active");
            targetSection.scrollTop = 0;
        }, 10);

        // --- ACTUALIZAR MENÚ ---
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active-link");
            if (link.getAttribute("href") === targetId) {
                link.classList.add("active-link");
            }
        });

        // Actualizar URL sin recargar la página
        window.history.pushState(null, null, targetId);
        closeMenu();
    };

    // Eventos de clic en los enlaces
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            
            // Si es un enlace interno (empieza por #)
            if (href && href.startsWith("#")) {
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    e.preventDefault();
                    navigateTo(href);
                }
            }
        });
    });

    // Manejo del botón "Atrás" del navegador
    window.addEventListener("popstate", () => {
        const hash = window.location.hash || "#hero";
        navigateTo(hash);
    });

    // Carga inicial: Si entran en midominio.com/#contacto, cargar esa sección
    const initialHash = window.location.hash || "#hero";
    const initialSection = document.querySelector(initialHash);
    if (initialSection) {
        // Ocultamos todas primero
        document.querySelectorAll('section').forEach(s => s.style.display = 'none');
        navigateTo(initialHash);
    }

    // Menú hamburguesa (Mobile)
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            hamburger.classList.toggle("active");
        });
    }

    /* --- FUNCIONALIDAD: LEER MÁS --- */
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const description = this.previousElementSibling;
            description.classList.toggle('expanded');
            this.textContent = description.classList.contains('expanded') ? 'Leer menos' : 'Leer más';
        });
    });
});