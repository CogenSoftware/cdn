$(function () {
    $("#iKodMusteri").change(function () {
        ListPlug();
    });
    $("#iKodFis").change(function () {
        ListProduct();
    });
    $("#iKodPersonel").change(function () {
        ListProduct();
    });
    $("#iKodUrunCikisi").change(function () {
        ProductOutlet();
    });
});

function ListPlug() {
    $("#pageLoading").displayBlock();

    var iKodMusteri = 0;
    if ($("#iKodMusteri").val()) {
        iKodMusteri = $("#iKodMusteri").val();
    }

    $.ajax({
        type: "GET",
        url: "/api/fisapi/" + iKodMusteri + "/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $("#iKodFis").empty();
                $('#iKodFis').append($('<option>', {
                    value: 0,
                    text: "Lütfen fiş seçin ..."
                }));
                $('#iKodFis').val(0);

                $.each(data, function (i, item) {
                    $('#iKodFis').append($('<option>', {
                        value: item.iKodFis,
                        text: item.cAdi
                    }));
                });

                $("#pageLoading").displayNone();
            } else {
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
                    "cActionName": "urunCikisiIade.js",
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

function ProductOutlet() {
    $("#pageLoading").displayBlock();
    $("#urunListesi").empty();
    $.ajax({
        type: "GET",
        url: "/api/uruncikisiurunlistesiapi/" + $("#iKodUrunCikisi").val() + "/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $.ajax({
                    type: "GET",
                    url: "/api/urunapi/?" + new Date(),
                    contentType: "json",
                    dataType: "json",
                    success: function (data2) {
                        if (data2 != null) {
                            iUrunId = -1;
                            $.each(data, function (i, item) {
                                iUrunId = iUrunId + 1;
                                var cHTML =
                                    "<div class=\"row\">" +
                                    "<div class= \"form-group col-md-8\" >" +
                                    "<label for=\"iKodUrun\">Ürün</label>" +
                                    "<select onchange=\"ProductReturnWrite()\" class=\"form-control cboUrunAdi\" id=\"iKodUrun-" + iUrunId + "\" disabled=\"disabled\" tabindex=\"1\">" +
                                    "<option value =\"0\">Lütfen ürün seçin ...</option>";

                                $.each(data2, function (i, item2) {
                                    if (item.iKodUrun == item2.iKodUrun) {
                                        cHTML += "<option value=\"" + item2.iKodUrun + "\" selected>" + item2.cAdi + "</option>";
                                    } else {
                                        cHTML += "<option value=\"" + item2.iKodUrun + "\">" + item2.cAdi + "</option>";
                                    }
                                });

                                cHTML +=
                                    "</select>" +
                                    "</div>" +
                                    "<div class=\"form-group col-md-2\">" +
                                    "<label for=\"iCikisAdet\">Çıkış Adedi</label>" +
                                    "<input onchange=\"ProductReturnWrite()\" autocomplete=\"off\" class=\"form-control txtUrunAdet\" id=\"iCikisAdet-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen çıkış adedi girin ...\" type=\"number\" value=\"" + item.iCikisAdet + "\" disabled=\"disabled\" tabindex=\"2\">" +
                                    "</div>" +
                                    "<div class=\"form-group col-md-2\">" +
                                    "<label for=\"iIadeAdet\">İade Adedi</label>" +
                                    "<input onchange=\"ProductReturnWrite()\" autocomplete=\"off\" class=\"form-control txtUrunIadeAdet\" id=\"iIadeAdet-" + iUrunId + "\" maxlength=\"100\" min=\"0\" max=\"" + item.iCikisAdet + "\" name=\"iIadeAdet\" placeholder=\"Lütfen iade adedi girin ...\" type=\"number\" value=\"0\"  tabindex=\"3\">" +
                                    "</div>" +
                                    "</div>";

                                $("#urunListesi").append(cHTML);

                                $("#iKodTedarikci").select2();
                                $("#iKodUrun-0").select2();
                                $("#iKodUrun-" + iUrunId).select2();
                            });
                            ProductReturnWrite();
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
                                "cActionName": "urunEkle.js",
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
                    "cActionName": "urunCikisiIade.js",
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

function ListProduct() {
    $("#pageLoading").displayBlock();
    $("#urunListesi").empty();

    var iKodMusteri = 0;
    if ($("#iKodMusteri").val()) {
        iKodMusteri = $("#iKodMusteri").val();
    }

    var iKodPersonel = 0;
    if ($("#iKodPersonel").val()) {
        iKodPersonel = $("#iKodPersonel").val();
    }

    var iKodFis = 0;
    if ($("#iKodFis").val()) {
        iKodFis = $("#iKodFis").val();
    }

    $.ajax({
        type: "GET",
        url: "/api/uruncikisiapi/" + iKodMusteri + "/" + iKodPersonel + "/" + iKodFis + "/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $("#iKodUrunCikisi").empty();
                $('#iKodUrunCikisi').append($('<option>', {
                    value: 0,
                    text: "Lütfen ürün çıkışı seçin ..."
                }));
                $('#iKodUrunCikisi').val(0);

                $.each(data, function (i, item) {
                    $('#iKodUrunCikisi').append($('<option>', {
                        value: item.iKodUrunCikisi,
                        text: item.cUrunCikisi
                    }));
                });

                $("#pageLoading").displayNone();
            } else {
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
                    "cActionName": "urunCikisiIade.js",
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

function ProductReturnWrite() {
    $('#cUrunListesi').val('');
    $('#urunListesi').find('.row').each(function () {
        if ($('#cUrunListesi').val() != '') {
            $('#cUrunListesi').val($('#cUrunListesi').val() + "|");
        }

        $('#cUrunListesi').val($('#cUrunListesi').val() + $(this).find('.cboUrunAdi').val() + "*" + $(this).find('.txtUrunAdet').val() + "*" + $(this).find('.txtUrunIadeAdet').val())
    });
}