$(function () {
    $("#iFirmaTipi").select2();
    $("#iSehirAnahtarKurumsal").select2();
    $("#iIlceAnahtarKurumsal").select2();
    $("#iMahalleAnahtarKurumsal").select2();
    $("#iSehirAnahtar").select2();
    $("#iIlceAnahtar").select2();
    $("#iMahalleAnahtar").select2();

    $("#cTelefon").mask("9 (999) 999 99 99");
    $("#cFaks").mask("9 (999) 999 99 99");
    $("#cGSM").mask("9 (999) 999 99 99");
    $("#cTelefonKurumsal").mask("9 (999) 999 99 99");
    $("#cGSMKurumsal").mask("9 (999) 999 99 99");


    $("#sahis").displayNone();
    $("#kurum").displayNone();
    if ($("#iFirmaTipi").val() == 1) {
        $("#sahis").displayBlock();
        $("#kurum").displayNone();
    }
    else if ($("#iFirmaTipi").val() == 2) {
        $("#kurum").displayBlock();
        $("#sahis").displayNone();
    }
    $('#iFirmaTipi').on('change', function () {
        if ($("#iFirmaTipi").val() == 1) {
            $("#sahis").displayBlock();
            $("#kurum").displayNone();
        }
        else if ($("#iFirmaTipi").val() == 2) {
            $("#kurum").displayBlock();
            $("#sahis").displayNone();
        }
    });

    if ( iFirmaTipi == 1) {
        $("#sahis").displayBlock();
        $("#kurum").displayNone();

    }
    if (iFirmaTipi == 2) {
        $("#sahis").displayNone();
        $("#kurum").displayBlock();
    }
    if (iFirmaTipi > 0) {
        $("#iFirmaTipi").val(iFirmaTipi).trigger('change');

    }

});