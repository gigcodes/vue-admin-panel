<template>
    <tr>
        <td class="column-status" :class="status">
            <span v-if="status === 'error'" class="icon icon-warning error"/>
            <span v-else class="icon icon-circular-graph animation-spin"/>
        </td>
        <td class="column-thumbnail">
            <div class="img">
                <file-icon :extension="extension"/>
            </div>
        </td>

        <td class="column-filename">
            <span class="filename">{{ basename }}</span>
        </td>

        <td v-if="status !== 'error'" class="column-progress">
            <div class="progress">
                <div
                    class="progress-bar"
                    :style="{ width: percent + '%' }"
                ></div>
            </div>
        </td>

        <td v-else class="column-error">{{ error }}</td>
        <td style="width: 30px">
            <a v-if="status === 'error'" href="#" @click.prevent="clear">
                <i class="icon icon-circle-with-cross"/>
            </a>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        extension: {
            type: String,
            default: null,
        },
        basename: {
            type: String,
            default: null,
        },
        percent: {
            type: Number,
            default: null,
        },
        error: {
            type: String,
            default: null,
        }
    },
    emits: ["clear"],
    computed: {
        status() {
            if (this.error) {
                return "error";
            } else if (this.percent === 100) {
                return "pending";
            } else {
                return "uploading";
            }
        },
    },

    methods: {
        clear() {
            this.$emit("clear");
        },
    },
};
</script>
