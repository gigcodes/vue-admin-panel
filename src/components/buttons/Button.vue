<template>
  <button ref="trigger"
          :class="disabled || loading ? 'btn disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed':sizes[size] + ' ' + classes[type] + ' ' + extraClass"
          @click.prevent="$emit('clicked')" :disabled="disabled || loading">
    <svg class="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16" v-if="loading">
      <path
          d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>
    <span v-if="loading" :class="loading ? 'ml-2':''"></span>
    <slot></slot>
  </button>
</template>
<script>
import classes from './class';
import type from './index';
import sizes from "./sizes";
import {onMounted, ref} from "vue";

export default {
  mixins: [type],
  name: 'Btn',
  setup() {
    return {
      classes,
      sizes,
    }
  },
}
</script>
<style lang="scss" scoped>
.loading {
  text-align: center;
  padding: 20px 0;

  .icon {
    display: block;
    margin-bottom: 5px;
  }

  &.loading-basic {
    text-align: left;
    padding: 0;

    .icon {
      display: inline-block;
      margin: -2px 5px 0 0;
    }
  }
}
</style>
