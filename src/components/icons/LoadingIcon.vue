<template>
    <svg
        class="fill-current text-slate-400"
        viewBox="0 0 15 3"
        width="15"
        height="3"
    >
        <circle cx="1.5" cy="1.5" r="1.5">
            <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.1"
            ></animate>
        </circle>
        <circle cx="7.5" cy="1.5" r="1.5">
            <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.2"
            ></animate>
        </circle>
        <circle cx="13.5" cy="1.5" r="1.5">
            <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.3"
            ></animate>
        </circle>
    </svg>
</template>

<script>
import mixin from "./index";

export default {
    name: "LoadingIcon",
    mixins: [mixin],
};
</script>
