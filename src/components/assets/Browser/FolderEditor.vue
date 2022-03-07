<template>
    <modal
        :show="true"
        class="asset-modal asset-folder-editor"
        :saving="saving"
        :loading="loading"
    >
        <template #close>
            <button
                type="button"
                tabindex="-1"
                class="close"
                aria-label="Close"
                @click="close">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>

        <template #header>
            <h1 v-if="create">Create Folder</h1>
            <h1 v-if="!create">Edit Folder</h1>
        </template>

        <template #body>
            <div v-if="hasErrors" class="alert alert-danger">
                <p v-for="(error,i) in errors" :key="i">{{ error }}</p>
            </div>

            <div v-if="create" class="form-group">
                <label class="block">Name</label>
                <small class="help-block">The filesystem directory name</small>
                <input
                    v-model="form.basename"
                    v-focus="create"
                    type="text"
                    class="form-control"
                    @keyup.esc="close"
                />
            </div>
        </template>

        <template #footer>
            <button type="button" class="btn" @click="close">Close</button>
            <button type="button" class="btn btn-primary" @click="save">
                Save
            </button>
        </template>
    </modal>
</template>

<script>
import axios from "axios";

export default {
    emits: ["created", "updated", "closed"],
    props: {
        container: {
            type: String,
            default: null
        },
        path: {
            type: String,
            default: null
        },
        create: {
            type: Boolean,
            default: false
        },
    },

    data: function () {
        return {
            form: {},
            folder: {},
            loading: true,
            saving: false,
            errors: [],
            basenameModified: false,
        };
    },

    computed: {
        hasErrors() {
            return Object.keys(this.errors).length > 0 && !this.saving;
        },
    },

    mounted: function () {
        this.getFolder();
    },

    methods: {
        reset: function () {
            //@todo change needed
            //this.path = "";
            this.folder = {};
            this.form = {};
            this.loading = true;
        },

        getFolder: function () {
            if (this.create) {
                this.getBlankFolder();
            } else {
                this.getExistingFolder();
            }
        },

        getBlankFolder: function () {
            this.folder = {};
            this.form = {
                container: this.container,
                parent: this.path,
                title: "",
                basename: "",
            };
            this.loading = false;
        },

        getExistingFolder: function () {
            let url =
                "/admin/media/folders/" + this.container + "/" + this.path;

            axios.get(url).then((response) => {
                this.folder = response.data;
                this.form = {
                    title: response.data.title,
                };
                this.loading = false;
            });
        },

        save: function () {
            this.saving = true;

            if (this.create) {
                this.saveNewFolder();
            } else {
                this.saveExistingFolder();
            }
        },

        saveNewFolder: function () {
            let url = "/admin/media/folder";

            axios.post(url, {
                form: this.form,
                folder: this.folder,
            })
                .then((response) => {
                    this.$emit("created", response.data.folder.path);
                    this.saving = false;
                    this.close();
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                    this.saving = false;
                });
        },

        saveExistingFolder: function () {
            let url =
                "/admin/media/folders/" + this.container + "/" + this.path;

            axios.post(url, {
                form: this.form,
                folder: this.folder,
            })
                .then(() => {
                    this.$emit("updated");
                    this.saving = false;
                    this.close();
                });
        },

        close: function () {
            this.$emit("closed");
        },
    },
};
</script>
