// modulos.js - SISTEMA COMPLETO DE MÓDULOS INTERACTIVOS

// modulos.js - VERSIÓN RESPONSIVE

let modules = [];
let canvas;
let canvasWidth, canvasHeight;

// Configuración de p5.js - RESPONSIVE
function setup() {
    // Obtener tamaño del contenedor
    const container = document.getElementById('canvas-container');
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;
    
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');
    
    // Configurar módulos con posiciones relativas
    configurarModulos();
    
    // Redimensionar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', redimensionarCanvas);
}

function redimensionarCanvas() {
    const container = document.getElementById('canvas-container');
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;
    resizeCanvas(canvasWidth, canvasHeight);
    configurarModulos(); // Reconfigurar módulos para nuevo tamaño
}

function configurarModulos() {
    // Posiciones en porcentajes relativos al canvas
    const posicionesRelativas = [
        { x: 0.125, y: 0.167 },  // 12.5% ancho, 16.7% alto
        { x: 0.25, y: 0.667 },   // 25% ancho, 66.7% alto  
        { x: 0.375, y: 0.333 },  // 37.5% ancho, 33.3% alto
        { x: 0.625, y: 0.5 },    // 62.5% ancho, 50% alto
        { x: 0.75, y: 0.833 },   // 75% ancho, 83.3% alto
        { x: 0.875, y: 0.25 }    // 87.5% ancho, 25% alto
    ];
    
    // Radio base responsive (se adapta al tamaño)
    const radioBase = Math.min(canvasWidth, canvasHeight) * 0.04;
    
    modules = [
        { 
            x: posicionesRelativas[0].x * canvasWidth, 
            y: posicionesRelativas[0].y * canvasHeight, 
            radius: radioBase, glow: 0, 
            titulo: "Biografía", 
            descripcion: "Conoce nuestra historia y evolución.", 
            imagen: "assets/icono1.png"
        },
        { 
            x: posicionesRelativas[1].x * canvasWidth, 
            y: posicionesRelativas[1].y * canvasHeight, 
            radius: radioBase, glow: 0, 
            titulo: "Nosotros", 
            descripcion: "Mira quiénes somos en la banda.", 
            imagen: "assets/icono2.png"
        },
        { 
            x: posicionesRelativas[2].x * canvasWidth, 
            y: posicionesRelativas[2].y * canvasHeight, 
            radius: radioBase, glow: 0, 
            titulo: "Trayectoria", 
            descripcion: "Nuestro recorrido musical.", 
            imagen: "assets/icono3.png"
        },
        { 
            x: posicionesRelativas[3].x * canvasWidth, 
            y: posicionesRelativas[3].y * canvasHeight, 
            radius: radioBase, glow: 0, 
            titulo: "Nuestros Covers", 
            descripcion: "Escucha nuestras versiones.", 
            imagen: "assets/icono4.png"
        },
        { 
            x: posicionesRelativas[4].x * canvasWidth, 
            y: posicionesRelativas[4].y * canvasHeight, 
            radius: radioBase, glow: 0,
            titulo: "Próximamente",
            descripcion: "Nuevo contenido en desarrollo",
            imagen: "assets/icono5.png"
        },
        { 
            x: posicionesRelativas[5].x * canvasWidth, 
            y: posicionesRelativas[5].y * canvasHeight, 
            radius: radioBase, glow: 0,
            titulo: "Próximamente", 
            descripcion: "Nuevo contenido en desarrollo",
            imagen: "assets/icono6.png"
        }
    ];
}

// Función principal de dibujo - ADAPTADA
function draw() {
    background(10, 10, 26);
    
    // Dibujar rejilla de fondo - RESPONSIVE
    drawGrid();
    
    // Dibujar líneas animadas - RESPONSIVE
    drawAnimatedLines();
    
    // Dibujar rutas visuales - RESPONSIVE
    drawVisualPaths();
    
    // Actualizar y dibujar módulos
    updateModules();
    
    // Verificar hover para el HUD
    verificarHoverHUD();
}

