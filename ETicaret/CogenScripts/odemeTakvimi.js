$(function () {
    $("#btnOdemeTakvimi").click(function () {
        OdemeEkle();
    });
});

function OdemeEkle() {
    $("#pageLoading").displayBlock();
    $("#cOdemeTakvimiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iId + 1; i++) {
        if ($("#cOdemeTarihi-" + i).val() == '' || $("#cOdemeTutar-" + i).val() == '' || $("#cOdemeTutar-" + i).val() == 0 || $("#iKodOdemeYontemi2-" + i).val() == 0) {
            lSecimYap = false;
        }
    }

    if (lSecimYap == false) {
        $("#cOdemeTakvimiValidation").text("Lütfen bu alanı doldurun!");
        $("#pageLoading").displayNone();
    } else {
        OdemeEkle2(0);
    }
}

function OdemeEkle2(iKodUrun) {
    $.ajax({
        type: "GET",
        url: "/api/odemeyontemiapi/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data2) {
            if (data2 != null) {

                if (data2.length > 0) {
                    var cHTML2 = '';

                    $.each(data2, function (i, item2) {
                        if (item2 && item2.iKodOdemeYontemi && item2.cAdi) {
                            cHTML2 += "<option value=\"" + item2.iKodOdemeYontemi + "\">" + item2.cAdi + "</option>";
                        }
                    });
                    iId = iId + 1;

                    cHTML =
                        "<div class=\"row\">" +
                        "<div class=\"form-group col-md-4\">" +
                        "<label for=\"cOdemeTarihi\">Ödeme Tarihi</label>" +
                        "<input autocomplete=\"off\" class=\"form-control txtOdemeTarihi\" id=\"cOdemeTarihi-" + iId + "\" name=\"cOdemeTarihi\" onchange=\"OdemeTakvimiYaz()\" placeholder=\"Lütfen ödeme tarihi girin ...\" tabindex=\"1\" type=\"text\" value=\"\">" +
                        "</div>" +
                        "<div class=\"form-group col-md-3\">" +
                        "<label for=\"cOdemeTutar\">Tutar</label>" +
                        "<input autocomplete=\"off\" class=\"form-control txtOdemeTutar\" id=\"cOdemeTutar-" + iId + "\" name=\"cOdemeTutar\" onchange=\"OdemeTakvimiYaz()\" placeholder=\"Lütfen tutar girin ...\" tabindex=\"2\" type=\"text\" value=\"\">" +
                        "</div>" +
                        "<div class=\"form-group col-md-4\">" +
                        "<label for=\"iKodOdemeYontemi2\">Ödeme Yöntemi</label>" +
                        "<select onchange=\"OdemeTakvimiYaz()\" class=\"form-control cboOdemeYontemi2\" id=\"iKodOdemeYontemi2-" + iId + "\" tabindex=\"3\">" +
                        "<option value =\"0\">Lütfen ödeme yönetimi seçin ...</option>" +
                        cHTML2 +
                        "</select>" +
                        "</div>" +
                        "<div class=\"col-md-1\">" +
                        "<button onclick=\"Delete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"4\">Sil</button>" +
                        "</div>" +
                        "</div>";

                    $("#odemeTakvimi").append(cHTML);

                    $("#iKodOdemeYontemi2-" + iId).select2();
                    $("#cOdemeTarihi-" + iId).datepicker(dataPickerOption);
                    $("#cOdemeTutar-" + iId).priceFormat(optionPriceFormat);
                    $("#cOdemeTarihi-" + iId).focus();

                    OdemeTakvimiYaz();

                    $("#pageLoading").displayNone();
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

function OdemeTakvimiYaz() {
    $('#cOdemeTakvimi').val('');
    $('#odemeTakvimi').find('.row').each(function () {
        if ($('#cOdemeTakvimi').val() != '') {
            $('#cOdemeTakvimi').val($('#cOdemeTakvimi').val() + "|");
        }

        $('#cOdemeTakvimi').val(
            $('#cOdemeTakvimi').val() +
            $(this).find('.txtOdemeTarihi').val() + "*" +
            $(this).find('.txtOdemeTutar').val() + "*" +
            $(this).find('.cboOdemeYontemi2').val());
    });
}

function Delete(button) {
    if (button) {
        $(button).parent().parent().remove();
        OdemeTakvimiYaz();
    }
}