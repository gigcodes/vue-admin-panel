<template>
  <div class="dossier-sort-options">
    <btn>
      <base-icon name="list"/>
      {{ sortLabel }}
    </btn>
    <ul class="dropdown-menu">
      <li v-for="column in columns">
        <a href="" @click.prevent="changeSortColumn(column.field)">
          {{ column.header }}
          <span class="icon icon-check pull-right mr-0" v-if="sort === column.field"></span>
        </a>
      </li>
      <li class="divider"></li>
      <li><a href="" @click.prevent="changeSortOrder('asc')">
        Ascending
        <span class="icon icon-check pull-right mr-0" v-if="order === 'asc'"></span>
      </a></li>
      <li><a href="" @click.prevent="changeSortOrder('desc')">
        Descending
        <span class="icon icon-check pull-right mr-0" v-if="order === 'desc'"></span>
      </a></li>
    </ul>
  </div>

</template>


<script>
import _ from 'underscore';
import BaseIcon from "../BaseIcon";
import {Btn} from "../../bootstrap/components";

export default {
  props: ['sortOrder', 'sortData', 'columns'],
  components: {
    BaseIcon,
    Btn
  },

  data() {
    return {
      order: this.sortOrder
    }
  },
  computed: {

    sort() {
      return this.sortData
    },

    sortLabel() {
      let data = _.where(this.columns, {value: this.sort})[0];
      if (data)
        return data.header;
      else
        return undefined;
    }

  },

  methods: {

    changeSortColumn(sort) {
      this.$emit('sort', {
        sort,
        order: this.order
      })
    },

    changeSortOrder(order) {
      this.$emit('sortBy', {
        sort,
        order
      })
    }
  }
};
</script>
