import {onMounted, ref, computed} from "vue";
import {Events} from '../index'

const collection = ref('gigcodes')
const loading = ref(false);
const saving = ref(false);
const publishType = ref('save');
const allowSaveAndAddAnother = ref(true);

const saveBehaviorScope = computed(() => `gigcodes.publish.${collection.value}.type`)

const getInitialPublishType = () => {
    let type = localStorage.getItem(saveBehaviorScope.value) || 'save';
    if (!allowSaveAndAddAnother.value && type === 'another') {
        type = 'save';
    }
    return type;
}

const publishWithoutContinuing = () => {
    publishType.value = 'save';
    saving.value = true;
    loading.value = true;
    localStorage.setItem(saveBehaviorScope.value, 'save');
    Events.$emit('publish')
}

const publishAndContinue = () => {
    publishType.value = 'continue';
    saving.value = true;
    loading.value = true;
    localStorage.setItem(saveBehaviorScope.value, 'continue');
    Events.$emit('publish')
}

const publishAndAnother = () => {
    publishType.value = 'another';
    saving.value = true;
    loading.value = true;
    localStorage.setItem(saveBehaviorScope.value, 'another');
    Events.$emit('publish')
}

onMounted(() => {
    publishType.value = getInitialPublishType();
})

export default {
    loading,
    saving,
    publishType,
    allowSaveAndAddAnother,
    publish,
    saveBehaviorScope,
    publishWithoutContinuing,
    publishAndContinue,
    publishAndAnother
}
