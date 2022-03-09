<template>
  <tr
      :class="{ selected: isSelected }"
      @click="toggle"
      @dblclick="doubleClicked"
  >
    <td class="thumbnail-col" @dragstart="assetDragStart">
      <div
          v-if="canShowSvg"
          class="img svg-img"
          :style="svgBackgroundStyle"
      ></div>
      <div v-else class="img">
        <img v-if="asset.is_image" :src="asset.thumbnail"/>
        <file-icon v-else :extension="asset.extension"/>
      </div>
    </td>

    <td class="title-col">{{ asset.basename }}</td>
    <td class="size-col extra-col">{{ asset.size_formatted }}</td>
    <td class="modifed-col extra-col">
      {{ asset.last_modified_formatted }}
    </td>

    <td class="column-actions">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
              class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Options <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </MenuButton>
        </div>

        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems
              class="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <MenuItem v-slot="{ active }" v-if="canEdit">
                <a
                    href="#" @click="closeDropdownAndEditAsset"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
              </MenuItem>
              <MenuItem v-slot="{ active }" @click.prevent="closeDropdownAndDeleteAsset">
                <a
                    href="#"
                    :class="[active ? 'bg-rose-600 text-white' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete</a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </td>
  </tr>
</template>

<script>
import Asset from "./Asset";
import Row from "./Row";
import FileIcon from "../../../FileIcon.vue";
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

export default {
  components: {
    FileIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
  },
  mixins: [Asset, Row],

  methods: {
    closeDropdownAndEditAsset() {
      this.showActionsDropdown = false;
      this.editAsset();
    },

    closeDropdownAndDeleteAsset() {
      this.showActionsDropdown = false;
      this.deleteAsset();
    },
  },
};
</script>
