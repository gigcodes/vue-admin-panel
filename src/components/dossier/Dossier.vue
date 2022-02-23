<script>

import Paginates from './support/Paginates';
import _ from 'underscore';
import Events from "../../modules/events";
import {createToaster} from '../../index'

export default {
  mixins: [Paginates],
  name: 'Dossier',
  props: ['collection'],
  data: function () {
    return {
      loading: true,
      items: [],
      columns: [],
      reordering: false,
      searchTerm: null,
      tableOptions: []
    }
  },

  computed: {
    toaster() {
      return createToaster();
    },
    hasItems: function () {
      return !this.loading && this.items && this.items.length;
    },

    noItems: function () {
      return !this.loading && this.items && !this.items.length;
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

    isSearching() {
      if (this.searchTerm) {
        return this.searchTerm.length >= 3;
      } else {
        return false;
      }
    },

    getParameters() {
      return {
        sort: this.sortData,
        order: this.sortOrderData,
        page: this.selectedPage
      };
    },

  },

  mounted: function () {
    this.getItems();
  },

  watch: {

    searchTerm(term) {
      if (term.length >= 3) {
        this.performSearch();
      } else {
        this.getItems();
      }
    }
  },
  methods: {
    getService(parameters) {
      return null;
    },
    deleteService(params) {
      return null
    },
    getItems() {
      const results = this.getService(this.getParameters)
      if (results) {
        results.then(response => {
          this.items = response.data.items;
          this.columns = this.parseColumns(response.data.columns);
          this.loading = false;
          this.pagination = response.data.pagination;
        }).catch((error) => {
          dd(error);
          this.toaster.error('Error Fetching Data');
        });
      } else {
        dd('Get service not registered')
      }
    },

    performSearch() {
      const results = this.getService({
        q: this.searchTerm,
      })
      if (results) {
        results.then(response => {
          this.items = response.data.items;
          this.columns = this.parseColumns(response.data.columns);
          this.loading = false;
          this.pagination = response.data.pagination;
        }).catch(() => {
          this.toaster.error('Error Fetching Data');
        });
      } else {
        dd('Get service not registered')
      }
    },

    sortBy(sort, order) {
      this.sortData = sort;
      this.tableOptions.sort = sort;
      this.tableOptions.sortOrder = order;
      this.sortOrderData = order;
      this.getItems();
    },

    removeItemFromList: function (id) {
      const item = _.findWhere(this.items, {id: id});
      const index = _.indexOf(this.items, item);
      this.items.splice(index, 1);
    },

    deleteMultiple() {
      const self = this;

      this.deleteModal = true;

      swal({
        icon: 'warning',
        title: 'Are you sure',
        text: 'Confirm delete items',
        confirmButtonText: 'Yes I am sure',
        cancelButtonText: 'Cancel',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {

          if (this.deleteService({ids: self.checkedItems})) {
            this.deleteService({ids: self.checkedItems}).then(response => {
              _.each(self.checkedItems, function (id) {
                self.removeItemFromList(id);
              });
              this.toaster.show(response.data.message)
            }).catch(error => {
              this.toaster.error(error.response.data.message);
            });
          } else {
            this.toaster.error('Delete service is not setup')
          }
        } else {
          this.toaster.show('Delete cancelled');
        }
      });
    },
    deleteItem(id) {
      try {
        this.deleteService(id).then((response) => {
          this.removeItemFromList(id);
          this.toaster.show(response.data.message);
        }).catch((error) => {
          console.log(error);
          this.toaster.error(error.response.data.message);
        });
      } catch (e) {
        console.log(e);
        this.toaster.error("Delete service is not setup");
      }
    },
    parseColumns(columns) {
      // If a link column hasn't been explicitly defined, we'll make the first column the link.
      const linkColumnUndefined = _.findWhere(columns, {link: true}) === undefined;

      return _.map(columns, function (column, i) {
        if (typeof column === 'string') {
          column = {value: column};
        }

        let sort, custom_link;
        //for sorting
        if (column.sort === undefined)
          sort = true;
        else
          sort = column.sort;
        //for custom link
        if (column.custom_link === undefined) {
          custom_link = false
        } else {
          custom_link = column.custom_link
        }


        return {
          value: column.value,
          header: column.header,
          extra: column.extra,
          width: column.width,
          sort: sort,
          link: column.link || (linkColumnUndefined && i === 0),
          custom_link: custom_link,
        };
      });
    },
  },
  created() {
    Events.$on('deleteItem', (data) => {
      this.deleteItem(data);
      Events.$off('deleteItem');
    })
  },
};
</script>
