<template>

    <modal :show.sync="show" :saving="saving" class="modal-small">
        <template slot="header">
            Move File
        </template>

        <template slot="body">
            <div class="alert alert-warning">{{ warningText }}</div>

            <div class="alert alert-danger" v-if="errors">
                <p v-for="error in errors">{{ error }}</p>
            </div>

            <div class="form-group">
                <label>Folder</label>
                <asset_folder-fieldtype
                    :data.sync="selectedFolder"
                    :config="fieldtypeConfig">
                </asset_folder-fieldtype>
            </div>
        </template>

        <template slot="footer">
            <button class="btn btn-primary" :disabled="!hasChanged" @click="save">Save</button>
            <button type="button" class="btn" @click="cancel">Cancel</button>
        </template>
    </modal>

</template>


<script>
    export default {

        props: ['assets', 'container', 'folder'],


        data() {
            return {
                show: true,
                selectedFolder: null,
                saving: false,
                errors: null,
                warningText: 'Moving a file will not update any references to it, which _may_ result in broken links in your site.'
            }
        },


        computed: {

            hasChanged() {
                return this.selectedFolder !== this.folder;
            },

            fieldtypeConfig() {
                return {container: this.container};
            }

        },


        mounted() {
            this.selectedFolder = this.folder;
        },


        watch: {

            show(val) {
                if (!val) this.cancel();
            }

        },


        methods: {

            save() {
                if (!this.hasChanged) return;

                this.saving = true;

                const url = '/assets/move';

                const payload = {
                    assets: this.assets,
                    folder: this.selectedFolder,
                    container: this.container
                };

                this.$http.post(url, payload).success((response) => {
                    this.$emit('saved', this.selectedFolder);
                    this.cancel();
                }).error((response) => {
                    this.saving = false;
                    this.errors = response;
                })
            },

            cancel() {
                this.$emit('closed');
            }

        }

    }
</script>
