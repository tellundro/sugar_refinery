<template>
  <div class='pt-6 pb-8 flex flex-col justify-start items-center'> 

    <!-- Metadata header -->
    <div class="flex items-center w-832px p-8 justify-start text-3xl">
      <p class="text-zinc-600">
        projectDetails 
      </p>
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Collection name:</p>
      
      <input 
        v-model="store.metadata.name" placeholder="NFT Collection name..."
        class="p-2 w-96 focus:outline-none focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Description:</p>
      
      <input 
        v-model="store.metadata.description" placeholder="Collection description..."
        class="p-2 w-96 focus:outline-none focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Collection size:</p>
      <input 
        v-model="store.metadata.collectionSize" placeholder="Collection size..."
        class="p-2 w-96 focus:outline-none focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div class="p-2 relative flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Output folder:</p> 
      <input 
        v-model="store.metadata.outputFolder" placeholder="Output folder..."
        class="p-2 w-96 focus:outline-none focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
      <div class="absolute flex items-center bottom-0 -right-9 h-full pl-7">
        <svg 
          @click="selectFolder"
          class="fill-zinc-400 hover:fill-zinc-600 transition-colors cursor-pointer w-6 h-6 " 
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M147.8 192H480V144C480 117.5 458.5 96 432 96h-160l-64-64h-160C21.49 32 0 53.49 0 80v328.4l90.54-181.1C101.4 205.6 123.4 192 147.8 192zM543.1 224H147.8C135.7 224 124.6 230.8 119.2 241.7L0 480h447.1c12.12 0 23.2-6.852 28.62-17.69l96-192C583.2 249 567.7 224 543.1 224z"/></svg>
      </div>
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">External URL:</p>
      <input 
        v-model="store.metadata.externalUrl" placeholder="External URL..."
        class="p-2 w-96 focus:outline-none focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
    </div>

    <div class="p-2  flex justify-start border-b-zinc-400 gap-4 ">
      <p class="w-52 p-2 align-middle text-left">Author:</p>
      <input 
        v-model="store.metadata.author" placeholder="Collection author..."
        class="p-2 w-96 focus:outline-none focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
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
