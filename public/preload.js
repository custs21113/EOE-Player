const electron = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
window.electron = electron;