// const { app, BrowserWindow, Menu, MenuItem, Tray } = require('electron')
// const path = require('path')
// const url = require('url')
// const mainApi = require('./mainApi')
import { app, BrowserWindow, Menu, MenuItem, Tray } from 'electron';
import path from 'path';
import startScreen from './windows/startScreen';
import mainApi from './mainApi';
const mode = process.argv[2];
let mainWindow: Electron.CrossProcessExports.BrowserWindow | null = null;
let tray = null;
let menu = null;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 980,
        height: 850,
        resizable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, '../renderer/preload.js')
        }
    });
    try {
        if (process.env.NODE_ENV === 'production') {
            tray = new Tray(path.join(app.getPath('exe'), '../icon.png'));
        } else {
            tray = new Tray(path.join(__dirname, `../public/icon.png`));
        }
        tray.setToolTip('Electron Tray');
        const contextMenu = Menu.buildFromTemplate([
            {
                label: '显示',
                click: () => mainWindow?.show()
            },
            {
                label: '退出',
                click: () => mainWindow?.close()
            }
        ]);
        tray.setContextMenu(contextMenu);
    } catch (error) {
        console.log(error)
    }

    return mainWindow;
}


app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development') {
        mainWindow = createWindow();
        mainWindow.loadURL('http://localhost:3001/');
    } else {
        mainWindow = startScreen();
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 10000)
        })
        mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
    }
    mainWindow.webContents.openDevTools()
    mainWindow.on('closed', function () {
        mainWindow = null
    });

    mainApi(mainWindow)
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})
