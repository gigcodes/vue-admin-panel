export default {
    emits: ['update:modelValue', 'update:slug'],
    props: {
        modelValue: String
    },
    methods: {
        updateSelf(title) {
            this.$emit('update:modelValue', title)
        }
    }
}
