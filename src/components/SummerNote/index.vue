<template>
    <div id="summernote"></div>
</template>

<script>
    import 'summernote';
    import $ from 'jquery';
    import 'summernote/dist/lang/summernote-zh-CN.js';
    import 'bootstrap/js/modal.js';
    import 'bootstrap/js/dropdown.js';
    import 'bootstrap/js/tooltip.js';
    // import 'bootstrap/dist/css/bootstrap.css';
    import 'font-awesome/css/font-awesome.css';

    export default {
        name: 'SummerNote',
        mounted() {
            $('#summernote').summernote({
                height: 150,                 // set editor height
                minHeight: null,             // set minimum height of editor
                maxHeight: null,             // set maximum height of editor
                focus: true,
                toolbar: [
                    ['insert', ['picture']]
                ]                 // set focus to editable area after initializing summernote
            });
        }
    }
</script>

<!--style scoped>
    @import 'summernote/dist/summernote.css';
    @import 'bootstrap/dist/css/bootstrap.css';
</style-->
