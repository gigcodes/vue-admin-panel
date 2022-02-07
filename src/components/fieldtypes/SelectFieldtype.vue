<template>
  <div :class="classes">
    <div>
      <div class="flex items-center justify-between">
        <label class="block text-sm font-medium" :for="id">{{ name }}
          <span class="text-red-500" v-if="required">*</span></label>
        <tooltip class="ml-2" bg="dark" size="md" v-if="tooltip">
          <div class="text-sm text-gray-200">{{ tooltip }}</div>
        </tooltip>
      </div>
      <select :id="id" class="form-select w-full"
              :autofocus="autofocus" :required="required"
              :aria-readonly="readonly" :disabled="disabled"
              @change="updateSelf($event.target.value)"
              @keyup="$emit('keyup',$event)"
              @focus="handleFocus"
              @blur="handleBlur"
              :class="className"
      >
        <option v-if="placeholder" disabled>{{ placeholder }}</option>
        <option v-for="(option,key) in options" :value="key"
                :selected="key===modelValue"
        >{{ option }}
        </option>
      </select>
    </div>
    <div class="text-xs mt-1" v-if="help">{{ help }}</div>
    <div class="text-xs mt-1 text-green-500" v-if="hasSuccess">{{ hasSuccess }}</div>
    <div class="text-xs mt-1 text-red-500" v-if="hasError">{{ hasError }}</div>
  </div>
</template>

<script>
import Fieldtypes from "./index";
import Input from './customInput';
import {ref} from "vue";

export default {
  name: "SelectField",
  props: ['options'],
  mixins: [Fieldtypes, Input],
  computed: {
    className() {
      let classes = '';
      if (this.disabled) {
        classes = classes + 'disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed '
      }
      if (this.hasError) {
        classes = classes + 'border-red-300 ';
      }
      if (this.hasSuccess) {
        classes = classes + 'border-green-300 ';
      }
      if (this.suffix) {
        classes = classes + 'pr-8 ';
      }
      if (this.prefix) {
        classes = classes + 'pl-12';
      }
      return classes;
    }
  },
  setup(props, {emit}) {
    const options = ref(props.options)
    const handleFocus = (event) => {
      this.focused = true;
      emit('focused', event)
    }
    const handleChange = (event) => {
      emit('change', event)
    }
    const handleBlur = (event) => {
      emit('blur', event)
    }
    return {
      options,
      handleFocus,
      handleChange,
      handleBlur
    }
  }
}
</script>

<style scoped>

</style>
