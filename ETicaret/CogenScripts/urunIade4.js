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

    $("#iKodUrunCikisi4").change(function () {
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

function TedarikciUrunleri(cboTedarikci, deger, islem) {
    if (islem == true) {
        $("#pageLoading").displayBlock();
        $("#cUrun4ListesiValidation").text("");

        var cboUrunAdi = $(cboTedarikci).parent().parent().parent().find(".cboUrunAdi");

        $.ajax({
            type: "GET",
            url: "/api/urun4api/0/" + $(cboTedarikci).val() + "/0?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $(cboUrunAdi).empty();
                    $(cboUrunAdi).append($('<option>', {
                        value: 0,
                        text: "Lütfen ürün seçin ..."
                    }));

                    $.each(data, function (i, item) {
                        $(cboUrunAdi).append($('<option>', {
                            value: item.iKodUrun4,
                            text: item.cAdi
                        }));
                    });

                    $(cboUrunAdi).val(deger).trigger('change');
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

function ListProduct() {
    $("#pageLoading").displayBlock();
    $("#urun4ListesiBaslik").displayNone();
    $("#urun4Listesi").empty();
    $("#tutarlar").displayNone();

    var iKodMusteri4 = 0;
    if ($("#iKodMusteri4").val()) {
        iKodMusteri4 = $("#iKodMusteri4").val();
    }

    $.ajax({
        type: "GET",
        url: "/api/uruncikisi4api/" + iKodMusteri4 + "/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $("#iKodUrunCikisi4").empty();
                $('#iKodUrunCikisi4').append($('<option>', {
                    value: 0,
                    text: "Lütfen ürün çıkışı seçin ..."
                }));
                $('#iKodUrunCikisi4').val(0);

                $.each(data, function (i, item) {
                    $('#iKodUrunCikisi4').append($('<option>', {
                        value: item.iKodUrunCikisi4,
                        text: item.cUrunCikisi4
                    }));
                });

                $("#iKodUrunCikisi4").select2();

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
    $("#urun4Listesi").empty();
    $("#urun4ListesiBaslik").displayNone();
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
                        url: "/api/uruncikisi4urunlistesiapi/" + $("#iKodUrunCikisi4").val() + "/?" + new Date(),
                        contentType: "json",
                        dataType: "json",
                        success: function (data) {
                            if (data != null) {
                                $.ajax({
                                    type: "GET",
                                    url: "/api/tedarikci3api/?" + new Date(),
                                    contentType: "json",
                                    dataType: "json",
                                    success: function (data3) {
                                        iUrunId = -1;
                                        $.each(data, function (i, item) {
                                            $.ajax({
                                                type: "GET",
                                                url: "/api/urun4api/0/" + item.iKodTedarikci3 + "/0?" + new Date(),
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
                                                            "<label for=\"iKodUrun\">Tedarikçi</label>" +
                                                            "<select onchange=\"TedarikciUrunleri(this, 0, false)\" class=\"form-control cboTedarikci3\" id=\"iKodTedarikci3-" + iUrunId + "\" tabindex=\"2\" disabled=\"disabled\">" +
                                                            "<option value =\"0\">Lütfen tedarikçi seçin ...</option>";

                                                        $.each(data3, function (i, item3) {
                                                            if (item.iKodTedarikci3 == item3.iKodTedarikci3) {
                                                                cHTML += "<option value=\"" + item3.iKodTedarikci3 + "\" selected>" + item3.cAdi + "</option>";
                                                            } else {
                                                                cHTML += "<option value=\"" + item3.iKodTedarikci3 + "\">" + item3.cAdi + "</option>";
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
                                                            if (item.iKodUrun4 == item2.iKodUrun4) {
                                                                cHTML += "<option value=\"" + item2.iKodUrun4 + "\" selected>" + item2.cAdi + "</option>";
                                                            } else {
                                                                cHTML += "<option value=\"" + item2.iKodUrun4 + "\">" + item2.cAdi + "</option>";
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
                                                            "<div class=\"col-md-2\">" +
                                                            "<a class=\"btn btn-secondary btn-block btn-delete-3\" data-toggle=\"collapse\" href=\"#digerOzellikler-" + iUrunId + "\" role=\"button\" aria-expanded=\"false\" aria-controls=\"digerOzellikler-" + iUrunId + "\" tabindex=\"7\">Diğer Özellikler</a>" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "<div id=\"digerOzellikler-" + iUrunId + "\" data-id=\"" + iUrunId + "\" class=\"multi-collapse mt-3 collapse\" style=\"\">" +
                                                            "<div class=\"row\">" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cKoltukRenkKodu\">Koltuk Renk Kodu</label>" +
                                                            "<input value=\"" + item.cKoltukRenkKodu + "\" autocomplete=\"off\" class=\"form-control txtKoltukRenkKodu\" id=\"cKoltukRenkKodu-" + iUrunId + "\" data-val=\"true\" data-val-number=\"The field Koltuk Renk Kodu must be a number.\" data-val-required=\"Koltuk Renk Kodu alanı gereklidir.\" maxlength=\"100\" name=\"cKoltukRenkKodu\" onchange=\"ProductWrite()\" placeholder=\"Lütfen koltuk renk kodu girin ...\" tabindex=\"10\" type=\"text\"  disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cMasaTabla\">(Ahşap Renkleri - Masa) Tabla</label>" +
                                                            "<input value=\"" + item.cMasaTabla + "\" autocomplete=\"off\" class=\"form-control txtMasaTabla\" id=\"cMasaTabla-" + iUrunId + "\" maxlength=\"100\" name=\"cMasaTabla\" onchange=\"ProductWrite()\" placeholder=\"Lütfen tabla rengi girin ...\" tabindex=\"9\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cMasaOnPerde\">(Ahşap Renkleri - Masa) Ön Perde</label>" +
                                                            "<input value=\"" + item.cMasaOnPerde + "\" autocomplete=\"off\" class=\"form-control txtMasaOnPerde\" id=\"cMasaOnPerde-" + iUrunId + "\" maxlength=\"100\" name=\"cMasaOnPerde\" onchange=\"ProductWrite()\" placeholder=\"Lütfen ön perde rengi girin ...\" tabindex=\"10\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3\">" +
                                                            "<label for=\"cEtajerGovde\">(Ahşap Renkleri - Etajer) Gövde</label>" +
                                                            "<input value=\"" + item.cEtajerGovde + "\" autocomplete=\"off\" class=\"form-control txtEtajerGovde\" id=\"cEtajerGovde-0" + iUrunId + "\" maxlength=\"100\" name=\"cEtajerGovde\" onchange=\"ProductWrite()\" placeholder=\"Lütfen gövde rengi girin ...\" tabindex=\"11\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "<div class=\"row\">" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cEtajerTac\">(Ahşap Renkleri - Etajer) Taç</label>" +
                                                            "<input value=\"" + item.cEtajerTac + "\" autocomplete=\"off\" class=\"form-control txtEtajerTac\" id=\"cEtajerTac-" + iUrunId + "\" maxlength=\"100\" name=\"cEtajerTac\" onchange=\"ProductWrite()\" placeholder=\"Lütfen taç rengi girin ...\" tabindex=\"12\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cEtajerKapak\">(Ahşap Renkleri - Etajer) Kapak</label>" +
                                                            "<input value=\"" + item.cEtajerKapak + "\" autocomplete=\"off\" class=\"form-control txtEtajerKapak\" id=\"cEtajerKapak-" + iUrunId + "\" maxlength=\"100\" name=\"cEtajerKapak\" onchange=\"ProductWrite()\" placeholder=\"Lütfen kapak rengi girin ...\" tabindex=\"13\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cEtajerKlapa\">(Ahşap Renkleri - Etajer) Klapa</label>" +
                                                            "<input value=\"" + item.cEtajerKlapa + "\" autocomplete=\"off\" class=\"form-control txtEtajerKlapa\" id=\"cEtajerKlapa-" + iUrunId + "\" maxlength=\"100\" name=\"cEtajerKlapa\" onchange=\"ProductWrite()\" placeholder=\"Lütfen klapa rengi girin ...\" tabindex=\"14\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3\">" +
                                                            "<label for=\"cKesonGovde\">(Ahşap Renkleri - Keson) Gövde</label>" +
                                                            "<input value=\"" + item.cKesonGovde + "\" autocomplete=\"off\" class=\"form-control txtKesonGovde\" id=\"cKesonGovde-" + iUrunId + "\" maxlength=\"100\" name=\"cKesonGovde\" onchange=\"ProductWrite()\" placeholder=\"Lütfen gövde rengi girin ...\" tabindex=\"15\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "<div class=\"row\">" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cKesonTac\">(Ahşap Renkleri - Keson) Taç</label>" +
                                                            "<input value=\"" + item.cKesonTac + "\" autocomplete=\"off\" class=\"form-control txtKesonTac\" id=\"cKesonTac-" + iUrunId + "\" maxlength=\"100\" name=\"cKesonTac\" onchange=\"ProductWrite()\" placeholder=\"Lütfen taç rengi girin ...\" tabindex=\"16\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cKesonKlapa\">(Ahşap Renkleri - Keson) Klapa</label>" +
                                                            "<input value=\"" + item.cKesonKlapa + "\" autocomplete=\"off\" class=\"form-control txtKesonKlapa\" id=\"cKesonKlapa-" + iUrunId + "\" maxlength=\"100\" name=\"cKesonKlapa\" onchange=\"ProductWrite()\" placeholder=\"Lütfen klapa rengi girin ...\" tabindex=\"17\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cBasicGrubuAyak\">(Metal Renkleri - Basic Grubu) Ayak</label>" +
                                                            "<input value=\"" + item.cBasicGrubuAyak + "\" autocomplete=\"off\" class=\"form-control txtBasicGrubuAyak\" id=\"cBasicGrubuAyak-" + iUrunId + "\" maxlength=\"100\" name=\"cBasicGrubuAyak\" onchange=\"ProductWrite()\" placeholder=\"Lütfen ayak rengi girin ...\" tabindex=\"18\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3\">" +
                                                            "<label for=\"cBasicGrubuTraversAtki\">(Metal Renkleri - Basic Grubu) Travers/Atkı</label>" +
                                                            "<input value=\"" + item.cBasicGrubuTraversAtki + "\" autocomplete=\"off\" class=\"form-control txtBasicGrubuTraversAtki\" id=\"cBasicGrubuTraversAtki-" + iUrunId + "\" maxlength=\"100\" name=\"cBasicGrubuTraversAtki\" onchange=\"ProductWrite()\" placeholder=\"Lütfen travers/atkı rengi girin ...\" tabindex=\"19\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "<div class=\"row\">" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cBasicGrubuKose\">(Metal Renkleri - Basic Grubu) Köşe</label>" +
                                                            "<input value=\"" + item.cBasicGrubuKose + "\" autocomplete=\"off\" class=\"form-control txtBasicGrubuKose\" id=\"cBasicGrubuKose-" + iUrunId + "\" maxlength=\"100\" name=\"cBasicGrubuKose\" onchange=\"ProductWrite()\" placeholder=\"Lütfen köşe rengi girin ...\" tabindex=\"20\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cDolapRenkleriGovde\">(Dolap Renkleri) Gövde</label>" +
                                                            "<input value=\"" + item.cDolapRenkleriGovde + "\" autocomplete=\"off\" class=\"form-control txtDolapRenkleriGovde\" id=\"cDolapRenkleriGovde-" + iUrunId + "\" maxlength=\"100\" name=\"cDolapRenkleriGovde\" onchange=\"ProductWrite()\" placeholder=\"Lütfen gövde rengi girin ...\" tabindex=\"21\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cDolapRenkleriTac\">(Dolap Renkleri) Taç</label>" +
                                                            "<input value=\"" + item.cDolapRenkleriTac + "\" autocomplete=\"off\" class=\"form-control txtDolapRenkleriTac\" id=\"cDolapRenkleriTac-" + iUrunId + "\" maxlength=\"100\" name=\"cDolapRenkleriTac\" onchange=\"ProductWrite()\" placeholder=\"Lütfen taç rengi girin ...\" tabindex=\"22\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3\">" +
                                                            "<label for=\"cDolapRenkleriKapak\">(Dolap Renkleri) Kapak</label>" +
                                                            "<input value=\"" + item.cDolapRenkleriKapak + "\" autocomplete=\"off\" class=\"form-control txtDolapRenkleriKapak\" id=\"cDolapRenkleriKapak-" + iUrunId + "\" maxlength=\"100\" name=\"cDolapRenkleriKapak\" onchange=\"ProductWrite()\" placeholder=\"Lütfen kapak rengi girin ...\" tabindex=\"23\" type=\"text\" disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "<div class=\"row\">" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"iKodSiparisDurumu\">Sipariş Durumu</label>" +
                                                            "<select onchange=\"ProductWrite()\" class=\"form-control cboSiparisDurumu\" id=\"iKodSiparisDurumu-" + iUrunId + "\" tabindex=\"26\"  disabled=\"disabled\">" +
                                                            "<option value =\"0\">Lütfen sipariş durumu seçin ...</option>" +
                                                            cHTML5 +
                                                            "</select>" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cIrsaliyeNo\">İrsaliye No</label>" +
                                                            "<input value=\"" + item.cIrsaliyeNo + "\" autocomplete=\"off\" class=\"form-control txtIrsaliyeNo\" id=\"cIrsaliyeNo-" + iUrunId + "\" maxlength=\"100\" name=\"cIrsaliyeNo\" onchange=\"ProductWrite()\" placeholder=\"Lütfen irsaliye no girin ...\" tabindex=\"28\" type=\"text\" value=\"\"  disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3 pr-0\">" +
                                                            "<label for=\"cDuzenlenmeTarihi\">Düzenlenme Tarihi</label>" +
                                                            "<input value=\"" + item.cDuzenlenmeTarihi + "\" autocomplete=\"off\" class=\"form-control txtDuzenlenmeTarihi\" id=\"cDuzenlenmeTarihi-" + iUrunId + "\" maxlength=\"100\" name=\"cDuzenlenmeTarihi\" onchange=\"ProductWrite()\" placeholder=\"Lütfen düzenlenme tarihi girin ...\" tabindex=\"27\" type=\"text\" value=\"\"  disabled=\"disabled\">" +
                                                            "</div>" +
                                                            "<div class=\"form-group col-md-3\">" +
                                                            "<label for=\"cFiiliSevkTarihi\">Fiili Sevk Tarihi</label>" +
                                                            "<input value=\"" + item.cFiiliSevkTarihi + "\" autocomplete=\"off\" class=\"form-control txtFiiliSevkTarihi\" id=\"cFiiliSevkTarihi-" + iUrunId + "\" maxlength=\"100\" name=\"cFiiliSevkTarihi\" onchange=\"ProductWrite()\" placeholder=\"Lütfen fiili sevk tarihi girin ...\" tabindex=\"27\" type=\"text\" value=\"\"  disabled=\"disabled\">" +
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

                                                        $("#urun4Listesi").append(cHTML);

                                                        $("#iKodTedarikci").select2();
                                                        $("#iKodTedarikci3-0").select2();
                                                        $("#iKodUrun-0").select2();
                                                        $("#iKodSiparisDurumu-0").select2();
                                                        $("#cDuzenlenmeTarihi-0").datepicker(dataPickerOption);
                                                        $("#cFiiliSevkTarihi-0").datepicker(dataPickerOption);

                                                        $("#iKodTedarikci3-" + iUrunId).select2();
                                                        $("#iKodUrun-" + iUrunId).select2();
                                                        $("#cBirimFiyati-" + iUrunId).priceFormat(optionPriceFormat);
                                                        $("#cFiyat-" + iUrunId).priceFormat(optionPriceFormat);
                                                        $("#iKodSiparisDurumu-" + iUrunId).select2();
                                                        $("#iKodSiparisDurumu-" + iUrunId).val(item.iKodSiparisDurumu).trigger('change');
                                                        $("#cDuzenlenmeTarihi-" + iUrunId).datepicker(dataPickerOption);
                                                        $("#cFiiliSevkTarihi-" + iUrunId).datepicker(dataPickerOption);
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

                                        $("#urun4ListesiBaslik").displayBlock();
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

function ProductWrite() {
    var fTutar = 0;
    $('#cUrun4Listesi').val('');
    $('#urun4Listesi').find('.urunSatiri').each(function () {
        var fFiyat = OndalikCevir($(this).find('.txtUrunAdet').val() * $(this).find('.txtUrunBirimFiyati').val().replace(",", ""));
        fTutar += fFiyat;
        $(this).find('.txtUrunFiyat').val(fFiyat.toFixed(2));
        $(this).find('.txtUrunFiyat').priceFormat(optionPriceFormat);

        if ($('#cUrun4Listesi').val() != '') {
            $('#cUrun4Listesi').val($('#cUrun4Listesi').val() + "|");
        }

        $('#cUrun4Listesi').val(
            $('#cUrun4Listesi').val() +
            $(this).find('.txtUrunKodu').val() + "*" +
            $(this).find('.cboTedarikci3').val() + "*" +
            $(this).find('.cboUrunAdi').val() + "*" +
            $(this).find('.txtUrunAdet').val() + "*" +
            $(this).find('.txtUrunBirimFiyati').val().replace(",", "") + "*" +
            $(this).find('.txtUrunFiyat').val().replace(",", "") + "*" +
            $(this).find('.txtKoltukRenkKodu').val() + "*" +
            $(this).find('.txtMasaTabla').val() + "*" +
            $(this).find('.txtMasaOnPerde').val() + "*" +
            $(this).find('.txtEtajerGovde').val() + "*" +
            $(this).find('.txtEtajerTac').val() + "*" +
            $(this).find('.txtEtajerKapak').val() + "*" +
            $(this).find('.txtEtajerKlapa').val() + "*" +
            $(this).find('.txtKesonGovde').val() + "*" +
            $(this).find('.txtKesonTac').val() + "*" +
            $(this).find('.txtKesonKlapa').val() + "*" +
            $(this).find('.txtBasicGrubuAyak').val() + "*" +
            $(this).find('.txtBasicGrubuTraversAtki').val() + "*" +
            $(this).find('.txtBasicGrubuKose ').val() + "*" +
            $(this).find('.txtDolapRenkleriGovde').val() + "*" +
            $(this).find('.txtDolapRenkleriTac').val() + "*" +
            $(this).find('.txtDolapRenkleriKapak').val() + "*" +
            $(this).find('.cboSiparisDurumu').val() + "*" +
            $(this).find('.txtIrsaliyeNo').val() + "*" +
            $(this).find('.txtDuzenlenmeTarihi').val() + "*" +
            $(this).find('.txtFiiliSevkTarihi').val() + "*" +
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
