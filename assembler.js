const path = require("path");
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

class Assembler {
  constructor(_appFolder, _previewFolder) {
    this.appFolder = _appFolder;
    this.previewFolder = _previewFolder;

    // create Preview folder it not exists
    if (!fs.existsSync(this.previewFolder)) {
      fs.mkdirSync(this.previewFolder)
    }
  }

  async generatePreviewImage(state) {
    const canvas = createCanvas(600, 600);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;

    let images = []
    let layersTotalWeight = []
    let loadedLayers = []

    // create array with total trait weight for each layer
    state.layers.forEach((layer) => {
      layersTotalWeight.push(this.getLayerTotalWeight(layer))
    })

    for (var i = 0; i < state.layers.length; i++) {
      // decide whether current layer should be included based on layer rarity
      let generateLayer = this.mustGenerateLayer(state.layers[i].rarity)
      // should generate layer
      if (generateLayer) {
        // check whether layer has exclusivity with previous loaded layer
        let skipLayer = loadedLayers.includes(state.layers[i].exclusiveWith)
        if (!skipLayer) {
          images.push(await this.loadLayerTrait(state.layers[i], layersTotalWeight[i]))
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

    let imgPath = path.join(this.previewFolder, "preview1.png")
    this.saveImage(canvas, imgPath)
    return imgPath;
  }

  saveImage(canvas, path) {
    fs.writeFileSync(
      path,
      canvas.toBuffer("image/png")
    );
  };

  async loadLayerTrait(layer, totalWeight) {
    let random = Math.random() * totalWeight;
    let pastWeight = 0;
    // traverse layer traits and select one that match the random value
    for (let t of layer.traits) {
      if (((random >= pastWeight) &&
        (random < (pastWeight + parseInt(t.weight, 10)))) ||
        (random == totalWeight)) {
        try {
          let image = await loadImage(t.filePath);
          return image;
        } catch (err) {
          console.error('error loading image ' + err)
          return null
        }
      }
      pastWeight += parseInt(t.weight, 10)
    }
  }

  getLayerTotalWeight(layer) {
    let sum = 0;
    layer.traits.forEach((trait) => sum += parseInt(trait.weight, 10));
    return sum;
  }

  mustGenerateLayer(layerRarity) {
    let random = Math.random() * 100
    return (random <= layerRarity)
  }

  // generateCollection(state) {
  // Treat Metadata
  // }
}

module.exports = {
  Assembler,
}
