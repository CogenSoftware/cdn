var iId = 0;

$(function () {
    $("#btnAdd").click(function () {
        Add();
    });
});

function Add() {
    $("#pageLoading").displayBlock();
    $("#cYanitListesiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iId + 1; i++) {
        if ($("#cCevap-" + i).val() == '') {
            lSecimYap = false;
        }
    }

    if (lSecimYap == false) {
        $("#cYanitListesiValidation").text("Lütfen bu alanı doldurun!");
        $("#pageLoading").displayNone();
    } else {
        Add2();
    }
}

function Add2() {
    iId = iId + 1;

    cHTML =
        "<div class=\"row\">" +
        "<div class=\"form-group col-md-8\">" +
        "<label for=\"cCevap\">Yanıt</label>" +
        "<input autocomplete=\"off\" class=\"form-control txtCevap\" id=\"cCevap-" + iId + "\" maxlength=\"500\" name=\"cCevap\" onchange=\"Write()\" placeholder=\"Lütfen yanıt girin ...\" tabindex=\"1\" type=\"text\" value=\"\">" +
        "</div>" +
        "<div class=\"form-group col-md-3\">" +
        "<label for=\"iYanit\">Yanıt Adedi</label>" +
        "<input autocomplete=\"off\" class=\"form-control txtYanit\" data-val=\"true\" data-val-number=\"The field Yanıt Adedi must be a number.\" data-val-required=\"Yanıt Adedi alanı gereklidir.\" disabled=\"disabled\" id=\"iYanit-" + iId + "\" maxlength=\"100\" name=\"iYanit\" onchange=\"Write()\" placeholder=\"Lütfen yanıt adedi girin ...\" tabindex=\"2\" type=\"number\" value=\"0\">" +
        "</div>" +
        "<div class=\"col-md-1\">" +
        "<button onclick=\"Delete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"3\">Sil</button>" +
        "</div>" +
        "</div>";


    $("#yanitListesi").append(cHTML);

    $("#cCevap-" + iId).focus();

    Write();

    $("#pageLoading").displayNone();
}

function Write() {
    $('#cYanitListesi').val('');
    $('#yanitListesi').find('.row').each(function () {
        if ($('#cYanitListesi').val() != '') {
            $('#cYanitListesi').val($('#cYanitListesi').val() + "|");
        }

        $('#cYanitListesi').val($('#cYanitListesi').val() + $(this).find('.txtCevap').val() + "*" + $(this).find('.txtYanit').val())
    });
}

function Delete(button) {
    if (button) {
        $(button).parent().parent().remove();
        ProductWrite();
    }
}