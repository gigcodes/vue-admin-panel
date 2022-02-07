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

            <div class="relative" v-if="suffix || prefix">
                <input :id="id"
                       class="form-input w-full"
                       :type="type" :value="modelValue"
                       @input="updateSelf($event.target.value)"
                       :autofocus="autofocus"
                       :required="required"
                       :readonly="readonly"
                       :placeholder="placeholder"
                       :disabled="disabled"
                       :class="className"
                       @keyup="$emit('keyup',$event)"
                       @focus="handleFocus"
                       @blur="handleBlur"
                       @change="handleChange"
                />
                <div class="absolute inset-0 left-auto flex items-center pointer-events-none"
                     :class="prefix ? 'right-auto':'left-auto'">
                    <span class="text-sm text-gray-400 font-medium px-3"
                          v-if="!hasIcon">{{ suffix }} {{ prefix }}</span>
                    <div v-else :class="hasIcon">
                        <slot name="icon"></slot>
                    </div>
                </div>
            </div>

            <input v-else
                   :type="type" :value="modelValue"
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
            />
        </div>
        <div class="text-xs mt-1" v-if="help">{{ help }}</div>
        <div class="text-xs mt-1 text-green-500" v-if="hasSuccess">{{ hasSuccess }}</div>
        <div class="text-xs mt-1 text-red-500" v-if="hasError">{{ hasError }}</div>

    </div>
</template>

<script>
import FieldType from './index';
import Input from './customInput';
import {Tooltip} from "../../index";

export default {
    name: "TextField",
    components: {Tooltip},
    emits: ['update:modelValue', 'update:slug', 'keyup', 'blur', 'change', 'focus'],
    mixins: [FieldType, Input],
    methods: {
        handleFocus(event) {
            this.focused = true;
            this.$emit('focused', event);
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
                classes = classes + ' ';
            }

            return classes + this.inputClass;
        }
    }
}
</script>

<style scoped>

</style>
