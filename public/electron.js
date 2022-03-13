const remote = require('@electron/remote/main');
const { app, BrowserWindow } = require('electron');
const path = require('path');

remote.initialize();

const env = process.env.NODE_ENV || 'development';

const createWindow = () => {
  const win = new BrowserWindow({
    center: true,
    darkTheme: true,
    autoHideMenuBar: true,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    minWidth: 1280,
    minHeight: 720,
  });

  remote.enable(win.webContents);

  if (env === 'development') {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadURL(
      `file://${path.join(__dirname, '../build/index.html')}`
    );
  }

  return win;
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if (env === 'development') {
  try {
    require('electron-reloader')(module, {
      debug: true,
      watchRenderer: true,
      ignore: ['node_modules', /^\./, /^\.map/, /.json$/],
    });
  } catch (_) {
    console.log('Error');
  }
}
