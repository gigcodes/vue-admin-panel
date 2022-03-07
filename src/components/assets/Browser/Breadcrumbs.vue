<template>
    <div class="breadcrumbs">
        <a
v-for="(part, i) in pathParts" :key="i" href=""
           @click.prevent="selectFolder(i)">
            <span class="icon icon-folder"></span>
            {{ part }}
        </a>
    </div>
</template>

<script>
export default {
    props: {
        path: {
            type: String,
            default: null,
        }
    },
    emits: ["navigated"],
    computed: {
        pathParts() {
            let parts = ["/"];

            if (this.path === "/") {
                return parts;
            }

            return parts.concat(this.path.split("/"));
        },
    },

    methods: {
        selectFolder(part) {
            const path =
                part === 0 ? "/" : this.pathParts.slice(1, part + 1).join("/");

            this.$emit("navigated", path);
        },
    },
};
</script>
