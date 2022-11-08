$(function () {
    $("#iSehirAnahtar").change(function () {
        SehirListele();
    });
    $("#iSehirAnahtar2").change(function () {
        SehirListele2();
    });
    $("#iSehirAnahtar3").change(function () {
        SehirListele3();
    });
});

function SehirListele() {
    if ($("#iSehirAnahtar").val() > 0) {
        $("#pageLoading").displayBlock();
        $.ajax({
            type: "GET",
            url: "/api/ilceapi/" + $("#iSehirAnahtar").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#iIlceAnahtar").empty();
                    $('#iIlceAnahtar').append($('<option>', {
                        value: 0,
                        text: "Lütfen ilçe seçin ..."
                    }));
                    $('#iIlceAnahtar').val(0);

                    $("#iMahalleAnahtar").empty();
                    $('#iMahalleAnahtar').append($('<option>', {
                        value: 0,
                        text: "Lütfen mahalle seçin ..."
                    }));
                    $('#iMahalleAnahtar').val(0);


                    $.each(data, function (i, item) {
                        $('#iIlceAnahtar').append($('<option>', {
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
                        "cActionName": "sehirIlceApi.js",
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
        $("#iIlceAnahtar").empty();
        $('#iIlceAnahtar').append($('<option>', {
            value: 0,
            text: "Lütfen ilçe seçin ..."
        }));
        $('#iIlceAnahtar').val(0);
    }

    $("#pageLoading").displayNone();
}

function SehirListele2() {
    $("#pageLoading").displayBlock();

    if ($("#iSehirAnahtar2").val() > 0) {
        $.ajax({
            type: "GET",
            url: "/api/ilceapi/" + $("#iSehirAnahtar2").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#iIlceAnahtar2").empty();
                    $('#iIlceAnahtar2').append($('<option>', {
                        value: 0,
                        text: "Lütfen ilçe seçin ..."
                    }));
                    $('#iIlceAnahtar2').val(0);

                    if ($("#iMahalleAnahtar2")) {
                        $("#iMahalleAnahtar2").empty();
                        $('#iMahalleAnahtar2').append($('<option>', {
                            value: 0,
                            text: "Lütfen mahalle seçin ..."
                        }));
                        $('#iMahalleAnahtar2').val(0);
                    }

                    $.each(data, function (i, item) {
                        $('#iIlceAnahtar2').append($('<option>', {
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
                        "cActionName": "sehirIlceApi.js",
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
        $("#iIlceAnahtar2").empty();
        $('#iIlceAnahtar2').append($('<option>', {
            value: 0,
            text: "Lütfen ilçe seçin ..."
        }));
        $('#iIlceAnahtar2').val(0);
    }

    $("#pageLoading").displayNone();
}

function SehirListele3() {
    $("#pageLoading").displayBlock();

    if ($("#iSehirAnahtar3").val() > 0) {
        $.ajax({
            type: "GET",
            url: "/api/ilceapi/" + $("#iSehirAnahtar3").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#iIlceAnahtar3").empty();
                    $('#iIlceAnahtar3').append($('<option>', {
                        value: 0,
                        text: "Lütfen ilçe seçin ..."
                    }));
                    $('#iIlceAnahtar3').val(0);

                    if ($("#iMahalleAnahtar3")) {
                        $("#iMahalleAnahtar3").empty();
                        $('#iMahalleAnahtar3').append($('<option>', {
                            value: 0,
                            text: "Lütfen mahalle seçin ..."
                        }));
                        $('#iMahalleAnahtar3').val(0);
                    }

                    $.each(data, function (i, item) {
                        $('#iIlceAnahtar3').append($('<option>', {
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
                        "cActionName": "sehirIlceApi.js",
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
        $("#iIlceAnahtar3").empty();
        $('#iIlceAnahtar3').append($('<option>', {
            value: 0,
            text: "Lütfen ilçe seçin ..."
        }));
        $('#iIlceAnahtar3').val(0);
    }

    $("#pageLoading").displayNone();
}

