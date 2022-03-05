const { app, BrowserWindow } = require('electron');
const path = require('path');

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

  win.loadURL('http://localhost:3000');

  // Temporary disabled
  // if(process.env.NODE_ENV === 'development') {
  //   win.loadURL('http://localhost:3000')
  // } else {
  //   win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
  // }

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