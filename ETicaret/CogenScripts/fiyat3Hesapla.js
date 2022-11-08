$(function () {

    $("#iKodMenu").change(function () {
        fiyat3Hesapla();
    });

    $("#iKodMenu").keyup(function () {
        fiyat3Hesapla();
    });

    $("#iKisiSayisi").change(function () {
        fiyat3Hesapla();
    });

    $("#iKisiSayisi").keyup(function () {
        fiyat3Hesapla();
    });

    $("#iOzellik").change(function () {
        fiyat3Hesapla();
    });

    $("#iOzellik").keypress(function () {
        fiyat3Hesapla();
    });

    $("#iAy").change(function () {
        fiyat3Hesapla();
    });

    $("#iAy").keyup(function () {
        fiyat3Hesapla();
    });

    $("#iGun").change(function () {
        fiyat3Hesapla();
    });

    $("#iGun").keyup(function () {
        fiyat3Hesapla();
    });

});

function fiyat3Hesapla() {
    var kisiSayisi = $("#iKisiSayisi").val();
    var menu = $("#iKodMenu").val();
    var ozellik = 0;
    var ay = $("#iAy").val();
    var gun = $("#iGun").val();
    if ($("#iOzellik").val() != '') {
        ozellik = $("#iOzellik").val();
    }
    if (menu > 0 && kisiSayisi > 0 && ay > 0 && gun > 0) {
        $.ajax({
            type: "GET",
            url: "/api/fiyat3hesaplaapi/" + $("#iKisiSayisi").val() + "/" + $("#iKodMenu").val() + "/" + ozellik + "/" + ay + "/" + gun + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#cTutar").val(data.toFixed(2));
                    $("#cTutar").priceFormat(optionPriceFormat);
                    $("#pageLoading").displayNone();
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
                        "cActionName": "fiyat3.js",
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