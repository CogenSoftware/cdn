$(function () {
    $("#btnTahsilatTakvimi").click(function () {
        Add();
    });
});

function Add() {
    $("#pageLoading").displayBlock();
    $("#cTahsilatTakvimiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iId + 1; i++) {
        if ($("#cTahsilatTarihi-" + i).val() == '' || $("#cTutar-" + i).val() == '' || $("#cTutar-" + i).val() == 0 || $("#iKodTahsilatYontemi2-" + i).val() == 0) {
            lSecimYap = false;
        }
    }

    if (lSecimYap == false) {
        $("#cTahsilatTakvimiValidation").text("Lütfen bu alanı doldurun!");
        $("#pageLoading").displayNone();
    } else {
        Add2(0);
    }
}

function Add2(iKodUrun) {
    $.ajax({
        type: "GET",
        url: "/api/tahsilatyontemiapi/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data2) {
            if (data2 != null) {

                if (data2.length > 0) {
                    var cHTML2 = '';

                    $.each(data2, function (i, item2) {
                        if (item2 && item2.iKodTahsilatYontemi && item2.cAdi) {
                            cHTML2 += "<option value=\"" + item2.iKodTahsilatYontemi + "\">" + item2.cAdi + "</option>";
                        }
                    });
                    iId = iId + 1;

                    cHTML =
                        "<div class=\"row\">" +
                        "<div class=\"form-group col-md-4\">" +
                        "<label for=\"cTahsilatTarihi\">Tahsilat Tarihi</label>" +
                        "<input autocomplete=\"off\" class=\"form-control txtTahsilatTarihi\" id=\"cTahsilatTarihi-" + iId + "\" name=\"cTahsilatTarihi\" onchange=\"Write()\" placeholder=\"Lütfen ödeme tarihi girin ...\" tabindex=\"1\" type=\"text\" value=\"\">" +
                        "</div>" +
                        "<div class=\"form-group col-md-3\">" +
                        "<label for=\"cTutar\">Tutar</label>" +
                        "<input autocomplete=\"off\" class=\"form-control txtTutar\" id=\"cTutar-" + iId + "\" name=\"cTutar\" onchange=\"Write()\" placeholder=\"Lütfen tutar girin ...\" tabindex=\"2\" type=\"text\" value=\"\">" +
                        "</div>" +
                        "<div class=\"form-group col-md-4\">" +
                        "<label for=\"iKodTahsilatYontemi2\">Tahsilat Yöntemi</label>" +
                        "<select onchange=\"Write()\" class=\"form-control cboTahsilatYontemi2\" id=\"iKodTahsilatYontemi2-" + iId + "\" tabindex=\"3\">" +
                        "<option value =\"0\">Lütfen tahsilat yönetimi seçin ...</option>" +
                        cHTML2 +
                        "</select>" +
                        "</div>" +
                        "<div class=\"col-md-1\">" +
                        "<button onclick=\"Delete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"4\">Sil</button>" +
                        "</div>" +
                        "</div>";

                    $("#tahsilatTakvimi").append(cHTML);

                    $("#iKodTahsilatYontemi2-" + iId).select2();
                    $("#cTahsilatTarihi-" + iId).datepicker(dataPickerOption);
                    $("#cTutar-" + iId).priceFormat(optionPriceFormat);
                    $("#cTahsilatTarihi-" + iId).focus();

                    Write();

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

function Write() {
    $('#cTahsilatTakvimi').val('');
    $('#tahsilatTakvimi').find('.row').each(function () {
        if ($('#cTahsilatTakvimi').val() != '') {
            $('#cTahsilatTakvimi').val($('#cTahsilatTakvimi').val() + "|");
        }

        $('#cTahsilatTakvimi').val(
            $('#cTahsilatTakvimi').val() +
            $(this).find('.txtTahsilatTarihi').val() + "*" +
            $(this).find('.txtTutar').val() + "*" +
            $(this).find('.cboTahsilatYontemi2').val()
        );
    });
}

function Delete(button) {
    if (button) {
        $(button).parent().parent().remove();
        Write();
    }
}