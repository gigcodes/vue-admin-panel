/* eslint-disable import/prefer-default-export */


//components
export {default as Tooltip} from './components/Tooltip.vue';
export {default as Btn} from './components/buttons/Button.vue';
export {default as BtnGroup} from './components/buttons/ButtonGroup.vue';
export {default as DossierTable} from './components/dossier/DossierTable.vue';
export {default as DossierSortSelector} from './components/dossier/SortSelector.vue';
export {default as Modal} from './components/modal/Modal.vue';
export {default as BaseIcon} from './components/BaseIcon.vue';


//fieldtypes
export {default as TextField} from './components/fieldtypes/TextFieldtype.vue';
export {default as TextAreaField} from './components/fieldtypes/TextAreaFieldtype.vue';
export {default as SelectField} from './components/fieldtypes/SelectFieldtype.vue';
export {default as ToggleField} from './components/fieldtypes/ToggleFieldtype.vue';


//plugins
export {default as Toaster, createToaster} from './plugins/toaster';
export {default as copy} from './plugins/copyt-to-clipboard';
export {default as Middleware} from './plugins/route-middleware';
export {default as Dossier} from './components/dossier/Dossier.vue';
export {mixin as CAMixin, plugin as CAPlugin, directive as CADirective} from './plugins/click-away';
export {default as Events} from './modules/events'