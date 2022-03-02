<template>

    <modal :show="true" class="asset-modal asset-folder-editor" :saving="saving" :loading="loading">
        <template slot="close">
            <button type="button" tabindex="-1" class="close" slot="close" aria-label="Close" @click="close"><span
                aria-hidden="true">&times;</span>
            </button>
        </template>

        <template slot="header">
            <h1 v-if="create">Create Folder</h1>
            <h1 v-if="!create">Edit Folder</h1>
        </template>

        <template slot="body">

            <div class="alert alert-danger" v-if="hasErrors">
                <p v-for="error in errors">{{ error }}</p>
            </div>

            <div class="form-group" v-if="create">
                <label class="block">Name</label>
                <small class="help-block">The filesystem directory name</small>
                <input type="text" class="form-control" v-model="form.basename" @keyup.esc="close" v-focus="create">
            </div>

        </template>

        <template slot="footer">
            <button type="button" class="btn" @click="close">Close</button>
            <button type="button" class="btn btn-primary" @click="save">Save</button>
        </template>
    </modal>

</template>

<script>
    export default {

        props: {
            container: String,
            path: String,
            create: Boolean
        },

        data: function () {
            return {
                form: {},
                folder: {},
                loading: true,
                saving: false,
                errors: [],
                basenameModified: false
            }
        },

        computed: {

            hasErrors() {
                return Object.keys(this.errors).length > 0 && !this.saving;
            }

        },

        methods: {

            reset: function () {
                this.path = '';
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
                    title: '',
                    basename: ''
                };
                this.loading = false;
            },

            getExistingFolder: function () {
                let url = '/admin/media/folders/' + this.container + '/' + this.path;

                this.$axios.get(url).then(response => {
                    this.folder = response.data;
                    this.form = {
                        title: response.data.title
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
                let url = '/admin/media/folder';

                this.$axios.post(url, {
                    form: this.form,
                    folder: this.folder,
                }).then(response => {
                    this.$emit('created', response.data.folder.path);
                    this.saving = false;
                    this.close();
                }).catch(error => {
                    this.errors = error.response.data.errors;
                    this.saving = false;
                });
            },

            saveExistingFolder: function () {
                let url = '/admin/media/folders/' + this.container + '/' + this.path;

                this.$axios.post(url, {
                    form: this.form,
                    folder: this.folder,
                }).then(response => {
                    this.$emit('updated');
                    this.saving = false
                    this.close();
                });
            },

            close: function () {
                this.$emit('closed');
            }

        },

        mounted: function () {
            this.getFolder();
        }

    }
</script>
