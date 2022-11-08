$(function () {
    $('.btn-sil').click(function () {
        swal({
            title: "Uyarı",
            text: "Kayıtı silmek istediğinize emin misiniz?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Evet",
            cancelButtonText: "Hayır",
        }).then((result) => {
            if (result.value) {
                window.location.href = $(this).data('url');
            }
        });
    });
});