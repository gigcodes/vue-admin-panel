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
    export default {
        props: ['keyword'],
        data() {
            return {
                text: this.keyword
            }
        },
        methods: {
            reset: function () {
                this.keyword = '';
            }
        },
        watch: {
            text() {
                this.$emit('update:keyword', this.text);
            }
        }
    };
</script>
