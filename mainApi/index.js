const getPersonalized = require('./getPersonalized.js');
const { Menu, BrowserWindow } = require('electron')
const downloadFileToFolder = require('./download.js');
const { ipcMain } = require('electron')
module.exports = function (mainWindow) {
    ipcMain.on('window-minimize', function () {
        mainWindow.minimize();
    })

    ipcMain.on('window-enlarge', function () {
        mainWindow.maximize();
    })
    ipcMain.on('window-close', function () {
        mainWindow.close();
    })
    ipcMain.handle('getPersonalized', (_, num) => getPersonalized(num));
    // ipcMain.handle('show-context-menu', (event, ...args) => {
    ipcMain.handle('showmenu', (event, ...args) => {
        const [id = 0, songName = "", singers = ""] = args;
        let result = null;
        const template = [
            {
                label: '添加至播放列表',
                click: () => {
                    console.log(id);
                    result = downloadFileToFolder(id);
                    event.sender.send('showmenu', result);
                }
            },
            {
                label: '下载', click: async () => {
                    console.log(id);
                    const fileName = `${songName} - ${singers}`;
                    // event.sender.send('context-menu-command', 'menu-item-2')
                    result = await downloadFileToFolder(id, fileName);
                    event.sender.send('showmenu-reply', `下载_${result}`);
                }
            }
        ]
        const menu = Menu.buildFromTemplate(template);
        menu.popup(BrowserWindow.fromWebContents(event.sender));
    })
    ipcMain.handle('download', (_, id) => downloadFileToFolder(id));
}