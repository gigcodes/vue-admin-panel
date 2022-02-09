<template>
  <div class="dossier bg-white shadow-lg rounded-sm border border-slate-200 relative">
    <header class="px-5 py-4 border-b border-slate-100">
      <h2 class="font-semibold text-slate-800">{{ title }}
        <span class="text-slate-400 font-medium float-end">{{ pagination.totalItems }}</span>
      </h2>
    </header>
    <div class="p-3">
      <table :class="[{ 'has-checkboxes': hasCheckboxes }]">
        <thead v-if="hasHeaders">
        <tr>
          <th class="checkbox-col" v-if="hasCheckboxes">
            <div class="flex items-center">
              <label class="inline-flex">
                <span class="sr-only">Select all</span>
                <input class="form-checkbox" type="checkbox" :checked="allItemsChecked"
                       @click="checkAllItems"/>
              </label>
            </div>
          </th>

          <th v-for="column in columns"
              @click="sortBy(column)"
              :class="['column-' + column.value, {'active': isColumnActive(column), 'column-sortable': !isSearching, 'extra-col': column.extra} ]"
              :style="{ width: tableColWidth(column.width) }"
          >
            {{ column.header }}
            <i v-if="isColumnActive(column)"
               :class="sortOrder === 'asc' ? 'icon icon-chevron-up' : 'icon icon-chevron-down' "/>
          </th>
          <th class="column-actions" v-if="hasActions"/>
        </tr>
        </thead>
        <tbody ref="tbody">
        <tr v-for="(item,index) in items">
          <td class="checkbox-col" v-if="hasCheckboxes && !reordering">
            <div class="flex items-center">
              <label class="inline-flex" :for="'checkbox-' + index">
                <span class="sr-only">Select</span>
                <input class="form-checkbox" type="checkbox"
                       @change="toggle(item)"
                       :id="'checkbox-' + index"
                       :checked="item.checked">
              </label>
            </div>
          </td>
          <td v-for="(column,i) in columns" :class="[
                        `cell-${column.value}` + ' text-center', {
                            'extra-col': column.extra,
                            'empty-col': !item[column.value],
                            'first-cell': i === 0
                        }]
                    ">
            <span class="sr-only">{{ column.header }}</span>
            <cell :index="i" :item="item" :value="formatValue(item[column.value])" :column="column"/>
          </td>

          <!-- actions -->
          <td class="column-actions" v-if="hasActions">
            <btn-group type="none" size="none">
              <actions :item="item" :actions="options.partials.actions"/>
            </btn-group>
          </td>
        </tr>
        </tbody>
      </table>
      <modal :open="deleteModal"
             @cancelled="deleteModal = false" @confirmed="deleteItem()">
        <template #header>
          Delete item ?
        </template>
        <template #body>
          On clicking confirm the selected item will be deleted. If you don't wish to do it then please press cancel.
        </template>
      </modal>
      <div v-if="showBulkActions"
           :class="['pl-1 my-2',{ 'bulk-actions': true, 'no-checkboxes': !hasCheckboxes }]">
        <btn @clicked="uncheckAllItems" type="dangerFill">Uncheck All</btn>
        <btn @clicked="call('deleteMultiple')" type="danger" extra-class="ml-2">Delete {{ checkedItems.length }}
          {{ checkedItems.length === 1 ? 'item' : 'items' }}
        </btn>
      </div>
      <div class="p-2 flex justify-center">
        <pagination
            v-if="!isSearching  && pagination && pagination.totalPages > 1"
            :total="pagination.totalPages"
            :current="pagination.currentPage"
            :segments="pagination.segments"
            @selected="paginationPageSelected">
        </pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from "./support/Cell.vue";
import Actions from "./support/Actions.vue";
import _ from 'underscore';
import Pagination from "./pagination/Pagination.vue";
import {Events} from "../../index";
import {Btn} from "../../index";
import {BtnGroup} from "../../index";
import {Modal} from "../../index";

