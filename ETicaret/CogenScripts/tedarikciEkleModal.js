$(function () {
    
    $("#tedarikciEkleModal #btnEkleTedarikci").click(function () {

        if ($.trim($('#tedarikciEkleModal #iMusteriTedarikciTipiModal').val()) == 0) {
            $("#tedarikciEkleModal #iMusteriTedarikciTipiModalValidation").text("Lütfen bu alanı doldurun!");
            $("#tedarikciEkleModal #iMusteriTedarikciTipiModalValidation").displayBlock();
            $("#tedarikciEkleModal #alert-1").displayBlock();
            return;
        }

        if ($('#tedarikciEkleModal #iMusteriTedarikciTipiModal').val() == 1) {
            if ($.trim($('#tedarikciEkleModal #cAdiModal').val()) == "") {
                $("#tedarikciEkleModal #cAdiModalValidation").text("Lütfen bu alanı doldurun!");
                $("#tedarikciEkleModal #cAdiModalValidation").displayBlock();
                $("#tedarikciEkleModal #alert-1").displayBlock();
                return;
            }

            if ($.trim($('#tedarikciEkleModal #cSoyadiModal').val()) == "") {
                $("#tedarikciEkleModal #cSoyadiModalValidation").text("Lütfen bu alanı doldurun!");
                $("#tedarikciEkleModal #cSoyadiModalValidation").displayBlock();
                $("#tedarikciEkleModal #alert-1").displayBlock();
                return;
            }
        } else if ($('#tedarikciEkleModal #iMusteriTedarikciTipiModal').val() == 2) {
            if ($.trim($('#tedarikciEkleModal #cFirmaAdi').val()) == "") {
                $("#tedarikciEkleModal #cFirmaAdiValidation").text("Lütfen bu alanı doldurun!");
                $("#tedarikciEkleModal #cFirmaAdiValidation").displayBlock();
                $("#tedarikciEkleModal #alert-1").displayBlock();
                return;
            }
        }

        var data = {
            "iMusteriTedarikciTipiModal": $('#tedarikciEkleModal #iMusteriTedarikciTipiModal').val(),
            "cAdiModal": $('#tedarikciEkleModal #cAdiModal').val(),
            "cSoyadiModal": $('#tedarikciEkleModal #cSoyadiModal').val(),
            "cTelefonModal": $('#tedarikciEkleModal #cTelefonModal').val(),
            "cGSMModal": $('#tedarikciEkleModal #cGSM').val(),
            "cEMailModal": $('#tedarikciEkleModal #cEMailModal').val(),
            "cVergiDairesiModal": $('#tedarikciEkleModal #cVergiDairesi').val(),
            "cTCKimlikNoModal": $('#tedarikciEkleModal #cTCKimlikNoModal').val(),
            "cFirmaAdiModal": $('#tedarikciEkleModal #cFirmaAdiModal').val(),
            "cAdiKurumsalModal": $('#tedarikciEkleModal #cAdiKurumsalModal').val(),
            "cSoyadiKurumsalModal": $("#tedarikciEkleModal #cSoyadiKurumsalModal").val(),
            "cTelefonKurumsalModal": $("#tedarikciEkleModal #cTelefonKurumsalModal").val(),
            "cFaksModal": $("#tedarikciEkleModal #cFaksModal").val(),
            "cGSMKurumsalModal": $("#tedarikciEkleModal #cGSMKurumsalModal").val(),
            "cEMailKurumsalModal": $("#tedarikciEkleModal #cEMailKurumsalModal").val(),
            "cWebModal": $("#tedarikciEkleModal #cWebModal").val(),
            "cVergiDairesiKurumsalModal": $("#tedarikciEkleModal #cVergiDairesiKurumsalModal").val(),
            "cVergiNumarasiModal": $("#tedarikciEkleModal #cVergiNumarasiModal").val(),
            "cResimListesi": $('#tedarikciEkleModal #cResimListesi').val(),
            "iKodKullaniciLoginModal": iKodKullaniciLogin
        };

        $.ajax({
            type: "PUT",
            url: "/api/tedarikci3api/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: true,
            success: function (result, status, jqXHR) {
                if (result != null) {
                    $('#iKodTedarikci3').append($('<option>', {
                        value: result.iKodTedarikci3Modal,
                        text: result.cAdiModal
                    }));

                    $('#iKodTedarikci3').val(result.iKodTedarikci3Modal).trigger('change');

                    $("#tedarikciEkleModal").modal('hide');
                } else if (data == -2) {
                    $("#tedarikciEkleModal #alert-2").displayBlock();
                }
                else if (data == -3) {
                    $("#tedarikciEkleModal #alert-3").displayBlock();
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    });

    $('#tedarikciEkleModal').on('show.bs.modal', function () {

        $("#tedarikciEkleModal #sahisModal").displayNone();
        $("#tedarikciEkleModal #kurumModal").displayNone();

        $('#tedarikciEkleModal #iMusteriTedarikciTipiModal').on('change', function () {
            if ($("#tedarikciEkleModal #iMusteriTedarikciTipiModal").val() == 1) {
                $("#tedarikciEkleModal #sahisModal").displayBlock();
                $("#tedarikciEkleModal #kurumModal").displayNone();
                $("#tedarikciEkleModal #iSehirAnahtarModal").select2();
                $("#tedarikciEkleModal #iIlceAnahtarModal").select2();
                $("#tedarikciEkleModal #iMahalleAnahtarModal").select2();
            }
            else if ($("#tedarikciEkleModal #iMusteriTedarikciTipiModal").val() == 2) {
                $("#tedarikciEkleModal #kurumModal").displayBlock();
                $("#tedarikciEkleModal #sahisModal").displayNone();
                $("#tedarikciEkleModal #iSehirAnahtarModal").select2();
                $("#tedarikciEkleModal #iIlceAnahtarModal").select2();
                $("#tedarikciEkleModal #iMahalleAnahtarModal").select2();
            }
        });

        $("#tedarikciEkleModal #iMusteriTedarikciTipiModal").select2();
        $("#tedarikciEkleModal #iMusteriTedarikciTipiModal").val("").trigger('change');
        $('#tedarikciEkleModal #cResimListesi').val("");
        $("#tedarikciEkleModal #cAdiModal").text("");
        $("#tedarikciEkleModal #cSoyadiModal").text("");
        $("#tedarikciEkleModal #cTelefonModal").text("");
        $("#tedarikciEkleModal #cGSMModal").text("");
        $("#tedarikciEkleModal #cEMailModal").text("");
        $("#tedarikciEkleModal #cVergiDairesiModal").text("");
        $("#tedarikciEkleModal #cTCKimlikNoModal").text("");
        $("#tedarikciEkleModal #cFirmaAdiModal").text("");
        $("#tedarikciEkleModal #cAdiKurumsalModal").text("");
        $("#tedarikciEkleModal #cSoyadiKurumsalModal").text("");
        $("#tedarikciEkleModal #cTelefonKurumsalModal").text("");
        $("#tedarikciEkleModal #cFaksModal").text("");
        $("#tedarikciEkleModal #cGSMKurumsalModal").text("");
        $("#tedarikciEkleModal #cEMailKurumsalModal").text("");
        $("#tedarikciEkleModal #cWebModal").text("");
        $("#tedarikciEkleModal #cVergiDairesiKurumsalModal").text("");
        $("#tedarikciEkleModal #cVergiNumarasiModal").text("");
        $("#tedarikciEkleModal #cTelefonModal").mask("9 (999) 999 99 99");
        $("#tedarikciEkleModal #cFaksModal").mask("9 (999) 999 99 99");
        $("#tedarikciEkleModal #cGSMModal").mask("9 (999) 999 99 99");
        $("#tedarikciEkleModal #cTelefonKurumsalModal").mask("9 (999) 999 99 99");
        $("#tedarikciEkleModal #cGSMKurumsalModal").mask("9 (999) 999 99 99");
    });
});