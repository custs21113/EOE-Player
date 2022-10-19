const getPersonalized = require('./getPersonalized.js');
const { ipcMain } = require('electron')
module.exports = function(mainWindow) {
  ipcMain.on('window-minimize', function () {
      mainWindow.minimize();
  })
  
  ipcMain.on('window-enlarge', function () {
      mainWindow.maximize();
  })
  ipcMain.on('window-close', function () {
      mainWindow.close();
  })
  console.log(typeof getPersonalized)
  ipcMain.handle('getPersonalized', getPersonalized);
}