export default {
  name: 'DossierTable',
  components: {
    Cell,
    Actions,
    Pagination,
    Btn,
    Modal,
    BtnGroup
  },

  props: ['options', 'items', 'isSearching', 'hasItems', 'title'],

  data: function () {
    return {
      columns: this.$parent.columns,
      reordering: false,
      sortable: true,
      deleteModal: false,
      selectedItem: null,
    }
  },

  computed: {
    hasCheckboxes: function () {
      return this.options.checkboxes !== false;
    },

    itemsAreChecked: function () {
      return this.checkedItems.length > 0;
    },

    hasHeaders: function () {
      return this.options.headers !== false;
    },

    hasActions: function () {
      return this.options.partials.actions !== undefined
          && this.options.partials.actions !== '';
    },

    showBulkActions() {
      return (this.hasItems && this.hasCheckboxes && this.itemsAreChecked && !this.reordering);
    },


    checkedItems: function () {
      return this.items.filter(function (item) {
        return item.checked;
      }).map(function (item) {
        return item.id;
      });
    },

    allItemsChecked: function () {
      return this.items.length === this.checkedItems.length;
    },

    pagination() {
      return this.$parent.pagination;
    },

    sortOrder() {
      return this.$parent.sortOrderData;
    }
  },

  methods: {
    sortBy: function (col) {
      if (!this.sortable) return;
      if (this.isSearching) return;
      if (!col.sort) return;
      let sort = col.value;
      let sortOrder = 'desc';

      // If the current sort order was clicked again, change the direction.
      if (this.$parent.sortData === sort) {
        sortOrder = (this.$parent.sortOrderData === 'asc') ? 'desc' : 'asc';
      }

      this.$parent.sortBy(sort, sortOrder);
    },
    checkAllItems: function () {
      const status = !this.allItemsChecked;
      _.each(this.items, function (item) {
        item.checked = status;
      });
    },
    uncheckAllItems: function () {
      _.each(this.items, function (item) {
        item.checked = false;
      });
    },
    toggle: function (item) {
      item.checked = !item.checked;
    },
    /**
     * Dynamically call a method on the parent component
     *
     * Eg. `call('foo', 'bar', 'baz')` would be the equivalent
     * of doing `this.$parent.foo('bar', 'baz')`
     */
    call: function (method) {
      const args = Array.prototype.slice.call(arguments, 1);
      this.$parent[method].apply(this, args);
    },
    /**
     * When a page was selected in the pagination.
     */
    paginationPageSelected(page) {
      this.$parent.selectedPage = page;
      this.$parent.getItems();
    },
    isColumnActive(col) {
      if (this.isSearching) return false;

      return col.value === this.$parent.sortData;
    },
    tableColWidth: function (width) {
      if (!width || width === 100) return;
      if (typeof width === 'string' && width.endsWith('px')) return width;
      return `${width}%`;
    },
    formatValue(value) {
      if (value && typeof value === 'object' && !Array.isArray() && value.thumbnail) {
        let html = `<span class="img"><img src="${value.thumbnail}" alt="${value.value}" />`;
        if (value.value) html += `<span>${value.value}</span>`;
        html += `</span>`;
        return html;
      }

      function htmlEntities(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      }

      return Array.isArray(value) ? value.map(v => htmlEntities(v)).join(', ') : htmlEntities(value);
    },
    deleteItem() {
      Events.$emit('deleteItem', this.selectedItem.id)
    }
  },
  created() {
    Events.$on('showModal', (data) => {
      this.deleteModal = true
      this.selectedItem = data.item;
    })
  }
};
</script>


<style lang="scss">
@tailwind preflight;
@tailwind components;
@tailwind utilities;
.dossier-sort-options {
  position: relative;

  @media all and (min-width: 768px) {
    display: none;
  }
}
.dossier {
  table {

    @apply table-auto w-full;
    thead {
      @apply text-xs uppercase text-slate-400 bg-slate-50 rounded-sm;
      tr {
        th {
          @apply p-2 whitespace-nowrap font-semibold;
          & .checkbox-col {
            @apply w-px;
          }
        }
      }
    }

    tbody {
      @apply text-sm divide-y divide-slate-100;
      border-bottom: solid 1px #e0e0e0;
      tr {
        td {
          @apply p-1 px-2 whitespace-nowrap;
          &.column-actions {
            text-align: end;
          }
        }
      }
    }
  }

  ul.dropdown-menu {
    li {
      @apply text-gray-700 block px-4 py-1 text-sm hover:bg-gray-100 hover:text-gray-900 rounded;
      &.warning {
        @apply bg-rose-500 hover:bg-rose-600 text-white;
      }
    }
  }
  @media all and (min-width: 768px) {
    .has-status-icon {
      display: flex;
      align-items: center;

      .status {
        flex-shrink: 0;
        margin-right: 15px;
      }
    }
  }
  .cell-slug {
    color: #777;
    font-family: 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace';
  }
}
</style>