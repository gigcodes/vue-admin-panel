import {createApp} from "vue";
import App from "./App.vue";
import {GigcodesAdmin} from './index';

import './index.css'
import './sass/index.scss'

const gigcodes = createApp(App);

gigcodes.use(GigcodesAdmin);

gigcodes.mount('#app')