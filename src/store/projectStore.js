import { defineStore } from 'pinia'

function layerTotalWeight(state, layerIndex) {
  let sum = 0;
  state.layers[layerIndex].traits.forEach(layer => sum += parseInt(layer.weight))
  return sum;
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
    externalUrl: "",
    blockchain: "",
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
    isOriginalState: (state) => {
      // console.log(JSON.stringify(originalState))
      // console.log(JSON.stringify(state.getState))
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
        // console.log("sum is " + sum)
        sum = sum + state.layers[i].traits.length;
      }
      return sum;
    },
    getPermutationCount: (state) => {
      let permutations = 1;

      state.layers.forEach(function(categories) {
        let layerFactor = (categories.traits.length > 0) ? categories.traits.length : 1;
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
    updateLayersOrder(newLayersOrders) {
      // newLayersOrders is an array of strings
      // with the new order of categories
      let _layers = []

      // traverse newTraitsCategoreis array
      // find the corresponding layers objects, according to the new order
      // push it into _layers array
      // then redefine this.layers to this new array
      for (let i = 0; i < newLayersOrders.length; i++) {
        let found = this.layers.find(traitCategory => traitCategory.id === newLayersOrders[i])
        // console.log("updateLayersOrder category found: " + found.id)
        _layers.push(found)
        // for (var j = 0; j < this.layers.length(); j++) {
        //   if (this.layers[j].name == newLayersOrders[i]) {
        //     _layers.push(this.layers[j]);
        //     break;
        //   }
        //   console.log("Trait category" + newLayersOrders + "not found, something has gone wrong")
        // }
      }

      this.layers = _layers;
    }
    // increment() {
    //   this.count++
    // },
  },
})

