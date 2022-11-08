$(function () {
    $("#iIlceAnahtar").change(function () {
        IlceListele();
    });
    $("#iIlceAnahtar2").change(function () {
        IlceListele2();
    });
    $("#iIlceAnahtar3").change(function () {
        IlceListele3();
    });
});

function IlceListele() {
    if ($("#iIlceAnahtar").val() > 0) {
        $.ajax({
            type: "GET",
            url: "/api/mahalleapi/" + $("#iIlceAnahtar").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#iMahalleAnahtar").empty();
                    $('#iMahalleAnahtar').append($('<option>', {
                        value: 0,
                        text: "Lütfen mahalle seçin ..."
                    }));
                    $('#iMahalleAnahtar').val(0);
                    $.each(data, function (i, item) {
                        $('#iMahalleAnahtar').append($('<option>', {
                            value: item.iMahalleAnahtar,
                            text: item.cAdi
                        }));
                    });
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
            }
        });
    } else {
        $("#iMahalleAnahtar").empty();
        $('#iMahalleAnahtar').append($('<option>', {
            value: 0,
            text: "Lütfen mahalle seçin ..."
        }));
        $('#iMahalleAnahtar').val(0);
    }
}

function IlceListele2() {

    if ($("#iIlceAnahtar2").val() > 0) {
        $.ajax({
            type: "GET",
            url: "/api/mahalleapi/" + $("#iIlceAnahtar2").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#iMahalleAnahtar2").empty();
                    $('#iMahalleAnahtar2').append($('<option>', {
                        value: 0,
                        text: "Lütfen mahalle seçin ..."
                    }));
                    $('#iMahalleAnahtar2').val(0);
                    $.each(data, function (i, item) {
                        $('#iMahalleAnahtar2').append($('<option>', {
                            value: item.iMahalleAnahtar,
                            text: item.cAdi
                        }));
                    });
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
            }
        });
    } else {
        $("#iMahalleAnahtar2").empty();
        $('#iMahalleAnahtar2').append($('<option>', {
            value: 0,
            text: "Lütfen mahalle seçin ..."
        }));
        $('#iMahalleAnahtar2').val(0);
    }
    
}

function IlceListele3() {

    if ($("#iIlceAnahtar").val() > 0) {
        $.ajax({
            type: "GET",
            url: "/api/mahalleapi/" + $("#iIlceAnahtar3").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#iMahalleAnahtar3").empty();
                    $('#iMahalleAnahtar3').append($('<option>', {
                        value: 0,
                        text: "Lütfen mahalle seçin ..."
                    }));
                    $('#iMahalleAnahtar3').val(0);
                    $.each(data, function (i, item) {
                        $('#iMahalleAnahtar3').append($('<option>', {
                            value: item.iMahalleAnahtar,
                            text: item.cAdi
                        }));
                    });
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
            }
        });
    } else {
        $("#iMahalleAnahtar3").empty();
        $('#iMahalleAnahtar3').append($('<option>', {
            value: 0,
            text: "Lütfen mahalle seçin ..."
        }));
        $('#iMahalleAnahtar3').val(0);
    }
    
}