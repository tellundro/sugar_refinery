<template>

  <div class='pt-4 pb-8 w-4/5 min-w-832px self-center flex flex-col justify-center gap-4'> 

    <!-- header -->
    <div class=" flex pt-0 pb-0 justify-between items-center">

      <div class="flex flex-col items-start w-4/6">

        <!-- previous layer name -->
        <div class="h-10">
          <div v-if="hasPrevLayer">
            <router-link class="group text-lg p-2 flex items-center relative transition-colors" :to="{ name : 'category-trait-details' , params : { layerId : store.getLayers[layerIndex-1].id }}">
              <p class="group-hover:text-zinc-400 text-zinc-600 transition-colors">
                {{layerIndex}}. 
                {{ store.layers[layerIndex-1].name}}
              </p>
            </router-link>
          </div>
        </div>

        <!-- current layer name -->
        <div class="flex relative justify-between w-full items-center">
          <!-- back arrow -->
          <router-link class="absolute -left-16 w-12 h-8 hover:bg-zinc-400 group transition-colors" to="/project-home/category-traits-flow-chart">
            <svg class="fill-zinc-400 w-12 h-8 group-hover:fill-zinc-800 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z"/></svg>
          </router-link>
          <div class="relative text-3xl flex items-center">
            <p class="text-zinc-600 text-3xl">
              {{ layerIndex + 1 }}. 
            </p>
            <input v-model="store.layers[layerIndex].name" placeholder="Layer name..." class="p-1 w-96 placeholder:text-zinc-700 font-bold hover:border-zinc-400 focus:border-zinc-400 focus:outline-none border-transparent border-b rounded-none hover:focus:border-zinc-400 bg-inherit text-inherit"/>
          </div>
        </div>

        <!-- next layer name -->
        <div class="h-10">
          <div v-if="hasNextLayer">
            <router-link class="group p-2 text-lg flex items-center relative transition-colors" :to="{ name : 'category-trait-details' , params : { layerId : store.getLayers[layerIndex+1].id }}">
              <p class="group-hover:text-zinc-400 text-zinc-600 transition-colors">
                {{layerIndex+2}}. 
                {{ store.layers[layerIndex+1].name}}
              </p>
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-48 justify-start items-start gap-1 p-2">
        <!-- layer rarity field -->
        <div>
          <p>Layer rarity:</p>
          <div class="flex items-center w-full gap-2 justify-between">
            <input class="slider" v-model="store.layers[layerIndex].rarity" min="0" max="100" step="1" type="range">
            <p class="text-center w-10">{{ store.layers[layerIndex].rarity + '%' }}</p>
          </div>
        </div>

          <!-- Exclusive with select field -->
        <div class="w-full">
          <p> Exclusive with:</p>
          <select class="custom-select w-full appearance-none bg-zinc-900 opacity-70 text-zinc-400 p-1 relative" v-model="store.layers[layerIndex].exclusiveWith">
            <option value=""></option>
            <option v-for="layer in store.getPreviousLayers(layerIndex)" :key="layer.id" v-bind:value="layer.name">
              {{ layer.name }}
            </option>
          </select>
        </div>
      </div>

    </div>

    <div class="w-full bg-zinc-900 p-1 justify-end flex rounded-md"> 
      <!-- add images button -->
      <button @click="loadTraits" class="group flex hover:bg-zinc-800 items-center gap-2 p-2 h-10 w-40 justify-end rounded transition-colors" id="btnclick">
        <p class="text-lg group-hover:text-zinc-400 text-zinc-600 transition-colors">
          Add images
        </p>
        <svg class="fill-zinc-600 group-hover:fill-zinc-400 transition-colors cursor-pointer w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
      </button>
    </div>

    <div class="grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6 mx-auto justify-start items-start p-2">

      <div v-for="trait in store.getLayerTraits(layerId)" 
        :key="trait.id"
        :id="trait.id"
        class="traitDiv flex flex-col gap-2 justify-center items-center w-56 border-2 relative align-middle text-center p-2 pt-6 group">

        <div class="w-full h-52 mb-4 -center item-center">
          <img class="object-scale-down w-full h-full" :src="trait.filePath" />
        </div>

          <!-- trait name -->
        <input 
          v-model="trait.name" 
          class="h-8 text-center placeholder:text-zinc-700 focus:border-zinc-400 text-base hover:border-zinc-400 w-full focus:outline-none border-transparent border-b rounded-none bg-inherit text-inherit"
          placeholder="Trait name..." />

          <!-- trait weight -->
        <div class="w-1/2 gap-1 text-base h-8 flex justify-center self-center items-center">
          <p class="w-16 font-bold text-left text-inherit bg-inherit">Weight:</p>
          <input 
            v-model="trait.weight" 
            class="text-center focus:border-zinc-400 hover:border-zinc-400 w-full focus:outline-none border-transparent border-b rounded-none bg-inherit text-inherit" />
        </div>

          <!-- Percentage indicator -->
        <div class="absolute top-0 left-1 h-6 text-zinc-400 text-sm p-1 flex justify-start bg-zinc-800 group-hover:visible rounded rounded-tl-none rounded-br-none">
          <p v-text="store.getTraitPercentage(trait.weight, layerIndex)"></p>
        </div>


        <!-- trash-can -->
        <div class="absolute top-0 right-0 p-1 invisible flex justify-end bg-zinc-400 group-hover:visible rounded rounded-tl-none rounded-br-none">
          <svg 
            @click="store.deleteTraitFromLayer(layerId, trait.id)"
            class="fill-zinc-800 cursor-pointer w-5 h-5 " 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
// import { ref } from 'vue'
import { useRoute } from "vue-router";
import { projStore } from "@/store/projectStore"

export default {
  name: 'ProjectTraitDetails',
  setup() {

    const store = projStore();
    const route = useRoute();
    const layerId = route.params.layerId;

    const layerIndex = store.getLayerIndex(layerId);

    const hasPrevLayer = (layerIndex > 0);
    const hasNextLayer = (layerIndex < (store.getLayersCount - 1));

    async function loadTraits() {
      const traitPaths = await window.electronAPI.loadTraits();

      for (let i = 0 ; i < traitPaths.length ; i++ ){
        let fileName = await window.electronAPI.getFileNameFromPath(traitPaths[i]);
        store.addTraitToLayer(layerId, traitPaths[i], fileName);
      }
    }

    return {
      store,
      layerId,
      loadTraits,
      layerIndex,
      hasPrevLayer,
      hasNextLayer,
    }
  }
}
</script>
