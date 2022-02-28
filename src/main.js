import { createApp } from 'vue';
import App from './App.vue';

import {ProgressBar} from '../dist/gigcodes-admin.es';

const gigcodes = createApp(App);
gigcodes.use(ProgressBar);
gigcodes.mount('#app');
