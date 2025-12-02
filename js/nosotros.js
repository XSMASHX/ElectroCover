// SISTEMA DE PÁGINA NOSOTROS - VERSIÓN CORREGIDA

// Configuración de integrantes
const CONFIG_INTEGRANTES = [
    {
        id: 1,
        nombre: "Diego Moré",
        rol: "Vocalista & Productora",
        imagenBW: "../assets/ElectroC/r2.png",
        imagenColor: "../assets/ElectroC/r2.jpg",
        pagina: "DiegoMore.html"
    },
    {
        id: 2,
        nombre: "Max DJ", 
        rol: "DJ & Synth Artist",
        imagenBW: "../assets/ElectroC/m2.png",
        imagenColor: "../assets/ElectroC/m2.jpg",
        pagina: "MaxDJ.html"
    },
    {
        id: 3,
        nombre: "Kevin",
        rol: "Visual Artist & Diseñadora",
        imagenBW: "../assets/ElectroC/k2.png", 
        imagenColor: "../assets/ElectroC/k2.jpg",
        pagina: "Kevin.html"
    }
];

// ======================
// 1. SISTEMA DE PARTÍCULAS 3D
// ======================

function inicializarParticulas() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) {
        console.log('Canvas no encontrado, continuando sin partículas...');
        return;
    }

    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;
        
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            alpha: true,
            antialias: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Crear partículas
        const particulasGeometria = new THREE.BufferGeometry();
        const cuentaParticulas = 800;
        const posiciones = new Float32Array(cuentaParticulas * 3);

        for (let i = 0; i < cuentaParticulas * 3; i++) {
            posiciones[i] = (Math.random() - 0.5) * 15;
        }

        particulasGeometria.setAttribute('position', new THREE.BufferAttribute(posiciones, 3));

        const materialParticulas = new THREE.PointsMaterial({
            size: 0.025,
            color: 0x1900FF,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const sistemaParticulas = new THREE.Points(particulasGeometria, materialParticulas);
        scene.add(sistemaParticulas);

        // Animación
        function animarParticulas() {
            requestAnimationFrame(animarParticulas);
            sistemaParticulas.rotation.x += 0.0002;
            sistemaParticulas.rotation.y += 0.0003;
            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animarParticulas();
        console.log('✅ Partículas 3D inicializadas');
    } catch (error) {
        console.log('❌ Error en partículas, continuando sin ellas:', error);
    }
}

// ======================
// 2. CREACIÓN Y ANIMACIÓN DE TARJETAS - COMPORTAMIENTO CORREGIDO
// ======================

function crearTarjetasIntegrantes() {
    const contenedor = document.getElementById('contenedor-integrantes');
    if (!contenedor) {
        console.error('Contenedor de integrantes no encontrado');
        return;
    }

    console.log('🎨 Creando tarjetas de integrantes...');

    // Crear HTML para cada integrante
    CONFIG_INTEGRANTES.forEach(integrante => {
        const tarjetaHTML = `
            <div class="tarjeta-integrante estado-inicial" data-id="${integrante.id}" data-pagina="${integrante.pagina}">
                <div class="contenedor-tarjeta">
                    <div class="cara frontal">
                        <img src="${integrante.imagenBW}" alt="${integrante.nombre}" 
                             onerror="manejarErrorImagen(this, '${integrante.nombre}')" />
                    </div>
                    <div class="cara trasera">
                        <img src="${integrante.imagenColor}" alt="${integrante.nombre}" 
                             onerror="manejarErrorImagen(this, '${integrante.nombre}', '${integrante.rol}')" />
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });

    // Configurar animación de despliegue
    setTimeout(animarDespliegueTarjetas, 300);
}

function manejarErrorImagen(img, nombre, rol = '') {
    const contenidoAlternativo = rol 
        ? `<div style="color:#00ffff; font-size:1.2rem; text-align:center; padding:20px; display:flex; flex-direction:column; justify-content:center; height:100%;">${nombre}<br><small style="font-size:0.9rem; color:#b3f0ff; margin-top:10px;">${rol}</small></div>`
        : `<div style="color:#00ffff; font-size:1.2rem; text-align:center; padding:20px; display:flex; align-items:center; justify-content:center; height:100%;">${nombre}</div>`;
    
    img.style.display = 'none';
    img.parentNode.innerHTML = contenidoAlternativo;
}

function animarDespliegueTarjetas() {
  const tarjetas = document.querySelectorAll('.tarjeta-integrante');

  if (tarjetas.length === 0) return;

  // Animación suave horizontal con GSAP
  gsap.fromTo(tarjetas, 
    { opacity: 0, y: 40, scale: 0.8 },
    { 
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.3,
      ease: "power3.out"
    }
  );

  configurarEventosClick();
}


function configurarEventosClick() {
    const tarjetas = document.querySelectorAll('.tarjeta-integrante');
    
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const pagina = this.getAttribute('data-pagina');
            const id = this.getAttribute('data-id');
            
            console.log(`🖱️ Click en tarjeta ${id}, navegando a: ${pagina}`);
            
            if (pagina) {
                // Efecto visual al hacer click
                gsap.to(this, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        navegarAPaginaIntegrante(pagina, id);
                    }
                });
            }
        });

        // Efecto hover mejorado - SIN MOVIMIENTO VERTICAL
        tarjeta.addEventListener('mouseenter', function() {
            if (this.classList.contains('animada')) {
                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        tarjeta.addEventListener('mouseleave', function() {
            if (this.classList.contains('animada')) {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
}

function navegarAPaginaIntegrante(pagina, idIntegrante) {
    console.log(`🚀 Navegando a página de integrante: ${pagina}`);
    
    if (window.parent !== window) {
        window.parent.postMessage({ 
            type: 'abrirPaginaIntegrante',
            url: pagina,
            integranteId: idIntegrante
        }, '*');
    } else {
        alert(`Navegando a: ${pagina}\n\n(En desarrollo - Esta página se creará después)`);
    }
}

// ======================
// 3. SISTEMA DE NAVEGACIÓN - CORREGIDO PARA OVERLAY
// ======================

function inicializarNavegacion() {
    const btnRegresar = document.getElementById('btn-regresar-modulos');
    if (btnRegresar) {
        btnRegresar.addEventListener('click', function() {
            console.log('🔙 Botón regresar clickeado');
            
            // Si la página está dentro de un iframe (overlay)
            if (window.parent !== window) {
                console.log('📨 Enviando mensaje para cerrar overlay al padre');
                window.parent.postMessage('cerrarOverlay', '*');
            } else {
                // Si no está dentro de un iframe (por prueba directa)
                console.log('🌐 Cerrando pestaña directamente');
                window.close();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', inicializarNavegacion);



// ======================
// 4. INICIALIZACIÓN
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Inicializando página Nosotros...');
    
    // Inicializar sistemas en orden
    inicializarParticulas();
    crearTarjetasIntegrantes();
    inicializarNavegacion();
    
    // Efecto de escritura para el subtítulo
    const subtitulo = document.querySelector('.subtitulo');
    if (subtitulo) {
        const textoOriginal = subtitulo.textContent;
        subtitulo.textContent = '';
        
        let i = 0;
        const efectoEscritura = setInterval(() => {
            if (i < textoOriginal.length) {
                subtitulo.textContent += textoOriginal.charAt(i);
                i++;
            } else {
                clearInterval(efectoEscritura);
            }
        }, 60);
    }
    
    console.log('✅ Página Nosotros inicializada correctamente');
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('❌ Error global:', e.error);
});

