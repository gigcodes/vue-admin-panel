<template>
  <editor-content :editor="editor"/>
</template>

<script>
import {useEditor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {watch} from 'vue'

export default {
  name: "Editor",
  components: {
    EditorContent,
  },
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
      if(editor.value.getHTML() === value){
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