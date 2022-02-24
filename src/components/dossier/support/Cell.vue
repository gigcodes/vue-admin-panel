<template>
    <span :class="{ 'has-status-icon': index === 0 }">
        <span v-if="index === 0" class="status"
              :class="(item.published) ? 'status-live' : 'status-hidden'"
              :title="(item.published) ? 'Published' : 'Draft'"
        ></span>
        <a v-if="column.link && !column.custom_link" href="javascript:void(0)" @click.prevent="goTo(item.edit_url)"
           class="has-status-icon">
            {{ value }}
        </a>
        <a v-else-if="column.link && column.custom_link" href="javascript:void(0)"
           @click.prevent="goTo(item[column.custom_link])" class="has-status-icon">
            {{ value }}
        </a>
        <template v-else>
            {{ value }}
        </template>
    </span>
</template>

<script>
import {Events} from "../../../index";

export default {
    name: "Cell",
    props: ['index', 'item', 'value', 'column'],
    setup() {
        const goTo = url => {
            Events.$emit('goTo', url)
        }
        return {
            goTo
        }
    }
}
</script>

<style scoped>

</style>
