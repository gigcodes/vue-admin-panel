<template>
  <div
      v-if="type === 'div'"
      :class="[
            'svg-icon',
            { 'using-div': type === 'div', 'using-svg': type === 'svg' },
        ]"
      v-html="image"
  ></div>
  <img :src="image" alt="" v-else>
</template>

<script>
import {computed} from "vue";

export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "svg"
    },
  },

  setup(props) {
    const useImage = ((url) => {
      return new URL(`/src/${url}`, import.meta.url).href;
    });
    const image = computed(() => {
      if (props.type === "div") {
        return `<div style="background-image: url('${"../svg/" + props.name + ".svg"}')"></div>`;
      }
      return useImage(`../svg/${props.name}.svg`);
    })
    return {
      image
    }
  }
};
</script>
