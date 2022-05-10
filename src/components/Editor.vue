<template>
  <div :class="classes">
    <div>
      <div class="flex items-center justify-between">
        <label class="block text-sm font-medium" :for="id"
        >{{ name }}
          <span v-if="required" class="text-red-500">*</span></label
        >
        <tooltip v-if="tooltip" class="ml-2" bg="dark" size="md">
          <div class="text-sm text-gray-200">{{ tooltip }}</div>
        </tooltip>
      </div>
      <editor-content
          :id="id"
          :editor="editor"
          class="form-input w-full"
      />
      <button
          @click="imageSelector = true"
          style="
                    font-size: inherit;
                    font-family: inherit;
                    color: #000;
                    margin: 0.1rem;
                    border: 1px solid black;
                    border-radius: 0.3rem;
                    padding: 0.1rem 0.4rem;
                    background: white;
                    accent-color: black;
                  "
      >
        Insert Image
      </button>
    </div>
    <selector
        v-if="imageSelector"
        container="main"
        :folder="'/'"
        :restrict-navigation="false"
        :selected="[]"
        view-mode="grid"
        :max-files="1"
        @closed="closeSelector"
        @selected="addImage">
    </selector>
    <div v-if="help" class="text-xs mt-1">{{ help }}</div>
    <div v-if="hasSuccess" class="text-xs mt-1 text-green-500">
      {{ hasSuccess }}
    </div>
    <div v-if="hasError" class="text-xs mt-1 text-red-500">
      {{ hasError }}
    </div>
  </div>
</template>

<script>
import {useEditor, EditorContent} from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import {watch, ref, inject} from "vue";
import FieldType from "./fieldtypes/index";
import Tooltip from "./Tooltip.vue";
import Image from "@tiptap/extension-image";
import Selector from "./assets/Selector.vue";
import {createToaster} from "../plugins/toaster";

export default {
  name: "EditorComponent",
  components: {
    EditorContent,
    Tooltip,
    Selector
  },
  mixins: [FieldType],
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    extensions: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {

    const imageSelector = ref(false);
    const getService = inject('getMediaService')
    const toaster = createToaster();
    const editor = useEditor({
      content: props.modelValue,
      extensions: [StarterKit, Image, ...props.extensions],
      editorProps: {
        attributes: {
          class: "min-w-full w-full text-gray-500 prose sm:prose lg:prose-lg xl:prose-2xl m-5 lg:prose focus:outline-none",
        },
      },
      onUpdate: (context) => {
        emit("update:modelValue", context.editor.getHTML());
      },
    });

    const addImage = (images) => {
      if (images.length) {
        try {
          getService({items: images}).then(response => {
            if (response.data.assets.length === 1) {
              editor.value.chain().focus().setImage({src: response.data.assets[0].toenail}).run();
            }
          })
        } catch (e) {
          toaster.error('Unable to insert image');
        }
      }
      closeSelector();
    }

    const closeSelector = () => {
      imageSelector.value = false
    }

    watch(
        () => props.modelValue,
        (value) => {
          if (editor.value.getHTML() === value) {
            return;
          }
          editor.value.commands.setContent(value);
        }
    );

    return {editor, imageSelector, addImage, closeSelector};
  },
};
</script>

<style>
/* remove outline */
.ProseMirror:focus {
  outline: none;
}
/* set */
.ProseMirror {
  min-height: 100px;
}
</style>
