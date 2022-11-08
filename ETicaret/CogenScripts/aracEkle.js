var iUrunId = 0;
var lEnter = false;
$(function () {
    $(document).on('keyup keypress', function (e) {
        if (e.which == 13 && lEnter == false) {
            e.preventDefault();
            lEnter = true;
            $("#form").submit();
            return false;
        }
    });

    document.addEventListener("keydown", keyDownTextField, false);

    function keyDownTextField(e) {
        var keyCode = e.keyCode;

        if (keyCode == 113) {
            e.preventDefault();
            lEnter = true;
            $("#iEkleFormuAcilsinMi").val(1);
            $("#form").submit();
        }
    }

    $("#cDuzeltme").change(function () {
        ProductWrite();
    });

    $("#iDuzeltmeTipi").change(function () {
        ProductWrite();
    });

    $("#btnAdd").click(function () {
        ProductAdd();
    });

    $(".cboUrunAdi").change(function () {
        Product(this);
    });
});

function ProductAdd() {
    $("#pageLoading").displayBlock();
    $("#cUrun2ListesiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iUrunId + 1; i++) {
        if ($("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0 || $("#cBirimFiyati-" + i).val() == '' || $("#cFiyat-" + i).val() == '' || $("#cBirimFiyati-" + i).val() == "0.00" || $("#cFiyat-" + i).val() == "0.00") {
            lSecimYap = false;
        }
    }

    if (lSecimYap == false) {
        $("#cUrun2ListesiValidation").text("Lütfen bu alanı doldurun!");
        $("#pageLoading").displayNone();
    } else {
        ProductAdd2(0);
    }
}

function ProductAdd2(iKodUrun) {
    $.ajax({
        type: "GET",
        url: "/api/urun2api/" + iKodLokasyonLogin + "?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                for (var i = 0; i < iUrunId + 1; i++) {
                    if ($("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0 || $("#cBirimFiyati-" + i).val() == '' || $("#cFiyat-" + i).val() == '' || $("#cBirimFiyati-" + i).val() == "0.00" || $("#cFiyat-" + i).val() == "0.00") {
                        $("#iKodUrun-" + i).parent().parent().remove();
                    }
                }

                iUrunId = iUrunId + 1;

                if (data.length > 0) {
                    var cHTML = '';

                    $.each(data, function (i, item) {
                        if (item && item.iKodUrun2 && item.cAdi) {
                            cHTML += "<option value=\"" + item.iKodUrun2 + "\">" + item.cAdi + "</option>";
                        }
                    });

                    if (cHTML != '') {
                        cHTML =
                            "<div class=\"row\">" +
                            "<div class=\"form-group col-md-2 pr-0\">" +
                            "<input type=\"hidden\" id=\"iStokTutlacakMi-" + iUrunId + "\" name=\"iStokTutlacakMi\" class=\"txtStokTutlacakMi\" value=\"1\">" +
                            "<label for=\"cKodu\">Ürün Kodu</label>" +
                            "<input onkeypress=\"ProductCode(this)\" autocomplete=\"off\" class=\"form-control txtUrunKodu\" id=\"cKodu-" + iUrunId + "\" maxlength=\"100\" name=\"cKodu\" placeholder=\"Lütfen ürün kodu girin ...\" tabindex=\"3\">" +
                            "</div>" +
                            "<div class= \"form-group col-md-4 pr-0\" >" +
                            "<label for=\"iKodUrun\">Ürün</label>" +
                            "<select onchange=\"Product(this)\" class=\"form-control cboUrunAdi\" id=\"iKodUrun-" + iUrunId + "\" tabindex=\"2\">" +
                            "<option value =\"0\">Lütfen ürün seçin ...</option>" +
                            cHTML +
                            "</select>" +
                            "</div>" +
                            "<div class=\"form-group col-md-1 pr-0\">" +
                            "<label for=\"iAdet\">Adet</label>" +
                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunAdet\" id=\"iAdet-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen adet girin ...\" type=\"number\" value=\"1\" tabindex=\"3\">" +
                            "</div>" +
                            "<div class=\"form-group col-md-2 pr-0\">" +
                            "<label for=\"iAdet\">Birim Fiyatı</label>" +
                            "<div class=\"input-group\">" +
                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunBirimFiyati\" id=\"cBirimFiyati-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen birim fiyatı girin ...\" value=\"0.00\" tabindex=\"4\" readonly=\"readonly\">" +
                            "<div class=\"input-group-append\"><span class=\"input-group-text\">TL</span></div>" +
                            "</div>" +
                            "</div>" +
                            "<div class=\"form-group col-md-2 pr-0\">" +
                            "<label for=\"iAdet\">Fiyat</label>" +
                            "<div class=\"input-group\">" +
                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunFiyat\" id=\"cFiyat-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen fiyat girin ...\" value=\"0.00\" tabindex=\"5\" readonly=\"readonly\">" +
                            "<div class=\"input-group-append\"><span class=\"input-group-text\">TL</span></div>" +
                            "</div>" +
                            "</div>" +
                            "<div class=\"col-md-1\">" +
                            "<button onclick=\"ProductDelete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"7\">Sil</button>" +
                            "</div>" +
                            "</div>";

                        $("#urun2Listesi").append(cHTML);

                        $("#iKodTedarikci").select2();
                        $("#iKodUrun-0").select2();

                        if (iKodUrun > 0) {
                            $("#iKodUrun-" + iUrunId).val(iKodUrun);
                            Product($("#iKodUrun-" + iUrunId));
                        }

                        $("#iKodUrun-" + iUrunId).select2();
                        $("#cBirimFiyati-" + iUrunId).priceFormat(optionPriceFormat);
                        $("#cFiyat-" + iUrunId).priceFormat(optionPriceFormat);
                        $("#cBirimFiyati-" + iUrunId).val("0.00");
                        $("#cFiyat-" + iUrunId).val("0.00");
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
}

function Product(cboUrunAdi) {
    $("#pageLoading").displayBlock();
    $("#cUrun2ListesiValidation").text("");
    var txtStokTutlacakMi = $(cboUrunAdi).parent().parent().find(".txtStokTutlacakMi");
    var txtUrunKodu = $(cboUrunAdi).parent().parent().find(".txtUrunKodu");
    var txtUrunAdet = $(cboUrunAdi).parent().parent().find(".txtUrunAdet");
    var txtUrunBirimFiyati = $(txtUrunKodu).parent().parent().find(".txtUrunBirimFiyati");
    var txtUrunFiyat = $(txtUrunKodu).parent().parent().find(".txtUrunFiyat");

    $.ajax({
        type: "GET",
        url: "/api/urun2api/" + iKodLokasyonLogin + "/" + $(cboUrunAdi).val() + "/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data != null) {
                $(txtUrunKodu).val(data.cKodu);
                $(txtUrunAdet).val(1);
                $(txtUrunAdet).attr("max", data.iAdet);
                $(txtUrunBirimFiyati).val(data.cSatisFiyati);
                $(txtUrunFiyat).val(data.cSatisFiyati);

                if (data.lStokTutlacakMi) {
                    $(txtStokTutlacakMi).val("1");
                } else {
                    $(txtStokTutlacakMi).val("0");
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
}

function ProductWrite() {
    $("#pageLoading").displayBlock();

    if ($("#cOtoparkUcreti").val() && $("#cOtoparkUcreti").val() != '') {

        $.ajax({
            type: "GET",
            url: "/api/fiyat2api/" + iKodLokasyonLogin + "/" + $("#iKodAracTipi").val() + "/" + $("#iKodMusteri3").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                var fTutar = OndalikCevir($("#cOtoparkUcreti").val().replace(",", ""));

                if ($('#urun2Listesi').find('.row').length > 0) {

                    var iStokTutlacakMi = 1;
                    $('#urun2Listesi').find('.row').each(function () {
                        if ($(this).find('.txtStokTutlacakMi').val() == 0) {
                            iStokTutlacakMi = 0;
                        }
                    });

                    $('#urun2Listesi').find('.row').each(function () {
                        if (parseInt($("#cOtoparkSuresi").val()) <= 60 && iStokTutlacakMi == 0) {
                            fTutar = 0;
                            $("#cOtoparkUcreti").val(fTutar.toFixed(2));
                        } else if (lDurum == false &&
                            parseInt($("#cOtoparkSuresi").val()) > 60 && iStokTutlacakMi == 0) {
                            lDurum = true;
                            if ($("#iKodAracTipi").val() == 1) {
                                fTutar = fTutar - data.fSaatSatisFiyati;
                            } else if ($("#iKodAracTipi").val() == 2) {
                                fTutar = fTutar - data.fSaatSatisFiyati;
                            }
                            $("#cOtoparkUcreti").val(fTutar.toFixed(2));
                        } else {
                            $("#cOtoparkUcreti").val(fTutar.toFixed(2));
                        }
                    });
                }

                if (lDurum == true && parseInt($("#cOtoparkSuresi").val()) > 60 && $('#urun2Listesi').find('.row').length == 0) {
                    if ($("#iKodAracTipi").val() == 1) {
                        fTutar = fTutar + data.fSaatSatisFiyati;
                    } else if ($("#iKodAracTipi").val() == 2) {
                        fTutar = fTutar + data.fSaatSatisFiyati;
                    }
                    $("#cOtoparkUcreti").val(fTutar.toFixed(2));
                    lDurum = false;
                }

                if (parseInt($("#cOtoparkSuresi").val()) <= 60 && $('#urun2Listesi').find('.row').length == 0) {
                    if ($("#iKodAracTipi").val() == 1) {
                        fTutar = data.fIlkGirisFiyati;
                    } else if ($("#iKodAracTipi").val() == 2) {
                        fTutar = data.fIlkGirisFiyati;
                    }
                    $("#cOtoparkUcreti").val(fTutar.toFixed(2));
                    lDurum = false;
                }

                $('#cUrun2Listesi').val('');
                $('#urun2Listesi').find('.row').each(function () {
                    var fFiyat = OndalikCevir($(this).find('.txtUrunAdet').val() * $(this).find('.txtUrunBirimFiyati').val().replace(",", ""));
                    fTutar += fFiyat;

                    $(this).find('.txtUrunFiyat').val(fFiyat.toFixed(2));

                    if ($('#cUrun2Listesi').val() != '') {
                        $('#cUrun2Listesi').val($('#cUrun2Listesi').val() + "|");
                    }

                    $('#cUrun2Listesi').val($('#cUrun2Listesi').val() + $(this).find('.txtUrunKodu').val() + "*" + $(this).find('.cboUrunAdi').val() + "*" + $(this).find('.txtUrunAdet').val() + "*" + $(this).find('.txtUrunBirimFiyati').val() + "*" + $(this).find('.txtUrunFiyat').val())
                });
                $('#cTutar').val(fTutar.toFixed(2));

                KDVHesapla();

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
                        "cActionName": "aracEkle.js",
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
        $("#pageLoading").displayNone();
    }
}

function ProductDelete(button) {
    if (button) {
        $(button).parent().parent().remove();
        $("#iUrunSilindiMi").val(1);
        ProductWrite();

    }
}