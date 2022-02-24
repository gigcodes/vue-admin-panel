<template>
    <input
        type="search"
        placeholder="Search"
        @keydown.esc.prevent="reset"
        v-model="text"
        class="filter-control search"
        debounce="500"
    />
</template>

<script>
import {ref, watch} from "vue";

export default {
    props: ['keyword'],
    emits: ['update:keyword'],
    setup(props, {emit}) {
        const text = ref(props.keyword)
        const reset = () => {
            text.value = '';
        }
        watch(text, (val) => {
            emit('update:keyword', val)
        })

        return {
            text,
            reset
        }
    },

};
</script>
