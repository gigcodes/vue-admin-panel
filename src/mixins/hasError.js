import {ref} from "vue";

const errors = ref({});
const checkError = (field) => {
    if (errors[field]) {
        return errors[field]
    } else {
        return false;
    }
}
export default {
    errors,
    checkError
}