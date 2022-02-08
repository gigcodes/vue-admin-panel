<template>
  <div :class="classes">
    <div>
      <div class="flex items-center justify-between">
        <label class="block text-sm font-medium" :for="id">{{ name }}
          <span class="text-red-500" v-if="required">*</span></label>
        <tooltip class="ml-2" bg="dark" size="md" v-if="tooltip">
          <div class="text-sm text-gray-200">{{ tooltip }}</div>
        </tooltip>
      </div>
      <editor-content :editor="editor" :id="id"/>
    </div>
    <div class="text-xs mt-1" v-if="help">{{ help }}</div>
    <div class="text-xs mt-1 text-green-500" v-if="hasSuccess">{{ hasSuccess }}</div>
    <div class="text-xs mt-1 text-red-500" v-if="hasError">{{ hasError }}</div>
  </div>
</template>

<script>
import {useEditor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {watch} from 'vue'
import FieldType from './fieldtypes/index';

export default {
  name: "Editor",
  components: {
    EditorContent,
  },
  mixins: [FieldType],
  emits: ['update:modelValue'],
  props: {
    modelValue: String,
    default: null
  },
  setup(props, {emit}) {
    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
      ],
      editorProps: {
        attributes: {
          class: 'min-w-full w-full text-gray-500 prose prose-sm lg:prose focus:outline-none'
        }
      },
      onUpdate: (context) => {
        emit('update:modelValue', context)
      }
    })

    watch(() => props.modelValue, value => {
      if (editor.value.getHTML() === value) {
        return
      }
      editor.value.commands.setContent(value);
    })

    return {editor}
  },
}
</script>

<style scoped>

</style>