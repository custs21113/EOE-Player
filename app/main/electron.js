// 引入electron并创建一个Browserwindow
const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

// 获取在 package.json 中的命令脚本传入的参数，来判断是开发还是生产环境
const mode = process.argv[2];
function isDev() {
    // 👉 还记得我们配置中通过 webpack.DefinePlugin 定义的构建变量吗
    return process.env.NODE_ENV === 'development';
  }
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;
let tray = null;
ipcMain.on('window-minimize', function () {
    mainWindow.minimize();
})

ipcMain.on('window-enlarge', function () {
    mainWindow.maximize();
})
ipcMain.on('window-close', function () {
    mainWindow.quit();
})
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
            webSecurity: false,
            // preload: path.join(__dirname, './public/preload.js')
        }
    });
    // tray = new Tray(path.join(__dirname, './public/icon.png'));
    // tray.setToolTip('Electron Tray');
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示',
            click: () => mainWindow.show()
        },
        {
            label: '退出',
            click: () => mainWindow.quit()
        }
    ]);
    // tray.setContextMenu(contextMenu);
    if (isDev()) {
        // 加载应用----适用于 react 项目
        mainWindow.loadURL('http://localhost:7001/');
    } else {
        // 加载应用-----react项目打包后的路径
        // mainWindow.loadURL(url.format({
        //     pathname: path.join(__dirname, './dist/index.html'),
        //     protocol: 'file:',
        //     slashes: true
        // }))
        mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
        // mainWindow.loadFile(path.join(__dirname, './dist/index.html'))
        // mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
        // console.log(`file://${path.join(__dirname, '../dist/index.html')}`)
    }


    // 打开开发者工具，默认不打开
    mainWindow.webContents.openDevTools()
    // 关闭window时触发下列事件.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}


// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)
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
