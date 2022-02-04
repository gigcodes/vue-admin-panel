<template>

    <ul class="pagination">
        <li v-if="hasPrevious">
            <a href=""
               class="mr-2 inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 text-slate-300"
               @click.prevent="selectPreviousPage"><span>&laquo;</span></a>
        </li>

        <template v-if="segmented">
            <page v-for="(item,index) in segments.first"
                  :key="item.page"
                  :last="segments.first.length === (index + 1)"
                  :number="item.page"/>

            <page v-if="showFirstEllipsis" class="disabled"><span>...</span></page>

            <page v-for="item in segments.slider"
                  :key="item.page"
                  :number="item.page"/>

            <page v-if="showLastEllipsis" class="disabled"><span>...</span></page>

            <page v-for="item in segments.last"
                  :key="item.page"
                  :number="item.page"/>
        </template>

        <page v-if="!segmented" v-for="n in total" :key="n" :number="n+1"/>

        <li v-if="hasNext">
            <a class="ml-2 inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 text-slate-300"
               href="" @click.prevent="selectNextPage"><span>&raquo;</span></a>
        </li>
    </ul>

</template>


<script>
import Page from "./Page";

export default {

    components: {
        Page
    },


    props: ['total', 'current', 'segments'],


    computed: {

        hasPrevious() {
            return this.current > 1;
        },

        hasNext() {
            return this.current < this.total;
        },

        segmented() {
            return this.segments !== undefined;
        },

        hasSlider() {
            return Boolean(this.segments.slider.length);
        },

        showFirstEllipsis() {
            return this.hasSlider;
        },

        showLastEllipsis() {
            if (this.hasSlider) return true;

            return Boolean(this.segments.last.length);
        }

    },


    methods: {

        select(page) {
            this.$emit('selected', page);
        },

        selectPreviousPage() {
            this.select(this.current - 1);
        },

        selectNextPage() {
            this.select(this.current + 1);
        }

    }

}
</script>

<style lang="scss">
ul.pagination {
    @apply inline-flex text-sm font-medium -space-x-px shadow-sm ;
    a {
        @apply inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white hover:bg-indigo-500 border border-slate-200 text-slate-600 hover:text-white;

    }
    .active a:hover{
        background: white;
        color: rgb(71 85 105 / var(--tw-text-opacity));
        cursor: not-allowed;
    }

    .first a {
        @apply rounded-l;
    }

    .last a {
        @apply rounded-r;
    }
}
</style>
