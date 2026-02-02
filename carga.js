document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link, .btn-primary, .btn-outline");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector("header ul");

    const closeMenu = () => {
        if (navLinks) navLinks.classList.remove("open");
        if (hamburger) hamburger.classList.remove("active");
    };

    const navigateTo = (targetId) => {
        const id = targetId.replace("#", "");
        const targetSection = document.getElementById(id);
        const currentSection = document.querySelector("section.active");

        if (!targetSection || currentSection === targetSection) return;

        // Salida de la sección actual
        if (currentSection) {
            currentSection.classList.remove("active");
            currentSection.classList.add("exit");

            setTimeout(() => {
                currentSection.classList.remove("exit");
            }, 600);
        }

        // Entrada de la nueva sección
        targetSection.classList.add("active");
        targetSection.scrollTop = 0;

        // Actualizar menú activo
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active-link");
            if (link.getAttribute("href") === targetId) {
                link.classList.add("active-link");
            }
        });

        window.history.pushState(null, null, targetId);
        closeMenu();
    };

    // Eventos de navegación
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#") && document.querySelector(href)) {
                e.preventDefault();
                navigateTo(href);
            }
        });
    });

    // Manejo del botón atrás del navegador
    window.addEventListener("popstate", () => {
        navigateTo(window.location.hash || "#hero");
    });

    // Carga inicial
    navigateTo(window.location.hash || "#hero");

    // Menú hamburguesa (Mobile)
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            hamburger.classList.toggle("active");
        });
    }

    /* ==========================================================
       FUNCIONALIDAD: VER MÁS / CERRAR (Proyectos)
       ========================================================== */
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const parentP = this.parentElement;
            const isExpanded = parentP.classList.toggle('expanded');
            
            // Cambiamos el texto dinámicamente para mejorar la experiencia
            if (isExpanded) {
                this.textContent = " Cerrar";
            } else {
                this.textContent = "... Ver más";
                
                // Si al cerrar el párrafo el usuario quedó muy abajo, 
                // hacemos un scroll suave hacia el inicio del bloque del proyecto
                parentP.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
});