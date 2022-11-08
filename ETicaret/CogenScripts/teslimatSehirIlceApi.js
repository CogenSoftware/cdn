$(function () {
    $("#iTeslimatSehirAnahtar").change(function () {
        Listele();
    });

    function Listele() {
        $("#pageLoading").displayBlock();
        $.ajax({
            type: "GET",
            url: "/api/ilceapi/" + $("#iTeslimatSehirAnahtar").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#iTeslimatIlceAnahtar").empty();
                    $('#iTeslimatIlceAnahtar').append($('<option>', {
                        value: 0,
                        text: "Lütfen ilçe seçin ..."
                    }));
                    $('#iTeslimatIlceAnahtar').val(0);

                    if ($("#iTeslimatMahalleAnahtar")) {
                        $("#iTeslimatMahalleAnahtar").empty();
                        $('#iTeslimatMahalleAnahtar').append($('<option>', {
                            value: 0,
                            text: "Lütfen mahalle seçin ..."
                        }));
                        $('#iTeslimatMahalleAnahtar').val(0);
                    }

                    $.each(data, function (i, item) {
                        $('#iTeslimatIlceAnahtar').append($('<option>', {
                            value: item.iIlceAnahtar,
                            text: item.cAdi
                        }));
                    });
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
                        "cActionName": "sehirTeslimatIlceApi.js",
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
    };
});

