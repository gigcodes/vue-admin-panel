//components
import {default as Tooltip} from './components/Tooltip.vue';
import {default as Btn} from './components/buttons/Button.vue';
import {default as BtnGroup} from './components/buttons/ButtonGroup.vue';
import {default as DossierTable} from './components/dossier/DossierTable.vue';
import {default as DossierSortSelector} from './components/dossier/SortSelector.vue';
import {default as Modal} from './components/modal/Modal.vue';
import {default as BaseIcon} from './components/BaseIcon.vue';
import {default as Editor} from './components/Editor.vue';

//fieldtypes
import {default as TextField} from './components/fieldtypes/TextFieldtype.vue';
import {default as TextAreaField} from './components/fieldtypes/TextAreaFieldtype.vue';
import {default as SelectField} from './components/fieldtypes/SelectFieldtype.vue';
import {default as ToggleField} from './components/fieldtypes/ToggleFieldtype.vue';
import {default as DateField} from './components/fieldtypes/DateFieldtype.vue';


//plugins
import {default as Toaster, createToaster} from './plugins/toaster';
import {default as copy} from './plugins/copyt-to-clipboard';
import {default as RouteMiddleware} from './plugins/route-middleware';
import {default as Dossier} from './components/dossier/Dossier.vue';
import {mixin as CAMixin, plugin as CAPlugin, directive as CADirective} from './plugins/click-away';
import {default as Events} from './modules/events'
import Validators from './modules/Validators';
import formValidators from './modules/useFormValidation';
const slugify = require('./plugins/slugify');
import 'flatpickr/dist/flatpickr.min.css';
import './sass/index.scss';

const components = {
    Tooltip,
    Btn,
    BtnGroup,
    DossierTable,
    DossierSortSelector,
    Modal,
    BaseIcon,
    TextField,
    TextAreaField,
    SelectField,
    ToggleField,
    DateField,
}


const GigcodesAdmin = {
    install(Vue) {
        for (const prop in components) {
            if (components.hasOwnProperty(prop)) {
                const component = components[prop];
                Vue.component(component.name, component)
            }
        }
    }
}

export {
    Tooltip,
    Btn,
    BtnGroup,
    DossierTable,
    DossierSortSelector,
    Modal,
    BaseIcon,
    TextField,
    TextAreaField,
    SelectField,
    ToggleField,
    DateField,
    Toaster,
    createToaster,
    copy,
    RouteMiddleware,
    Dossier,
    CAMixin,
    CAPlugin,
    CADirective,
    Events,
    Validators,
    formValidators,
    Editor,
    slugify
}

export default GigcodesAdmin