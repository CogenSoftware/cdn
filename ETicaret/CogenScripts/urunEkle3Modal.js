$(function () {
    $('#urunEkleModal #cSatisFiyati').priceFormat(optionPriceFormat);

    $("#urunEkleModal #btnAddProduct").click(function () {
        UrunEkleModal();
    });

    $('#urunEkleModal').on('show.bs.modal', function () {
        UrunEkleModalOpen();
    });
});

function UrunEkleModalOpen() {
    $('#urunEkleModal #cKodu').val('');
    $('#urunEkleModal #cAdi').val('');
    $('#urunEkleModal #cRaf').val('');
    $('#urunEkleModal #iKritikAdet').val('');
    $('#urunEkleModal #cSatisFiyati').val('');
    $('#urunEkleModal #cResimListesi').val('');
    $('#fileUploadAlertSuccess').displayNone();
    $('#image-list').empty();
    $("#urunEkleModal #cKoduValidation").text("");
    $("#urunEkleModal #cAdiValidation").text("");
    $("#urunEkleModal #cRafValidation").text("");
    $("#urunEkleModal #iKritikAdetValidation").text("");
    $("#urunEkleModal #cSatisFiyatiValidation").text("");
    $("#urunEkleModal #iAktifMiValidation").text("");
    $("#urunEkleModal #alert-1").displayNone();
    $("#urunEkleModal #alert-2").displayNone();
    $("#urunEkleModal #alert-3").displayNone();
}

function UrunEkleModal() {
    $("#pageLoading").displayBlock();

    $("#urunEkleModal #cKoduValidation").text("");
    $("#urunEkleModal #cAdiValidation").text("");
    $("#urunEkleModal #cRafValidation").text("");
    $("#urunEkleModal #iKritikAdetValidation").text("");
    $("#urunEkleModal #cSatisFiyatiValidation").text("");
    $("#urunEkleModal #iAktifMiValidation").text("");
    $("#urunEkleModal #alert-1").displayNone();
    $("#urunEkleModal #alert-2").displayNone();
    $("#urunEkleModal #alert-3").displayNone();

    if ($.trim($('#urunEkleModal #cKodu').val()) == "") {
        $("#urunEkleModal #cKoduValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if ($.trim($('#urunEkleModal #cAdi').val()) == "") {
        $("#urunEkleModal #cAdiValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if ($.trim($('#urunEkleModal #cRaf').val()) == "") {
        $("#urunEkleModal #cRafValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if ($.trim($('#urunEkleModal #iKritikAdet').val()) == "") {
        $("#urunEkleModal #iKritikAdetValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if ($.trim($('#urunEkleModal #iSayimFarki').val()) == "") {
        $("#urunEkleModal #iSayimFarkiValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if ($.trim($('#urunEkleModal #cSatisFiyati').val()) == "") {
        $("#urunEkleModal #cSatisFiyatiValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
   
    
    var Data = {
        "cKodu": $('#urunEkleModal #cKodu').val(),
        "cAdi": $('#urunEkleModal #cAdi').val(),
        "cRaf": $('#urunEkleModal #cRaf').val(),
        "iKritikAdet": $('#urunEkleModal #iKritikAdet').val(),
        "cSatisFiyati": $('#urunEkleModal #cSatisFiyati').val(),
        "iAktifMi": 1,
        "cResimListesi": $('#urunEkleModal #cResimListesi').val(),
        "iKodKullaniciLogin": iKodKullaniciLogin
    };

    $.ajax({
        type: "PUT",
        url: "/api/urun3api/",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: true,
        success: function (data, status, jqXHR) {
            if (data > 0) {
                ProductAdd2(data);

                $("#urunEkleModal").modal('hide');
            }
            else if (data == -2) {
                $("#urunEkleModal #alert-2").displayBlock();
            }
            else if (data == -3) {
                $("#urunEkleModal #alert-3").displayBlock();
            }
            $("#pageLoading").displayNone();
        },
        error: function (xhr) {
            alert(xhr.responseText);
            $("#pageLoading").displayNone();
        }
    });
}
