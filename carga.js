document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link, .btn-primary, .btn-outline");

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector("header ul");

    const closeMenu = () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("active");
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

        // Actualizar menú
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active-link");
            if (link.getAttribute("href") === targetId) {
                link.classList.add("active-link");
            }
        });

        window.history.pushState(null, null, targetId);

        // ←←← CERRAR EL MENÚ al navegar (lo importante)
        closeMenu();
    };

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#") && document.querySelector(href)) {
                e.preventDefault();
                navigateTo(href);
            }
        });
    });

    window.addEventListener("popstate", () => {
        navigateTo(window.location.hash || "#hero");
    });

    // Carga inicial
    navigateTo(window.location.hash || "#hero");

    // Menú hamburguesa
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        hamburger.classList.toggle("active");
    });

    
});