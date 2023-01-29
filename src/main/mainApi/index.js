import { ipcMain } from 'electron';

export default function (mainWindow) {
    ipcMain.on('window-minimize', function () {
        mainWindow.minimize();
    })

    ipcMain.on('window-enlarge', function () {
        mainWindow.maximize();
    })
    ipcMain.on('window-close', function () {
        mainWindow.close();
    })
}