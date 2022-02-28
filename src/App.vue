<template>
    <div>
        <h1>Hello</h1>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import {getCurrentInstance} from 'vue';
import {progress} from "../dist/gigcodes-admin.es";

export default {
    name: "App",
    setup(_, {expose}) {
        const ctx = getCurrentInstance().appContext.app.config.globalProperties;
        progress.start();
    }
}
</script>

<style scoped>

</style>
