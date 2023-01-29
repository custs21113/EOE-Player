import { ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
(window as any).ipcRenderer = ipcRenderer;
// contextBridge.exposeInMainWorld('electronAPI', {
//   getPersonalized: () => ipcRenderer.invoke('getPersonalized')
// })