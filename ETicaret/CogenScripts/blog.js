$(function () {
    $('#cIcerik').summernote({
        height: 300,
        minHeight: null,
        maxHeight: null,
        focus: false,
        lang: 'tr-TR',
        placeholder: 'Lütfen içerik girin ...',
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']]
        ]
    });
});