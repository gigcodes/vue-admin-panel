import SortableKeyValue from './SortableKeyValue.js';
import _ from "underscore"
export default {
    methods: {
        newSortableValue(value=null, key=null) {
            return new SortableKeyValue(key, value);
        },

        objectToSortable(obj) {
            return _.map(window.cloneItem(obj), (value, key) => new SortableKeyValue(key, value));
        },

        arrayToSortable(arr) {
            return _.map(window.cloneItem(arr), value => new SortableKeyValue(null, value));
        },

        sortableToObject(sortable) {
            let obj = {};

            _.each(sortable, sortableKeyValue => obj[sortableKeyValue.key] = sortableKeyValue.value);

            return obj;
        },

        sortableToArray(sortable) {
            let arr = [];

            _.each(sortable, sortableKeyValue => arr.push(sortableKeyValue.value));

            return arr;
        }
    }
}
