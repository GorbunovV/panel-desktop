const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')

const path = require('path')
const url = require('url')

const { autoUpdater } = require('electron-updater')

// Disable security warnings and set react app path on dev env
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    fullscreen: false,
    x: 0,
    y: 0,
    width: 800,
    height: 1280,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  })

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : url.format({
          pathname: path.join(__dirname, '../build/index.html'),
          protocol: 'file:',
          slashes: true,
        }),
  )

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  setTimeout(() => {
    autoUpdater.checkForUpdatesAndNotify()
  }, 30000)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() })
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall()
})

autoUpdater.on('checking-for-update', () => {
  mainWindow.webContents.send('checking_for_update')
})

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available')
})

autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('update_not_available')
})

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded')
})
