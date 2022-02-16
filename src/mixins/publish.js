import {onMounted, ref, computed} from "vue";


const collection = ref('gigcodes')
const loading = ref(false);
const saving = ref(false);
const publishType = ref('save');
const allowSaveAndAddAnother = ref(true);
const publish = () => {

}

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
    publish();
}

const publishAndContinue = () => {
    publishType.value = 'continue';
    saving.value = true;
    loading.value = true;
    localStorage.setItem(saveBehaviorScope.value, 'continue');
    publish();
}

const publishAndAnother = () => {
    publishType.value = 'another';
    saving.value = true;
    loading.value = true;
    localStorage.setItem(saveBehaviorScope.value, 'another');
    publish();
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
