<template>

    <div class="asset-upload-listing">
        <div class="asset-upload-listing-header">
            <h6>Upload</h6>
        </div>
        <table>
            <tbody>
            <tr is="upload"
                v-for="(upload,i) in uploads"
                :basename="upload.basename"
                :key="i"
                :extension="upload.extension"
                :percent="upload.percent"
                :error="upload.errorMessage"
                @clear="clearUpload(i)">
            </tr>
            </tbody>
        </table>
    </div>

</template>


<script>
    import Upload from "./Upload.vue";

    export default {

        props: ['uploads'],


        components: {
            Upload
        },


        methods: {

            clearUpload(i) {
                this.uploads.splice(i, 1);
            }

        }

    }
</script>
