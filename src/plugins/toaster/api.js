import Toaster from './Toaster.vue'
import mount from './helpers/mount-component'

const Api = (globalOptions = {}) => {
    return {
        show(message, options = {}) {
            let localOptions = { message, ...options }
            return mount(Toaster, {
                props: {...globalOptions, ...localOptions}
            })
        },
        clear() {
            this.$emit('toast-clear')
        },
        success(message, options = {}) {
            options.type = 'success'
            return this.show(message, options)
        },
        error(message, options = {}) {
            options.type = 'error'
            return this.show(message, options)
        },
        info(message, options = {}) {
            options.type = 'info'
            return this.show(message, options)
        },
        warning(message, options = {}) {
            options.type = 'warning'
            return this.show(message, options)
        }
    }
}

export default Api
