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

    $("#iKodMusteri4").change(function () {
        ProductWrite();
    });

    $("#iIskontoYuzdeOrani").change(function () {
        ProductWrite();
    });

    $('.collapse').on('show.bs.collapse', function () {
        var id = $(this).attr("data-id");
        setTimeout(
            function () {
                $('#iKodSiparisDurumu-' + id).select2();
            }, 100);
    });

    $("#btnAraToplamEkle").click(function () {
        AraToplamEkle();
    });
});

function AraToplamEkle() {
    $("#pageLoading").displayBlock();
    $("#cUrun5ListesiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iUrunId + 1; i++) {
        if ($("#iKodDepo" + i).val() == 0 || $("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0 || $("#cBirimFiyati-" + i).val() == '' || $("#cFiyat-" + i).val() == '' || $("#cBirimFiyati-" + i).val() == "0.00" || $("#cFiyat-" + i).val() == "0.00") {
            lSecimYap = false;
        }
    }

    if (lSecimYap == false) {
        $("#cUrun5ListesiValidation").text("Lütfen bu alanı doldurun!");
        $("#pageLoading").displayNone();
    }
    else {
        var cHTML =
            "<div data-id=\"araToplamSatiri\" class=\"urunSatiri\">" +
            "<div class=\"row\">" +
            "<div class=\"col-md-10\">" +
            "<p class=\"ara-toplam-satiri\">*** Ara Toplam ***</p>" +
            "</div>" +
            "<div class=\"col-md-2\">" +
            "<button onclick=\"ProductDelete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete-3\" tabindex=\"7\">Sil</button>" +
            "</div>" +
            "</div>" +
            "</div>";
        $("#urun5Listesi").append(cHTML);
        ProductWrite();
        $("#pageLoading").displayNone();
    }
}

function ProductAdd() {
    $("#pageLoading").displayBlock();
    $("#cUrun5ListesiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iUrunId + 1; i++) {
        if ($("#iKodDepo-" + i).val() == 0 || $("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0 || $("#cBirimFiyati-" + i).val() == '' || $("#cFiyat-" + i).val() == '' || $("#cBirimFiyati-" + i).val() == "0.00" || $("#cFiyat-" + i).val() == "0.00") {
            lSecimYap = false;
        }
    }

    if (lSecimYap == false) {
        $("#cUrun5ListesiValidation").text("Lütfen bu alanı doldurun!");
        $("#pageLoading").displayNone();
    } else {
        ProductAdd2(0);
    }
}

function ProductAdd2() {

    $.ajax({
        type: "GET",
        url: "/api/siparisdurumuapi/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data2) {
            if (data2 != null) {

                if (data2.length > 0) {
                    var cHTML2 = '';

                    $.each(data2, function (i, item2) {
                        if (item2 && item2.iKodSiparisDurumu && item2.cAdi) {
                            cHTML2 += "<option value=\"" + item2.iKodSiparisDurumu + "\">" + item2.cAdi + "</option>";
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: "/api/depoapi/?" + new Date(),
                        contentType: "json",
                        dataType: "json",
                        success: function (data) {
                            if (data != null) {

                                for (var i = 0; i < iUrunId + 1; i++) {
                                    if ($("#iKodDepo-" + i).val() == 0 || $("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0 || $("#cBirimFiyati-" + i).val() == '' || $("#cFiyat-" + i).val() == '' || $("#cBirimFiyati-" + i).val() == "0.00" || $("#cFiyat-" + i).val() == "0.00") {
                                        $("#iKodUrun-" + i).parent().parent().parent().remove();
                                    }
                                }

                                iUrunId = iUrunId + 1;

                                if (data.length > 0) {
                                    var cHTML = '';

                                    $.each(data, function (i, item) {
                                        if (item && item.iKodDepo && item.cAdi) {
                                            cHTML += "<option value=\"" + item.iKodDepo + "\">" + item.cAdi + "</option>";
                                        }
                                    });

                                    if (cHTML != '') {
                                        cHTML =
                                            "<div data-id=\"urunSatiri\" class=\"urunSatiri\">" +
                                            "<div class=\"row\">" +
                                            "<div class=\"form-group col-md-1 pr-0\">" +
                                            "<label for=\"cKodu\">Ürün Kodu</label>" +
                                            "<input onkeypress=\"ProductCode(this)\" autocomplete=\"off\" class=\"form-control txtUrunKodu\" id=\"cKodu-" + iUrunId + "\" maxlength=\"100\" name=\"cKodu\" placeholder=\"Lütfen ürün kodu girin ...\" tabindex=\"3\">" +
                                            "</div>" +
                                            "<div class= \"form-group col-md-2 pr-0\" >" +
                                            "<label for=\"iKodDepo\">Depo</label>" +
                                            "<select onchange=\"ProductWrite()\" class=\"form-control cboDepo\" id=\"iKodDepo-" + iUrunId + "\" tabindex=\"2\">" +
                                            "<option value =\"0\">Lütfen depo seçin ...</option>" +
                                            cHTML +
                                            "</select>" +
                                            "</div>" +
                                            "<div class= \"form-group col-md-3 pr-0\" >" +
                                            "<label for=\"iKodUrun\">Ürün</label>" +
                                            "<select onchange=\"Product(this)\" class=\"form-control cboUrunAdi\" id=\"iKodUrun-" + iUrunId + "\" tabindex=\"3\">" +
                                            "<option value =\"0\">Lütfen ürün seçin ...</option>" +
                                            "</select>" +
                                            "</div>" +
                                            "<div class=\"form-group col-md-1 pr-0\">" +
                                            "<label for=\"iAdet\">Adet</label>" +
                                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunAdet\" id=\"iAdet-" + iUrunId + "\" min=\"0\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen adet girin ...\" type=\"number\" value=\"0\" tabindex=\"4\">" +
                                            "</div>" +
                                            "<div class=\"form-group col-md-1 pr-0\">" +
                                            "<label for=\"iAdet\">Birim Fiyatı</label>" +
                                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunBirimFiyati\" id=\"cBirimFiyati-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen birim fiyatı girin ...\" value=\"0.00\" tabindex=\"5\" readonly=\"readonly\">" +
                                            "</div>" +
                                            "<div class=\"form-group col-md-1 pr-0\">" +
                                            "<label for=\"iAdet\">Fiyat</label>" +
                                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunFiyat\" id=\"cFiyat-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen fiyat girin ...\" value=\"0.00\" tabindex=\"6\" readonly=\"readonly\">" +
                                            "</div>" +
                                            "<div class=\"col-md-2 pr-0\">" +
                                            "<a class=\"btn btn-secondary btn-block btn-delete-3\" data-toggle=\"collapse\" href=\"#digerOzellikler-" + iUrunId + "\" role=\"button\" aria-expanded=\"false\" aria-controls=\"digerOzellikler\" tabindex=\"6\">Diğer Özellikler</a>" +
                                            "</div>" +
                                            "<div class=\"col-md-1\">" +
                                            "<button onclick=\"ProductDelete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete-3\" tabindex=\"7\">Sil</button>" +
                                            "</div>" +
                                            "</div>" +
                                            "<div id=\"digerOzellikler-" + iUrunId + "\" data-id=\"" + iUrunId + "\" class=\"multi-collapse mt-3 collapse\" style=\"\">" +
                                            "<div class=\"row\">" +
                                            "<div class=\"form-group col-md-4\">" +
                                            "<label for=\"iKodSiparisDurumu\">Sipariş Durumu</label>" +
                                            "<select onchange=\"ProductWrite()\" class=\"form-control cboSiparisDurumu\" id=\"iKodSiparisDurumu-" + iUrunId + "\" tabindex=\"26\">" +
                                            "<option value =\"0\">Lütfen sipariş durumu seçin ...</option>" +
                                            cHTML2 +
                                            "</select>" +
                                            "</div>" +
                                            "<div class=\"form-group col-md-2\">" +
                                            "<label for=\"cFiiliSevkTarihi\">Fiili Sevk Tarihi</label>" +
                                            "<input autocomplete=\"off\" class=\"form-control txtFiiliSevkTarihi\" id=\"cFiiliSevkTarihi-" + iUrunId + "\" maxlength=\"100\" name=\"cFiiliSevkTarihi\" onchange=\"ProductWrite()\" placeholder=\"Lütfen fiili sevk tarihi girin ...\" tabindex=\"27\" type=\"text\" value=\"\">" +
                                            "</div>" +
                                            "<div class=\"form-group col-md-2\">" +
                                            "<label for=\"cIrsaliyeNo\">İrsaliye No</label>" +
                                            "<input autocomplete=\"off\" class=\"form-control txtIrsaliyeNo\" id=\"cIrsaliyeNo-" + iUrunId + "\" maxlength=\"100\" name=\"cIrsaliyeNo\" onchange=\"ProductWrite()\" placeholder=\"Lütfen irsaliye no girin ...\" tabindex=\"28\" type=\"text\" value=\"\">" +
                                            "</div>" +
                                            "<div class=\"form-group col-md-2\">" +
                                            "<label for=\"cDuzenlenmeTarihi\">Düzenlenme Tarihi</label>" +
                                            "<input autocomplete=\"off\" class=\"form-control txtDuzenlenmeTarihi\" id=\"cDuzenlenmeTarihi-" + iUrunId + "\" maxlength=\"100\" name=\"cDuzenlenmeTarihi\" onchange=\"ProductWrite()\" placeholder=\"Lütfen düzenlenme tarihi girin ...\" tabindex=\"29\" type=\"text\" value=\"\">" +
                                            "</div>" +
                                            "<div class=\"form-group col-md-2\">" +
                                            "<label for=\"cTeslimatTarihi\">Teslimat Tarihi</label>" +
                                            "<input autocomplete=\"off\" class=\"form-control txtTeslimatTarihi\" id=\"cTeslimatTarihi-" + iUrunId + "\" maxlength=\"100\" name=\"cTeslimatTarihi\" onchange=\"ProductWrite()\" placeholder=\"Lütfen teslimat tarihi girin ...\" tabindex=\"30\" type=\"text\" value=\"\">" +
                                            "</div>" +
                                            "</div>" +
                                            "</div>" +
                                            "</div>";

                                        $("#urun5Listesi").append(cHTML);

                                        $("#iKodDepo-0").select2();
                                        $("#iKodUrun-0").select2();
                                        $("#iKodSiparisDurumu-0").select2();
                                        $("#cFiiliSevkTarihi-0").datepicker(dataPickerOption);
                                        $("#cDuzenlenmeTarihi-0").datepicker(dataPickerOption);
                                        $("#cTeslimatTarihi-0").datepicker(dataPickerOption);

                                        $("#iKodDepo-" + iUrunId).select2();
                                        $("#iKodUrun-" + iUrunId).select2();
                                        $("#cBirimFiyati-" + iUrunId).priceFormat(optionPriceFormat);
                                        $("#cFiyat-" + iUrunId).priceFormat(optionPriceFormat);
                                        $("#iKodSiparisDurumu-" + iUrunId).select2();
                                        $("#cFiiliSevkTarihi-" + iUrunId).datepicker(dataPickerOption);
                                        $("#cDuzenlenmeTarihi-" + iUrunId).datepicker(dataPickerOption);
                                        $("#cTeslimatTarihi-" + iUrunId).datepicker(dataPickerOption);
                                        $("#cBirimFiyati-" + iUrunId).val("0.00");
                                        $("#cFiyat-" + iUrunId).val("0.00");
                                        $("#cKodu-" + iUrunId).focus();

                                        $('.collapse').on('show.bs.collapse', function () {
                                            var id = $(this).attr("data-id");
                                            setTimeout(
                                                function () {
                                                    $('#iKodSiparisDurumu-' + id).select2();
                                                }, 100);
                                        });

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
                                    "cActionName": "urunEkle4.js",
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
        },
        error: function (xhr) {
            alert(xhr.responseText);
            $.ajax({
                type: "PUT",
                url: "/api/logapi/",
                data: JSON.stringify({
                    "iType": 1,
                    "cControllerName": "Java Script Ajax Hatası",
                    "cActionName": "urunEkle4.js",
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

function AddSubTotal() {

    $("#pageLoading").displayBlock();

    var cHTML =
        "<div class=\"row\">" +
        "<div class=\"col-md-12\">" +
        "<p>Ara Toplam</p>" +
        "</div>" +
        "</div>";

    $("#urun5Listesi").append(cHTML);

    ProductWrite();

    $("#pageLoading").displayNone();
}

function ProductAllCode() {
    $("#cokluUrunEkleModal").modal('hide');
    $("#pageLoading").displayBlock();
    $("#cUrun5ListesiValidation").text("");

    var cBarkodlar = $("#cBarkodlar").val().split('\n');

    $.ajax({
        type: "GET",
        url: "/api/urun5api/0/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < iUrunId + 1; i++) {
                if ($("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0 || $("#cBirimFiyati-" + i).val() == '' || $("#cFiyat-" + i).val() == '' || $("#cBirimFiyati-" + i).val() == "0.00" || $("#cFiyat-" + i).val() == "0.00") {
                    $("#iKodUrun-" + i).parent().parent().parent().remove();
                }
            }

            if (data != null) {

                if (data.length > 0) {
                    var cHTMLOption = '';
                    $.each(data, function (i, item) {
                        if (item && item.iKodUrun5 && item.cAdi) {
                            cHTMLOption += "<option value=\"" + item.iKodUrun5 + "\">" + item.cAdi + "</option>";
                        }
                    });

                    if (cHTMLOption != '') {
                        for (var i = 0; i < cBarkodlar.length; i++) {
                            if (cBarkodlar[i] != '') {

                                var iKodUrun = 0;
                                var iAdet = 0;
                                var cBirimFiyati = '';
                                var cFiyat = '';
                                $.each(data, function (j, item) {
                                    if (item.cKodu.toLowerCase() == cBarkodlar[i].toLowerCase()) {
                                        iKodUrun = item.iKodUrun5;
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
                                    "<div class= \"form-group col-md-4\" >" +
                                    "<label for=\"iKodUrun\">Ürün</label>" +
                                    "<select onchange=\"Product(this)\" class=\"form-control cboUrunAdi\" id=\"iKodUrun-" + iUrunId + "\" tabindex=\"4\">" +
                                    "<option value =\"0\">Lütfen ürün seçin ...</option>" +
                                    cHTMLOption +
                                    "</select>" +
                                    "</div>" +
                                    "<div class=\"form-group col-md-1\">" +
                                    "<label for=\"iAdet\">Adet</label>" +
                                    "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunAdet\" id=\"iAdet-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen adet girin ...\" type=\"number\" value=\"1\"  tabindex=\"3\">" +
                                    "</div>" +
                                    "<div class=\"form-group col-md-2\">" +
                                    "<label for=\"iAdet\">Birim Fiyatı</label>" +
                                    "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunBirimFiyati\" id=\"cBirimFiyati-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen birim fiyatı girin ...\" value=\"0.00\" tabindex=\"4\" readonly=\"readonly\">" +
                                    "</div>" +
                                    "<div class=\"form-group col-md-2\">" +
                                    "<label for=\"iAdet\">Fiyat</label>" +
                                    "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunFiyat\" id=\"cFiyat-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen fiyat girin ...\" value=\"0.00\" tabindex=\"5\" readonly=\"readonly\">" +
                                    "</div>" +
                                    "<div class=\"col-md-1\">" +
                                    "<button onclick=\"ProductDelete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"8\">Sil</button>" +
                                    "</div>" +
                                    "</div>";

                                $("#urun5Listesi").append(cHTML);
                                $("#iKodUrun-" + iUrunId).val(iKodUrun);
                                $("#iKodUrun-" + iUrunId).select2();
                                $("#cBirimFiyati-" + iUrunId).priceFormat(optionPriceFormat);
                                $("#cFiyat-" + iUrunId).priceFormat(optionPriceFormat);
                            }
                        }

                        ProductWrite();
                        $("#cBarkodlar").val('');

                        $("#urun5Listesi .row").each(function () {
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
                    "cActionName": "urunEkle4.js",
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
        $("#cUrun5ListesiValidation").text("");

        var cboDepo = $(txtUrunKodu).parent().parent().parent().find(".cboDepo");
        var cboUrunAdi = $(txtUrunKodu).parent().parent().parent().find(".cboUrunAdi");
        var txtUrunAdet = $(txtUrunKodu).parent().parent().parent().find(".txtUrunAdet");
        var txtUrunBirimFiyati = $(txtUrunKodu).parent().parent().parent().find(".txtUrunBirimFiyati");
        var txtUrunFiyat = $(txtUrunKodu).parent().parent().parent().find(".txtUrunFiyat");

        $.ajax({
            type: "GET",
            url: "/api/urunkodu3api/" + $(txtUrunKodu).val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    var lVarMi = false;

                    if (lVarMi == false) {
                        $(cboDepo).val(data.iKodDepo).trigger('change');
                        $(cboUrunAdi).val(data.iKodUrun5).trigger('change');
                        $(txtUrunAdet).val(1);
                        $(txtUrunBirimFiyati).val("0.00");
                        $(txtUrunFiyat).val("0.00");

                        ProductAdd(false);

                        $('#cUrun5Listesi').val('');
                        $('#urun5Listesi').find('.row').each(function () {
                            if ($('#cUrun5Listesi').val() != '') {
                                $('#cUrun5Listesi').val($('#cUrun5Listesi').val() + "|");
                            }

                            $('#cUrun5Listesi').val($('#cUrun5Listesi').val() + $(this).find('.txtUrunKodu').val() + "*" + $(this).find('.cboDepo').val() + "*" + $(this).find('.cboUrunAdi').val() + "*" + $(this).find('.txtUrunAdet').val() + "*" + $(this).find('.txtUrunBirimFiyati').val() + "*" + $(this).find('.txtUrunFiyat').val())
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
                        "cActionName": "urunEkle4.js",
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
    var fTutar = 0;
    var fGenelTutar = 0;
    $('#cUrun5Listesi').val('');
    $('#urun5Listesi').find('.urunSatiri').each(function () {
        if ($(this).attr("data-id") == "urunSatiri") {
            var fFiyat = OndalikCevir($(this).find('.txtUrunAdet').val() * $(this).find('.txtUrunBirimFiyati').val().replace(",", ""));
            fTutar += fFiyat;
            $(this).find('.txtUrunFiyat').val(fFiyat.toFixed(2));
            $(this).find('.txtUrunFiyat').priceFormat(optionPriceFormat);

            if ($('#cUrun5Listesi').val() != '') {
                $('#cUrun5Listesi').val($('#cUrun5Listesi').val() + "|");
            }

            $('#cUrun5Listesi').val(
                $('#cUrun5Listesi').val() +
                $(this).find('.txtUrunKodu').val() + "*" +
                $(this).find('.cboDepo').val() + "*" +
                $(this).find('.cboUrunAdi').val() + "*" +
                $(this).find('.txtUrunAdet').val() + "*" +
                $(this).find('.txtUrunBirimFiyati').val().replace(",", "") + "*" +
                $(this).find('.txtUrunFiyat').val().replace(",", "") + "*" +
                $(this).find('.cboSiparisDurumu').val() + "*" +
                $(this).find('.txtFiiliSevkTarihi').val() + "*" +
                $(this).find('.txtDuzenlenmeTarihi').val() + "*" +
                $(this).find('.txtTeslimatTarihi').val() + "*" +
                $(this).find('.txtIrsaliyeNo').val());

        } else if ($(this).attr("data-id") == "araToplamSatiri") {
            if ($('#cUrun5Listesi').val() != '') {
                $('#cUrun5Listesi').val($('#cUrun5Listesi').val() + "|");
            }

            $('#cUrun5Listesi').val(
                $('#cUrun5Listesi').val() +
                "-1" + "*" +
                "-1" + "*" +
                "-1" + "*" +
                "-1" + "*" +
                "-1" + "*" +
                "-1" + "*" +
                "-1" + "*" +
                "-1" + "*" +
                "-1");
        }
    });

    fGenelTutar = fTutar;

    if ($("#iIskontoYuzdeOrani") != null && $("#iIskontoYuzdeOrani").val() != null) {
        fGenelTutar = fGenelTutar - ((fGenelTutar / 100) * parseInt($("#iIskontoYuzdeOrani").val()));
    }

    $('#cTutar').val(fTutar.toFixed(2));
    $('#cGenelTutar').val(fGenelTutar.toFixed(2));

    if ($('#iKDVTuru').val() == 1) {
        if ($('#iKDVOrani').val() == 1) {
            $('#cGenelTutar').val(fGenelTutar.toFixed(2));
        } else if ($('#iKDVOrani').val() == 2) {
            $('#cGenelTutar').val((fGenelTutar * 1.01).toFixed(2));
        } else if ($('#iKDVOrani').val() == 3) {
            $('#cGenelTutar').val((fGenelTutar * 1.08).toFixed(2));
        } else if ($('#iKDVOrani').val() == 4) {
            $('#cGenelTutar').val((fGenelTutar * 1.10).toFixed(2));
        } else if ($('#iKDVOrani').val() == 5) {
            $('#cGenelTutar').val((fGenelTutar * 1.18).toFixed(2));
        }
    } else {
        $('#cGenelTutar').val(fGenelTutar.toFixed(2));
    }

    $('#cTutar').priceFormat(optionPriceFormat);
    $('#cGenelTutar').priceFormat(optionPriceFormat);
}

function OndalikCevir(deger) {
    var dec = 2;
    var result = Math.round(deger * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

function Product(cboUrunAdi) {
    $("#pageLoading").displayBlock();
    $("#cUrun5ListesiValidation").text("");
    var txtUrunKodu = $(cboUrunAdi).parent().parent().parent().find(".txtUrunKodu");
    var txtUrunAdet = $(cboUrunAdi).parent().parent().parent().find(".txtUrunAdet");
    var txtUrunBirimFiyati = $(txtUrunKodu).parent().parent().parent().find(".txtUrunBirimFiyati");
    var txtUrunFiyat = $(txtUrunKodu).parent().parent().parent().find(".txtUrunFiyat");

    $.ajax({
        type: "GET",
        url: "/api/urun5api/0/" + $(cboUrunAdi).val() + "/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $(txtUrunKodu).val(data.cKodu);
                if ($(txtUrunAdet).val() == 0) {
                    $(txtUrunAdet).val(1);
                    //$(txtUrunAdet).attr("max", data.iAdet);
                    $(txtUrunBirimFiyati).val(data.cSatisFiyati);
                    $(txtUrunFiyat).val(data.cSatisFiyati);
                }

                $(txtUrunBirimFiyati).priceFormat(optionPriceFormat);
                $(txtUrunFiyat).priceFormat(optionPriceFormat);

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
                    "cActionName": "urunEkle4.js",
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
        $(button).parent().parent().parent().remove();
        ProductWrite();
    }
}

function ProductPrint(button) {

    setTimeout(
        function () {
            var txtUrunKodu = $(button).parent().parent().parent().find(".txtUrunKodu");
            var cboUrunAdi = $(button).parent().parent().parent().find(".cboUrunAdi");

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