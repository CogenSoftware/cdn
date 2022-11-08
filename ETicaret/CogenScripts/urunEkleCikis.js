var iUrunId = 0;

$(function () {

    $("#btnSave").click(function () {
        $("#form").submit();
    });

    $("#btnAdd").click(function () {
        ProductAdd();
    });

    $(".cboUrunAdi").change(function () {
        Product(this);
    });

    $("#iKodMusteri").change(function () {
        ListPlug();
    });

    $("#btnAllAdd").click(function () {
        ProductAllCode();
    });

    $('#cokluUrunEkleModal').on('shown.bs.modal', function () {
        $('#cBarkodlar').focus();
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

function ProductAdd() {
    $("#pageLoading").displayBlock();
    $("#cUrunListesiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iUrunId + 1; i++) {
        if ($("#iKodUrun-" + i).val() == 0 || $("#iCikisAdet-" + i).val() == 0) {
            lSecimYap = false;
        }
    }

    if (lSecimYap == false) {
        $("#cUrunListesiValidation").text("Lütfen bu alanı doldurun!");
        $("#pageLoading").displayNone();
    } else {
        $.ajax({
            type: "GET",
            url: "/api/urunapi/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    iUrunId = iUrunId + 1;

                    if (data.length > 0) {
                        var cHTML = '';
                        $.each(data, function (i, item) {
                            if (item && item.iKodUrun && item.cAdi) {
                                cHTML += "<option value=\"" + item.iKodUrun + "\">" + item.cAdi + "</option>";
                            }
                        });

                        if (cHTML != '') {
                            cHTML =
                                "<div class=\"row\">" +
                                "<div class=\"form-group col-md-2\">" +
                                "<label for=\"cKodu\">Ürün Kodu</label>" +
                                "<input onkeypress=\"ProductCode(this)\" autocomplete=\"off\" class=\"form-control txtUrunKodu\" id=\"cKodu-" + iUrunId + "\" maxlength=\"100\" name=\"cKodu\" placeholder=\"Lütfen ürün kodu girin ...\" tabindex=\"3\">" +
                                "</div>" +
                                "<div class= \"form-group col-md-5\" >" +
                                "<label for=\"iKodUrun\">Ürün</label>" +
                                "<select onchange=\"Product(this)\" class=\"form-control cboUrunAdi\" id=\"iKodUrun-" + iUrunId + "\" tabindex=\"4\">" +
                                "<option value =\"0\">Lütfen ürün seçin ...</option>" +
                                cHTML +
                                "</select>" +
                                "</div>" +
                                "<div class=\"form-group col-md-2\">" +
                                "<label for=\"iAdet\">Adet</label>" +
                                "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunAdet\" id=\"iAdet-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen adet girin ...\" type=\"number\" value=\"0\" disabled=\"disabled\" tabindex=\"5\">" +
                                "</div>" +
                                "<div class=\"form-group col-md-2\">" +
                                "<label for=\"iCikisAdet\">Çıkış Adet</label>" +
                                "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunCikisAdet\" id=\"iAdet-" + iUrunId + "\" maxlength=\"100\" min=\"1\" max=\"0\" name=\"iCikisAdet\" placeholder=\"Lütfen çıkış adedi girin ...\" type=\"number\" value=\"1\"  tabindex=\"6\">" +
                                "</div>" +
                                "<div class=\"col-md-1\">" +
                                "<button onclick=\"ProductDelete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"8\">Sil</button>" +
                                "</div>" +
                                "</div>";

                            $("#urunListesi").append(cHTML);

                            $("#iKodTedarikci").select2();
                            $("#iKodUrun-0").select2();
                            $("#iKodUrun-" + iUrunId).select2();
                            $("#cKodu-" + iUrunId).focus();

                            ProductWrite();
                            $("#pageLoading").displayNone();
                        }
                        else {
                            $("#pageLoading").displayNone();
                        }
                    }
                    else {
                        $("#pageLoading").displayNone();
                    }
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
                        "cActionName": "urunEkleCikis.js",
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


function ProductAllCode() {
    $("#cokluUrunEkleModal").modal('hide');
    $("#pageLoading").displayBlock();
    $("#cUrunListesiValidation").text("");

    var cBarkodlar = $("#cBarkodlar").val().split('\n');

    $.ajax({
        type: "GET",
        url: "/api/urunapi/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < iUrunId + 1; i++) {
                if ($("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0) {
                    $("#iKodUrun-" + i).parent().parent().remove();
                }
            }

            if (data != null) {

                if (data.length > 0) {
                    var cHTMLOption = '';
                    $.each(data, function (i, item) {
                        if (item && item.iKodUrun && item.cAdi) {
                            cHTMLOption += "<option value=\"" + item.iKodUrun + "\">" + item.cAdi + "</option>";
                        }
                    });

                    if (cHTMLOption != '') {
                        for (var i = 0; i < cBarkodlar.length; i++) {
                            if (cBarkodlar[i] != '') {

                                var iKodUrun = 0;
                                var iAdet = 0;
                                $.each(data, function (j, item) {
                                    if (item.cKodu.toLowerCase() == cBarkodlar[i].toLowerCase()) {
                                        iKodUrun = item.iKodUrun;
                                        iAdet = item.iAdet;
                                    }
                                });

                                iUrunId = iUrunId + 1;

                                cHTML =
                                    "<div class=\"row\">" +
                                    "<div class=\"form-group col-md-2\">" +
                                    "<label for=\"cKodu\">Ürün Kodu</label>" +
                                    "<input value=\"" + cBarkodlar[i].toUpperCase() + "\" onkeypress=\"ProductCode(this)\" autocomplete=\"off\" class=\"form-control txtUrunKodu\" id=\"cKodu-" + iUrunId + "\" maxlength=\"100\" name=\"cKodu\" placeholder=\"Lütfen ürün kodu girin ...\" tabindex=\"3\">" +
                                    "</div>" +
                                    "<div class= \"form-group col-md-5\" >" +
                                    "<label for=\"iKodUrun\">Ürün</label>" +
                                    "<select onchange=\"Product(this)\" class=\"form-control cboUrunAdi\" id=\"iKodUrun-" + iUrunId + "\" tabindex=\"4\">" +
                                    "<option value =\"0\">Lütfen ürün seçin ...</option>" +
                                    cHTMLOption +
                                    "</select>" +
                                    "</div>" +
                                    "<div class=\"form-group col-md-2\">" +
                                    "<label for=\"iAdet\">Adet</label>" +
                                    "<input value=\"" + iAdet + "\" onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunAdet\" id=\"iAdet-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen adet girin ...\" type=\"number\" value=\"0\" disabled=\"disabled\" tabindex=\"5\">" +
                                    "</div>" +
                                    "<div class=\"form-group col-md-2\">" +
                                    "<label for=\"iCikisAdet\">Çıkış Adet</label>" +
                                    "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunCikisAdet\" id=\"iAdet-" + iUrunId + "\" maxlength=\"100\" min=\"1\" max=\"0\" name=\"iCikisAdet\" placeholder=\"Lütfen çıkış adedi girin ...\" type=\"number\" value=\"0\"  tabindex=\"6\">" +
                                    "</div>" +
                                    "<div class=\"col-md-1\">" +
                                    "<button onclick=\"ProductDelete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"8\">Sil</button>" +
                                    "</div>" +
                                    "</div>";

                                $("#urunListesi").append(cHTML);
                                $("#iKodUrun-" + iUrunId).val(iKodUrun);
                                $("#iKodUrun-" + iUrunId).select2();
                            }
                        }

                        ProductWrite();
                        $("#cBarkodlar").val('');

                        $("#pageLoading").displayNone();
                    }
                    else {
                        $("#pageLoading").displayNone();
                    }
                }
                else {
                    $("#pageLoading").displayNone();
                }
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
                    "cActionName": "urunEkleCikis.js",
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

function ProductCode(txtUrunKodu) {
    var keycode = event.keyCode;
    if (keycode == '13') {

        $("#pageLoading").displayBlock();
        $("#cUrunListesiValidation").text("");

        var cboUrunAdi = $(txtUrunKodu).parent().parent().find(".cboUrunAdi");
        var txtUrunAdet = $(txtUrunKodu).parent().parent().find(".txtUrunAdet");
        var txtUrunCikisAdet = $(txtUrunKodu).parent().parent().find(".txtUrunCikisAdet");

        $.ajax({
            type: "GET",
            url: "/api/urunkoduapi/" + $(txtUrunKodu).val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    var lVarMi = false;

                    if (lVarMi == false) {

                        $(cboUrunAdi).val(data.iKodUrun).trigger('change');
                        $(txtUrunAdet).val(data.iAdet);
                        $(txtUrunCikisAdet).attr("max", data.iAdet);

                        ProductAdd(false);

                        $('#cUrunListesi').val('');
                        $('#urunListesi').find('.row').each(function () {
                            if ($('#cUrunListesi').val() != '') {
                                $('#cUrunListesi').val($('#cUrunListesi').val() + "|");
                            }

                            $('#cUrunListesi').val($('#cUrunListesi').val() + $(this).find('.txtUrunKodu').val() + "*" + $(this).find('.cboUrunAdi').val() + "*" + $(this).find('.txtUrunAdet').val() + "*" + $(this).find('.txtUrunCikisAdet').val())
                        });
                    }

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
                        "cActionName": "urunEkleCikis.js",
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

function ProductWrite() {
    $('#cUrunListesi').val('');
    $('#urunListesi').find('.row').each(function () {
        if ($('#cUrunListesi').val() != '') {
            $('#cUrunListesi').val($('#cUrunListesi').val() + "|");
        }

        $('#cUrunListesi').val($('#cUrunListesi').val() + $(this).find('.txtUrunKodu').val() + "*" + $(this).find('.cboUrunAdi').val() + "*" + $(this).find('.txtUrunAdet').val() + "*" + $(this).find('.txtUrunCikisAdet').val())
    });
}

function Product(cboUrunAdi) {
    $("#pageLoading").displayBlock();
    $("#cUrunListesiValidation").text("");
    var txtUrunKodu = $(cboUrunAdi).parent().parent().find(".txtUrunKodu");
    var txtUrunAdet = $(cboUrunAdi).parent().parent().find(".txtUrunAdet");
    var txtUrunCikisAdet = $(cboUrunAdi).parent().parent().find(".txtUrunCikisAdet");

    $.ajax({
        type: "GET",
        url: "/api/urunapi/" + $(cboUrunAdi).val() + "/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $(txtUrunKodu).val(data.cKodu);
                $(txtUrunAdet).val(data.iAdet);
                $(txtUrunCikisAdet).attr("max", data.iAdet);

                ProductWrite();

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
                    "cActionName": "urunEkleCikis.js",
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

function ProductDelete(button) {
    if (button) {
        $(button).parent().parent().remove();
        ProductWrite();
    }
}