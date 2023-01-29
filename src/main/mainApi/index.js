import { ipcMain, app } from 'electron';
import http from 'http'
import fs from 'fs';
import path from 'path';

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
    ipcMain.on('hotupdate', function(e, url) {
        console.log({url});
        const dest = path.resolve(app.getAppPath(), `../download/eoe_player-1.0.0.win32.exe`);
        const stream = fs.createWriteStream(dest);
        http.get(url, (res) => {
            res.on('data', function(chunk) {
                stream.write(chunk)
            }).on('end', () => {
                stream.end();
            })
        })
    })
}