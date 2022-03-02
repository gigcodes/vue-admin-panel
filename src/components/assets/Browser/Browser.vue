<template>

    <div class="asset-browser card"
         @dragover="dragOver"
         @dragleave="dragStop"
         @drop="dragStop">

        <div v-if="!initialized" class="asset-browser-loading loading">
            <span class="icon icon-circular-graph animation-spin"/> Loading
        </div>

        <div class="drag-notification" v-show="canEdit && draggingFile">
            <i class="icon icon-download"/>
            <h3>Drop to Upload</h3>
        </div>

        <div v-if="showSidebar" class="asset-browser-sidebar">
            <h4>Containers</h4>
            <div v-for="c in containers" class="sidebar-item" :class="{ 'active': container.id === c.id }">
                <a @click="selectContainer(c.id)">
                    {{ c.title }}
                </a>
            </div>
        </div>

        <div class="asset-browser-main" v-if="initialized">

            <div class="asset-browser-header">
                <h1 class="mb-3">
                    <template v-if="isSearching">
                        Search Results
                    </template>
                    <template v-else>
                        <template v-if="restrictNavigation">
                            {{ folder.title || folder.path }}
                        </template>
                        <template v-else>
                            {{ container.title }}
                        </template>
                    </template>

                    <div class="loading-indicator" v-show="loadingAssets">
                        <span class="icon icon-circular-graph animation-spin"/>
                    </div>
                </h1>

                <input type="text"
                       class="search filter-control mb-3"
                       placeholder="Search..."
                       v-model="searchTerm"
                       debounce="500"/>

                <div class="asset-browser-actions flexy wrap">

                    <template v-if="assetsSelected.length">
                        <button class="btn btn-danger ml-16 mr-2 mb-3" @click="deleteAsset(assetsSelected)">
                            Delete
                        </button>
                        <div class="btn-group mb-3">
                            <button class="btn" @click="assetsSelected = []">Uncheck All</button>
                        </div>
                    </template>

                    <div class="btn-group action mb-3">
                        <button type="button"
                                class="btn btn-icon"
                                :class="{'depressed': displayMode === 'grid'}"
                                @click="setDisplayMode('grid')">
                            <span class="icon icon-grid"/>
                        </button>
                        <button type="button"
                                class="btn btn-icon"
                                :class="{'depressed': displayMode === 'table'}"
                                @click="setDisplayMode('table')">
                            <span class="icon icon-list"/>
                        </button>
                    </div>

                    <div class="btn-group action mb-3">
                        <button type="button"
                                class="btn"
                                v-if="!restrictNavigation && !isSearching"
                                @click.prevent="createFolder">
                            New Folder
                        </button>
                        <button type="button" class="btn" @click.prevent="uploadFile" v-if="!isSearching">
                            Upload
                        </button>
                    </div>
                </div>
            </div>

            <div class="asset-browser-content">

                <uploader
                    v-if="initialized"
                    ref="uploader"
                    :container="container.id"
                    :dom-element="uploadElement"
                    :path="path"
                    @updated="uploadsUpdated"
                    @upload-complete="loadAssets">
                </uploader>

                <uploads
                    v-if="uploads.length"
                    :uploads="uploads">
                </uploads>

                <component
                    :is="listingComponent"
                    :container="container.id"
                    :assets="assets"
                    :folder="folder"
                    :subfolders="subfolders"
                    :loading="loading"
                    :selected-assets="selectedAssets"
                    :restrict-navigation="restrictNavigation"
                    :is-searching="isSearching"
                    @folder-selected="folderSelected"
                    @folder-editing="editFolder"
                    @folder-deleted="folderDeleted"
                    @asset-selected="assetSelected"
                    @asset-deselected="assetDeselected"
                    @asset-editing="editAsset"
                    @asset-deleting="deleteAsset"
                    @assets-dragged-to-folder="assetsDraggedToFolder"
                    @asset-doubleclicked="assetDoubleClicked"
                    @sorted="sortBy">
                </component>

                <div class="no-results" v-if="isSearching && isEmpty">
