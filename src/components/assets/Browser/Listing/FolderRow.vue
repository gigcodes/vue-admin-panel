<template>
  <tr @drop="drop">
    <td>
      <div class="img">
        <a href="" @click.prevent="selectFolder(folder.path)">
          <file-icon extension="folder"></file-icon>
        </a>
      </div>
    </td>

    <td>
      <a @click="selectFolder(folder.path)">
        {{ folder.title }}
      </a>
    </td>

    <td colspan="2" class="extra-col"></td>

    <td class="column-actions">
      <div
          v-click-away="away"
          class="btn-group action-more"
          :class="{ show: showActionsDropdown }"
      >
        <button
            type="button"
            class="btn-more dropdown-toggle"
            aria-haspopup="true"
            :aria-expanded="showActionsDropdown"
            @click="toggleActions"
        >
          <i class="icon icon-dots-three-vertical"></i>
        </button>

        <ul class="dropdown-menu" :class="{ show: showActionsDropdown }">
          <li>
            <a class="dropdown-item" href="" @click.prevent="editFolder"> Edit </a>
          </li>

          <li class="divider"></li>

          <li class="warning">
            <a class="dropdown-item" href="#" @click.prevent="deleteFolder"> Delete </a>
          </li>
        </ul>
      </div>
    </td>
  </tr>
</template>

<script>
import Folder from "./Folder";
import Row from "./Row";
import FileIcon from "../../../FileIcon.vue";
import {mixin as clickaway} from "../../../../plugins/click-away";

export default {
  emits: ["selected", "editing", "deleting", "dropped-on-folder", "close-dropdown", "open-dropdown"],
  mixins: [Folder, Row, clickaway],
  components: {FileIcon}

};
</script>

<style>
.dropdown-menu {
  right: 10px;
}
</style>
