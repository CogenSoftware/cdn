$(function () {
    $("#btnAdd").click(function () {
        Add();
    });

    $("#iKodMenu").change(function () {
        PriceCalcutator();
    });
});

function PriceCalcutator() {
    $("#pageLoading").displayBlock();

    $.ajax({
        type: "GET",
        url: "/api/menuapi/" + $("#iKodMenu").val() + "/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $("#cTutar").val(data.toFixed(2));
                $("#cTutar").priceFormat(optionPriceFormat);
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

function Add() {
    $("#pageLoading").displayBlock();
    $("#cOdemeListesiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iId + 1; i++) {
        if ($("#cOdemeTarihi-" + i).val() == '' || $("#cTutar-" + i).val() == '' || $("#cTutar-" + i).val() == 0) {
            lSecimYap = false;
        }
    }

    if (lSecimYap == false) {
        $("#cOdemeListesiValidation").text("Lütfen bu alanı doldurun!");
        $("#pageLoading").displayNone();
    } else {
        Add2(0);
    }
}

function Add2(iKodUrun) {
    iId = iId + 1;

    cHTML =
        "<div class=\"row\">" +
        "<div class=\"form-group col-md-7\">" +
        "<label for=\"cOdemeTarihi\">Ödeme Tarihi</label>" +
        "<input autocomplete=\"off\" class=\"form-control txtOdemeTarihi\" id=\"cOdemeTarihi-" + iId + "\" name=\"cOdemeTarihi\" onchange=\"Write()\" placeholder=\"Lütfen ödeme tarihi girin ...\" tabindex=\"1\" type=\"text\" value=\"\">" +
        "</div>" +
        "<div class=\"form-group col-md-4\">" +
        "<label for=\"cTutar\">Tutar</label>" +
        "<input autocomplete=\"off\" class=\"form-control txtTutar\" id=\"cTutar-" + iId + "\" name=\"cTutar\" onchange=\"Write()\" placeholder=\"Lütfen tutar girin ...\" tabindex=\"2\" type=\"text\" value=\"\">" +
        "</div>" +
        "<div class=\"col-md-1\">" +
        "<button onclick=\"Delete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"3\">Sil</button>" +
        "</div>" +
        "</div>";


    $("#odemeListesi").append(cHTML);

    $("#cOdemeTarihi-" + iId).datepicker(dataPickerOption);
    $("#cTutar-" + iId).priceFormat(optionPriceFormat);
    $("#cOdemeTarihi-" + iId).focus();

    Write();

    $("#pageLoading").displayNone();
}

function Write() {
    $('#cOdemeListesi').val('');
    $('#odemeListesi').find('.row').each(function () {
        if ($('#cOdemeListesi').val() != '') {
            $('#cOdemeListesi').val($('#cOdemeListesi').val() + "|");
        }

        $('#cOdemeListesi').val($('#cOdemeListesi').val() + $(this).find('.txtOdemeTarihi').val() + "*" + $(this).find('.txtTutar').val())
    });
}

function Delete(button) {
    if (button) {
        $(button).parent().parent().remove();
        Write();
    }
}