<template>
  <li
      :class="[
            { first: number === 1 },
            { active: isCurrent },
            { last: last },
        ]"
  >
    <a
        :href="isCurrent ? '#' : ''"
        @click.prevent="$emit('select', number)"
    >
      {{ number }}
    </a>
  </li>
</template>

<script>
import {computed} from "vue";

export default {
  props: {
    number: {
      type: Number,
      required: false,
      default: 1,
    },
    last: {
      type: Boolean,
      default: false
    },
    current: {
      type: Number,
      required: false,
      default: null,
    }
  },
  emits: ["select"],
  setup(props) {
    const isCurrent = computed(() => {
      return props.number === props.current;
    });
    return {isCurrent};
  },
};
</script>
