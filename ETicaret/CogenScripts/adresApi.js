var iKodMusteri4 = 0;
var iKodTedarikci3 = 0;

$(function () {
    $("#pageLoading").displayBlock();
    $.ajax({
        type: "GET",
        url: "/api/sehirapi/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $("#iSehirAnahtar").empty();
                $('#iSehirAnahtar').append($('<option>', {
                    value: 0,
                    text: "Lütfen şehir seçin ..."
                }));
                $('#iSehirAnahtar').val(0);
                $.each(data, function (i, item) {
                    $('#iSehirAnahtar').append($('<option>', {
                        value: item.iSehirAnahtar,
                        text: item.cAdi
                    }));
                });
                $("#iSehirAnahtar").select2();
                $("#iIlceAnahtar").select2();
                $("#iMahalleAnahtar").select2();
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
                    "cActionName": "ilceMahalleApi.js",
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

    if ($("#iKodMusteri4") != null) {
        if (($("#iKodMusteri4").val() == null || $("#iKodMusteri4").val() == 0) && ($("#iKodTedarikci3").val() == null || $("#iKodTedarikci3").val() == 0)) {
            $("#adresler").displayNone();
        } else {
            $("#adresler").displayBlock();
        }

        $("#iKodMusteri4").change(function () {
            if ($("#iKodMusteri4").val() != null && $("#iKodMusteri4").val() > 0) {
                iKodMusteri4 = $("#iKodMusteri4").val();
                AdresListele(iKodMusteri4, iKodTedarikci3);
            } else {
                $("#adresler").displayNone();
                iKodMusteri4 = 0;
            }
        });
    }
    if ($("#iKodTedarikci3") != null) {
        $("#iKodTedarikci3").change(function () {
            if ($("#iKodTedarikci3").val() != null && $("#iKodTedarikci3").val() > 0) {
                iKodTedarikci3 = $("#iKodTedarikci3").val();
                AdresListele(iKodMusteri4, iKodTedarikci3);
            } else {
                $("#adresler").displayNone();
                iKodTedarikci3 = 0;
            }
        });
    }
});

function AdresListele(iKodMusteri4, iKodTedarikci3) {
    if (iKodMusteri4 > 0 || iKodTedarikci3 > 0) {
        $("#pageLoading").displayBlock();
        $("#adresler").displayNone();
        $.ajax({
            type: "GET",
            url: "/api/adresapi/" + iKodMusteri4 + "/" + iKodTedarikci3 + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#iKodTeslimatAdresi").empty();
                    $('#iKodTeslimatAdresi').append($('<option>', {
                        value: 0,
                        text: "Lütfen teslimat adresi seçin ..."
                    }));
                    $('#iKodTeslimatAdresi').val(0);

                    $("#iKodFaturaAdresi").empty();
                    $('#iKodFaturaAdresi').append($('<option>', {
                        value: 0,
                        text: "Lütfen fatura adresi seçin ..."
                    }));
                    $('#iKodFaturaAdresi').val(0);

                    $.each(data, function (i, item) {
                        $('#iKodTeslimatAdresi').append($('<option>', {
                            value: item.iKodAdres,
                            text: item.cAdi
                        }));

                        $('#iKodFaturaAdresi').append($('<option>', {
                            value: item.iKodAdres,
                            text: item.cAdi
                        }));
                    });

                    $("#adresler").displayBlock();
                    $("#pageLoading").displayNone();
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
                $.ajax({
                    type: "PUT",
                    url: "/api/logapi/",
                    data: JSON.stringify({
                        "iType": 1,
                        "cControllerName": "Java Script Ajax Hatası",
                        "cActionName": "adresApi.js",
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
    } else {
        $("#iKodTeslimatAdresi").empty();
        $('#iKodTeslimatAdresi').append($('<option>', {
            value: 0,
            text: "Lütfen teslimat adresi seçin ..."
        }));
        $('#iKodTeslimatAdresi').val(0);

        $("#iKodFaturaAdresi").empty();
        $('#iKodFaturaAdresi').append($('<option>', {
            value: 0,
            text: "Lütfen fatura adresi seçin ..."
        }));
        $('#iKodFaturaAdresi').val(0);
    }
}

