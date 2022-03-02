<template>

    <div class="asset-table-listing">

        <table v-if="!isSearching || (isSearching && hasResults)">

            <thead>
            <tr>
                <th></th>
                <th
                    v-for="(column,index) in columns" :key="index" :class="{
                            'extra-col': column.extra,
                            'active': isColumnActive(column),
                            'column-sortable': !isSearching
                        }"
                    @click="$emit('sorted', column.field)"
                >
                    {{ column.label }}
                    <i v-if="isColumnActive(column)"
                       :class="sortOrder === 'asc' ? 'icon icon-chevron-up' : 'icon icon-chevron-down' "/>
                </th>
                <th class="column-actions"/>
            </tr>
            </thead>

            <tbody>

            <tr v-if="hasParent && !restrictNavigation">
                <td>
                    <div class="img">
                        <a @click.prevent="selectFolder(folder.parent_path)">
                            <file-icon extension="folder"/>
                        </a>
                    </div>
                </td>
                <td>
                    <a href="" @click.prevent="selectFolder(folder.parent_path)">..</a>
                </td>
                <td colspan="3">..</td>
            </tr>

            <tr is="folderRow"
                v-for="(folder,index) in subfolders"
                :folder="folder"
                :key="index"
                @open-dropdown="closeDropdowns"
                @selected="selectFolder"
                @editing="editFolder"
                @deleting="deleteFolder"
                @dropped-on-folder="droppedOnFolder">
            </tr>

            <tr is="assetRow"
                v-for="asset in assets"
                :key="asset.id"
                :asset="asset"
                :selected-assets="selectedAssets"
                @open-dropdown="closeDropdowns"
                @selected="selectAsset"
                @deselected="deselectAsset"
                @editing="editAsset"
                @deleting="deleteAsset"
                @assetdragstart="assetDragStart"
                @doubleclicked="editAsset">
            </tr>

            </tbody>
        </table>

    </div>

</template>


<script>
import AssetRow from "./AssetRow.vue";
import FolderRow from "./FolderRow.vue";

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
        AssetRow, FolderRow
    },


    data() {
        return {
            columns: [
                {
                    field: 'title',
                    label: 'Title',
                },
                {
                    field: 'size',
                    label: 'File Size',
                    extra: true
                },
                {
                    field: 'lastModified',
                    label: 'Date Modified',
                    extra: true
                }
            ]
        }
    },


    computed: {

        sortOrder() {
            return this.$parent.sortOrder;
        },
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
        closeDropdowns: function (context) {

        },

        droppedOnFolder(folder, e) {
            const asset = e.dataTransfer.getData('asset');
            e.dataTransfer.clearData('asset');

            // discard any drops that weren't started on an asset
            if (asset === '') return;

            this.$emit('assets-dragged-to-folder', folder);
        },

        isColumnActive(col) {
            if (this.isSearching) return false;

            return col.field === this.$parent.sort;
        },

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