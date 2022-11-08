$(function () {

    $("#urunKategoriEkleModal #btnEkleUrunKategori").click(function () {
        $("#urunKategoriEkleModal #cAdiModalValidation").displayNone();
        $("#urunKategoriEkleModal #alert-1").displayNone();

        if ($.trim($('#urunKategoriEkleModal #cAdiModal').val()) == "") {
            $("#urunKategoriEkleModal #cAdiModalValidation").text("Lütfen bu alanı doldurun!");
            $("#urunKategoriEkleModal #cAdiModalValidation").displayBlock();
            $("#urunKategoriEkleModal #alert-1").displayBlock();
            return;
        }

        var data = {
            "cAdiModal": $('#urunKategoriEkleModal #cAdiModal').val(),
            "iKodKullaniciLoginModal": iKodKullaniciLogin
        };

        $.ajax({
            type: "PUT",
            url: "/api/urunkategoriapi/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: true,
            success: function (result, status, jqXHR) {
                if (result != null) {
                    if (result == -2) {
                        $("#urunKategoriEkleModal #alert-2").displayBlock();
                    }
                    else if (result == -3) {
                        $("#urunKategoriEkleModal #alert-3").displayBlock();
                    } else {
                        $('#iKodUrunKategori').append($('<option>', {
                            value: result.iKodUrunKategoriModal,
                            text: result.cAdiModal
                        }));

                        $('#iKodUrunKategori').val(result.iKodUrunKategoriModal).trigger('change');

                        $("#urunKategoriEkleModal").modal('hide');
                    }
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    });

    $('#urunKategoriEkleModal').on('show.bs.modal', function () {
        $("#urunKategoriEkleModal #cAdiModal").text("");
    });
});