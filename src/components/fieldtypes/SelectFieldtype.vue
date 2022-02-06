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
      <select :id="id" class="form-select"
              :autofocus="autofocus" :required="required"
              :aria-readonly="readonly" :disabled="disabled"
              v-model="modelValue"

      >
        <option v-if="placeholder" disabled>{{ placeholder }}</option>
        <option v-for="(option,key) in options" :value="key">{{ option }}</option>
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
  setup(props) {
    const options = ref(props.options)
    return {
      options
    }
  }
}
</script>

<style scoped>

</style>
