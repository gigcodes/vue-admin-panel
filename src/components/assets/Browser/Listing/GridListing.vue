<template>

    <div class="asset-grid-listing"
         v-if="hasParent && !restrictNavigation || (!isSearching || (isSearching && hasResults))">

        <div class="asset-tile is-folder"
             v-if="hasParent && !restrictNavigation"
             @click.prevent="selectFolder(folder.parent_path)">
            <div class="asset-thumb-container">
                <file-icon extension="folder"/>
            </div>
            <div class="asset-meta">
                <div class="asset-filename">..</div>
            </div>
        </div>

        <folder-tile
            v-for="(folder,index) in subfolders"
            :folder="folder"
            :key="index"
            @selected="selectFolder"
            @editing="editFolder"
            @deleting="deleteFolder">
        </folder-tile>

        <asset-tile
            v-for="asset in assets"
            :asset="asset"
            :key="asset.id"
            :selected-assets="selectedAssets"
            @selected="selectAsset"
            @deselected="deselectAsset"
            @editing="editAsset"
            @doubleclicked="editAsset">
        </asset-tile>

    </div>

</template>


<script>
import AssetTile from "./AssetTile.vue";
import FolderTile from "./FolderTile.vue";

export default {
    props: [
        'container',
        'assets',
        'folder',
        'subfolders',
        'loading',
        'selectedAssets',
        'restrictNavigation',
        'isSearching'
    ],
    components: {
        AssetTile, FolderTile
    },
    computed: {

        hasResults() {
            return this.assets.length || this.subfolders.length;
        },

        hasParent() {
            if (!this.folder) {
                return false;
            }

            return this.folder.parent_path !== null;
        }

    },


    methods: {

        /**
         * Select a folder to navigate to.
         */
        selectFolder(path) {
            this.$emit('folder-selected', path);
        },

        /**
         * Select (check) an asset.
         */
        selectAsset(id) {
            this.$emit('asset-selected', id);
        },

        /**
         * Deselect (uncheck) an asset.
         */
        deselectAsset(id) {
            this.$emit('asset-deselected', id);
        },

        /**
         * Trigger editing of this asset.
         */
        editAsset(id) {
            this.$emit('asset-editing', id);
        },

        /**
         * Trigger the deleting of this asset.
         */
        deleteAsset(id) {
            this.$emit('asset-deselected', id);
            this.$emit('asset-deleting', id);
        },

        assetDoubleclicked(id) {
            this.$emit('asset-doubleclicked');
        },

        /**
         * Trigger editing of this folder.
         */
        editFolder(path) {
            this.$emit('folder-editing', path);
        },

        /**
         * Delete a folder.
         */
        deleteFolder(path) {
            const url = '/admin/media/folders';

            swal({
                icon: 'warning',
                title: 'Are you sure',
                text: 'Confirm delete folder',
                confirmButtonText: 'Yes I am sure',
                cancelButtonText: 'Cancel',
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    this.$axios.delete(url, {
                        params: {
                            container: this.container,
                            folders: path
                        }
                    }).then((response) => {
                        this.$emit('folder-deleted', path);
                        this.saving = false;
                        this.$toast.success('Folder Deleted Successfully');
                    });
                } else {
                    this.$toast.default('Delete Cancelled')
                }

            });
        },

        assetDragStart(id) {
            this.selectAsset(id);
            this.draggingAssets = true;
        }

    }

}
</script>
