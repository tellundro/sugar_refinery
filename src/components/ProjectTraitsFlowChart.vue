<template>

  <div class="flex flex-col w-full pt-6 h-full gap-4 items-center justify-start pb-12">

    <!-- Flow char header -->
    <div class="relative flex flex-col items-left w-4/5 min-w-832px gap-4 text-3xl">
      <div class="flex items-center justify-around w-full gap-1">
        <input placeholder="Collection name..." class="p-1 w-4/6 font-bold placeholder:text-zinc-700 focus:border-zinc-400 focus:outline-none border-transparent border-b rounded-none hover:focus:border-zinc-400 bg-inherit text-inherit" v-model="store.metadata.name"/>
        <div class="p-2 w-2/6 max-w-xs mt-4 flex flex-col items-start bg-zinc-900 opacity-70 rounded border-b-zinc-400 gap-1 text-sm">
          <div class='flex'>
            <p class="w-32">Layers:</p>
            <p>{{ store.getLayersCount}}</p>
          </div>
          <div class='flex'>
            <p class="w-32">Traits:</p>
            <p>{{ store.getTraitsCount}}</p>
          </div>
          <div class='flex'>
            <p class="w-32">Permutations:</p>
            <p>{{ store.getPermutationCount}}</p>
          </div>
        </div>
      </div>

      <div class="w-full bg-zinc-900 p-1 justify-end flex rounded-md"> 
        <!-- add images button -->
        <button @click="store.addLayer" class="group flex hover:bg-zinc-800 items-center gap-2 p-2 h-10 w-40 justify-end rounded transition-colors" id="btnclick">
          <p class="text-lg group-hover:text-zinc-400 text-zinc-600 transition-colors">
            Add layers
          </p>
          <svg class="fill-zinc-600 group-hover:fill-zinc-400 transition-colors cursor-pointer w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
        </button>
      </div>

    </div>

    <div class="flex flex-col w-120 gap-2 pb-8">
      <!-- Trait category card -->
      <div v-for="layer in store.layers" 
        :key="layer.id"
        :id="layer.id"
        draggable="True" 
        class="categoryDivs flex justify-left gap-2 hover:bg-zinc-400 relative transiton-colors hover:text-zinc-800 border items-center text-center p-2 pl-14 group transition-colors">

        <!-- grip svg -->
        <svg class="absolute left-4 invisible group-hover:visible transition-colors cursor-move fill-zinc-800 w-6 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M88 352C110.1 352 128 369.9 128 392V440C128 462.1 110.1 480 88 480H40C17.91 480 0 462.1 0 440V392C0 369.9 17.91 352 40 352H88zM280 352C302.1 352 320 369.9 320 392V440C320 462.1 302.1 480 280 480H232C209.9 480 192 462.1 192 440V392C192 369.9 209.9 352 232 352H280zM40 320C17.91 320 0 302.1 0 280V232C0 209.9 17.91 192 40 192H88C110.1 192 128 209.9 128 232V280C128 302.1 110.1 320 88 320H40zM280 192C302.1 192 320 209.9 320 232V280C320 302.1 302.1 320 280 320H232C209.9 320 192 302.1 192 280V232C192 209.9 209.9 192 232 192H280zM40 160C17.91 160 0 142.1 0 120V72C0 49.91 17.91 32 40 32H88C110.1 32 128 49.91 128 72V120C128 142.1 110.1 160 88 160H40zM280 32C302.1 32 320 49.91 320 72V120C320 142.1 302.1 160 280 160H232C209.9 160 192 142.1 192 120V72C192 49.91 209.9 32 232 32H280z"/></svg>

        <input placeholder="Layer name..." class="p-1 w-60 placeholder:text-zinc-700 focus:border-zinc-400 focus:outline-none border-transparent border-b rounded-none group-hover:focus:border-zinc-800 bg-zinc-800 group-hover:bg-zinc-400 transition-colors text-zinc-400 group-hover:text-zinc-800" v-model="layer.name" />

        <p class="group-hover:text-zinc-800 w-8 transition-colors text-center align-middle pl-4" alt="Number of images in layer">{{ layer.traits.length }}</p>

        <p class="group-hover:text-zinc-800 transition-colors text-center align-middle pl-4" alt="Layer rarity">{{ layer.rarity }}%</p>

        <!-- config gear -->
        <router-link :to="{ name : 'category-trait-details' , params : { layerId : layer.id }}"
          class="flex h-full items-center justify-center absolute bottom-0 right-4" tabindex="-1"> 

          <svg 
            class="invisible group-hover:visible fill-zinc-400 group-hover:fill-zinc-800 transition-colors cursor-pointer w-5 h-5 " 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
        </router-link>

        <!-- trash-can -->
        <div class="absolute invisible flex items-center bottom-0 -right-9 h-full pl-7 group-hover:visible transition-colors">
          <svg 
            @click="store.deleteLayer(layer.id)"
            class="fill-zinc-800 group-hover:fill-zinc-400 transition-colors cursor-pointer w-5 h-5 " 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg>
        </div>

        <!-- arrow down -->
        <div class="arrow down absolute right-12 group-hover:bg-zinc-400 transition-colors">
        </div>

      </div>

    </div>

  </div>
