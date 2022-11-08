var iUrunId = 0;

$(function () {

    $("#btnSave").click(function () {
        $("#form").submit();
    });

    $('#cokluUrunEkleModal').on('shown.bs.modal', function () {
        $('#cBarkodlar').focus();
    });

    $("#iKodMusteri4").change(function () {
        ListProduct();
    });

    $("#iKodUrunCikisi5").change(function () {
        ProductOutlet();
    });

    $('.collapse').on('show.bs.collapse', function () {
        var id = $(this).attr("data-id");
        setTimeout(
            function () {
                $('#iKodSiparisDurumu-' + id).select2();
            }, 100);
    });
});



function ListProduct() {
    $("#pageLoading").displayBlock();
    $("#urun5ListesiBaslik").displayNone();
    $("#urun5Listesi").empty();
    $("#tutarlar").displayNone();

    var iKodMusteri4 = 0;
    if ($("#iKodMusteri4").val()) {
        iKodMusteri4 = $("#iKodMusteri4").val();
    }

    $.ajax({
        type: "GET",
        url: "/api/uruncikisi5api/" + iKodMusteri4 + "/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $("#iKodUrunCikisi5").empty();
                $('#iKodUrunCikisi5').append($('<option>', {
                    value: 0,
                    text: "Lütfen ürün çıkışı seçin ..."
                }));
                $('#iKodUrunCikisi5').val(0);

                $.each(data, function (i, item) {
                    $('#iKodUrunCikisi5').append($('<option>', {
                        value: item.iKodUrunCikisi5,
                        text: item.cUrunCikisi5
                    }));
                });

                $("#iKodUrunCikisi5").select2();

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
    $("#urun5Listesi").empty();
    $("#urun5ListesiBaslik").displayNone();
    $("#tutarlar").displayNone();

    $.ajax({
        type: "GET",
        url: "/api/siparisdurumuapi/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data5) {
            if (data5 != null) {

                if (data5.length > 0) {
                    var cHTML5 = '';

                    $.each(data5, function (i, item5) {
                        if (item5 && item5.iKodSiparisDurumu && item5.cAdi) {
                            cHTML5 += "<option value=\"" + item5.iKodSiparisDurumu + "\">" + item5.cAdi + "</option>";
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: "/api/uruncikisi5urunlistesiapi/" + $("#iKodUrunCikisi5").val() + "/?" + new Date(),
                        contentType: "json",
                        dataType: "json",
                        success: function (data) {
                            if (data != null) {
                                $.ajax({
                                    type: "GET",
                                    url: "/api/depoapi/?" + new Date(),
                                    contentType: "json",
                                    dataType: "json",
                                    success: function (data3) {
                                        iUrunId = -1;
                                        $.each(data, function (i, item) {
                                            $.ajax({
                                                type: "GET",
                                                url: "/api/urun5api/0/" + item.iKodiKodDepo + "/0?" + new Date(),
                                                contentType: "json",
                                                dataType: "json",
                                                success: function (data2) {
                                                    if (data2 != null) {

                                                        iUrunId = iUrunId + 1;
                                                        var cHTML =
                                                            "<div class=\"urunSatiri\">" +
                                                            "<div class=\"row\">" +
                                                            "<div class=\"form-group col-md-1 pr-0\">" +
                                                            "<label for=\"cKodu\">Ürün Kodu</label>" +
                                                            "<input value=\"" + item.cKodu + "\" onkeypress=\"ProductCode(this)\" autocomplete=\"off\" class=\"form-control txtUrunKodu\" id=\"cKodu-" + iUrunId + "\" maxlength=\"100\" name=\"cKodu\" placeholder=\"Lütfen ürün kodu girin ...\" tabindex=\"1\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class= \"form-group col-md-3 pr-0\" >" +
                                                            "<label for=\"iKodUrun\">Depo</label>" +
                                                            "<select onchange=\"ProductWrite()\" class=\"form-control cboDepo\" id=\"iKodDepo-" + iUrunId + "\" tabindex=\"2\" disabled=\"disabled\">" +
                                                            "<option value =\"0\">Lütfen depo seçin ...</option>";

                                                        $.each(data3, function (i, item3) {
                                                            if (item.iKodDepo == item3.iKodDepo) {
                                                                cHTML += "<option value=\"" + item3.iKodDepo + "\" selected>" + item3.cAdi + "</option>";
                                                            } else {
                                                                cHTML += "<option value=\"" + item3.iKodDepo + "\">" + item3.cAdi + "</option>";
                                                            }
                                                        });

                                                        cHTML +=
                                                            "</select>" +
                                                            "</div>" +
                                                            "<div class= \"form-group col-md-3 pr-0\" >" +
                                                            "<label for=\"iKodUrun\">Ürün</label>" +
                                                            "<select onchange=\"Product(this)\" class=\"form-control cboUrunAdi\" id=\"iKodUrun-" + iUrunId + "\" tabindex=\"3\" disabled=\"disabled\">" +
                                                            "<option value =\"0\">Lütfen ürün seçin ...</option>";

                                                        $.each(data2, function (i, item2) {
                                                            if (item.iKodUrun5 == item2.iKodUrun5) {
                                                                cHTML += "<option value=\"" + item2.iKodUrun5 + "\" selected>" + item2.cAdi + "</option>";
                                                            } else {
                                                                cHTML += "<option value=\"" + item2.iKodUrun5 + "\">" + item2.cAdi + "</option>";
                                                            }
                                                        });

                                                        cHTML +=
                                                            "</select>" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-1 pr-0\">" +
                                                            "<label for=\"iAdet\">Adet</label>" +
                                                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunAdet\" id=\"iAdet-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen adet girin ...\" type=\"number\" value=\"0\" tabindex=\"4\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-1 pr-0\">" +
                                                            "<label for=\"iAdet\">Birim Fiyatı</label>" +
                                                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunBirimFiyati\" id=\"cBirimFiyati-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen birim fiyatı girin ...\" value=\"" + item.cBirimFiyati + "\" tabindex=\"5\" readonly=\"readonly\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-1 pr-0\">" +
                                                            "<label for=\"iAdet\">Fiyat</label>" +
                                                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunFiyat\" id=\"cFiyat-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen fiyat girin ...\" value=\"" + item.cFiyat + "\" tabindex=\"6\" readonly=\"readonly\">" +
                                                            "</div>" +
                                                            "<div class=\"col-md-2 \">" +
                                                            "<a class=\"btn btn-secondary btn-block btn-delete-3\" data-toggle=\"collapse\" href=\"#digerOzellikler-" + iUrunId + "\" role=\"button\" aria-expanded=\"false\" aria-controls=\"digerOzellikler-" + iUrunId + "\" tabindex=\"7\">Diğer Özellikler</a>" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "<div id=\"digerOzellikler-" + iUrunId + "\" data-id=\"" + iUrunId + "\" class=\"multi-collapse mt-3 collapse\" style=\"\">" +
                                                            "<div class=\"row\">" +
                                                            "<div class=\"form-group col-md-4 pr-0\">" +
                                                            "<label for=\"iKodSiparisDurumu\">Sipariş Durumu</label>" +
                                                            "<select onchange=\"ProductWrite()\" class=\"form-control cboSiparisDurumu\" id=\"iKodSiparisDurumu-" + iUrunId + "\" tabindex=\"26\"  disabled=\"disabled\">" +
                                                            "<option value =\"0\">Lütfen sipariş durumu seçin ...</option>" +
                                                            cHTML5 +
                                                            "</select>" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-2 pr-0\">" +
                                                            "<label for=\"cFiiliSevkTarihi\">Fiili Sevk Tarihi</label>" +
                                                            "<input value=\"" + item.cFiiliSevkTarihi + "\" autocomplete=\"off\" class=\"form-control txtFiiliSevkTarihi\" id=\"cFiiliSevkTarihi-" + iUrunId + "\" maxlength=\"100\" name=\"cFiiliSevkTarihi\" onchange=\"ProductWrite()\" placeholder=\"Lütfen fiili sevk tarihi girin ...\" tabindex=\"27\" type=\"text\" value=\"\"  disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-2 pr-0\">" +
                                                            "<label for=\"cIrsaliyeNo\">İrsaliye No</label>" +
                                                            "<input value=\"" + item.cIrsaliyeNo + "\" autocomplete=\"off\" class=\"form-control txtIrsaliyeNo\" id=\"cIrsaliyeNo-" + iUrunId + "\" maxlength=\"100\" name=\"cIrsaliyeNo\" onchange=\"ProductWrite()\" placeholder=\"Lütfen irsaliye no girin ...\" tabindex=\"28\" type=\"text\" value=\"\"  disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-2 pr-0\">" +
                                                            "<label for=\"cDuzenlenmeTarihi\">Düzenlenme Tarihi</label>" +
                                                            "<input value=\"" + item.cDuzenlenmeTarihi + "\" autocomplete=\"off\" class=\"form-control txtDuzenlenmeTarihi\" id=\"cDuzenlenmeTarihi-" + iUrunId + "\" maxlength=\"100\" name=\"cDuzenlenmeTarihi\" onchange=\"ProductWrite()\" placeholder=\"Lütfen düzenlenme tarihi girin ...\" tabindex=\"29\" type=\"text\" value=\"\"  disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-2 pr-0\">" +
                                                            "<label for=\"cTeslimatTarihi\">Teslimat Tarihi</label>" +
                                                            "<input value=\"" + item.cTeslimatTarihi + "\" autocomplete=\"off\" class=\"form-control txtTeslimatTarihi\" id=\"cTeslimatTarihi-" + iUrunId + "\" maxlength=\"100\" name=\"cTeslimatTarihi\" onchange=\"ProductWrite()\" placeholder=\"Lütfen teslimat tarihi girin ...\" tabindex=\"30\" type=\"text\" value=\"\"  disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "<div class=\"row\">" +
                                                            "<div class=\"form-group col-md-12\">" +
                                                            "<label for=\"cAciklama\">Özel Talep</label>" +
                                                            "<input value=\"" + item.cAciklama + "\" autocomplete=\"off\" class=\"form-control txtAciklama\" id=\"cAciklama-" + iUrunId + "\" name=\"cAciklama\" onchange=\"ProductWrite()\" placeholder=\"Lütfen özel talep girin ...\" tabindex=\"24\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "</div>";

                                                        $("#urun5Listesi").append(cHTML);

                                                        $("#iKodDepo").select2();
                                                        $("#iKodDepo-0").select2();
                                                        $("#iKodUrun-0").select2();

                                                        $("#iKodDepo-" + iUrunId).select2();
                                                        $("#iKodUrun-" + iUrunId).select2();
                                                        $("#cBirimFiyati-" + iUrunId).priceFormat(optionPriceFormat);
                                                        $("#cFiyat-" + iUrunId).priceFormat(optionPriceFormat);
                                                        $("#iKodSiparisDurumu-" + iUrunId).select2();
                                                        $("#iKodSiparisDurumu-" + iUrunId).val(item.iKodSiparisDurumu).trigger('change');
                                                        $("#cFiiliSevkTarihi-" + iUrunId).datepicker(dataPickerOption);
                                                        $("#cDuzenlenmeTarihi-" + iUrunId).datepicker(dataPickerOption);
                                                        $("#cTeslimatTarihi-" + iUrunId).datepicker(dataPickerOption);
                                                        $("#cKodu-" + iUrunId).focus();

                                                        $('.collapse').on('show.bs.collapse', function () {
                                                            var id = $(this).attr("data-id");
                                                            setTimeout(
                                                                function () {
                                                                    $('#iKodSiparisDurumu-' + id).select2();
                                                                }, 100);
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
                                                            "cActionName": "urunEkle2.js",
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
                                        });

                                        ProductWrite();

                                        $("#urun5ListesiBaslik").displayBlock();
                                        $("#tutarlar").displayBlock();
                                        $("#iKDVTuru").select2();
                                        $("#iKDVOrani").select2();

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
                    "cActionName": "urunEkle5.js",
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

function ProductWrite() {
    var fTutar = 0;
    $('#cUrun5Listesi').val('');
    $('#urun5Listesi').find('.urunSatiri').each(function () {
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
            $(this).find('.txtIrsaliyeNo').val() + "*" +
            $(this).find('.txtDuzenlenmeTarihi').val() + "*" +
            $(this).find('.txtTeslimatTarihi').val() + "*" +
            $(this).find('.txtAciklama').val());
    });

    $('#cTutar').val(fTutar.toFixed(2));
    $('#cGenelTutar').val(fTutar.toFixed(2));

    if ($('#iKDVTuru').val() == 1) {
        if ($('#iKDVOrani').val() == 1) {
            $('#cGenelTutar').val(fTutar.toFixed(2));
        } else if ($('#iKDVOrani').val() == 2) {
            $('#cGenelTutar').val((fTutar * 1.01).toFixed(2));
        } else if ($('#iKDVOrani').val() == 3) {
            $('#cGenelTutar').val((fTutar * 1.08).toFixed(2));
        } else if ($('#iKDVOrani').val() == 4) {
            $('#cGenelTutar').val((fTutar * 1.10).toFixed(2));
        } else if ($('#iKDVOrani').val() == 5) {
            $('#cGenelTutar').val((fTutar * 1.18).toFixed(2));
        }
    } else {
        $('#cGenelTutar').val(fTutar.toFixed(2));
    }

    $('#cTutar').priceFormat(optionPriceFormat);
    $('#cGenelTutar').priceFormat(optionPriceFormat);
}

function OndalikCevir(deger) {
    var dec = 2;
    var result = Math.round(deger * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}
