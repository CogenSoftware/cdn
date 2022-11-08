$(function () {
    $("#urunEkleModal #btnAddProduct").click(function () {
        $("#pageLoading").displayBlock();

        $("#urunEkleModal #cKoduValidation").text("");
        $("#urunEkleModal #cAdiValidation").text("");
        $("#urunEkleModal #cRafValidation").text("");
        $("#urunEkleModal #iKritikAdetValidation").text("");
        $("#urunEkleModal #iSayimFarkiValidation").text("");
        $("#urunEkleModal #cSatisFiyatiValidation").text("");
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

        if ($('#urunEkleModal #lStokTutlacakMi').is(':checked') == true) {
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
            "iSayimFarki": $('#urunEkleModal #iSayimFarki').val(),
            "cSatisFiyati": $('#urunEkleModal #cSatisFiyati').val(),
            "iAktifMi": 1,
            "cResimListesi": $('#urunEkleModal #cResimListesi').val(),
            "iKodKullaniciLogin": iKodKullaniciLogin,
            "iKodLokasyon": iKodLokasyonLogin
        };

        $.ajax({
            type: "PUT",
            url: "/api/urun2api/",
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
    });

    $('#urunEkleModal').on('show.bs.modal', function () {
        $('#urunEkleModal #cKodu').val('');
        $('#urunEkleModal #cAdi').val('');
        $('#urunEkleModal #lStokTutlacakMi').attr('checked', false);
        $('#urunEkleModal #cRaf').val('');
        $('#urunEkleModal #iKritikAdet').val('');
        $('#urunEkleModal #iSayimFarki').val('');
        $('#urunEkleModal #cSatisFiyati').val('');
        $('#urunEkleModal #cResimListesi').val('');
        $('#fileUploadAlertSuccess').displayNone();
        $('#image-list').empty();
        $("#urunEkleModal #cKoduValidation").text("");
        $("#urunEkleModal #cAdiValidation").text("");
        $("#urunEkleModal #cRafValidation").text("");
        $("#urunEkleModal #iKritikAdetValidation").text("");
        $("#urunEkleModal #iSayimFarkiValidation").text("");
        $("#urunEkleModal #cSatisFiyatiValidation").text("");
        $("#urunEkleModal #alert-1").displayNone();
        $("#urunEkleModal #alert-2").displayNone();
        $("#urunEkleModal #alert-3").displayNone();

        $("#cSatisFiyati").priceFormat(optionPriceFormat);

        $("#urunEkleModal #lStokTutlacakMi").change(function () {
            if ($('#urunEkleModal #lStokTutlacakMi').is(':checked') == true) {
                $("#urunEkleModal #stokTutlacakMi").displayBlock();
            } else {
                $("#urunEkleModal #stokTutlacakMi").displayNone();
            }
        });
    });
});














