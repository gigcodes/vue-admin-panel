<template>
  <component
      :is="iconComponent"
      :active="active"
  />
</template>

<script>

const icons = {
  analytics: require('./icons/AnalyticsIcon.vue'),
  dashboard: require('./icons/DashboardIcon.vue'),
  list: require('./icons/ListIcon.vue')
}

export default {
  name: 'BaseIcon',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true,
      validator(value) {
        return Object.prototype.hasOwnProperty.call(icons, value)
      }
    }
  },

  computed: {
    iconComponent() {
      return icons[this.name]
    }
  }
}
</script>
