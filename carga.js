document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.nav-link, .btn-primary[href^="#"], .btn-outline[href^="#"]');
    const hamburger = document.querySelector(".hamburger");
    const navUl = document.querySelector("header ul"); 

    const closeMenu = () => {
        navUl?.classList.remove("open");
        hamburger?.classList.remove("active");
    };

    const navigateTo = (targetId) => {
        const id = targetId.replace("#", "");
        const target = document.getElementById(id);
        if (!target) return;

        // Ocultar actual
        document.querySelector("section.active")?.classList.remove("active");

        // Mostrar nueva
        target.classList.add("active");

        // Scroll suave al top de la sección 
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        // Actualizar links activos
        document.querySelectorAll(".nav-link").forEach(l => {
            l.classList.toggle("active-link", l.getAttribute("href") === targetId);
        });

        // History
        history.pushState(null, "", targetId === "#hero" ? "/" : targetId);

        closeMenu();
    };

    // Clics en enlaces internos
    links.forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");
            if (href?.startsWith("#")) {
                e.preventDefault();
                navigateTo(href);
            }
        });
    });

    // Botón atrás/adelante navegador
    window.addEventListener("popstate", () => {
        navigateTo(location.hash || "#hero");
    });

    // Carga inicial
    navigateTo(location.hash || "#hero");

    // Hamburguesa
    hamburger?.addEventListener("click", () => {
        navUl.classList.toggle("open");
        hamburger.classList.toggle("active");
    });

    // Cerrar menú al clic fuera (mejora UX mobile)
    document.addEventListener("click", e => {
        if (!navUl?.contains(e.target) && !hamburger?.contains(e.target)) {
            closeMenu();
        }
    });

    // Leer más
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const desc = btn.previousElementSibling;
            desc.classList.toggle('expanded');
            btn.textContent = desc.classList.contains('expanded') ? 'Leer menos' : 'Leer más';
        });
    });

    // Formulario de contacto
    const form = document.getElementById('contactForm');
    if (form) {
        const messageEl = document.getElementById('formMessage');
        const submitBtn = document.getElementById('submitBtn');

        form.addEventListener('submit', async e => {
            e.preventDefault();

            messageEl.textContent = '';
            messageEl.style.color = '';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            try {
                const formData = new FormData(form);
                const response = await fetch('https://script.google.com/macros/s/AKfycbyveQ6Yik0bYkqdpW0rbg4WaL7QPoSS4yelihS0qNvMSQ3xOa0WUFfliBTZmG4Xi2c29w/exec', {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'  // Recomendado para evitar problemas CORS con GAS
                });

                messageEl.textContent = '¡Mensaje enviado correctamente! Te responderé pronto.';
                messageEl.style.color = 'green';

                form.reset();

                setTimeout(() => {
                    messageEl.textContent = '';
                    messageEl.style.color = '';
                }, 5000);

            } catch (err) {
                messageEl.textContent = 'Error al enviar el mensaje. Inténtalo de nuevo.';
                messageEl.style.color = 'red';

                setTimeout(() => {
                    messageEl.textContent = '';
                    messageEl.style.color = '';
                }, 5000);

                console.error('Error en formulario:', err);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
            }
        });
    }
});