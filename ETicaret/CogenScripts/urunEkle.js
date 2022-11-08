var iUrunId = 0;

$(function () {

    $("#btnSave").click(function () {
        $("#form").submit();
    });

    $("#btnAdd").click(function () {
        ProductAdd();
    });

    $("#btnAllAdd").click(function () {
        ProductAllCode();
    });

    $('#cokluUrunEkleModal').on('shown.bs.modal', function () {
        $('#cBarkodlar').focus();
    });

    $(".cboUrunAdi").change(function () {
        Product(this);
    });
});

function ProductAdd() {
    $("#pageLoading").displayBlock();
    $("#cUrunListesiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iUrunId + 1; i++) {
        if ($("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0) {
            lSecimYap = false;
        }
    }

    if (lSecimYap == false) {
        $("#cUrunListesiValidation").text("Lütfen bu alanı doldurun!");
        $("#pageLoading").displayNone();
    } else {
        ProductAdd2(0);
    }
}

function ProductAdd2(iKodUrun) {
    $.ajax({
        type: "GET",
        url: "/api/urunapi/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                for (var i = 0; i < iUrunId + 1; i++) {
                    if ($("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0) {
                        $("#iKodUrun-" + i).parent().parent().remove();
                    }
                }

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
                            "<select onchange=\"Product(this)\" class=\"form-control cboUrunAdi\" id=\"iKodUrun-" + iUrunId + "\" tabindex=\"2\">" +
                            "<option value =\"0\">Lütfen ürün seçin ...</option>" +
                            cHTML +
                            "</select>" +
                            "</div>" +
                            "<div class=\"form-group col-md-3\">" +
                            "<label for=\"iAdet\">Adet</label>" +
                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunAdet\" id=\"iAdet-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen adet girin ...\" type=\"number\" value=\"1\"  tabindex=\"3\">" +
                            "</div>" +
                            "<div class=\"col-md-1\">" +
                            "<button onclick=\"ProductPrint(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"4\">Yazdır</button>" +
                            "</div>" +
                            "<div class=\"col-md-1\">" +
                            "<button onclick=\"ProductDelete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"5\">Sil</button>" +
                            "</div>" +
                            "</div>";


                        $("#urunListesi").append(cHTML);

                        $("#iKodTedarikci").select2();
                        $("#iKodUrun-0").select2();

                        if (iKodUrun > 0) {
                            $("#iKodUrun-" + iUrunId).val(iKodUrun);
                            Product($("#iKodUrun-" + iUrunId));
                        }

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
                                    "<div class=\"form-group col-md-3\">" +
                                    "<label for=\"iAdet\">Adet</label>" +
                                    "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunAdet\" id=\"iAdet-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen adet girin ...\" type=\"number\" value=\"1\"  tabindex=\"3\">" +
                                    "</div>" +
                                    "<div class=\"col-md-1\">" +
                                    "<button onclick=\"ProductPrint(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"7\">Yazdır</button>" +
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

                        $("#urunListesi .row").each(function () {
                            if ($(this).find(".txtUrunKodu").val() == '') {
                                $(this).remove();
                            }
                        });

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

function ProductCode(txtUrunKodu) {
    var keycode = event.keyCode;
    if (keycode == '13') {
        $("#pageLoading").displayBlock();
        $("#cUrunListesiValidation").text("");

        var cboUrunAdi = $(txtUrunKodu).parent().parent().find(".cboUrunAdi");
        var txtUrunAdet = $(txtUrunKodu).parent().parent().find(".txtUrunAdet");

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
                        $(txtUrunAdet).val(1);

                        ProductAdd(false);

                        $('#cUrunListesi').val('');
                        $('#urunListesi').find('.row').each(function () {
                            if ($('#cUrunListesi').val() != '') {
                                $('#cUrunListesi').val($('#cUrunListesi').val() + "|");
                            }

                            $('#cUrunListesi').val($('#cUrunListesi').val() + $(this).find('.txtUrunKodu').val() + "*" + $(this).find('.cboUrunAdi').val() + "*" + $(this).find('.txtUrunAdet').val())
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
}

function ProductWrite() {
    $('#cUrunListesi').val('');
    $('#urunListesi').find('.row').each(function () {
        if ($('#cUrunListesi').val() != '') {
            $('#cUrunListesi').val($('#cUrunListesi').val() + "|");
        }

        $('#cUrunListesi').val($('#cUrunListesi').val() + $(this).find('.txtUrunKodu').val() + "*" + $(this).find('.cboUrunAdi').val() + "*" + $(this).find('.txtUrunAdet').val())
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
                $(txtUrunAdet).val(1);

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

function ProductDelete(button) {
    if (button) {
        $(button).parent().parent().remove();
        ProductWrite();
    }
}

function ProductPrint(button) {

    setTimeout(
        function () {
            var txtUrunKodu = $(button).parent().parent().find(".txtUrunKodu");
            var cboUrunAdi = $(button).parent().parent().find(".cboUrunAdi");

            var res = $(cboUrunAdi).find('option:selected').text().replace("Kodu : ", "").replace("Adı : ", "").replace("Raf : ", "").split(" - ");

            var print = window.open('', 'Yazdır');
            print.document.open();
            print.document.write(
                '<html>' +
                '<head>' +
                '<title>Yazdır</title>' +
                '<link href="https://cdn.statically.io/gh/CogenSoftware/cdn/main/ETicaret/Content/print.min.css?date=20062019-1" rel="stylesheet" />' +
                '</head>' +
                '<body class="print" onload="window.print()">' +
                '<div class="bilgi">' +
                '<img src="/Images/barkod-logo.jpg?date=20062019-1"/>' +
                '<p class="barkod-no">' + res[0] + "</p>" +
                '<p>' + res[1] + "</p>" +
                '</div>' +
                '<div class="barkod">' +
                '<p>(' + $(txtUrunKodu).val() + ")</p>" +
                '</div>' +
                '</body>' +
                '</html>');
            print.document.close();
            setTimeout(function () { newWin.close(); }, 1);
        }, 2000);


}