var iIskontoYuzdeOrani = 0;

$(function () {
    if ($("#iKodTedarikci3") != null) {
        $("#iKodTedarikci3").change(function () {
            if ($("#iKodTedarikci3").val() != null && $("#iKodTedarikci3").val() > 0) {
                IskontoHesapla($("#iKodTedarikci3").val());
            } else {
                iIskontoYuzdeOrani = 0;
            }
        });
    }
});

function IskontoHesapla(iKodTedarikci3) {
    if (iKodTedarikci3 > 0) {
        $("#pageLoading").displayBlock();

        $.ajax({
            type: "GET",
            url: "/api/iskontotedarikciapi/" + iKodTedarikci3 + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    iIskontoYuzdeOrani = data;
                    $("#iIskontoYuzdeOrani").val(data);
                    $("#pageLoading").displayNone();
                }
                else {
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
                        "cActionName": "iskontoTedarikci.js",
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
}