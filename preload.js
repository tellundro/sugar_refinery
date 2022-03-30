const { contextBridge, ipcRenderer } = require('electron');
const path = require("path");

contextBridge.exposeInMainWorld(
  'electronAPI', {
  // -------------------------------------------
  // MAIN TO RENDERER
  // -------------------------------------------
  /* changeRoute listener for menu items */
  changeRoute: (channel, data) => { ipcRenderer.on(channel, data); },
  /* signals: SAVE-QUIT, SAVE-RETURN */
  appClosing: (signal, data) => ipcRenderer.on(signal, data),

  // -------------------------------------------
  // RENDERER TO MAIN
  // -------------------------------------------
  saveAndClose: (state) => ipcRenderer.send('save-to-txt-and-close', state),
  saveAndReturn: (state) => ipcRenderer.send('save-to-txt-and-return', state),
  selectFolder: () => ipcRenderer.invoke('dialog:selectFolder'),
  selectTraits: () => ipcRenderer.invoke('dialog:selectTraits'),
  getFileNameFromPath: (fullPath) => ipcRenderer.invoke('getFileNameFromPath', fullPath),
  getLastProjects: () => ipcRenderer.invoke('getLastProjects'),
  getSavedState: (fullPath) => ipcRenderer.invoke('getSavedState', fullPath),
  closeWithoutSave: () => ipcRenderer.send('closeWithoutSave'),
  generatePreview: (state) => ipcRenderer.invoke('generatePreview', state),

},
);
