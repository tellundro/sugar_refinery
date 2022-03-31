const { app, dialog, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require("url");
const path = require("path");
const fs = require('fs');
const { Assembler } = require('./assembler.js')

let mainWindow
const appFolder = app.getPath('userData');
const recentProjectsFileName = path.join(appFolder, "sugar_refinery_last_projects.txt")
const previewFolder = path.join(appFolder, "preview")

const assembler = new Assembler(appFolder, previewFolder);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      devTools: true
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `./dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.webContents.openDevTools({ mode: 'undocked' });

  mainWindow.on('close', (e) => {
    if (mainWindow) {
      e.preventDefault();
      e.sender.send('QUIT', "close app");
    }
  });
}

async function selectFolder() {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

async function selectTraits() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['multiSelections'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
  })
  if (canceled) {
    return
  } else {
    return filePaths
  }
}

function getRecentProjects() {
  let recentProjects;
  try {
    // read from existing file, if any
    recentProjects = JSON.parse(fs.readFileSync(recentProjectsFileName))
  } catch (err) {
    console.log(recentProjectsFileName + " does not exist.")
  }
  return recentProjects;
}

function writeRecentProjects(recentProjects) {
  // writeRecentProjects
  try {
    fs.writeFileSync(recentProjectsFileName, JSON.stringify(recentProjects))
  } catch (err) {
    console.error(err)
  }
}

function getSavedState(event, fullPath) {
  let savedState;
  try {
    // read from existing file, if any
    savedState = JSON.parse(fs.readFileSync(fullPath))
  } catch (err) {
    console.log(fullPath + " does not exist.")
  }
  return savedState;
}

function saveStateToTxt(data) {
  let success = false;
  let saveFileFullPath = path.join(appFolder, data.saveFileName);
  try {
    fs.writeFileSync(saveFileFullPath, data.state)
    success = true;
  } catch (err) {
    console.error(err)
  }
  if (success) {
    let recentProjects = getRecentProjects();
    if (recentProjects) {
      // retrieve project last index in history array
      let lastIndex = recentProjects.findIndex((entry) => entry.saveFileName == data.saveFileName);
      if (lastIndex >= 0) {
        // delete from history if already exists
        recentProjects.splice(lastIndex, 1);
      }
      // push entry to the top of the list
      let newEntry = { saveFileName: data.saveFileName, fullPath: saveFileFullPath, projName: data.projName }
      recentProjects.splice(0, 0, newEntry)
    } else {
      // create new file
      recentProjects = [
        { saveFileName: data.saveFileName, fullPath: saveFileFullPath, projName: data.projName },
      ]
    }
    writeRecentProjects(recentProjects);
  }
}

function showDeleteConfirmation() {
  var choice = dialog.showMessageBoxSync(
    {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to delete the project?'
    });

  console.log(choice)
  return choice === 0;
}

function deleteSavedState(fullPath) {
  try {
    fs.unlinkSync(fullPath)
  } catch (err) {
    console.error(err)
  }
}

async function deleteProject(event, name) {
  console.log("name is " + name)
  let confirmed = showDeleteConfirmation()
  if (confirmed) {
    let recentProjects = getRecentProjects()
    if (recentProjects) {
      let index = recentProjects.findIndex(project => project.name === JSON.parse(name))
      // console.log(recentProjects[index].fullPath)
      deleteSavedState(recentProjects[index].fullPath)
      recentProjects.splice(index, 1)
      // remove savedState
      writeRecentProjects(recentProjects)
      return true;
    }
    return false;
  }
  return false;
}

function generatePreview(event, state) {
  return assembler.generatePreviewImage(JSON.parse(state));
}

// -------------------------------------------------------------
// SIGNALS CODE
// -------------------------------------------------------------

ipcMain.on('save-to-txt-and-close', (event, data) => {
  saveStateToTxt(data)
  app.emit('closed')
})

ipcMain.on('closeWithoutSave', () => {
  app.emit('closed')
})

ipcMain.on('save-to-txt-and-return', (event, data) => {
  saveStateToTxt(data)
  app.emit('ProjectSelection')
})

ipcMain.handle('deleteProject', deleteProject)

ipcMain.handle('generatePreview', generatePreview)

ipcMain.handle("getSavedState", getSavedState)

ipcMain.handle('dialog:selectFolder', selectFolder)

ipcMain.handle('dialog:selectTraits', selectTraits)

ipcMain.handle('getRecentProjects', getRecentProjects)

ipcMain.handle('getFileNameFromPath', async (event, fullPath) => {
  const result = path.parse(fullPath).name;
  return result
})

app.on('ProjectSelection', () => { mainWindow.webContents.send('ROUTE', "/"); });

app.on('aboutPage', () => { mainWindow.webContents.send('ROUTE', "/about"); });

app.on('save-current-and-return-to-selection', () => {
  mainWindow.webContents.send("RETURN", "return to project selection")
})

app.on('ready', () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  createWindow();
});

app.on('activate', function() {
  if (mainWindow === null) createWindow()
})

app.on('closed', function() {
  mainWindow = null

  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
});


// -------------------------------------------------------------
// MENU OPTIONS
// -------------------------------------------------------------
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Return to project selection...',
        click: () => app.emit('save-current-and-return-to-selection'),
      },
      { type: 'separator' },
      {
        label: 'Exit',
        click() {
          // Mac must be treated differently. Close all windows but not quit
          app.quit();
        }
      }
    ],
  },
  {
    label: 'About',
    click: () => app.emit('aboutPage')
  }
]
