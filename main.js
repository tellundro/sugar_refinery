const { app, dialog, BrowserWindow, Menu, ipcMain } = require('electron');
const { createCanvas, loadImage } = require('canvas');
const url = require("url");
const path = require("path");
const { join } = require('path');
const fs = require('fs');

let mainWindow
const appFolder = app.getPath('userData');
const lastProjectsFileName = path.join(appFolder, "sugar_refinery_last_projects.txt")
const previewFolder = path.join(appFolder, "preview")

// and another test
// create Preview folder it not exists
if (!fs.existsSync(previewFolder)) {
  fs.mkdirSync(previewFolder)
}

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

function getLastProjects() {
  let lastProjects;
  try {
    // read from existing file, if any
    lastProjects = JSON.parse(fs.readFileSync(lastProjectsFileName))
  } catch (err) {
    console.log(lastProjectsFileName + " does not exist.")
  }
  return lastProjects;
}

function writeLastProjects(lastProjects) {
  // writeLastProjects
  try {
    fs.writeFileSync(lastProjectsFileName, JSON.stringify(lastProjects))
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
    let lastProjects = getLastProjects();
    if (lastProjects) {
      // retrieve project last index in history array
      let lastIndex = lastProjects.findIndex((entry) => entry.name == data.saveFileName);
      if (lastIndex >= 0) {
        // delete from history if already exists
        lastProjects.splice(lastIndex, 1);
      }
      // push entry to the top of the list
      let newEntry = { name: data.saveFileName, fullPath: saveFileFullPath, projName: data.projName }
      lastProjects.splice(0, 0, newEntry)
    } else {
      // create new file
      lastProjects = [
        { name: data.saveFileName, fullPath: saveFileFullPath, projName: data.projName },
      ]
    }
    writeLastProjects(lastProjects);
  }
}

function saveImage(canvas, path) {
  fs.writeFileSync(
    path,
    canvas.toBuffer("image/png")
  );
};

async function loadLayerTrait(layer, totalWeight) {
  let random = Math.random() * totalWeight;
  let pastWeight = 0;
  // traverse layer traits and select one that match the
  // random value
  for (let t of layer.traits) {
    if (((random >= pastWeight) &&
      (random < (pastWeight + parseInt(t.weight, 10)))) ||
      (random == totalWeight)) {
      try {
        let image = await loadImage(t.filePath);
        return image;
      } catch (err) {
        console.error('error loading image')
      }
      break;
    }
    pastWeight += parseInt(t.weight, 10)
  }
}

function getLayerTotalWeight(layer) {
  let sum = 0;
  layer.traits.forEach((trait) => sum += parseInt(trait.weight, 10));
  return sum;
}

function mustGenerateLayer(layerRarity) {
  let random = Math.random() * 100
  // console.log("generateSingleImage: layer rarity" + layerRarity)
  // console.log("generateSingleImage: random value" + random)
  return (random <= layerRarity)
}

async function generateSingleImage(state) {
  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;

  let images = []
  let layersTotalWeight = []
  let loadedLayers = []

  // create array with total trait weight for each layer
  state.layers.forEach((layer) => {
    layersTotalWeight.push(getLayerTotalWeight(layer))
  })

  for (var i = 0; i < state.layers.length; i++) {
    // decide whether current layer should be included based on layer rarity
    let generateLayer = mustGenerateLayer(state.layers[i].rarity)
    // should generate layer
    if (generateLayer) {
      // check whether layer has exclusivity with previous loaded layer
      let skipLayer = loadedLayers.includes(state.layers[i].exclusiveWith)
      if (!skipLayer) {
        images.push(await loadLayerTrait(state.layers[i], layersTotalWeight[i]))
        loadedLayers.push(state.layers[i].name)
      } else {
        images.push(null)
      }
    }
    images.push(null)
  }

  await Promise.all(images).then(imgs => {
    imgs.forEach(image => {
      if (image) {
        ctx.drawImage(image, 0, 0, 600, 600)
      }
    })
  })

  let imgPath = path.join(previewFolder, "preview1.png")
  saveImage(canvas, imgPath)

  return imgPath;
}

function generatePreview(event, state) {
  return generateSingleImage(JSON.parse(state));
}

function showConfirmDialog() {
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
  let confirmed = showConfirmDialog()
  if (confirmed) {
    let lastProjects = getLastProjects()
    if (lastProjects) {
      let index = lastProjects.findIndex(project => project.name === JSON.parse(name))
      console.log(lastProjects)
      console.log(index)
      console.log("lastProject[0].name: " + lastProjects[0].name + " name: " + JSON.parse(name))
      // console.log(lastProjects[index].fullPath)
      deleteSavedState(lastProjects[index].fullPath)
      lastProjects.splice(index, 1)
      // remove savedState
      writeLastProjects(lastProjects)
      return true;
    }
    return false;
  }
  return false;
}

// -------------------------------------------------------------
// SIGNALS CODE
// -------------------------------------------------------------

ipcMain.on('save-to-txt-and-close', (event, data) => {
  saveStateToTxt(data)
  // save state here to text-file here
  // update lastest opened projects on localStorage
  app.emit('closed')
})

ipcMain.on('closeWithoutSave', () => {
  app.emit('closed')
})

ipcMain.on('save-to-txt-and-return', (event, data) => {
  saveStateToTxt(data)
  // save state here to text-file here
  // update lastest opened projects on localStorage
  app.emit('ProjectSelection')
})

ipcMain.handle('deleteProject', deleteProject)

ipcMain.handle('generatePreview', generatePreview)

ipcMain.handle("getSavedState", getSavedState)

ipcMain.handle('dialog:selectFolder', selectFolder)

ipcMain.handle('dialog:selectTraits', selectTraits)

ipcMain.handle('getLastProjects', getLastProjects)

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
