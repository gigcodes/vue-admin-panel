<script>
export default {

    render() {
        // eslint-disable-next-line vue/require-slots-as-functions
        return this.$slots.default[0]
    },

    inject: ['itemClass'],

    mounted() {
        this.$el.classList.add(this.itemClass)
    }

}
</script>
