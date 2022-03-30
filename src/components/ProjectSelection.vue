<template>
  <div class="flex flex-col gap-12 min-h-screen pl-48 pr-48 pt-20 pb-20 justify-center items-center"> 
    <div class="flex flex-row w-full gap-8 min-w-full justify-around items-center">

      <!-- Create new project button -->
      <div @click="createProject()" to="/project-home/metadata" class="flex group gap-4 flex-col h-16 w-1/3 border-2 justify-center items-center rounded-lg hover:bg-zinc-400 cursor-pointer transition-colors">
        <div class="group-hover:text-zinc-800"> Create project </div>
      </div>

      <!-- Load project from file and preload/pass in the dict into project-view -->
      <!-- <router-link to="/project-home/metadata" class="flex group gap-4 flex-col h-36 w-1/3 border-2 justify-center items-center rounded-lg hover:bg-zinc-400 cursor-pointer transition-colors"> -->
      <!--   <div class="group-hover:text-zinc-800"> Load project from file</div> -->
      <!-- <svg class="h-16 w-16 fill-zinc-400 group-hover:fill-zinc-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M147.8 192H480V144C480 117.5 458.5 96 432 96h-160l-64-64h-160C21.49 32 0 53.49 0 80v328.4l90.54-181.1C101.4 205.6 123.4 192 147.8 192zM543.1 224H147.8C135.7 224 124.6 230.8 119.2 241.7L0 480h447.1c12.12 0 23.2-6.852 28.62-17.69l96-192C583.2 249 567.7 224 543.1 224z"/></svg> -->
      <!-- </router-link> -->

    </div>

    <!-- Project history -->
    <div class="flex flex-col items-start h-36 w-2/3 border-zinc-600 justify-start rounded-lg">
      <div class="text-lg pb-4">Existing projects:</div>
      <div :id="project.name" v-for="project in lastProjects" :key="project.name" 
        class="group relative w-full text-lg flex">
        <div @click="loadState(project.fullPath)" class="cursor-pointer w-4/5 rounded group-hover:bg-zinc-400 group-hover:text-zinc-800 p-2">
        {{ project.projName }}
        </div>
        <div class="cursor-pointer right-0 p-1 invisible flex justify-end w-1/5 items-center group-hover:visible rounded rounded-tl-none rounded-br-none">
          <svg 
            @click="deleteProject(project.name)"
            class="fill-zinc-400 w-6 h-6 " 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg>
        </div>
      </div>


    </div>
  </div>

</template>

<script>
import { projStore } from "@/store/projectStore"
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ProjectSelection',
  setup() {

    const store = projStore()
    const lastProjects = ref(0) 
    const router = useRouter()

    function createProject() {
      // reset state in case any is loaded
      store.$reset();
      router.push({ path: '/project-home/metadata'})
    }

    function deleteProject(name) {
      console.log("deleting project name " + name)
      window.electronAPI.deleteProject(JSON.stringify(name))
        .then(function(result) {
          if (result) {
            let entry = document.getElementById(name);
            entry.remove();
          }
      })
    }

    function loadState(fullPath){
      console.log(fullPath)
      window.electronAPI.getSavedState(fullPath).then(function(result) {
        store.$state = result;
        router.push({ path : '/project-home/metadata' })
      });
    }

    window.electronAPI.getLastProjects().then(function(result) {
      lastProjects.value = result;
    })
    // console.log(lastProjects)

    return {
      store,
      loadState,
      lastProjects,
      createProject,
      deleteProject,
    }
  },
  // props: {
  //   msg: String
  // }
}
</script>
