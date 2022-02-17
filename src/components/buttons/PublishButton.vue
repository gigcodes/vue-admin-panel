<template>
  <div class="relative inline-flex">
    <Btn type="primary" v-if="publishType === 'save'"
         @click="$emit('publishWithoutContinuing')"
         ref="trigger"
         extra-class="rounded-none rounded-l-lg"
         :disabled="loading">{{ saveText }}
    </Btn>
    <Btn v-if="publishType === 'continue'" type="primary"
         ref="trigger"
         class="rounded-none rounded-l-lg"
         @click="$emit('publishAndContinue')" :disabled="loading">{{ saveText }} and continue
    </Btn>
    <Btn v-if="allowSaveAndAddAnother && publishType === 'another'" type="primary"
         ref="trigger"
         class="rounded-none rounded-l-lg"
         @click="$emit('publishAndAnother')" :disabled="loading">{{ saveText }}
      and add another
    </Btn>
    <Btn :state="state" :type="type" :size="size" :disabled="loading"
         class="rounded-none rounded-r-lg p-2 px-0.5"
         @click="toggle" v-click-away="away">
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
           aria-hidden="true">
        <path fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"/>
      </svg>
    </Btn>
    <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen"
           class="origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
           :class="align === 'right' ? 'right-0' : 'left-0'">
        <ul
            ref="dropdown"
            @focusin="dropdownOpen = true"
            @focusout="dropdownOpen = false"
        >
          <li v-if="publishType !== 'continue'">
            <a class="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
               href="javascript:void(0)" @click="$emit('publishAndContinue')">{{ saveText }} and continue</a>
          </li>
          <li v-if="publishType !== 'save'">
            <a class="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
               href="javascript:void(0)" @click="$emit('publishWithoutContinuing')">{{ saveText }}</a>
          </li>
          <li v-if="allowSaveAndAddAnother && publishType !== 'another'">
            <a class="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
               href="javascript:void(0)" @click="$emit('publishAndAnother')">{{ saveText }} and add another</a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import classes from './class';
import type from './index';
import sizes from "./sizes";
import {Btn} from "../../index";
import {mixin} from "../../plugins/click-away";

export default {
  mixins: [type, mixin],
  name: 'PublishButton',
  emits: [
    'publishWithoutContinuing', 'publishAndContinue', 'publishAndAnother'
  ],
  components: {
    Btn
  },
  props: {
    publishType: {
      type: String,
      default: null
    },
    allowSaveAndAddAnother: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: null
    },
    saveText: {
      type: String,
      default: 'Save'
    },
    align: {
      type: String,
      default: 'right'
    }
  },
  data() {
    return {
      sizes,
      classes,
      disable: this.disabled,
      dropdownOpen: false,
    }
  },
  methods: {
    toggle() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    away() {
      this.dropdownOpen = false;
    }
  }
}
</script>

<style scoped>
.fill-current {
  fill: white;
}
</style>
