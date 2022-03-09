<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <assets-field :config="{container:'main'}" handle="" name="Images"></assets-field>
</template>

<script>
import axios from "axios";
import {provide} from "vue";
import {AssetsField} from "./index"
export default {
  name: "App",
  components:{
    AssetsField
  },
  setup() {
    const uploadService = (data, config) => axios.post("http://localhost/api/media/upload", data, config)
    provide("uploadService", uploadService)
  }

}
</script>

<style scoped>

</style>