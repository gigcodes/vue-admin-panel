<template>
  <component
      :is="iconComponent"
      :active="active"
  />
</template>

<script>
import kebabCase from 'lodash/kebabCase'

const icons = {}
const requireComponents = require.context('./icons/', false, /[\w]+Icon\.vue$/)
requireComponents.keys().forEach(fileName => {
  const iconName = kebabCase(fileName.replace(/^\.\/(.+)Icon\.vue/, '$1'))
  const componentConfig = requireComponents(fileName)
  icons[iconName] = componentConfig.default || componentConfig
})

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
