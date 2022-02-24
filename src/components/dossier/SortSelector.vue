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
import {BaseIcon} from "../../index";
import {Btn} from "../../index";
import {computed, ref} from "vue";

export default {
  name: 'DossierSortSelector',
  props: ['sortOrder', 'sortData', 'columns'],
  components: {
    BaseIcon,
    Btn
  },
  setup(props, {emit}) {
    const order = ref(props.sortOrder)
    const sort = computed(() => {
      return props.sortData
    })

    const sortLabel = computed(() => {
      let data = _.where(props.columns, {value: sort.value})[0];
      if (data)
        return data.header;
      else
        return undefined;
    })

    const changeSortColumn = (sort) => {
      emit('sort', {
        sort,
        order: order.value
      })
    }
    const changeSortOrder = (order) => {
      emit('sortBy', {
        sort: sort.value,
        order
      })
    }

    return {
      order,
      sort,
      sortLabel,
      changeSortColumn,
      changeSortOrder
    }
  }
};
</script>
