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
      <div class="relative">
        <flat-pickr class="form-input pl-9 text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300 w-60"
                    :id="id"
                    :config="DFconfig" v-model="modelValue"></flat-pickr>
        <div class="absolute inset-0 right-auto flex items-center pointer-events-none">
          <svg class="w-4 h-4 fill-current text-slate-500 ml-3" viewBox="0 0 16 16">
            <path
                d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="text-xs mt-1" v-if="help">{{ help }}</div>
    <div class="text-xs mt-1 text-green-500" v-if="hasSuccess">{{ hasSuccess }}</div>
    <div class="text-xs mt-1 text-red-500" v-if="hasError">{{ hasError }}</div>
  </div>
</template>

<script>
import flatPickr from '../../plugins/flatpicker'
import Fieldtypes from "./index";
import Input from './customInput';

export default {
  name: "DateField",
  props: {
    config: {
      default: function () {
        return {
          mode: 'range',
          dateFormat: 'M j, Y',
          defaultDate: null
        }
      },
      type: Object
    }
  },
  mixins: [Fieldtypes, Input],
  data(props) {
    return {
      date: null,
      DFconfig: {
        mode: props.config.range,
        static: true,
        monthSelectorType: 'static',
        dateFormat: props.config.dateFormat,
        defaultDate: props.config.defaultDate,
        prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        onReady: (selectedDates, dateStr, instance) => {
          instance.element.value = dateStr.replace('to', '-');
          const customClass = (props.config.align) ? props.config.align : '';
          instance.calendarContainer.classList.add(`flatpickr-${customClass}`);
        },
        onChange: (selectedDates, dateStr, instance) => {
          instance.element.value = dateStr.replace('to', '-');
        },
      },
    }
  },
  components: {
    flatPickr
  },
}
</script>

<style scoped>

</style>