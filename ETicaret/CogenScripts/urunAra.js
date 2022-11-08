$(function () {
    $("#iKodIndirimTuru").select2();
    $("#iKodKategori").select2();
    $("#iKodMarka").select2();
    $('#dTabanFiyati').priceFormat(optionPriceFormat);
    $('#dTavanFiyati').priceFormat(optionPriceFormat);
    $('#dIndirimOrani').priceFormat(optionPriceFormat);
});
