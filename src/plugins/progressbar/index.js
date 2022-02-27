import {reactive} from 'vue';
import View from './progressbar.vue';
import {defaultOptions, api} from "./progress";
const progress = api(defaultOptions)
const ProgressBar = {
    install: (app, options) => {
        const progressOptions = defaultOptions(options);
        const RADON_LOADING_BAR = reactive({
            percent: 0,
            options: progressOptions
        });

        app.provide('RADON_LOADING_BAR', RADON_LOADING_BAR);
        app.component('vue-progress-bar', View);
        app.config.globalProperties.$progress = api(options);
    }
};
export default ProgressBar
export {progress, ProgressBar}
