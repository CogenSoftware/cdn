$(function () {
    $("#iKodUrlTipi").select2();
    $("#iKodUrl").select2();
    $("#iKodReklamAlaniTuru").select2();

    $("#siteici").displayNone();
    $("#sitedisi").displayNone();

    if ($("#iKodUrlTipi").val() == 1) {
        $("#siteici").displayBlock();
        $("#sitedisi").displayNone();
    }
    else if ($("#iKodUrlTipi").val() == 2) {
        $("#sitedisi").displayBlock();
        $("#siteici").displayNone();
    }
    $('#iKodUrlTipi').on('change', function () {
        if ($("#iKodUrlTipi").val() == 1) {
            $("#siteici").displayBlock();
            $("#sitedisi").displayNone();
        }
        else if ($("#iKodUrlTipi").val() == 2) {
            $("#sitedisi").displayBlock();
            $("#siteici").displayNone();
        }
    });

    if (iKodUrlTipi == 1) {
        $("#siteici").displayBlock();
        $("#sitedisi").displayNone();
    }
    if (iKodUrlTipi == 2) {
        $("#sitedisi").displayNone();
        $("#siteici").displayBlock();

    }
    if (iKodUrlTipi > 0) {

        $("#iKodUrlTipi").val(iKodUrlTipi).trigger('change');


    }

});