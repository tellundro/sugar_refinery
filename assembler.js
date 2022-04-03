const path = require("path");
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

class Assembler {

  metadataList = []

  // First we generate the collection with both the Images and the Metadata
  // Then we upload the images to a descentralized storage (IPFS/Pinata.. Arweave?)
  // Then we UPDATE the metadata with the correct IPFS address that points to the FOLDER of the collection
  // Explanation in: https://www.youtube.com/watch?v=Zhmj4PiJ-GA0 , minuto 33:32s

  metadataStruct = { // metadata for Ethereum
    name: "", // collection name + #imageNumber
    description: "", // collection description
    image: "", // imageURI (ipfs://CID/01.png format)
    // no need for DNA or HASH code, what matters is the storage address (image attribute)
    attributes: [ // layer/trait loaded for current image
      // {
      //   "trait_type": "layer name",
      //   "value": "trait name"
      // },
    ],
    tokenId: "", // image number #imageNumber
    createdWith: "sugar_refinery", // your's truly
  };

  // extra metadata for Solana
  solanaExtraMetadata = {
    symbol: "", // collection symbol
    seller_fee_basis_points: "", // secondary market royalties 1000 = 10%
    external_url: "", // collection external url/website
    creators: [
      {
        address: "", // solana wallet public address
        share: "", // 100 = 100%
      },
    ],
  }

  constructor(_appFolder, _previewFolder) {
    this.appFolder = _appFolder;
    this.previewFolder = _previewFolder;
    this.canvas;
    this.ctx;

    // create Preview folder it not exists
    this.checkAndCreateFolder(this.previewFolder)
  }

  checkAndCreateFolder(folder) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
  }

  async generatePreviewImage(state) {
    const width = parseInt(state.metadata.width, 10)
    const height = parseInt(state.metadata.height, 10)

    let imgPath = path.join(this.previewFolder, "preview1.png");

    this.canvas = createCanvas(width, height)
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;

    let layersTotalWeight = this.getLayersTotalWeight(state)

    let imageObj = await this.generateSingleImage(state, layersTotalWeight)

    Promise.all(imageObj.imgLayers).then(_layers => {
      // paste all images onto canvas
      _layers.forEach(image => {
        if (image) {
          this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
        }
      })

      this.saveImage(imgPath);
    })

    return imgPath;
  }

  saveImage(path) {
    console.log("saveImage: saving to " + path)
    fs.writeFileSync(
      path,
      this.canvas.toBuffer("image/png")
    );
  };

  async loadLayerTrait(layer, totalWeight) {
    let random = Math.random() * totalWeight;
    let pastWeight = 0;
    // traverse layer traits and select one that match the random value
    for (let trait of layer.traits) {
      if (((random >= pastWeight) &&
        (random < (pastWeight + parseInt(trait.weight, 10)))) ||
        (random == totalWeight)) {
        try {
          let image = await loadImage(trait.filePath);
          return {
            img: image,
            metadata: { layer_name: layer.name, trait_name: trait.name }
          };
        } catch (err) {
          console.error('error loading image ' + err)
          return null
        }
      }
      pastWeight += parseInt(trait.weight, 10)
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

  getLayersTotalWeight(state) {
    let layersTotalWeight = []

    // create array with total trait weight for each layer
    state.layers.forEach((layer) => {
      layersTotalWeight.push(this.getLayerTotalWeight(layer))
    })

    return layersTotalWeight
  }

  async generateSingleImage(state, layersTotalWeight,) {

    let layers = []
    let imgMetadata = []

    for (var i = 0; i < state.layers.length; i++) {
      // decide whether current layer should be included based on layer rarity
      let generateLayer = this.mustGenerateLayer(state.layers[i].rarity)
      // should generate layer
      if (generateLayer) {
        // check whether layer has exclusivity with previous loaded layer
        let skipLayer = imgMetadata.find(layer => layer.layer_name == state.layers[i].exclusiveWith)
        if (!skipLayer) {
          let loadedLayer = await this.loadLayerTrait(state.layers[i], layersTotalWeight[i])
          layers.push(loadedLayer.img)
          imgMetadata.push(loadedLayer.metadata)
        } else {
          imgMetadata.push({ layer_name: state.layers[i].name, trait_name: null })
        }
      } else {
        imgMetadata.push({ layer_name: state.layers[i].name, trait_name: null })
      }
    }

    return { imgLayers: layers, imgMetadata: imgMetadata }
  }

  isUnique(collectionMetadata, metadata) {
    // check whether metadata is unique in collection metadata
    // console.log(collectionMetadata)
    // console.log(metadata)
    return true;
  }

  writeMetadata(metadata, path) {
    // writeRecentProjects
    try {
      Promise.all(metadata).then(collectionMetadata => {
        fs.writeFileSync(path, JSON.stringify(collectionMetadata))
      })
    } catch (err) {
      console.error(err)
    }
  }

  async generateCollection(state) {
    let collectionSize = parseInt(state.metadata.collectionSize);

    let outputFolder = state.metadata.outputFolder;
    let imgsFolder = path.join(outputFolder, "images");
    let metasFolder = path.join(outputFolder, "metadata");

    this.checkAndCreateFolder(outputFolder)
    this.checkAndCreateFolder(imgsFolder)
    this.checkAndCreateFolder(metasFolder)

    let width = parseInt(state.metadata.width);
    let height = parseInt(state.metadata.height);

    this.canvas = createCanvas(width, height)
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;

    // TODO
    // PRELOAD ALL IMAGE TRAITS TO AVOID HAVING TO LOAD EACH ONE EVERYTIME

    let collectionMetadata = []

    let layersTotalWeight = this.getLayersTotalWeight(state)

    // main collection generation loop
    let nftsCount = 0;
    while (nftsCount < collectionSize) {

      let imgName = this.strFill(nftsCount, 5) + ".png";
      let imgPath = path.join(imgsFolder, imgName);

      let imageObj = await this.generateSingleImage(state, layersTotalWeight);

      if (this.isUnique(imageObj.metadata, collectionMetadata)) {

        Promise.all(imageObj.imgLayers).then(_layers => {
          // paste all images onto canvas
          _layers.forEach(image => {
            if (image) {
              this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
            }
          })

          this.saveImage(imgPath);
        })

        collectionMetadata.push({ imageName: imgName, metadata: imageObj.imgMetadata })
        nftsCount++;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }
    }

    // Treat Metadata
    // Write metadata before uploading images to IPFS
    // After that, update and write each json file, for each image
    this.writeMetadata(collectionMetadata, path.join(metasFolder, "metadata.json"))

    return true;
  }

  strFill(count, strSize) {
    let countStr = count.toString()
    let strLen = countStr.length

    let prefix = "";
    if (strLen < strSize) {
      for (var i = 0; i < (strSize - strLen); i++) {
        prefix = prefix + "0"
      }
    }
    return prefix + countStr
  }
}

module.exports = {
  Assembler,
}
