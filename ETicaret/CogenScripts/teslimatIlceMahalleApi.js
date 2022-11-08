$(function () {
    $("#iTeslimatIlceAnahtar").change(function () {
        Listele();
    });

    function Listele(id) {
        $("#pageLoading").displayBlock();
        $.ajax({
            type: "GET",
            url: "/api/mahalleapi/" + $("#iTeslimatIlceAnahtar").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                console.log($("#iTeslimatIlceAnahtar").val());
                if (data != null) {
                    $("#iTeslimatMahalleAnahtar").empty();
                    $('#iTeslimatMahalleAnahtar').append($('<option>', {
                        value: 0,
                        text: "Lütfen mahalle seçin ..."
                    }));
                    $('#iTeslimatMahalleAnahtar').val(0);
                    $.each(data, function (i, item) {
                        $('#iTeslimatMahalleAnahtar').append($('<option>', {
                            value: item.iMahalleAnahtar,
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
                        "cActionName": "ilceTeslimatMahalleApi.js",
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
    }
});