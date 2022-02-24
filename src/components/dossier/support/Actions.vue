<template>
    <ul class="dropdown-menu px-2">
        <li v-for="action in actions" :class="['mb-1',{'warning':action ==='delete'}]">
            <a href="#" @click.prevent="goTo(item.edit_url)" v-if="action === 'edit'">Edit</a>
            <a href="#" v-if="action === 'delete'" @click.prevent="showDeleteModal">Delete</a>
            <a @click.prevent="goTo(item.edit_password_url)" href="#" v-if="action === 'update_password'">Change
                password</a>
            <a @click.prevent="goTo(item.invoice_pdf)" href="#" v-if="action === 'invoice_download'">Download PDF</a>
            <a href="javascript:void(0)" v-if="action === 'join'" @click.prevent="copyJoinUrl(item.join_url)">Copy
                Join URL</a>
            <a @click.prevent="goTo(item.registrants_url)" href="#" v-if="action === 'registrants'">Show Registrants</a>
            <a @click.prevent="goTo(item.transactions_url)" href="#" v-if="action === 'transactions'">Show
                Transactions</a>
        </li>
    </ul>
</template>

<script>
import {createToaster, Events, copy} from "../../../index";
import {ref} from "vue";

export default {
    name: "Actions",
    props: ['item', 'actions'],
    setup() {
        const deleteModal = ref(false);
        const goTo = url => {
            Events.$emit('goTo', url)
        }
        const showDeleteModal = () => {
            Events.$emit('showModal', {
                type: 'delete',
                item: this.item,
            })
        }
        const copyJoinUrl = (url) => {
            copy(url);
            createToaster().success('Url copied to clipboard');
        }

        return {
            goTo,
            showDeleteModal,
            copyJoinUrl,
            deleteModal
        }
    }
}
</script>
