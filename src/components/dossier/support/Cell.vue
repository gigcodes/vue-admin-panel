<template>
    <span :class="{ 'has-status-icon': index === 0 }">
        <span v-if="index === 0" class="status"
              :class="(item.published) ? 'status-live' : 'status-hidden'"
              :title="(item.published) ? 'Published' : 'Draft'"
        ></span>
        <a v-if="column.link && !column.custom_link" :href="item.edit_url" class="has-status-icon">
            {{ value }}
        </a>
        <a v-else-if="column.link && column.custom_link" :href="item[column.custom_link]" class="has-status-icon">
            {{ value }}
        </a>
        <template v-else>
            {{ value }}
        </template>
    </span>
</template>

<script>
export default {
    name: "Cell",
    props: ['index', 'item', 'value', 'column'],
}
</script>

<style scoped>

</style>