// Dibujar rejilla de fondo - RESPONSIVE
function drawGrid() {
    stroke(0, 240, 255, 30);
    strokeWeight(1);
    
    // Calcular espaciado responsive
    const gridSpacing = Math.min(canvasWidth, canvasHeight) * 0.05;
    
    for (let y = 0; y < canvasHeight; y += gridSpacing) {
        line(0, y, canvasWidth, y);
    }
    for (let x = 0; x < canvasWidth; x += gridSpacing) {
        line(x, 0, x, canvasHeight);
    }
}

// Dibujar líneas animadas - RESPONSIVE
function drawAnimatedLines() {
    const numLines = Math.floor(canvasWidth * canvasHeight / 4000); // Ajustar densidad
    
    for (let i = 0; i < numLines; i++) {
        let speedFactor = 0.5;
        let noiseSpeed = 0.001;
        let x1 = (frameCount * speedFactor + i * 45) % canvasWidth;
        let y1 = noise(i * 0.1, frameCount * noiseSpeed) * canvasHeight;
        let angle = frameCount * 0.01 + i;
        let x2 = x1 + sin(angle) * (canvasWidth * 0.04);
        let y2 = y1 + cos(angle) * (canvasHeight * 0.03);
        
        stroke(0, 240, 255, 60);
        line(x1, y1, x2, y2);
        
        fill(0, 240, 255, 220);
        noStroke();
        circle(x1, y1, canvasWidth * 0.005);
        circle(x2, y2, canvasWidth * 0.002);
    }
}

// Dibujar rutas visuales - VERSIÓN COMPLETA RESPONSIVE
function drawVisualPaths() {
    // Primera serie de rutas
    for (let i = 0; i < 3; i++) {
        let offset = i * (canvasWidth * 0.0125); // offset responsive
        drawPath([
            {x: 0, y: canvasHeight * 0.183 - offset},
            {x: canvasWidth * 0.25 + offset, y: canvasHeight * 0.183 - offset},
            {x: canvasWidth * 0.25 + offset, y: canvasHeight * 0.5 + offset},
            {x: canvasWidth * 0.5 + offset, y: canvasHeight * 0.5 + offset},
            {x: canvasWidth * 0.5 + offset, y: canvasHeight * 0.833 + offset},
            {x: canvasWidth * 0.75 + offset, y: canvasHeight * 0.833 + offset},
            {x: canvasWidth * 0.75 + offset, y: canvasHeight * 0.233 + offset},
            {x: canvasWidth + offset, y: canvasHeight * 0.233 + offset}
        ]);
    }
    
    // Segunda serie de rutas
    for (let i = 0; i < 3; i++) {
        let offset = i * (canvasWidth * 0.0125);
        drawPath([
            {x: 0, y: canvasHeight * 0.683 - offset},
            {x: canvasWidth * 0.6375 - offset, y: canvasHeight * 0.683 - offset},
            {x: canvasWidth * 0.6375 - offset, y: canvasHeight * 0.183 + offset},
            {x: canvasWidth * 0.3875 - offset, y: canvasHeight * 0.183 + offset},
            {x: canvasWidth * 0.3875 - offset, y: canvasHeight * 0.917 + offset},
            {x: canvasWidth * 0.25 - offset, y: canvasHeight * 0.917 + offset},
            {x: canvasWidth * 0.25 - offset, y: canvasHeight * 0.917 + offset},
            {x: 0, y: canvasHeight * 0.917 + offset}
        ]);
    }
    
    // Tercera serie de rutas
    for (let i = 0; i < 3; i++) {
        let offset = i * (canvasWidth * 0.0125);
        drawPath([
            {x: canvasWidth, y: canvasHeight * 0.517 - offset},
            {x: canvasWidth * 0.6375 - offset, y: canvasHeight * 0.517 - offset},
            {x: canvasWidth * 0.6375 - offset, y: canvasHeight * 0.517 + offset}
        ]);
    }
}

