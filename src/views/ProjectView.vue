<template>
  <div class="w-screen h-screen flex flex-col overflow-x-hidden min-w-1000px ">

    <ProjectNavbar></ProjectNavbar>

    <router-view :key="$route.params.layerId"></router-view>

  </div>
</template>

<script>
// @ is an alias to /src
import ProjectNavbar from '@/components/ProjectNavbar.vue'

console.log("ProjectSelectionView.vue loaded");

export default {
  components: {
    ProjectNavbar
  },
  // data() {
  //   return {
  //     greeting : "Message from View into component"
  //   }
  // }
}
</script>