<!--                    <svg-icon name="folder-search-empty" class="h-16 w-16 mx-auto"/>-->
                    <h2>No Search Results</h2>
                </div>

                <pagination
                    v-if="pagination.totalPages > 1"
                    :total="pagination.totalPages"
                    :current="pagination.currentPage"
                    :segments="pagination.segments"
                    @selected="paginationPageSelected">
                </pagination>

            </div>

            <breadcrumbs
                v-if="!restrictNavigation && !isSearching"
                :path="path"
                @navigated="folderSelected">
            </breadcrumbs>

            <asset-editor
                v-if="showAssetEditor"
                :id="editedAssetId"
                :has-child.sync="editorHasChild"
                @closed="closeAssetEditor"
                @saved="assetSaved"
                @deleted="assetDeleted"
                @moved="assetMoved">
            </asset-editor>

            <folder-editor
                v-if="showFolderCreator"
                :create="true"
                :container="container.id"
                :path="path"
                @closed="folderCreatorClosed"
                @created="folderCreated">
            </folder-editor>

            <folder-editor
                v-if="showFolderEditor"
                :create="false"
                :container="container.id"
                :path="editedFolderPath"
                @closed="folderEditorClosed"
                @updated="loadAssets">
            </folder-editor>
        </div>
    </div>

</template>

