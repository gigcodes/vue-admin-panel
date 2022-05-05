<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>

  <dossier-table
      v-model:loading="loading"
      v-model:columns="columns"
      v-model:tableOptions="tableOptions"
      v-model:searching="searching"
      v-model:hasItems="hasItems"
      title="Categories"
      :search-term="searchTerm"
  />
</template>

<script>
import axios from "axios";
import {provide, ref} from "vue";
import {DossierTable} from "../dist/gigcodes-admin.es"

export default {
  name: "App",
  components: {
    DossierTable
  },
  setup() {
    const loading = ref(true);
    const searching = ref(false);
    const hasItems = ref(false);
    const searchTerm = ref('');
    const columns = ref([]);
    const tableOptions = ref({
      sort: 'title',
      sortOrder: 'asc',
      checkboxes: true,
      partials: {
        actions: ['edit', 'delete']
      }
    });

    const uploadService = (data, config) => axios.post("https://mainwebsite.loc/api/media/upload", data, config)
    const getService = (params) => axios.get("https://mainwebsite.loc/api/category", {params})
    const items = ref([1])
    provide("uploadService", uploadService)
    provide("getService", getService)
    return {
      items, loading, searching, searchTerm, hasItems, columns, tableOptions
    }
  }

}
</script>

<style scoped>

</style>