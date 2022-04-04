<template>
  <div class="flex flex-col w-832px pt-6 mx-auto h-full gap-4 items-center justify-start pb-12">
    <p class="text-zinc-600 self-start text-3xl p-8">
      generateCollection 
    </p>

    <div v-if="store.metadata.collectionGenerated" class="p-2 relative flex justify-start rounded-none gap-4 mb-6 ">
      <p class="w-36 p-2 align-middle text-left">IPFS Uri: <span class="text-rose-600">*</span></p>
      <input 
        v-model="store.metadata.IPFSUri" placeholder="IPFS folder CID..."
        class="p-2 w-96 focus:outline-none transition-colors focus:bg-zinc-400 focus:text-zinc-800 hover:placeholder:text-zinc-700 placeholder:text-zinc-700 focus:placeholder:text-zinc-700 hover:text-zinc-800 hover:bg-zinc-400 border border-zinc-400 rounded bg-inherit text-inherit" />
      <div class="absolute flex items-center bottom-0 right-0 translate-x-full h-full pl-6">
        <button @click="updateMetadata" class="text-sm border p-2 text-zinc-400 hover:bg-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer">Update metadata</button>
      </div>
    </div>

    <div v-if="store.metadata.collectionGenerated" class="flex flex-col items-center justify-center">
      <!-- EXTRA COLLECTION INFO -->
      <!-- EXTRA COLLECTION INFO -->
      <div>A NFT collection has been generated for this project.</div>
      <div v-if="store.hasIPFSinfo" class="">IPFS URI has already been updated to the collection</div>
      <div v-else class="">You still need to update the IPFS URI for the collection</div>
    </div>

    <div @click="reGenerateCollection" v-if="store.metadata.collectionGenerated" class="p-2 mt-6 cursor-pointer self-center text-center align-middle border hover:bg-zinc-400 hover:text-zinc-800 transition-colors rounded text-xl">
      Re-generate Collection
    </div>
    <div @click="generateCollection" v-else class="p-2 mt-6 cursor-pointer text-center align-middle border hover:bg-zinc-400 self-center hover:text-zinc-800 transition-colors rounded text-xl">
      Generate Collection
    </div>

  </div>
</template>

<script>
import { projStore } from "@/store/projectStore"
import createErrorPanel from "./errorPanel.js"

export default {
  name: 'CollectionGeneration',
  setup() {

    const store = projStore()

    async function updateMetadata() {
      // setHasIPFSinfo(true)
      console.log("update metadata")
    }

    async function generateCollection() {
      let isReady = store.isReadyForCollection;
      if (isReady.success) {
        let _state = JSON.stringify(store.getState)
        const result = await window.electronAPI.generateCollection(_state)
        if (result.success) {
          store.setCollectionGenerated(true);
          store.setHasIPFSinfo(false);
        } else {
          createErrorPanel(result) 
        }
      } else {
        createErrorPanel(isReady) 
      }
    }

    async function reGenerateCollection() {
      let isReady = store.isReadyForCollection;
      if (isReady.success) {
        let _state = JSON.stringify(store.getState)
        const result = await window.electronAPI.generateCollection(_state)
        if (result.success) {
          store.setCollectionGenerated(true);
          store.setHasIPFSinfo(false);
        } else {
          createErrorPanel(result) 
        }
      } else {
        createErrorPanel(isReady) 
      }
    }

    return { 
      store,
      generateCollection,
      reGenerateCollection,
      updateMetadata,
    }
  },
}
</script>


