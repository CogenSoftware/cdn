$(function () {
    $("#dGirisTarihi").change(function () {
        Hesapla();
    });

    $("#iGirisSaat").change(function () {
        Hesapla();
    });

    $("#iGirisDakika").change(function () {
        Hesapla();
    });

    $("#dCikisTarihi").change(function () {
        Hesapla();
    });

    $("#iCikisSaat").change(function () {
        Hesapla();
    });

    $("#iCikisDakika").change(function () {
        Hesapla();
    });
});


function Hesapla() {

    if ($("#dGirisTarihi").val != '' && $("#iGirisSaat").val != 0 && $("#iGirisDakika").val != 0 &&
        $("#dCikisTarihi").val != '' && $("#iCikisSaat").val != 0 && $("#iCikisDakika").val != 0) {

        $("#pageLoading").displayBlock();

        var dGirisTarihiGun = $("#cGirisTarihi").datepicker().val().substring(0, 2);
        var dGirisTarihiAy = $("#cGirisTarihi").datepicker().val().substring(3, 2) + 1;
        var dGirisTarihiYil = $("#cGirisTarihi").datepicker().val().substring(5, 4);
        var dGirisTarihiSaat = $("#iGirisSaat").val();
        var dGirisTarihiDakika = $("#iGirisDakika").val();

        var dCikisTarihiGun = $("#cCikisTarihi").datepicker().val().substring(0, 2);
        var dCikisTarihiAy = $("#cCikisTarihi").datepicker().val().substring(3, 2) + 1;
        var dCikisTarihiYil = $("#cCikisTarihi").datepicker().val().substring(5, 4);
        var dCikisTarihiSaat = $("#iCikisSaat").val();
        var dCikisTarihiDakika = $("#iCikisDakika").val();

        var iDakika = (Date.UTC(dCikisTarihiYil, dCikisTarihiAy, dCikisTarihiGun, dCikisTarihiSaat, dCikisTarihiDakika, 0) - Date.UTC(dGirisTarihiYil, dGirisTarihiAy, dGirisTarihiGun, dGirisTarihiSaat, dGirisTarihiDakika, 0)) / 1000 / 60;

        $.ajax({
            type: "GET",
            url: "/api/fiyatapi/" + iDakika + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#cTutar").val(data.toFixed(2));

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
                        "cActionName": "fiyatHesapla.js",
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