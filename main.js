// 引入electron并创建一个Browserwindow
const { app, BrowserWindow, Menu, MenuItem, Tray, remote} = require('electron')
const path = require('path')
const url = require('url')
const mainApi = require('./mainApi')
// const makeApi = require('./mainApi')
// const getPersonalized = require('./mainApi/getPersonalized.js');
// const { ipcMain } = require('electron')
// 获取在 package.json 中的命令脚本传入的参数，来判断是开发还是生产环境
const mode = process.argv[2];
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;
let tray = null;
let menu = null;

function createWindow() {
    //创建浏览器窗口,宽高自定义
    mainWindow = new BrowserWindow({
        width: 980,
        height: 850,
        resizable: false,
        frame: false,
        // transparent: true,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            enablemotemodule: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    try {
        if (process.env.NODE_ENV === 'production') {
            console.log('Welcome to production');
            tray = new Tray(path.join(app.getPath('exe'), '../icon.png'));
        } else {
            console.log('Welcome to development');
            tray = new Tray(path.join(__dirname, `../public/icon.png`));
        }
        tray.setToolTip('Electron Tray');
        const contextMenu = Menu.buildFromTemplate([
            {
                label: '显示',
                click: () => mainWindow.show()
            },
            {
                label: '退出',
                click: () => mainWindow.close()
            }
        ]);
        tray.setContextMenu(contextMenu);
    } catch (error) {
        console.log(error)
    }
    if (process.env.NODE_ENV === 'development') {
        // 加载应用----适用于 react 项目
        mainWindow.loadURL('http://localhost:3001/');
    } else {
        // 加载应用-----react项目打包后的路径
        // mainWindow.loadURL(url.format({
        //     pathname: path.join(__dirname, './dist/index.html'),
        //     protocol: 'file:',
        //     slashes: true
        // }))
        mainWindow.loadFile(path.join(__dirname, 'index.html'))
        // mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    }


    // 打开开发者工具，默认不打开
    mainWindow.webContents.openDevTools()
    // 关闭window时触发下列事件.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    return mainWindow;
}


// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', () => {
    const e = createWindow()
    mainApi(e)
})
// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (mainWindow === null) {
        createWindow()
    }
})
// 你可以在这个脚本中续写或者使用require引入独立的js文件.
