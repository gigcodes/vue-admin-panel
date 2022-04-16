<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <assets-field
      v-model:data="items"
      :config="{container:'main',max_files:5,canEdit:false}"
      name="Images"></assets-field>
</template>

<script>
import axios from "axios";
import {provide, ref} from "vue";
import {AssetsField} from "../dist/gigcodes-admin.es"

export default {
  name: "App",
  components: {
    AssetsField
  },
  setup() {
    const uploadService = (data, config) => axios.post("http://localhost/api/media/upload", data, config)
    const getService = (params) => axios.get("http://localhost/api/media/get-file", {params})
    const containerService = () => axios.get(`http://localhost/api/media/browse`)
    const loadFilesService = (params) => axios.post(`http://localhost/api/media/get-files`, params)
    const deleteFilesService = (params) => axios.delete(`http://localhost/api/media/delete`,{params})
    const items = ref([])
    provide("uploadService", uploadService)
    provide("getService", getService)
    provide("containerService", containerService)
    provide("loadFilesService", loadFilesService)
    provide("searchFilesService", '')
    provide("moveFilesService", '')
    provide("deleteFilesService", deleteFilesService)

    return {
      items
    }
  }

}
</script>

<style scoped>

</style>