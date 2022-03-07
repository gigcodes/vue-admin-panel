<script>
import _ from "underscore"

export default {

    emits: ["input", "meta-updated", "replicator-preview-updated"],
    props: {
        value: {
            required: true,
            type: String
        },
        config: {
            type: Object,
            default: () => {
                return {};
            }
        },
        handle: {
            type: String,
            required: true
        },
        meta: {
            type: Object,
            default: () => {
                return {};
            }
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        namePrefix: {type: String, default: null},
        errorKeyPrefix: {type: String, default: null},
    },

    methods: {
        update(value) {
            this.$emit('input', value);
        },

        updateDebounced: _.debounce(function (value) {
            this.update(value);
        }, 150),

        updateMeta(value) {
            this.$emit('meta-updated', value);
        }
    },

    computed: {
        name() {
            if (this.namePrefix) {
                return `${this.namePrefix}[${this.handle}]`;
            }

            return this.handle;
        },

        isReadOnly() {
            return this.readOnly || this.config.read_only || false;
        },

        replicatorPreview() {
            return this.value;
        },

        fieldId() {
            return 'field_' + this.config.handle;
        }
    },

    watch: {

        replicatorPreview: {
            immediate: true,
            handler(text) {
                this.$emit('replicator-preview-updated', text);
            }
        }

    }

}
</script>
