import { app, BrowserWindow, ipcMain, Notification } from "electron";

let mainWindow: BrowserWindow | null;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000,
    minHeight: 600,
    minWidth: 800,
    webPreferences: { webSecurity: false }
  });

  mainWindow.loadURL(winURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

ipcMain.on('get-system-paths', (event, arg) => {
  let paths: string[] = [];
  paths.push(app.getPath('videos'));
  paths.push(app.getPath("music"));
  event.sender.send('get-system-paths-reply', paths);
});

ipcMain.on('show-notification', (event, arg) => {
  console.log(Notification.isSupported());

  let notify = new Notification({
    title: "hallo",
    body: "hallo"
  });
  notify.show();
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

let openedFile: string | null = null;

if (process.argv.length > 1) {
  openedFile = process.argv[1].toString();
}

ipcMain.on('gimme-openedfile', (event) => {
  event.sender.send('openedfile', openedFile);
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
