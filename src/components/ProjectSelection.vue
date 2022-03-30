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
    <div class="flex flex-col items-start h-36 w-1/2 border-zinc-600 justify-start rounded-lg">
      <div class="text-lg pb-4">Existing projects:</div>
      <div @click="loadState(project.fullPath)" v-for="project in lastProjects" :key="project.name" class="cursor-pointer w-full rounded hover:bg-zinc-400 hover:text-zinc-800 p-2 text-lg">
        {{ project.projName }}
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
      lastProjects,
      loadState,
      createProject
    }
  },
  // props: {
  //   msg: String
  // }
}
</script>
