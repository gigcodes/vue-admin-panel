module.exports = {
    env: {
        node: true,
    },
    extends: ["eslint:recommended", "plugin:vue/vue3-strongly-recommended", "prettier"],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
        'vue/multi-word-component-names' : "off",
        'vue/no-deprecated-slot-scope-attribute' : "off"
    },
};
