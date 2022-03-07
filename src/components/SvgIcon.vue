<template>
    <div
        :class="[
            'svg-icon',
            { 'using-div': type === 'div', 'using-svg': type === 'svg' },
        ]"
        v-html="html"
    ></div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: "svg"
        },
    },

    computed: {
        html() {
            if (this.type === "div") {
                return `<div style="background-image: url('${
                    "../svg/" + this.name + ".svg"
                }')"></div>`;
            }
            return require(`!!html-loader!./../svg/${this.name}.svg`);
        },
    },
};
</script>