<script>
import GridListing from "./Listing/GridListing.vue";
import TableListing from "./Listing/TableListing.vue";
import Uploader from "../Uploader.vue";
import Uploads from "../Uploads.vue";
import AssetEditor from "../Editor/Editor.vue";
import FolderEditor from "./FolderEditor.vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import Pagination from "../../dossier/pagination/Pagination.vue";
import {Events} from "../../../index";
import _ from "underscore"
export default {
    name: 'AssetBrowser',
    components: {
        Pagination,
        GridListing, TableListing, Uploader, Uploads,
        AssetEditor, FolderEditor, Breadcrumbs
    },
    props: [
        'selectedContainer',   // The ID of the container to display, determined by a parent component.
        'selectedPath',        // The path to display, determined by a parent component.
        'restrictNavigation',  // Whether to restrict to a single folder and prevent navigation.
        'selectedAssets',
        'maxFiles'
    ],


    data() {
        return {
            loadingAssets: true,
            initializedAssets: false,
            loadingContainers: true,
            containers: null,
            container: null,
            path: null,
            assets: [],
            folders: [],
            folder: {},
            displayMode: 'table',
            uploads: [],
            draggingFile: false,
            pagination: {},
            selectedPage: 1,
            editedAssetId: null,
            showFolderCreator: false,
            editedFolderPath: null,
            editorHasChild: false,
            isSearching: false,
            sort: 'title',
            sortOrder: 'asc',
            searchTerm: '',
            assetsSelected: this.selectedAssets,
        }
    },


    computed: {

        initialized() {
            return this.initializedAssets && !this.loadingContainers;
        },

        loading() {
            return this.loadingAssets || this.loadingContainers;
        },

        /**
         * Whether the current folder has assets.
         */
        hasAssets() {
            return this.assets.length > 0;
        },

        hasSubfolders() {
            return this.subfolders.length > 0;
        },

        isEmpty() {
            return !this.hasAssets && !this.hasSubfolders;
        },

        canEdit: function () {
            return true;
        },

        showSidebar() {
            if (!this.initialized) return false;

            if (this.isSearching) return false;

            if (this.restrictNavigation) return false;

            return Object.keys(this.containers).length > 1;
        },

        listingComponent() {
            return (this.displayMode === 'grid') ? 'GridListing' : 'TableListing';
        },

        fullPath() {
            if (!this.container) return;

            let fullPath = this.container.id;

            if (this.path !== '/') {
                fullPath += '/' + this.path;
            }

            return fullPath;
        },

        subfolders() {
            if (this.restrictNavigation) return [];

            return this.folders;
        },

        uploadElement() {
            return this.$el;
        },

        showAssetEditor() {
            return Boolean(this.editedAssetId);
        },

        showFolderEditor() {
            return this.editedFolderPath !== null;
        },

        maxFilesReached() {
            return this.maxFiles
                && this.selectedAssets.length >= this.maxFiles
        },
        /**
         * When the dragover event is triggered.
         *
         * This event is triggered when something is dragged onto the specified element.
         * If the thing being dragged is not a file, we want to prevent anything
         * from happening. We're only interested in files.
         */
        dragOver() {
            if (!this.$root.draggingNonFile) {
                this.draggingFile = true;
            }
        },

        /**
         * When the dragging has ended.
         */
        dragStop() {
            this.draggingFile = false;
        }

    },


    mounted() {
        this.path = this.selectedPath;
        // We need all the containers since they'll be displayed in the sidebar. This will also load
        // up the current container object using the initial container id. Setting the container
        // property will trigger loading of assets since there's a watcher reacting to it.
        this.loadContainers();
        this.displayMode = 'table';
    },
    watch: {

        /**
         * Whenever the fullPath computed property is changed, it means
         * that either the path or the container has been modified,
         * so then a new set of assets should be displayed.
         */
        fullPath() {
            this.loadAssets();
        },

        /**
         * When the selected container prop has changed, the parent component
         * has indicated that a different set of assets should be shown.
         */
        selectedContainer(container) {
            this.container = this.containers[container];
        },

        /**
         * When the selected path prop has changed, the parent component
         * has indicated that a different set of assets should be shown.
         */
        selectedPath(path) {
            this.path = path;
        },


        /**
         * When selected assets are updated/modified, the parent component should be notified.
         */
        assetsSelected(selections) {
            this.$emit('selections-updated', selections);
        },

        searchTerm(term) {
            if (term) {
                this.search();
            } else {
                this.loadAssets();
            }
        }

    },


    methods: {
        /**
         * Load asset container data
         */
        loadContainers() {
            this.$axios.get('/admin/media/browse').then((response) => {
                // Set the containers property to a collection of the items in the response.
                // We are only interested in certain keys, and we want them indexed by
                // ID to make retrieving container values simpler down the road.
                this.containers = _.chain(response.data.items).map((container) => {
                    return _.pick(container, 'id', 'title');
                }).indexBy('id').value();

                // We need the container property to be the retrieved data object.
                this.container = this.containers[this.selectedContainer];

                this.loadingContainers = false;
            });
        },

        /**
         * Load assets from the container and folder specified
         */
        loadAssets(page) {
            this.loadingAssets = true;

            this.$axios.post('/admin/media/get-files', {
                container: this.container.id,
                path: this.path,
                page: this.selectedPage,
                sort: this.sort,
                dir: this.sortOrder
            }).then((response) => {
                this.assets = response.data.assets;
                this.folders = response.data.folders;
                this.folder = response.data.folder;
                this.pagination = response.data.pagination;
                this.selectedPage = response.data.pagination.currentPage;
                this.loadingAssets = false;
                this.initializedAssets = true;
                this.isSearching = false;
            });
        },

        search() {
            this.loadingAssets = true;

            this.$axios.post('/admin/media/search', {
                term: this.searchTerm,
                container: this.container.id,
                folder: this.folder.path,
                restrictNavigation: this.restrictNavigation
            }).then((response) => {
                this.isSearching = true;
                this.assets = response.data.assets;
                this.folders = [];
                this.loadingAssets = false;
                this.initializedAssets = true;
            });
        },

        /**
         * When a folder was selected from within listing component.
         */
        folderSelected(path) {
            // Trigger re-loading of assets in the selected folder.
            this.path = path;
            this.selectedPage = 1;

            // Trigger an event so the parent can do something.
            // eg. The asset manager would want to change the browser URL.
            this.$emit('navigated', this.container.id, this.path);
        },

        /**
         * When a container is selected/clicked in the sidebar
         */
        selectContainer(container) {
            // Trigger re-loading of assets in the selected container.
            this.container = this.containers[container];
            this.path = '/';

            // Trigger an event so the parent can do something.
            // eg. The asset manager would want to change the browser URL.
            this.$emit('navigated', this.container.id, this.path);
        },

        /**
         * When an asset has been selected.
         */
        assetSelected(id) {
            // For single asset selections, clicking a different asset will replace the selection.
            if (this.maxFiles === 1 && this.maxFilesReached) {
                this.assetsSelected = [id];
            }

            // Completely prevent additional selections when the limit has been hit.
            if (this.maxFilesReached) {
                return;
            }

            // Don't add the same asset twice.
            if (_.contains(this.assetsSelected, id)) {
                return;
            }

            this.assetsSelected.push(id);

            // For some reason, Vue wasn't reacting to new item.
            // It would show up in the data, but wouldn't adjust the view.
            // Mapping over itself fixes this. ¯\_(ツ)_/¯
            this.assetsSelected = _.map(this.assetsSelected, val => val);
        },

        /**
         * When an asset has been deselected.
         */
        assetDeselected(id) {
            this.assetsSelected = _.without(this.assetsSelected, id);
        },

        /**
         * When an asset has been chosen for editing.
         */
        editAsset(id) {
            if (this.canEdit) {
                this.editedAssetId = id;
            }
        },

        /**
         * Delete the given asset and refresh the browser.
         */
        deleteAsset(ids) {
            ids = Array.isArray(ids) ? ids : [ids];
            let message = ids.length > 1 ? 'The selected items will be deleted' : 'This item will be deleted';
            swal({
                icon: 'warning',
                title: 'Are you sure',
                text: message,
                buttons: {
                    cancel: 'Cancel',
                    confirm: 'Yes I am sure'
                },
            }).then((willDelete) => {
                if (willDelete) {
                    const url = ('/admin/media/delete');
                    this.$axios.delete(url, {params: {ids: ids}}).then((response) => {
                        this.loadAssets();
                        this.assetsSelected = _.difference(this.assetsSelected, ids);
                    });
                }
            });
        },

        /**
         * Close the asset editor.
         */
        closeAssetEditor() {
            this.editedAssetId = null;
        },

        /**
         * When an asset has been saved from the editor.
         */
        assetSaved() {
            this.closeAssetEditor();
            this.loadAssets();
        },

        /**
         * When an asset was deleted from the editor.
         */
        assetDeleted() {
            this.closeAssetEditor();
            this.loadAssets();
        },

        /**
         * When an asset was moved to another folder from the editor.
         */
        assetMoved(folder) {
            this.closeAssetEditor();
            this.folderSelected(folder);
        },

        /**
         * When an asset was double clicked.
         *
         * This event would only ever be called when the browser is used in the context of a
         * fieldtype. When used in the "Assets" section, the double click would be handled
         * from within the asset component and caused the edit dialog to be opened.
         */
        assetDoubleClicked(id) {
            this.assetSelected(id);
            Events.$emit('asset-doubleclicked');
        },

        /**
         * Show the file upload finder window.
         */
        uploadFile() {
            this.$refs.uploader.browse();
        },

        /**
         * When a page was selected in the pagination.
         */
        paginationPageSelected(page) {
            this.selectedPage = page;
            this.loadAssets();
        },

        createFolder() {
            this.showFolderCreator = true;
        },

        folderCreatorClosed() {
            this.showFolderCreator = false;
        },

        folderCreated(path) {
            this.folderSelected(path)
        },

        editFolder(folder) {
            this.editedFolderPath = folder;
        },

        folderEditorClosed() {
            this.editedFolderPath = null;
        },

        folderDeleted(folder) {
            this.loadAssets();
        },

        uploadsUpdated(uploads) {
            this.uploads = uploads;
        },


        /**
         * Set the display mode and remember it in a cookie
         */
        setDisplayMode(mode) {
            this.displayMode = mode;
            // Cookies.set('gigcodes.assets.listing_view_mode', mode);
        },

        assetsDraggedToFolder(folder) {
            const url = ('/admin/assets/move');
            const payload = {
                assets: this.selectedAssets,
                folder: folder,
                container: this.container.id
            };

            this.$axios.post(url, payload).then((response) => {
                this.loadAssets();
                this.selectedAssets = [];
            });
        },

        sortBy(sort) {
            if (this.isSearching) return;

            let sortOrder = 'asc';

            // If the current sort order was clicked again, change the direction.
            if (this.sort === sort) {
                sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            }

            this.sort = sort;
            this.sortOrder = sortOrder;
            this.loadAssets();
        },

    },
    created() {
        Events.$on('close-editor', () => {
            if (this.editorHasChild) {
                return Events.$emit('close-child-editor');
            }

            this.showFolderCreator = false;
            this.editedAssetId = null;
            this.editedFolderPath = null;
        });

        Events.$on('refresh-assets', () => {
            this.loadAssets();
        });

        Events.$on('delete-assets', (ids) => {
            this.deleteAsset(ids);
        })
    },
    beforeUnmount() {
        Events.$off('asset-doubleclicked');
        Events.$off('close-child-editor');
        Events.$off('refresh-assets');
        Events.$off('delete-assets');
        Events.$off('close-editor');
    }

};
</script>
