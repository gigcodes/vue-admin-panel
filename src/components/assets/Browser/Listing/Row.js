import { Events, CAMixin } from "../../../../index";

export default {
    mixins: [CAMixin],

    data() {
        return {
            showActionsDropdown: false,
        };
    },

    mounted() {
        Events.$on("close-dropdown", (reference) => {
            if (this === reference) {
                return;
            }
            this.showActionsDropdown = false;
        });
    },

    methods: {
        toggleActions() {
            this.$emit("open-dropdown", this);

            this.showActionsDropdown = !this.showActionsDropdown;
        },

        away() {
            this.showActionsDropdown = false;
        },
    },
};
