<template>
    <div class="asset-manager">
        <asset-browser
            :selected-container="container"
            :selected-path="activePath"
            :selected-assets="selectedAssets"
            @navigated="navigate"
            @selections-updated="updateSelections">
            <template slot="contextual-actions" v-if="selectedAssets.length">
                <button class="btn btn-danger ml-16 mr-2 mb-3" @click="deleteSelected">Delete</button>
                <div class="btn-group mb-3">
                    <button class="btn" @click="selectedAssets = []">Uncheck all</button>
                    <button class="btn" @click="openAssetMover">Move</button>
                </div>
            </template>
        </asset-browser>
        <mover
            v-if="showAssetMover"
            :assets="selectedAssets"
            :container="container"
            :folder="activePath"
            @saved="assetsMoved"
            @closed="closeAssetMover">
        </mover>
    </div>

</template>

<script>
import {Events} from "../../index";
import Mover from "./Mover.vue";

export default {
    name: 'AssetManager',
    props: ['container', 'path'],
    components: {Mover},
    data() {
        return {
            selectedAssets: [],
            showAssetMover: false,
            activePath: this.path,
        }
    },

    mounted() {
        this.bindBrowserNavigation();
    },

    methods: {

        /**
         * Bind browser navigation features
         *
         * This will initialize the state for using the history API to allow
         * navigation back and forth through folders using browser buttons.
         */
        bindBrowserNavigation() {
            window.history.replaceState(
                {
                    container: this.container,
                    path: this.activePath
                }, '');
            window.onpopstate = (e) => {
                this.container = e.state.container;
                this.activePath = e.state.path;
            };
        },

        /**
         * Push a new state onto the browser's history
         */
        pushState() {
            let url = ('/admin/media/browse/' + this.container);

            if (this.activePath !== '/') {
                url += '/' + this.activePath;
            }
            window.history.pushState({
                container: this.container, path: this.activePath
            }, '', url);
        },

        /**
         * When a admin has navigated to another folder or container
         */
        navigate(container, path) {
            this.container = container;
            this.activePath = path;
            this.pushState();

            // Clear out any selections. It would be confusing to navigate to a different
            // folder and/or container, perform an action, and discover you performed
            // it on an asset that was still selected, but no longer visible.
            this.selectedAssets = [];
        },

        /**
         * When selections are changed, we need them reflected here.
         */
        updateSelections(selections) {
            this.selectedAssets = selections;
        },

        openAssetMover() {
            this.showAssetMover = true;
        },

        deleteSelected() {
            Events.$emit('delete-assets', this.selectedAssets);
        },

        closeAssetMover() {
            this.showAssetMover = false;
        },

        assetsMoved(folder) {
            this.closeAssetMover();
            this.navigate(this.container, folder);
        }
    },
    beforeUnmount() {
        Events.$off('delete-assets');
    }

}
</script>
