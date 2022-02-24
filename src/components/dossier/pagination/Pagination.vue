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
                  :current="current"
                  @select="select"
                  :number="item.page"/>

            <page v-if="showFirstEllipsis" @select="select" class="disabled"><span>...</span></page>

            <page v-for="item in segments.slider"
                  :key="item.page"
                  @select="select"
                  :current="current"
                  :number="item.page"/>

            <page v-if="showLastEllipsis" class="disabled"><span>...</span></page>

            <page v-for="item in segments.last"
                  :key="item.page"
                  @select="select"
                  :current="current"
                  :number="item.page"/>
        </template>

        <page v-if="!segmented" v-for="n in total" :key="n" :number="n+1" :current="current" @select="select"/>

        <li v-if="hasNext">
            <a class="ml-2 inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 text-slate-300"
               href="" @click.prevent="selectNextPage"><span>&raquo;</span></a>
        </li>
    </ul>

</template>


<script>
import Page from "./Page.vue";
import {computed} from "vue";

export default {

    components: {
        Page
    },


    props: ['total', 'current', 'segments'],
    setup(props, {emit}) {
        const hasPrevious = computed(() => {
            return props.current > 1
        })
        const hasNext = computed(() => {
            return props.current < props.total
        })
        const segmented = computed(() => {
            return props.segments !== undefined;
        })
        const hasSlider = computed(() => {
            return Boolean(props.segments.slider.length);
        })
        const showFirstEllipsis = computed(() => {
            return hasSlider.value
        })
        const showLastEllipsis = computed(() => {
            if (hasSlider.value) return true;
            return Boolean(props.segments.last.length)
        })

        const select = (page) => {
            emit('selected', page);
        }

        const selectPreviousPage = () => {
            select(props.current - 1);
        }
        const selectNextPage = () => {
            select(props.current + 1);
        }
        return {
            hasPrevious,
            hasNext,
            segmented,
            hasSlider,
            showFirstEllipsis,
            showLastEllipsis,
            select,
            selectPreviousPage,
            selectNextPage
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

    .active a:hover {
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
