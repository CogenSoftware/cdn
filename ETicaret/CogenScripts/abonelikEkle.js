$(function () {
    $("#iKodAbonelikTipi").change(function () {
        if ($("#iKodAbonelikTipi").val() > 0 && iKodLokasyonLogin > 0) {
            AbonelikTipiFiyat();
        }
    });
});

function AbonelikTipiFiyat() {
    $("#pageLoading").displayBlock();
    $.ajax({
        type: "GET",
        url: "/api/aboneliktipiapi/" + iKodLokasyonLogin + "/" + $("#iKodAbonelikTipi").val() + "?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $('#cTutar').val(data);
                $('#cTutar').priceFormat(optionPriceFormat);
                KDVHesapla();
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
                    "cActionName": "abonelikEkle.js",
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