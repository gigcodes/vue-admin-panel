<template>
  <div class="loading card">
    <span class="icon icon-circular-graph animation-spin"></span> {{ text ? text : 'Loading' }}
  </div>
</template>

<script>
export default {
  name: "LoadingGraphic",
  props: ['text']
}
</script>

<style scoped>

</style>