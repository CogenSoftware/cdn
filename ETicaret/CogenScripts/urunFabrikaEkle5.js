var iUrunId = 0;

$(function () {
    ProductWrite();

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

    $("#iKodUrunKategori").change(function () {
        UrunKategoriListele();
    });


});

function ProductAdd() {
    $("#pageLoading").displayBlock();
    $("#cUrun5ListesiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iUrunId + 1; i++) {
        if ($("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0) {
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

function ProductAdd2(iKodUrun) {
    $.ajax({
        type: "GET",
        url: "/api/depoapi/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                for (var i = 0; i < iUrunId + 1; i++) {
                    if ($("#iKodDepo-" + i).val() == 0 || $("#iKodUrun-" + i).val() == 0 || $("#iAdet-" + i).val() == 0) {
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

                    $.ajax({
                        type: "GET",
                        url: "/api/urun5api/1/?" + new Date(),
                        contentType: "json",
                        dataType: "json",
                        success: function (data2) {
                            console.log(data2)
                            if (data2 != null) {
                                if (data2.length > 0) {
                                    var cHTML2 = '';
                                    $.each(data2, function (i, item2) {
                                        if (item2 && item2.iKodUrun5 && item2.cAdi) {
                                            cHTML2 += "<option value=\"" + item2.iKodUrun5 + "\">" + item2.cAdi + "</option>";
                                        }
                                    });


                                    if (cHTML != '') {
                                        cHTML =
                                            "<div class=\"urunSatiri\">" +
                                            "<div class=\"row\">" +
                                            "<div class=\"form-group col-md-2 pr-0\">" +
                                            "<label for=\"cKodu\">Ürün Kodu</label>" +
                                            "<input onkeypress=\"ProductCode(this)\" autocomplete=\"off\" class=\"form-control txtUrunKodu\" id=\"cKodu-" + iUrunId + "\" maxlength=\"100\" name=\"cKodu\" placeholder=\"Lütfen ürün kodu girin ...\" tabindex=\"3\">" +
                                            "</div>" +
                                            "<div class= \"form-group col-md-7 pr-0\" >" +
                                            "<label for=\"iKodUrun\">Ürün</label>" +
                                            "<select onchange=\"Product(this)\" class=\"form-control cboUrunAdi\" id=\"iKodUrun-" + iUrunId + "\" tabindex=\"3\">" +
                                            "<option value =\"0\">Lütfen ürün seçin ...</option>" +
                                            cHTML2 +
                                            "</select>" +
                                            "</div>" +
                                            "<div class=\"form-group col-md-2 pr-0\">" +
                                            "<label for=\"iAdet\">Adet</label>" +
                                            "<input onchange=\"ProductWrite()\" autocomplete=\"off\" class=\"form-control txtUrunAdet\" id=\"iAdet-" + iUrunId + "\" maxlength=\"100\" name=\"iAdet\" placeholder=\"Lütfen adet girin ...\" type=\"number\" value=\"1\" tabindex=\"3\">" +
                                            "</div>" +
                                            "<div class=\"col-md-1 buttons-3\">" +
                                            "<button onclick=\"ProductPrint(this)\" type=\"button\" style=\"margin-right: 4px;\" class=\"btn btn-secondary btn-block btn-delete-3\" tabindex=\"7\"><i class=\"fa fa-print\"></i></button>" +
                                            "<button onclick=\"ProductDelete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete-3\" tabindex=\"8\"><i class=\"fa fa-trash\"></i></button>" +
                                            "</div>" +
                                            "</div>" +
                                            "</div>";

                                        $("#urun5Listesi").append(cHTML);

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


function ProductCode(txtUrunKodu) {
    var keycode = event.keyCode;
    if (keycode == '13') {
        $("#pageLoading").displayBlock();
        $("#cUrun5ListesiValidation").text("");

        var cboUrunAdi = $(txtUrunKodu).parent().parent().parent().find(".cboUrunAdi");
        var txtUrunAdet = $(txtUrunKodu).parent().parent().parent().find(".txtUrunAdet");

        $.ajax({
            type: "GET",
            url: "/api/urunkodu4api/" + $(txtUrunKodu).val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    var lVarMi = false;

                    if (lVarMi == false) {

                        $(cboUrunAdi).val(data.iKodUrun5).trigger('change');
                        $(txtUrunAdet).val(1);

                        ProductAdd(false);

                        $('#cUrun5Listesi').val('');
                        $('#urun5Listesi').find('.row').each(function () {
                            if ($('#cUrun5Listesi').val() != '') {
                                $('#cUrun5Listesi').val($('#cUrun5Listesi').val() + "|");
                            }

                            $('#cUrun5Listesi').val($('#cUrun5Listesi').val() + $(this).find('.txtUrunKodu').val() + "*" + $(this).find('.cboUrunAdi').val() + "*" + $(this).find('.txtUrunAdet').val())
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
}

function ProductWrite() {

    $('#cUrun5Listesi').val('');
    $('#urun5Listesi').find('.urunSatiri').each(function () {

        if ($('#cUrun5Listesi').val() != '') {
            $('#cUrun5Listesi').val($('#cUrun5Listesi').val() + "|");
        }

        $('#cUrun5Listesi').val(
            $('#cUrun5Listesi').val() +
            $(this).find('.txtUrunKodu').val() + "*" +
            iKodDepo + "*" +
            $(this).find('.cboUrunAdi').val() + "*" +
            $(this).find('.txtUrunAdet').val());

    });
}

function Product(cboUrunAdi) {

    $("#pageLoading").displayBlock();
    $("#cUrun5ListesiValidation").text("");
    var txtUrunKodu = $(cboUrunAdi).parent().parent().parent().find(".txtUrunKodu");
    var txtUrunAdet = $(cboUrunAdi).parent().parent().parent().find(".txtUrunAdet");

    $.ajax({
        type: "GET",
        url: "/api/urun5api/1/" + $(cboUrunAdi).val() + "/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $(txtUrunKodu).val(data.cKodu);
                if ($(txtUrunAdet).val() == 0) {
                    $(txtUrunAdet).val(1);
                }
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
                '<div class="ilgi">' +
                '<img src="/Images/yildiz-logo.png?date=22032020" style="width: 251px;margin: 0px auto;display: block;"/>' +
                '<p class="barkod-no" style="text-align: center;margin: 0px;font-size: 20px;font-weight: 700;">' + res[0] + "</p>" +
                '<p style="text-align: center;font-size: 15px;font-weight: 700;margin: 0px;margin-bottom: 5px;">' + res[1] + "</p>" +
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