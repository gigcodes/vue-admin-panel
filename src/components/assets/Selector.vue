<template>
  <div class="asset-selector-modal">
    <div class="asset-selector">
      <asset-browser
          :selected-container="container"
          :selected-path="folder"
          :selected-assets="browserSelections"
          :restrict-navigation="restrictNavigation"
          :max-files="maxFiles"
          @selections-updated="selectionsUpdated"
          @asset-doubleclicked="select"
      >
        <template v-if="browserSelections.length" #contextual-actions>
          <button
              class="btn action mb-3"
              @click="browserSelections = []"
          >
            Uncheck all
          </button>
        </template>
      </asset-browser>
      <div class="modal-footer">
        <div v-if="browserSelections.length" class="left">
          {{
            browserSelections.length
          }}<span v-if="maxFiles">/{{ maxFiles }}</span> Selected
        </div>
        <button type="button" class="btn" @click="close">Cancel</button>
        <button type="button" class="btn btn-primary" @click="select">
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {default as AssetBrowser} from "./Browser/Browser.vue";

export default {
  emits: ["modal.open", "selected", "closed"],
  components: {
    AssetBrowser
  },
  props: {
    container: {
      type: String,
      default: null
    },
    folder: {
      type: String,
      default: null
    },
    selected: {
      type: Array,
      default: () => ([])
    },
    maxFiles: {
      type: Number,
      default: null
    },
    restrictNavigation: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // We will initialize the browser component with the selections, but not pass in the selections directly.
      // We only want selection changes to be reflected in the fieldtype once the admin is ready to commit
      // them. They should be able to cancel at any time and have their updated selections discarded.
      browserSelections: this.selected,
    };
  },

  mounted() {
    this.$emit("modal.open");
  },

  methods: {
    /**
     * Confirm the updated selections
     */
    select: function () {
      this.$emit("selected", this.browserSelections);
      this.close();
    },

    /**
     * Close this selector
     */
    close() {
      this.$emit("closed");
    },

    /**
     * Selections have been updated within the browser component.
     */
    selectionsUpdated(selections) {
      this.browserSelections = selections;
    },
  },
};
</script>