</template>


<script>
import { projStore } from "@/store/projectStore"

const store = projStore()

let srcIndex;

function handleDragStart(e) {
  e.dataTransfer.setDragImage(e.target, 10,10);
  // console.log("handleDragStart drag start" + e.target.tagName)
  e.target.classList.add("hide");

  if (e.target.tagName === "INPUT") {
    e.preventDefault();
  }
  e.dataTransfer.setData("src_id", e.target.id)
  srcIndex = [...e.target.parentElement.children].indexOf(e.target)
}

function handleDragEnd(e) {
  e.target.classList.remove('hide');
}

function handleDragEnter(e) {
  // style target div on drag enter

  if (srcIndex > [...e.target.parentElement.children].indexOf(e.target)) {
    if(!e.target.classList.contains("dragOverTop")) {
      e.target.classList.add('dragOverTop');
    }
  } else {
    if(!e.target.classList.contains("dragOverDown")) {
      e.target.classList.add('dragOverDown');
    }  
  }
}

function handleDragLeave(e) {
  // remove styles on drag leave
  e.target.classList.remove('dragOverTop');
  e.target.classList.remove('dragOverDown');
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

function handleDrop(e) {
  e.target.classList.remove('dragOverTop');
  e.target.classList.remove('dragOverDown');
  e.target.classList.remove('hide');

  let srcElementId = e.dataTransfer.getData("src_id")
  let target = e.target

  if (e.target.tagName === 'INPUT') {
    // Takes the id of the parent div element
    // in case the source element is dropped over the Input field
    // console.log("handleDrop e.target.tagName " + e.target.tagName)
    target = e.target.parentElement
  }

  let dropElementId = target.id

  let dropIndex = [...target.parentElement.children].indexOf(target)

  let srcElement = document.querySelector("#" + srcElementId)
  let dropElement = document.querySelector("#" + dropElementId)

  if (srcIndex > dropIndex) {
    dropElement.before(srcElement);
  } else {
    dropElement.after(srcElement);
  }

  // get array of reordered div ids
  let newCategoriesOrder = []
  document.querySelectorAll(".categoryDivs").forEach(div => newCategoriesOrder.push(div.id))
  // console.log("handleDrop newCategoriesOrder:")
  // console.log(newCategoriesOrder)

  // update store with new trait categories order
  store.updateLayersOrder(newCategoriesOrder)

  return false;
}

function addListenerToCategoryDivs(){

  let divs = document.querySelectorAll(".categoryDivs")

  divs.forEach(function(item) {
    // remove previous listeners, if any
    item.removeEventListener('dragstart', handleDragStart);
    item.removeEventListener('dragend', handleDragEnd);
    item.removeEventListener('dragover', handleDragOver);
    item.removeEventListener('drop', handleDrop);
    item.removeEventListener('dragenter', handleDragEnter);
    item.removeEventListener('dragleave', handleDragLeave);

    // add new listeners
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);

  });
}

export default {
  name: 'ProjectTraitsFlowChart',

  setup() {

    return { 
      store,
    }
  },

  mounted() {
    addListenerToCategoryDivs();
  },
  updated() {
    addListenerToCategoryDivs();
  }
}


</script>


