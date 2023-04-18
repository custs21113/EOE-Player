import { ipcMain, app } from 'electron';
import http from 'http'
import fs from 'fs';
import path from 'path';
import { BrowserWindow } from 'electron/main';

export default function (mainWindow: BrowserWindow) {
    ipcMain.on('window-minimize', function () {
        mainWindow.minimize();
    })

    ipcMain.on('window-enlarge', function () {
        mainWindow.maximize();
    })
    ipcMain.on('window-close', function () {
        mainWindow.close();
        process.exit(0);
    })
    ipcMain.on('hotupdate', function(e, url: string) {
        const dest = path.resolve(app.getAppPath(), `../download/eoe_player-1.0.0.win32.exe`);
        if(!fs.existsSync(path.dirname(dest))) {
            fs.mkdirSync(path.dirname(dest))
        }
        const stream = fs.createWriteStream(dest);
        http.get(url, (res) => {
            res.on('data', function(chunk) {
                stream.write(chunk)
            }).on('end', () => {
                stream.end();
            })
        })
    })
    ipcMain.on('reload', function() {
        mainWindow.loadFile(path.join(__dirname, '../newRenderer/index.html'))
    })
}