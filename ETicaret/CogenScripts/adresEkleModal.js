$(function () {
    $("#adresEkleModal #btnEkleAdres").click(function () {
        AdresEkleModal();
    });

    $('#adresEkleModal').on('show.bs.modal', function () {
        AdresEkleModalOpen();
    });
});

function AdresEkleModalOpen() {
    $('#adresEkleModal #cAdres').val('');
    $('#adresEkleModal #iKodSehir').val(0).trigger('change');
    $('#adresEkleModal #iKodIlce').val(0).trigger('change');
    $('#adresEkleModal #iKodMahalle').val(0).trigger('change');
    $('#adresEkleModal #lMerkezAdresMi').prop('checked', false);
    $("#adresEkleModal #cAdresValidation").text("");
    $("#adresEkleModal #iSehirAnahtarValidation").text("");
    $("#adresEkleModal #iIlceAnahtarValidation").text("");
    $("#adresEkleModal #iMahalleAnahtarValidation").text("");
    $("#adresEkleModal #alert-1").displayNone();
    $("#adresEkleModal #alert-2").displayNone();
    $("#adresEkleModal #alert-3").displayNone();
}

function AdresEkleModal() {
    $("#pageLoading").displayBlock();

    $("#adresEkleModal #cAdresValidation").text("");
    $("#adresEkleModal #iSehirAnahtarValidation").text("");
    $("#adresEkleModal #iIlceAnahtarValidation").text("");
    $("#adresEkleModal #iMahalleAnahtarValidation").text("");
    $("#adresEkleModal #alert-1").displayNone();
    $("#adresEkleModal #alert-2").displayNone();
    $("#adresEkleModal #alert-3").displayNone();

    if ($.trim($('#adresEkleModal #cAdres').val()) == "") {
        $("#adresEkleModal #cAdresValidation").text("Lütfen bu alanı doldurun!");
        $("#adresEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if ($('#adresEkleModal #iSehirAnahtar').val() == null || $('#adresEkleModal #iSehirAnahtar').val() == 0) {
        $("#adresEkleModal #iSehirAnahtarValidation").text("Lütfen bu alanı doldurun!");
        $("#adresEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if ($('#adresEkleModal #iIlceAnahtar').val() == null || $('#adresEkleModal #iIlceAnahtar').val() == 0) {
        $("#adresEkleModal #iIlceAnahtarValidation").text("Lütfen bu alanı doldurun!");
        $("#adresEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    if ($('#adresEkleModal #iMahalleAnahtar').val() == null || $('#adresEkleModal #iMahalleAnahtar').val() == 0) {
        $("#adresEkleModal #iMahalleAnahtarValidation").text("Lütfen bu alanı doldurun!");
        $("#adresEkleModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }

    var lMerkezAdresMi = false;
    if ($('#urunEkleModal #lMerkezAdresMi').is(":checked")) {
        lMerkezAdresMi = true;
    }

    var Data = {
        "iKodMusteri4": iKodMusteri4,
        "iKodTedarikci3": iKodTedarikci3,
        "cAdres": $('#adresEkleModal #cAdres').val(),
        "iSehirAnahtar": $('#adresEkleModal #iSehirAnahtar').val(),
        "iIlceAnahtar": $('#adresEkleModal #iIlceAnahtar').val(),
        "iMahalleAnahtar": $('#adresEkleModal #iMahalleAnahtar').val(),
        "lMerkezAdresMi": lMerkezAdresMi,
        "iKodKullaniciLogin": iKodKullaniciLogin
    };

    $.ajax({
        type: "PUT",
        url: "/api/adresapi/",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: true,
        success: function (data, status, jqXHR) {
            if (data != null) {
                $('#iKodTeslimatAdresi').append($('<option>', {
                    value: data.iKodAdres,
                    text: data.cAdi
                }));

                $('#iKodTeslimatAdresi').val(data.iKodAdres);
                $('#iKodTeslimatAdresi').select2();

                $('#iKodFaturaAdresi').append($('<option>', {
                    value: data.iKodAdres,
                    text: data.cAdi
                }));

                $('#iKodFaturaAdresi').val(data.iKodAdres);
                $('#iKodFaturaAdresi').select2();

                AdresEkleModalOpen();

                $("#adresEkleModal").modal('hide');
            }
            else if (data == -2) {
                $("#adresEkleModal #alert-2").displayBlock();
            }
            else if (data == -3) {
                $("#adresEkleModal #alert-3").displayBlock();
            }
            $("#pageLoading").displayNone();
        },
        error: function (xhr) {
            alert(xhr.responseText);
            $("#pageLoading").displayNone();
        }
    });
}
