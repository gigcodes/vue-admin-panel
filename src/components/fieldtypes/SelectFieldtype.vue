<template>
    <div :class="classes">
        <label class="block text-sm font-medium mb-1" :for="id">{{ name }}</label>
        <select :id="id" class="form-select"
                :autofocus="autofocus" :required="required"
                :aria-readonly="readonly" :disabled="disabled"
                v-model="modelValue"

        >
            <option v-if="placeholder" disabled>{{ placeholder }}</option>
            <option v-for="(option,key) in options" :value="key">{{ option }}</option>
        </select>
    </div>
</template>

<script>
import Fieldtypes from "./index";
import Input from './customInput';
import {ref} from "vue";

export default {
    name: "SelectField",
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
