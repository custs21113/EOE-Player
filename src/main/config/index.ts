import path from 'path';

export const defaultMainWebWidth = 980;

export const defaultMainWebHeight = 850;

export const mainWebWindowConfig = {
  height: defaultMainWebHeight,
  width: defaultMainWebWidth,
  resizable: false,
  frame: false,
  transparent: true,
  center: true,
  show: false,
  webPreferences: {
    plugins: true,
    devTools: true,
    nodeIntegration: true,
    nodeIntegrationInWorker: false,
    contextIsolation: false,
    preload: path.join(__dirname, '../renderer/preload.js')
  },
};
