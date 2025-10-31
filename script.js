window.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo-navegacion");

  logo.addEventListener("click", () => {
    // Añadir clase para animación de salida
    logo.classList.add("animating");

    // Crear overlay de transición
    const overlay = document.createElement("div");
    overlay.classList.add("transition-overlay");
    document.body.appendChild(overlay);

    // Activar transición (deja un pequeño delay para que el DOM lo registre)
    setTimeout(() => {
      overlay.classList.add("active");
    }, 50);

    // Ir a otra página después de la transición
    setTimeout(() => {
      window.location.href = "modulo.html";
    }, 4000); // tiempo = duración de la transición
  });
});

const logo = document.getElementById("logo-navegacion");

logo.addEventListener("click", () => {
  logo.classList.add("animating");

  // Espera a que termine la animación (~600ms) y redirige
  setTimeout(() => {
    window.location.href = "modulo.html";
  }, 650);
});

