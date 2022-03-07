<template>
    <ul class="dropdown-menu px-2">
        <li
            v-for="(action,index) in actions" :key="index"
            :class="['mb-1', { warning: action === 'delete' }]"
        >
            <a
                v-if="action === 'edit'"
                href="#"
                @click.prevent="goTo(item.edit_url)"
            >Edit</a
            >
            <a
                v-if="action === 'delete'"
                href="#"
                @click.prevent="showDeleteModal"
            >Delete</a
            >
            <a
                v-if="action === 'update_password'"
                href="#"
                @click.prevent="goTo(item.edit_password_url)"
            >Change password</a
            >
            <a
                v-if="action === 'invoice_download'"
                href="#"
                @click.prevent="goTo(item.invoice_pdf)"
            >Download PDF</a
            >
            <a
                v-if="action === 'join'"
                href="javascript:void(0)"
                @click.prevent="copyJoinUrl(item.join_url)"
            >Copy Join URL</a
            >
            <a
                v-if="action === 'registrants'"
                href="#"
                @click.prevent="goTo(item.registrants_url)"
            >Show Registrants</a
            >
            <a
                v-if="action === 'transactions'"
                href="#"
                @click.prevent="goTo(item.transactions_url)"
            >Show Transactions</a
            >
        </li>
    </ul>
</template>

<script>
import {createToaster, Events, copy} from "../../../index";
import {ref} from "vue";

export default {
    name: "Actions",
    props: {
        item: {
            type:Object,
            default:() => ({})
        },
        actions: {
            type:Object,
            default:() => ({})
        }
    },
    setup(props) {
        const deleteModal = ref(false);
        const goTo = (url) => {
            Events.$emit("goTo", url);
        };
        const showDeleteModal = () => {
            Events.$emit("showModal", {
                type: "delete",
                item: props.item,
            });
        };
        const copyJoinUrl = (url) => {
            copy(url);
            createToaster().success("Url copied to clipboard");
        };

        return {
            goTo,
            showDeleteModal,
            copyJoinUrl,
            deleteModal,
        };
    },
};
</script>
