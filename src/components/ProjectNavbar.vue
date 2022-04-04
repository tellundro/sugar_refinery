<template>
  <div class="flex h-20 min-h-20 justify-around relative items-center w-full pt-4 pr-4 pl-4 pb-4 bg-zinc-900 rounded-none z-10">

    <div class="flex w-1/2 gap-4 justify-start">
      <!-- Link to project metadata -->
      <router-link class="p-1 gap-2 flex items-center justify-start transition-colors group" to="/project-home/metadata">
        <p>Project details</p>
        <svg class="fill-zinc-600 group-hover:fill-zinc-400 transition-colors cursor-pointer w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/></svg>
      </router-link>

      <!-- Link to trait categories -->
      <router-link class="p-1 gap-2 flex items-center justify-start transition-colors group" to="/project-home/category-traits-flow-chart"> 
        <p>
        Layers
          </p>
        <svg class="fill-zinc-600 group-hover:fill-zinc-400 transition-colors cursor-pointer w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M232.5 5.171C247.4-1.718 264.6-1.718 279.5 5.171L498.1 106.2C506.6 110.1 512 118.6 512 127.1C512 137.3 506.6 145.8 498.1 149.8L279.5 250.8C264.6 257.7 247.4 257.7 232.5 250.8L13.93 149.8C5.438 145.8 0 137.3 0 127.1C0 118.6 5.437 110.1 13.93 106.2L232.5 5.171zM498.1 234.2C506.6 238.1 512 246.6 512 255.1C512 265.3 506.6 273.8 498.1 277.8L279.5 378.8C264.6 385.7 247.4 385.7 232.5 378.8L13.93 277.8C5.438 273.8 0 265.3 0 255.1C0 246.6 5.437 238.1 13.93 234.2L67.13 209.6L219.1 279.8C242.5 290.7 269.5 290.7 292.9 279.8L444.9 209.6L498.1 234.2zM292.9 407.8L444.9 337.6L498.1 362.2C506.6 366.1 512 374.6 512 383.1C512 393.3 506.6 401.8 498.1 405.8L279.5 506.8C264.6 513.7 247.4 513.7 232.5 506.8L13.93 405.8C5.438 401.8 0 393.3 0 383.1C0 374.6 5.437 366.1 13.93 362.2L67.13 337.6L219.1 407.8C242.5 418.7 269.5 418.7 292.9 407.8V407.8z"/></svg>
      </router-link>
    </div>

    <div class="w-1/2 gap-4 flex justify-end align-middle">
      <div @click="generatePreview" class="cursor-pointer transition-colors hover:bg-zinc-800 p-1 rounded">Preview NFT</div>
      <!-- <div @click="generateCollection" class="cursor-pointer transition-colors hover:bg-zinc-800 p-1 rounded">Generate Collection</div> -->
      <router-link to="/project-home/collection-generation" class="cursor-pointer transition-colors hover:bg-zinc-800 p-1 rounded">
        Generate Collection
      </router-link>
    </div>
  </div>

</template>

<script>
import { projStore } from "@/store/projectStore"
import createErrorPanel from "./errorPanel.js"

export default {
  name: 'ProjectNavbar',
  setup() {
    const store = projStore()

    async function generatePreview() {
      let readyForPreview = store.isReadyForPreview
      if (readyForPreview.success) {
        let _state = JSON.stringify(store.getState)
        const result = await window.electronAPI.generatePreview(_state);
        if(result.success) {
          window.open(result.data, '_blank', 'right=100, top=100, frame=true,nodeIntegration=no')
        } else {
          createErrorPanel(result)
        }
      } else {
        createErrorPanel(readyForPreview) 
      }
    }

    return {
      generatePreview,
    }
  },
}

</script>

