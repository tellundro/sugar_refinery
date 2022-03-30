<template>
    <ProjectSelection />
</template>

<script>
// @ is an alias to /src
import ProjectSelection from '@/components/ProjectSelection.vue'

console.log("ProjectSelectionView.vue loaded");

export default {
  components: {
    ProjectSelection
  },
  // data() {
  //   return {
  //     greeting : "Message from View into component"
  //   }
  // }
}
</script>
