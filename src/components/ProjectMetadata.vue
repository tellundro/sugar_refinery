<template>
  <div class='pt-6 pb-20 flex flex-col justify-start items-center'> 

    <!-- Metadata header -->
    <div class="flex items-center w-832px p-8 justify-start text-3xl">
      <p class="text-zinc-600">
        projectDetails 
      </p>
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Collection name: <span class="text-rose-600">*</span></p>

      <input 
        v-model="store.metadata.name" placeholder="NFT Collection name..."
        class="p-2 w-96 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Description: <span class="text-rose-600">*</span></p>

      <input 
        v-model="store.metadata.description" placeholder="Collection description..."
        class="p-2 w-96 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Collection size: <span class="text-rose-600">*</span></p>
      <input 
        v-model="store.metadata.collectionSize" placeholder="Collection size..."
        class="p-2 w-96 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div class="p-2 relative flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Output folder: <span class="text-rose-600">*</span></p> 
      <input 
        v-model="store.metadata.outputFolder" placeholder="Output folder..."
        class="p-2 w-96 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
      <div class="absolute flex items-center bottom-0 -right-9 h-full pl-7">
        <svg 
          @click="selectFolder"
          class="fill-zinc-400 hover:fill-zinc-600 transition-colors cursor-pointer w-6 h-6 " 
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M147.8 192H480V144C480 117.5 458.5 96 432 96h-160l-64-64h-160C21.49 32 0 53.49 0 80v328.4l90.54-181.1C101.4 205.6 123.4 192 147.8 192zM543.1 224H147.8C135.7 224 124.6 230.8 119.2 241.7L0 480h447.1c12.12 0 23.2-6.852 28.62-17.69l96-192C583.2 249 567.7 224 543.1 224z"/></svg>
      </div>
    </div>

    <div class="p-2 relative flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">NFT Dimensions: <span class="text-rose-600">*</span></p> 
      <div 
        class="w-96 flex justify-between">
        <div>
          Width: 
          <input 
            v-model="store.metadata.width" placeholder="width..."
            class="p-2 w-20 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
          px
        </div>
        <div>
          Height: 
          <input 
            v-model="store.metadata.height" placeholder="height..."
            class="p-2 w-20 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
          px
        </div>
      </div>
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">External URL:</p>
      <input 
        v-model="store.metadata.externalURL" placeholder="External URL..."
        class="p-2 w-96 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Author:</p>
      <input 
        v-model="store.metadata.author" placeholder="Collection author..."
        class="p-2 w-96 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Blockchain: <span class="text-rose-600">*</span></p>
      <select class="custom-select w-96 appearance-none bg-zinc-900 opacity-70 text-zinc-400 p-1 relative" v-model="store.metadata.blockchain">
        <option value="ethereum">Ethereum</option>
        <option value="solana">Solana</option>
      </select>
    </div>

    <div v-if="store.isSolana" class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Symbol: <span class="text-rose-600">*</span></p>
      <input 
        v-model="store.metadata.symbol" placeholder="Collection symbol..."
        class="p-2 w-96 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div v-if="store.isSolana" class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Seller fee: <span class="text-rose-600">*</span></p>
      <input 
        v-model="store.metadata.sellerFee" placeholder="Seller fee (1000 = 10%)..."
        class="p-2 w-96 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div v-if="store.isSolana" class="mt-3">
      <!-- creator header -->
      <div class="flex gap-4 justify-around bg-zinc-900 text-zinc-400 opacity-70">
        <p class="w-96 bg-zinc-900 p-2 rounded align-middle text-left">Creators <span class="text-rose-600">*</span></p>
        <button @click="store.addCreator" class="w-52 flex cursor-pointer justify-end bg-zinc-900 p-2 rounded align-middle ">
          <p>Add creator</p>
          <svg class="pl-2 fill-zinc-400 transition-colors w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
        </button>
      </div>

      <!-- creators -->
      <div v-for="creator in store.metadata.creators" class="relative flex justify-around group"
        :key="creator.address">

        <!-- address -->
        <div class="p-2 flex justify-start border-b-zinc-400 gap-2 ">
          <p class="w-20 p-2 align-middle text-left">Address:</p>
          <input 
            v-model="creator.address" placeholder="Address..."
            class="p-2 w-96 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
        </div>

        <!-- share -->
        <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
          <p class="w-12 p-2 align-middle text-left">Share:</p>
          <input 
            v-model="creator.share" placeholder="Share..."
            class="p-2 w-16 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
        </div>

        <!-- trash-can -->
        <div class="absolute invisible flex items-center bottom-0 -right-9 h-full pl-7 group-hover:visible transition-colors">
          <svg 
            @click="store.deleteCreator(creator.address)"
            class="fill-zinc-800 group-hover:fill-zinc-400 transition-colors cursor-pointer w-5 h-5 " 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
// import { computed } from 'vue'
import { projStore } from "@/store/projectStore"

export default {
  name: 'ProjectMetadata',
  setup() {

    const store = projStore()

    async function selectFolder() {
      const folderPath = await window.electronAPI.selectFolder();
      store.setOutputFolder(folderPath);
    }

    return { 
      store,
      selectFolder
    }
  },

  // props: {
  //   msg: String
  // }
}
</script>
