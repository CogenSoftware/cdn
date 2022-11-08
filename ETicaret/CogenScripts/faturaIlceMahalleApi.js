$(function () {
    $("#iFaturaIlceAnahtar").change(function () {
        Listele();
    });

    function Listele(id) {
        $("#pageLoading").displayBlock();
        $.ajax({
            type: "GET",
            url: "/api/mahalleapi/" + $("#iFaturaIlceAnahtar").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#iFaturaMahalleAnahtar").empty();
                    $('#iFaturaMahalleAnahtar').append($('<option>', {
                        value: 0,
                        text: "Lütfen mahalle seçin ..."
                    }));
                    $('#iFaturaMahalleAnahtar').val(0);
                    $.each(data, function (i, item) {
                        $('#iFaturaMahalleAnahtar').append($('<option>', {
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
                        "cActionName": "ilceFaturaMahalleApi.js",
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