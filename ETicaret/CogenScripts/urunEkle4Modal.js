$(function () {
    $('#urunEkleModal #cSatisFiyati').priceFormat(optionPriceFormat);

    $("#urunEkleModal #btnAddProduct").click(function () {
        UrunEkleModal();
    });

    $('#urunEkleModal').on('show.bs.modal', function () {
        UrunEkleModalOpen();
    });

    $("#urunEkleModal #lStokTutlacakMi").change(function () {
        if ($("#urunEkleModal #stokTutlacakMiModal").css("display") == "none") {
            $("#urunEkleModal #stokTutlacakMiModal").displayBlock();
        } else {
            $("#urunEkleModal #stokTutlacakMiModal").displayNone();
        }
    });
});

function UrunEkleModalOpen() {
    $("#pageLoading").displayBlock();
    $.ajax({
        type: "GET",
        url: "/api/urunkategoriapi/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $("#urunEkleModal #iKodUrunKategori").empty();
                $('#urunEkleModal #iKodUrunKategori').append($('<option>', {
                    value: 0,
                    text: "Lütfen ürün kategori seçin ..."
                }));
                $('#urunEkleModal #iKodUrunKategori').val(0);
                $.each(data, function (i, item) {
                    $('#urunEkleModal #iKodUrunKategori').append($('<option>', {
                        value: item.iKodUrunKategori,
                        text: item.cAdi
                    }));
                });
                $("#urunEkleModal #iKodUrunKategori").select2();
                $("#urunEkleModal #iKodUrunAltKategori").select2();
            }
            $("#pageLoading").displayNone();
        },
        error: function (xhr) {
            alert(xhr.responseText);
            $.ajax({
                type: "PUT",
                url: "/api/logapi/",
                data: JSON.stringify({
                    "iType": 1,
                    "cControllerName": "Java Script Ajax Hatası",
                    "cActionName": "urunEkle4Modal.js",
                    "cHata": xhr.responseText,
                    "cIslem": "",
                    "iKodKullanici": 0,
                    "iKodKayit": 0
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                processData: true
            });
            $("#pageLoading").displayNone();
        }
    });

    $("#urunEkleModal #stokTutlacakMiModal").displayNone();
    $('#urunEkleModal #iKodUrunKategori').val(0).trigger('change');
    $('#urunEkleModal #iKodUrunAltKategori').val(0).trigger('change');
    $('#urunEkleModal #cKodu').val('');
    $('#urunEkleModal #cAdi').val('');
    $('#urunEkleModal #cOlcu').val('');
    $('#urunEkleModal #lStokTutlacakMi').prop('checked', false);
    $('#urunEkleModal #cRaf').val('');
    $('#urunEkleModal #iKritikAdet').val('');
    $('#urunEkleModal #cSatisFiyati').val('');
    $('#urunEkleModal #cResimListesi').val('');
    $('#fileUploadAlertSuccess').displayNone();
    $('#image-list').empty();
    $("#urunEkleModal #iKodUrunKategoriValidation").text("");
    $("#urunEkleModal #iKodUrunAltKategoriValidation").text("");
    $("#urunEkleModal #cKoduValidation").text("");
    $("#urunEkleModal #cAdiValidation").text("");
    $("#urunEkleModal #cOlcuValidation").text("");
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

    $("#urunEkleModal #iKodUrunKategoriValidation").text("");
    $("#urunEkleModal #iKodUrunAltKategoriValidation").text("");
    $("#urunEkleModal #cKoduValidation").text("");
    $("#urunEkleModal #cAdiValidation").text("");
    $("#urunEkleModal #cOlcuValidation").text("");
    $("#urunEkleModal #cRafValidation").text("");
    $("#urunEkleModal #iKritikAdetValidation").text("");
    $("#urunEkleModal #cSatisFiyatiValidation").text("");
    $("#urunEkleModal #iAktifMiValidation").text("");
    $("#urunEkleModal #alert-1").displayNone();
    $("#urunEkleModal #alert-2").displayNone();
    $("#urunEkleModal #alert-3").displayNone();

    var lStokTutlacakMi = false;
    if ($('#urunEkleModal #lStokTutlacakMi').is(":checked")) {
        lStokTutlacakMi = true;
    }

    if ($('#urunEkleModal #iKodUrunKategori').val() == null || $('#urunEkleModal #iKodUrunKategori').val() == 0) {
        $("#urunEkleModal #iKodUrunKategoriValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if ($('#urunEkleModal #iKodUrunAltKategori').val() == null || $('#urunEkleModal #iKodUrunAltKategori').val() == 0) {
        $("#urunEkleModal #iKodUrunAltKategoriValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
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
    if ($.trim($('#urunEkleModal #cOlcu').val()) == "") {
        $("#urunEkleModal #cOlcuValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if (lStokTutlacakMi && $.trim($('#urunEkleModal #cRaf').val()) == "") {
        $("#urunEkleModal #cRafValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if (lStokTutlacakMi && $.trim($('#urunEkleModal #iKritikAdet').val()) == "") {
        $("#urunEkleModal #iKritikAdetValidation").text("Lütfen bu alanı doldurun!");
        $("#urunEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if (lStokTutlacakMi && $.trim($('#urunEkleModal #iSayimFarki').val()) == "") {
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

    var iKritikAdet = 0;
    var iSayimFarki = 0;
    if (lStokTutlacakMi) {
        iKritikAdet = $('#urunEkleModal #iKritikAdet').val();
        iSayimFarki = $('#urunEkleModal #iSayimFarki').val();
    }
    
    var Data = {
        "iKodUrunKategori": $('#urunEkleModal #iKodUrunKategori').val(),
        "iKodUrunAltKategori": $('#urunEkleModal #iKodUrunAltKategori').val(),
        "cKodu": $('#urunEkleModal #cKodu').val(),
        "cAdi": $('#urunEkleModal #cAdi').val(),
        "cOlcu": $('#urunEkleModal #cOlcu').val(),
        "cRaf": $('#urunEkleModal #cRaf').val(),
        "iKritikAdet": iKritikAdet,
        "iSayimFarki": iSayimFarki,
        "cSatisFiyati": $('#urunEkleModal #cSatisFiyati').val(),
        "lStokTutlacakMi": lStokTutlacakMi,
        "iAktifMi": 1,
        "cResimListesi": $('#urunEkleModal #cResimListesi').val(),
        "iKodKullaniciLogin": iKodKullaniciLogin
    };

    $.ajax({
        type: "PUT",
        url: "/api/urun4api/",
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
