<template>
  <component
      :is="iconComponent"
      :active="active"
  />
</template>

<script>
import AnalyticsIcon from "./icons/AnalyticsIcon.vue";
import DashboardIcon from "./icons/DashboardIcon.vue";
import ListIcon from "./icons/ListIcon.vue";

const icons = {
  analytics: AnalyticsIcon,
  dashboard: DashboardIcon,
  list: ListIcon
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
