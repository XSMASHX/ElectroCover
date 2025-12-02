const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  // USAR .ICO EN LUGAR DE .PNG
  let iconPath = path.join(__dirname, 'assets', 'electrocover-large.ico');
  
  // Si no existe el ICO grande, usar uno normal
  if (!fs.existsSync(iconPath)) {
    console.warn('ICO grande no encontrado, buscando alternativas...');
    
    // Buscar cualquier ICO
    const alternatives = [
      path.join(__dirname, 'assets', 'electrocover.ico'),
      path.join(__dirname, 'assets', 'icon.ico'),
      path.join(__dirname, 'assets', 'Proyecto nuevo.png') // Último recurso
    ];
    
    for (const alt of alternatives) {
      if (fs.existsSync(alt)) {
        iconPath = alt;
        console.log(`Usando: ${path.basename(alt)}`);
        break;
      }
    }
  }
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
  
  // TRUCO EXTRA: Forzar el icono después de crear la ventana
  if (fs.existsSync(iconPath)) {
    win.setIcon(iconPath);
    console.log('Icono forzado en ventana');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});