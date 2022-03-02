<template>

    <div class="asset-uploader">
        <input type="file" multiple="multiple" class="hide" ref="nativefilefield">
    </div>

</template>


<script>
require('../../vendor/dmuploader');
export default {


    props: ['domElement', 'container', 'path'],


    data() {
        return {
            uploads: [],
            element: null
        }
    },


    computed: {

        extraData() {
            return {
                container: this.container,
                folder: this.path,
                _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            };
        }

    },


    mounted() {
        this.bindUploader();
    },


    // Using beforeDestroy instead of destroy, since the destroy hook didn't seem to
    // get called at all sometimes when using `npm run production`. Works fine when
    // using `npm run dev`. beforeDestroy works fine in both cases. ¯\_(ツ)_/¯
    beforeDestroy() {
        $(this.domElement).unbind().removeData();
    },


    watch: {

        uploads(uploads) {
            this.$emit('updated', uploads);
        },

        container() {
            this.updateExtraData();
        },

        path() {
            this.updateExtraData();
        }

    },


    methods: {

        /**
         * Open the native file browser
         */
        browse() {
            $(this.$refs.nativefilefield).click();
        },

        /**
         * Bind the uploader plugin to the DOM
         */
        bindUploader() {
            $(this.domElement).dmUploader({
                url: '/admin/media/upload',

                extraData: this.extraData,

                onNewFile: (id, file) => {
                    this.uploads.push({
                        id: id,
                        basename: file.name,
                        extension: file.name.split('.').pop(),
                        percent: 0,
                        errorMessage: null
                    });
                },

                onUploadProgress: (id, percent) => {
                    let upload = _.findWhere(this.uploads, id);
                    upload.percent = percent;
                    this.$emit('progress', upload, this.uploads);
                },

                onUploadSuccess: (id, response) => {
                    this.$emit('upload-complete', response.asset, this.uploads);

                    let index = _.findWhere(this.uploads, id);
                    this.uploads.splice(index, 1);
                },

                onComplete: () => {
                    this.$emit('uploads-complete', this.uploads);
                },

                onUploadError: (id, errMsg, response) => {
                    let upload = _.findWhere(this.uploads, id);
                    if (response.status === 500) {
                        errMsg = response.responseJSON.message;
                    } else if (response.status === 413) {
                        errMsg = "This file exceeds your server's max upload filesize limit.";
                    }
                    upload.errorMessage = errMsg;
                    this.$emit('error', upload, this.uploads);
                }
            });
        },
        /**
         * Update the "extraData" object the plugin will use when uploading.
         */
        updateExtraData() {
            $(this.domElement).data('dmUploader').settings.extraData = this.extraData;
        }

    }


}
</script>

