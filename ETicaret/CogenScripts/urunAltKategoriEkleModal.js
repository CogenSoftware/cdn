var iKodUrunAltKategoriModal = 0;

$(function () {

    $("#urunAltKategoriEkleModal #btnEkleUrunAltKategori").click(function () {
        $("#urunAltKategoriEkleModal #iKodUrunKategoriModalValidation").displayNone();
        $("#urunAltKategoriEkleModal #cAdiModalValidation").displayNone();
        $("#urunAltKategoriEkleModal #alert-1").displayNone();

        if ($.trim($('#urunAltKategoriEkleModal #iKodUrunKategoriModal').val()) == 0) {
            $("#urunAltKategoriEkleModal #iKodUrunKategoriModalValidation").text("Lütfen bu alanı doldurun!");
            $("#urunAltKategoriEkleModal #iKodUrunKategoriModalValidation").displayBlock();
            $("#urunAltKategoriEkleModal #alert-1").displayBlock();
            return;
        }

        if ($.trim($('#urunAltKategoriEkleModal #cAdiModal').val()) == "") {
            $("#urunAltKategoriEkleModal #cAdiModalValidation").text("Lütfen bu alanı doldurun!");
            $("#urunAltKategoriEkleModal #cAdiModalValidation").displayBlock();
            $("#urunAltKategoriEkleModal #alert-1").displayBlock();
            return;
        }

        var data = {
            "iKodUrunKategoriModal": $('#urunAltKategoriEkleModal #iKodUrunKategoriModal').val(),
            "cAdiModal": $('#urunAltKategoriEkleModal #cAdiModal').val(),
            "iKodKullaniciLoginModal": iKodKullaniciLogin
        };

        $.ajax({
            type: "PUT",
            url: "/api/urunaltkategoriapi/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: true,
            success: function (result, status, jqXHR) {
                if (result != null) {
                    if (result == -2) {
                        $("#urunAltKategoriEkleModal #alert-2").displayBlock();
                    }
                    else if (result == -3) {
                        $("#urunAltKategoriEkleModal #alert-3").displayBlock();
                    } else {
                        console.log(result);

                        $('#iKodUrunAltKategori').append($('<option>', {
                            value: result.iKodUrunAltKategoriModal,
                            text: result.cAdiModal
                        }));

                        iKodUrunAltKategoriModal = result.iKodUrunAltKategoriModal;
                        $('#iKodUrunKategori').val(result.iKodUrunKategoriModal).trigger('change');

                        $("#urunAltKategoriEkleModal").modal('hide');
                    }
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    });

    $('#urunAltKategoriEkleModal').on('show.bs.modal', function () {
        $("#urunAltKategoriEkleModal #iKodUrunKategoriModal").select2();
        $("#urunAltKategoriEkleModal #iKodUrunKategoriModal").val("").trigger('change');
        $("#urunAltKategoriEkleModal #cAdiModal").text("");
    });
});