<template>
  <router-view/>
</template>

<script>

import { projStore } from "@/store/projectStore"
import { useRouter } from 'vue-router'

export default {
  // routes clicks from Menu items
  setup() {

    const store = projStore()
    const router = useRouter();

    window.electronAPI.changeRoute("ROUTE", (event, data)=>{
      router.push({ path : data});
    })

    window.electronAPI.appClosing("QUIT", (event, data) => {
      console.log(data)

      if (store.isOriginalState) {
        // close without save
        window.electronAPI.closeWithoutSave();
      } else {
        // save and close
        let _state = JSON.stringify(store.getState)
        let projName = JSON.stringify(store.projName)
        console.log(projName)
        if (projName == '""') {
          projName = '"Unnamed Project"'
        }
        let saveFileName = JSON.stringify(store.getCreationTimestamp) + "_col"

        window.electronAPI.saveAndClose({ state : _state, saveFileName : saveFileName, projName : projName});
      }
    });

    window.electronAPI.appClosing("RETURN", (event, data) => {
      console.log(data)

      if (store.isOriginalState) {
        router.push({path : "/"})
      } else {
        let _state = JSON.stringify(store.getState)
        let projName = JSON.stringify(store.projName)
        console.log(projName)
        if (projName == '""') {
          projName = '"Unnamed Project"'
        }
        console.log(store.getCreationTimestamp)
        let saveFileName = JSON.stringify(store.getCreationTimestamp) + "_col"
        // store.$reset()

        window.electronAPI.saveAndReturn({ state : _state, saveFileName : saveFileName, projName : projName});
      }
    });

    return { 
    }
  }
}
</script>

