const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    title: 'FPM',
    center: true,
    darkTheme: true,
    autoHideMenuBar: true,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
  
  return win
}

const init = async () => {
  await app.whenReady()

  const win = createWindow()
}

init()