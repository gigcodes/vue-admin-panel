import {reactive} from 'vue';
import View from './progressbar.vue';

import {api as progress, defaultOptions} from './progress';

// eslint-disable-next-line no-unused-vars
const ProgressBar = {
    install: (app, options) => {
        const RADON_LOADING_BAR = reactive({
            percent: 0,
            options: defaultOptions(options)
        });
        app.provide('RADON_LOADING_BAR', RADON_LOADING_BAR);
        app.component('vue-progress-bar', View);
        app.config.globalProperties.$progress = progress(options);
    }
}

export default ProgressBar;

export {progress, ProgressBar}
