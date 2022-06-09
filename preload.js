const { electron, contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
window.ipcRenderer = ipcRenderer;
// contextBridge.exposeInMainWorld('electronAPI', {
//   getPersonalized: () => ipcRenderer.invoke('getPersonalized')
// })