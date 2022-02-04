<template>
  <ul class="dropdown-menu px-2">
    <li v-for="action in actions" :class="['mb-1',{'warning':action ==='delete'}]">
      <a :href="item.edit_url" v-if="action === 'edit'">Edit</a>
      <a href="#" v-if="action === 'delete'" @click.prevent="showDeleteModal">Delete</a>
      <a :href="item.edit_password_url" v-if="action === 'update_password'">Change password</a>
      <a :href="item.invoice_pdf" v-if="action === 'invoice_download'">Download PDF</a>
      <a href="javascript:void(0)" v-if="action === 'join'" @click.prevent="copyJoinUrl(item.join_url)">Copy
        Join
        URL</a>
      <a :href="item.registrants_url" v-if="action === 'registrants'">Show Registrants</a>
      <a :href="item.transactions_url" v-if="action === 'transactions'">Show Transactions</a>
    </li>
  </ul>
</template>

<script>
import {copy} from '../../../index';
import {Events} from "../../../index";
import {createToaster} from "../../../index";

export default {
  name: "Actions",
  props: ['item', 'actions'],
  data() {
    return {
      deleteModal: false
    }
  },
  methods: {
    showDeleteModal() {
      Events.$emit('showModal', {
        type: 'delete',
        item: this.item,
      })
    },
    copyJoinUrl(url) {
      copy(url);
      createToaster().success('Url copied to clipboard');
    }
  }
}
</script>