// Actualizar y dibujar módulos
function updateModules() {
    for (let module of modules) {
        let d = dist(mouseX, mouseY, module.x, module.y);
        let isHover = d < module.radius;
        
        // Animación de glow al pasar el mouse
        if (isHover && module.glow < 1) {
            gsap.to(module, { glow: 1, duration: 0.4 });
        } else if (!isHover && module.glow > 0) {
            gsap.to(module, { glow: 0, duration: 0.6 });
        }
        
        // Dibujar módulo
        drawModule(module);
    }
}

// Dibujar un módulo individual
function drawModule(module) {
    // Dibujo del resplandor exterior
    noStroke();
    fill(0, 240, 255, 50 + module.glow * 100);
    circle(module.x, module.y, module.radius * 2.5 + module.glow * 15);
    
    fill(0, 240, 255, 100 + module.glow * 80);
    circle(module.x, module.y, module.radius * 2 + module.glow * 10);
    
    // Círculo central
    stroke(0, 240, 255);
    strokeWeight(3);
    fill(10 + module.glow * 10, 10 + module.glow * 10, 26 + module.glow * 10);
    circle(module.x, module.y, module.radius * 2);
    
    // Cruces internas
    stroke(0, 240, 255, 50);
    strokeWeight(1);
    line(module.x - module.radius, module.y, module.x + module.radius, module.y);
    line(module.x, module.y - module.radius, module.x, module.y + module.radius);
    
    // Puntos en los extremos
    for (let angle = 0; angle < 180; angle += 90) {
        let rad = radians(angle);
        let cx = module.x + cos(rad) * module.radius;
        let cy = module.y + sin(rad) * module.radius;
        fill(0, 240, 255, 200);
        noStroke();
        circle(cx, cy, 5);
    }
    
    // Pulso exterior animado
    let pulse = sin(frameCount * 0.05) * 10 + module.glow * 10;
    noFill();
    stroke(0, 240, 255, 100);
    strokeWeight(2);
    circle(module.x, module.y, module.radius * 2 + pulse);
}

// Dibujar una ruta visual
function drawPath(points, color = [0, 240, 255], weight = 2, glowOpacity = 60) {
    stroke(...color, glowOpacity);
    strokeWeight(weight * 2);
    noFill();
    beginShape();
    for (let pt of points) vertex(pt.x, pt.y);
    endShape();
    
    stroke(...color, 255);
    strokeWeight(weight);
    noFill();
    beginShape();
    for (let pt of points) vertex(pt.x, pt.y);
    endShape();
}

// Verificar hover para mostrar HUD
function verificarHoverHUD() {
    let hovered = false;
    for (let module of modules) {
        let d = dist(mouseX, mouseY, module.x, module.y);
        let isHover = d < module.radius;
        if (isHover && module.titulo) {
            hovered = true;
            mostrarHud(module);
            break; // solo mostramos uno a la vez
        }
    }
    if (!hovered) ocultarHud();
}

// Mostrar HUD con información del módulo
function mostrarHud(modulo) {
    const hud = document.getElementById('hud-info');
    const hudImg = document.getElementById('hud-img');
    const hudTitle = document.getElementById('hud-title');
    const hudDesc = document.getElementById('hud-desc');
    
    hud.classList.add('visible');
    hud.classList.remove('hidden');
    
    hudImg.src = modulo.imagen || '';
    hudTitle.textContent = modulo.titulo || '';
    hudDesc.textContent = modulo.descripcion || '';
    
    hud.style.left = (mouseX + 20) + 'px';
    hud.style.top = (mouseY + 20) + 'px';
}

// Ocultar HUD
function ocultarHud() {
    const hud = document.getElementById('hud-info');
    hud.classList.remove('visible');
    hud.classList.add('hidden');
}

