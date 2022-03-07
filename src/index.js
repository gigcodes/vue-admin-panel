//components
import {default as Tooltip} from "./components/Tooltip.vue";
import {default as Btn} from "./components/buttons/Button.vue";
import {default as BtnGroup} from "./components/buttons/ButtonGroup.vue";
import {default as DossierTable} from "./components/dossier/DossierTable.vue";
import {default as DossierSortSelector} from "./components/dossier/SortSelector.vue";
import {default as DossierSearch} from "./components/dossier/DossierSearch.vue";
import {default as Modal} from "./components/modal/Modal.vue";
import {default as BaseIcon} from "./components/BaseIcon.vue";
import {default as Editor} from "./components/Editor.vue";
import {default as PublishButton} from "./components/buttons/PublishButton.vue";
import {default as LoadingGraphic} from "./components/LoadingGraphic.vue";
import {default as PageTree} from "./components/structures/PageTree.vue";

const dev = import.meta.env.DEV;
window.cloneItem = function (value) {
    if (value === undefined) return undefined;

    return JSON.parse(JSON.stringify(value));
};

window.Cookies = require('cookies-js');

window.dd = function (args) {
    if (dev) console.log(args);
    return "";
};

//fieldTypes
import {default as TextField} from "./components/fieldtypes/TextFieldtype.vue";
import {default as TextAreaField} from "./components/fieldtypes/TextAreaFieldtype.vue";
import {default as SelectField} from "./components/fieldtypes/SelectFieldtype.vue";
import {default as ToggleField} from "./components/fieldtypes/ToggleFieldtype.vue";
import {default as DateField} from "./components/fieldtypes/DateFieldtype.vue";

//plugins
import {default as Toaster, createToaster} from "./plugins/toaster";
import {default as ProgressBar, progress} from "./plugins/progressbar";
import {default as copy} from "./plugins/copyt-to-clipboard";
import {default as RouteMiddleware} from "./plugins/route-middleware";
import slugify from "./plugins/slugify";
import {
    mixin as CAMixin,
    plugin as CAPlugin,
    directive as CADirective,
} from "./plugins/click-away";
import {default as Events} from "./modules/events";
import Validators from "./modules/Validators";
import formValidators from "./modules/useFormValidation";
import "./plugins/mousetrap/mousetrap";
import "flatpickr/dist/flatpickr.min.css";
import "./sass/index.scss";

import {default as hasErrorMixin} from "./mixins/hasError";

const mousetrap = window.Mousetrap;

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
    DossierSearch,
    PublishButton,
    LoadingGraphic,
    PageTree,
};

const GigcodesAdmin = {
    install(Vue) {
        for (const prop in components) {
            if (Object.prototype.hasOwnProperty.call(components, prop)) {
                const component = components[prop];
                Vue.component(component.name, component);
            }
        }
    },
};

mousetrap.bind(
    ["/", "mod+k"],
    () => {
        Events.$emit("openSearch");
    },
    "keyup"
);

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
    CAMixin,
    CAPlugin,
    CADirective,
    Events,
    Validators,
    formValidators,
    Editor,
    hasErrorMixin,
    mousetrap,
    slugify,
    ProgressBar,
    progress,
    GigcodesAdmin,
};

export default GigcodesAdmin;
