<template>
  <div :class="classes">
    <div>
      <div class="flex items-center justify-between">
        <label class="block text-sm font-medium mb-1" :for="id">{{ name }}
          <span class="text-red-500" v-if="required">*</span></label>
        <tooltip class="ml-2" bg="dark" size="md" v-if="tooltip">
          <div class="text-sm text-gray-200">{{ tooltip }}</div>
        </tooltip>
      </div>
      <textarea :value="modelValue"
                @input="updateSelf($event.target.value)"
                :autofocus="autofocus"
                :required="required"
                :readonly="readonly"
                :placeholder="placeholder"
                :id="id"
                :disabled="disabled"
                class="form-input w-full"
                :class="className"
                @keyup="$emit('keyup',$event)"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :rows="rows"
      ></textarea>
    </div>
    <div class="text-xs mt-1" v-if="help">{{ help }}</div>
    <div class="text-xs mt-1 text-green-500" v-if="hasSuccess">{{ hasSuccess }}</div>
    <div class="text-xs mt-1 text-red-500" v-if="hasError">{{ hasError }}</div>
  </div>
</template>

<script>
import FieldType from './index';
import Input from './customInput';

export default {
  name: "TextAreaField",
  emits: ['update:modelValue', 'keyup', 'blur', 'change', 'focus'],
  props: ['rows'],
  mixins: [FieldType, Input],
  methods: {
    updateSelf(title) {
      this.$emit('update:modelValue', title)
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
    },
  },
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
  }
}
</script>

<style scoped>

</style>
