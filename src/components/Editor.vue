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
        </div>
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
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { watch } from "vue";
import FieldType from "./fieldtypes/index";

export default {
    name: "EditorComponent",
    components: {
        EditorContent,
    },
    mixins: [FieldType],
    props: {
        modelValue: {
            type: String,
            default: null,
        },
        extensions:{
            type: Array,
            default: () => []
        }
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const editor = useEditor({
            content: props.modelValue,
            extensions: [StarterKit,...props.extensions],
            editorProps: {
                attributes: {
                    class: "min-w-full w-full text-gray-500 prose prose-sm lg:prose focus:outline-none",
                },
            },
            onUpdate: (context) => {
                emit("update:modelValue", context.editor.getHTML());
            },
        });

        watch(
            () => props.modelValue,
            (value) => {
                if (editor.value.getHTML() === value) {
                    return;
                }
                editor.value.commands.setContent(value);
            }
        );

        return { editor };
    },
};
</script>

<style scoped></style>
