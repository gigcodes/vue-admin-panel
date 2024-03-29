<template>
    <modal v-model:show="show" :saving="saving" class="modal-small">
        <template #header> Move File</template>

        <template #body>
            <div class="alert alert-warning">{{ warningText }}</div>

            <div v-if="errors" class="alert alert-danger">
                <p v-for="(error,i) in errors" :key="i">{{ error }}</p>
            </div>

            <div class="form-group">
                <label>Folder</label>
                <asset_folder-fieldtype
                    v-model:data="selectedFolder"
                    :config="fieldtypeConfig"
                >
                </asset_folder-fieldtype>
            </div>
        </template>

        <template #footer>
            <button
                class="btn btn-primary"
                :disabled="!hasChanged"
                @click="save"
            >
                Save
            </button>
            <button type="button" class="btn" @click="cancel">Cancel</button>
        </template>
    </modal>
</template>

<script>
import axios from "axios";

export default {
    emits: ["closed", "saved"],
    props: {
        assets: {
            type: Array,
            default: () => ([])
        },
        container: {
            type: String,
            default: null,
        },
        folder: {
            type: String,
            default: null,
        }
    },

    data() {
        return {
            show: true,
            selectedFolder: null,
            saving: false,
            errors: null,
            warningText:
                "Moving a file will not update any references to it, which _may_ result in broken links in your site.",
        };
    },

    computed: {
        hasChanged() {
            return this.selectedFolder !== this.folder;
        },

        fieldtypeConfig() {
            return {container: this.container};
        },
    },

    watch: {
        show(val) {
            if (!val) this.cancel();
        },
    },

    mounted() {
        this.selectedFolder = this.folder;
    },

    methods: {
        save() {
            if (!this.hasChanged) return;

            this.saving = true;

            const url = "/assets/move";

            const payload = {
                assets: this.assets,
                folder: this.selectedFolder,
                container: this.container,
            };

            axios.post(url, payload).then(() => {
                this.$emit("saved", this.selectedFolder);
                this.cancel();
            })
                .catch((response) => {
                    this.saving = false;
                    this.errors = response;
                });
        },

        cancel() {
            this.$emit("closed");
        },
    },
};
</script>
