import { defineStore } from 'pinia'

function layerTotalWeight(state, layerIndex) {
  let sum = 0;
  state.layers[layerIndex].traits.forEach(layer => sum += parseInt(layer.weight))
  return sum;
}

function validateStateForPreview(state) {
  let validationObj = {
    width: (parseInt(state.metadata.width, 10) > 0),
    height: (parseInt(state.metadata.height, 10) > 0),
  }
  for (const prop in validationObj) {
    if (!validationObj[prop]) {
      validationObj.success = false;
      return validationObj;
    }
  }

  validationObj.success = true;
  return validationObj;
}

function validateStateForCollection(state) {
  let validationObj = {
    outputFolder: (state.metadata.outputFolder.length > 0),
    collectionSize: (state.metadata.collectionSize.length > 0),
    name: (state.metadata.name.length > 0),
    description: (state.metadata.description.length > 0),
    blockchain: (state.metadata.blockchain.length > 0),
    width: (parseInt(state.metadata.width, 10) > 0),
    height: (parseInt(state.metadata.height, 10) > 0),
  };

  if (state.metadata.blockchain === "solana") {
    validationObj.symbol = (state.metadata.symbol.length > 0);
    validationObj.sellerFee = (state.metadata.sellerFee.length > 0);
    validationObj.externalURL = (state.metadata.externalURL.length > 0);
    validationObj.creators = (state.metadata.creators.length > 0);
    // TODO validate each creator object
  }

  for (const prop in validationObj) {
    if (!validationObj[prop]) {
      validationObj.success = false;
      return validationObj;
    }
  }

  validationObj.success = true;
  return validationObj;
}

let originalState = {
  // creationTimestamp is a unique project ID for saving purposes
  creationTimestamp: Date.now(),
  metadata: {
    outputFolder: "",
    collectionSize: "",
    name: "",
    author: "",
    description: "",
    width: "",
    height: "",
    externalURL: "",
    blockchain: "",
    IPFSUri: "",
    hasIPFSinfo: false,
    collectionGenerated: false,
    // Solana metadata
    symbol: "", // collection symbol
    sellerFee: "", // secondary market royalties 1000 = 10%
    creators: [
      // {
      //   address: "", // solana wallet public address
      //   share: "", // 100 = 100%
      // },
    ],
  },
  layerCounter: 0,
  layers: [
    {
      name: "",
      id: "layer_0",
      rarity: 100,
      exclusiveWith: "",
      traitCounter: 0,
      totalWeight: 0,
      // actual art in the layer
      traits: [
        // {
        //   id: "trait_0",
        //   name: "New trait",
        //   filePath: "No file path informed",
        //   weight: 1
        // }
      ]
    }
  ],
}

export const projStore = defineStore('projStore', {
  id: "projectStore",
  state: () => (
    JSON.parse(JSON.stringify(originalState))
  ),
  getters: {
    // getters are computed automatically
    projName: (state) => state.metadata.name,
    projMetadata: (state) => state.metadata,
    isReadyForPreview: (state) => validateStateForPreview(state),
    isReadyForCollection: (state) => validateStateForCollection(state),
    isSolana: (state) => state.metadata.blockchain === "solana",
    isOriginalState: (state) => {
      return (JSON.stringify(originalState) === JSON.stringify(state.getState))
    },
    getPreviousLayers: (state) => { return (layerIndex) => state.layers.slice(0, layerIndex) },
    getCreationTimestamp: (state) => state.creationTimestamp,
    getLayers: (state) => state.layers,
    getLayerName: (state) => { return (layerId) => state.layers.find(layer => layer.id === layerId).name },
    getLayerIndex: (state) => { return (layerId) => state.layers.findIndex(layer => layer.id === layerId) },
    getLayerTotalWeight: (state) => { return (layerIndex) => layerTotalWeight(state, layerIndex) },
    getTraitPercentage: (state) => { return (traitWeight, layerIndex) => ((parseInt(traitWeight) / layerTotalWeight(state, layerIndex)) * 100).toFixed(2).toString() + "%" },
    getLayerTraits: (state) => {
      return (layerId) => state.layers.find(layer => layer.id === layerId).traits
    },
    getLayersCount: (state) => {
      return state.layers.length
    },
    getTraitsCount: (state) => {
      let sum = 0;
      for (var i = 0; i < state.layers.length; i++) {
        sum = sum + state.layers[i].traits.length;
      }
      return sum;
    },
    getPermutationCount: (state) => {
      let permutations = 1;

      state.layers.forEach(function(layer) {
        let layerFactor = (layer.traits.length > 0) ? layer.traits.length : 1;
        if (parseInt(layer.rarity, 10) < 100) { layerFactor++ }
        permutations = layerFactor * permutations;
      })
      return permutations.toLocaleString('en-US')
    },
    getState: (state) => {
      return {
        creationTimestamp: state.creationTimestamp,
        metadata: state.metadata,
        layerCounter: state.layerCounter,
        layers: state.layers
      };
    }

  },
  actions: {
    setHasIPFSinfo(bool) {
      this.metadata.hasIPFSinfo = bool;
    },
    setCollectionGenerated(bool) {
      this.metadata.collectionGenerated = bool;
    },
    setOutputFolder(path) {
      this.metadata.outputFolder = path;
    },
    deleteLayer(id) {
      const index = this.layers.findIndex(object => {
        return object.id === id;
      });
      this.layers.splice(index, 1);
    },
    deleteTraitFromLayer(layerId, traitId) {
      const layer = this.layers.find(layer => layer.id == layerId);
      const traitIndex = layer.traits.findIndex(trait => trait.id == traitId);
      layer.traits.splice(traitIndex, 1);
    },
    addTraitToLayer(layerId, traitFilePath, fileName) {
      let prefix = "trait_"
      let l = this.layers.find(layer => layer.id == layerId)

      l.traitCounter++
      let traitId = prefix + l.traitCounter

      l.traits.push(
        {
          id: traitId,
          name: fileName,
          filePath: traitFilePath,
          weight: 1
        }
      )
    },

    addCreator() {
      this.metadata.creators.push(
        {
          address: "",
          share: ""
        }
      )
    },

    deleteCreator(address) {
      const index = this.metadata.creators.findIndex(creator => creator.address == address)
      this.metadata.creators.splice(index, 1)
    },

    addLayer() {
      let prefix = "layer_"
      this.layerCounter++
      let id = prefix + this.layerCounter

      this.layers.push(
        {
          name: "",
          id: id,
          rarity: 100,
          exclusiveWith: "None",
          traitCounter: 0,
          // actual art in the layer
          traits: [

          ]
        }
      )
    },
    updateLayersOrder(newLayersOrder) {
      let _layers = []
      for (let i = 0; i < newLayersOrder.length; i++) {
        let found = this.layers.find(traitCategory => traitCategory.id === newLayersOrder[i])
        _layers.push(found)
      }
      this.layers = _layers;
    }
  },
})

