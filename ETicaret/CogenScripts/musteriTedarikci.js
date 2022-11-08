$(function () {

    $("#tahsilatTakvimiAlani").displayNone();
    $("#odemeTakvimiAlani").displayNone();

    if ($("#iKodMusteri4").val() != null && $("#iKodMusteri4").val() > 0) {
        $("#tahsilatTakvimiAlani").displayBlock();
        $("#odemeTakvimiAlani").displayNone();
    }

    if ($("#iKodTedarikci3").val() != null && $("#iKodTedarikci3").val() > 0) {
        $("#odemeTakvimiAlani").displayBlock();
        $("#tahsilatTakvimiAlani").displayNone();
    }

    if ($("#iKodMusteri4") != null) {
        $("#iKodMusteri4").change(function () {
            if ($("#iKodMusteri4").val() > 0 && $("#iKodTedarikci3") != null && $("#iKodTedarikci3").val() > 0) {
                iKodTedarikci3 = 0;
                $("#iKodTedarikci3").val(null).trigger('change');
            }
            if ($("#iKodMusteri4").val() != null && $("#iKodMusteri4").val() > 0) {
                $("#tahsilatTakvimiAlani").displayBlock();
                $("#odemeTakvimiAlani").displayNone();
            }
        });
    }
    if ($("#iKodTedarikci3") != null) {
        $("#iKodTedarikci3").change(function () {
            if ($("#iKodTedarikci3").val() > 0 && $("#iKodMusteri4") != null && $("#iKodMusteri4").val() > 0) {
                iKodMusteri4 = 0;
                $("#iKodMusteri4").val(null).trigger('change');
            }
            if ($("#iKodTedarikci3").val() != null && $("#iKodTedarikci3").val() > 0) {
                $("#odemeTakvimiAlani").displayBlock();
                $("#tahsilatTakvimiAlani").displayNone();
            }
        });
    }
});