// Manejar clic en módulos
function mousePressed() {
    for (let i = 0; i < modules.length; i++) {
        let module = modules[i];
        let d = dist(mouseX, mouseY, module.x, module.y);
        if (d < module.radius) {
            if (i === 0) {
                // Módulo 1: Biografía
                mostrarPagina('biografia.html');
            } else if (i === 1) {
                // Módulo 2: Nosotros
                mostrarPagina('nosotros.html');
            } else if (i === 2) {
                // Módulo 3: Trayectoria
                mostrarPagina('trayectoria.html');
            } else if (i === 3) {
                // Módulo 4: Covers
                mostrarPagina('covers.html');
            } else if (i === 4) {
                // Módulo 5: Colaboración con Barak
                mostrarPagina('barak.html');
            } else if (i === 5) {
                // Módulo 6: Conexión con el público
                mostrarPagina('conexion.html');
            }
        }
    }
}

// FUNCIONES FALTANTES - AGREGADAS

// Mostrar página en el overlay
function mostrarPagina(pagina) {
  const overlay = document.getElementById('content-overlay');
  const contentArea = document.getElementById('content-area');

  overlay.classList.remove('hidden');
  contentArea.innerHTML = `
      <iframe src="${pagina}" style="width: 100%; height: 100%; border: none;"></iframe>
  `;
}


// Mostrar mensaje en el overlay
function mostrarMensaje(titulo, mensaje) {
    const overlay = document.getElementById('content-overlay');
    const contentArea = document.getElementById('content-area');
    
    overlay.classList.remove('hidden');
    contentArea.innerHTML = `
        <button id="close-btn">X</button>
        <div style="padding: 40px; text-align: center; color: white;">
            <h2 style="color: #00ffff; margin-bottom: 20px;">${titulo}</h2>
            <p style="font-size: 18px;">${mensaje}</p>
        </div>
    `;
}

// Mostrar video en el overlay
function mostrarVideo(videoPath) {
    const overlay = document.getElementById('content-overlay');
    const contentArea = document.getElementById('content-area');
    
    overlay.classList.remove('hidden');
    contentArea.innerHTML = `
        <button id="close-btn">X</button>
        <video controls autoplay style="width: 100%; height: 100%;">
            <source src="${videoPath}" type="video/mp4">
            Tu navegador no soporta el video.
        </video>
    `;
}

// Mostrar contenido "Nosotros" en el overlay
function mostrarNosotros() {
    const overlay = document.getElementById('content-overlay');
    const contentArea = document.getElementById('content-area');
    
    overlay.classList.remove('hidden');
    contentArea.innerHTML = `
        <button id="close-btn">X</button>
        <iframe src="nosotros.html" style="width: 100%; height: 100%; border: none;"></iframe>
    `;
}

// Inicializar eventos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById('content-overlay');
    const contentArea = document.getElementById('content-area');
    
    console.log('✅ Sistema de módulos inicializado');

    // Usar event delegation para el botón de cerrar
    document.addEventListener('click', function(e) {
        if (e.target.id === 'close-btn') {
            overlay.classList.add('hidden');
            contentArea.innerHTML = '';
            console.log('Overlay cerrado');
        }
    });

    // También cerrar al hacer clic fuera del contenido
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.add('hidden');
            contentArea.innerHTML = '';
            console.log('Overlay cerrado (click fuera)');
        }
    });
    
    // Botón para regresar al menú
    document.getElementById('btn-regresar-menu').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    console.log('Sistema de módulos inicializado correctamente');

    // ======================
    // ESCUCHAR MENSAJES DE IFRAME (por ejemplo, desde nosotros.html)
    // ======================
    window.addEventListener('message', (event) => {
        if (event.data === 'cerrarOverlay') {
            const overlay = document.getElementById('content-overlay');
            const contentArea = document.getElementById('content-area');
            
            console.log('📩 Mensaje recibido: cerrarOverlay');
            
            // Animación de cierre suave
            gsap.to(overlay, { opacity: 0, duration: 0.5, onComplete: () => {
                overlay.classList.add('hidden');
                overlay.style.opacity = 1; // restaurar para próxima apertura
                contentArea.innerHTML = '';
            }});
        }
    });

});