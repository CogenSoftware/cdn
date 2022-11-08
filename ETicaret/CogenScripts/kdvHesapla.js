$(function () {
    $("#cTutar").change(function () {
        KDVHesapla();
    });

    $("#cDuzeltme").change(function () {
        KDVHesapla();
    });

    $("#iDuzeltmeTipi").change(function () {
        KDVHesapla();
    });

    $("#iIskontoYuzdeOrani").change(function () {
        KDVHesapla();
    });   

    $("#iKDVTuru").change(function () {
        KDVHesapla();
    });

    $("#iKDVOrani").change(function () {
        KDVHesapla();
    });

    $("#cGenelTutar").change(function () {
        KDVHesapla2();
    });
});

function KDVHesapla() {
    var fTutar = OndalikCevir($("#cTutar").val().replace(",", ""));
    var fGenelTutar = OndalikCevir($("#cTutar").val().replace(",", ""));

    if ($("#iIskontoYuzdeOrani") != null && $("#iIskontoYuzdeOrani").val() != null && $("#iIskontoYuzdeOrani").val() != "0") {
        fGenelTutar = fGenelTutar - ((fGenelTutar / 100) * parseInt($("#iIskontoYuzdeOrani").val()));
    }

    var fDuzeltme = 0;
    if ($("#iDuzeltmeTipi") != null && $("#iDuzeltmeTipi").val() != null && $("#iDuzeltmeTipi").val() != 0 && $("#cDuzeltme").val() != null && $("#cDuzeltme").val() != "0") {
        fDuzeltme = OndalikCevir($("#cDuzeltme").val().replace(",", ""));
        if ($("#iDuzeltmeTipi").val() == 1) {
            fGenelTutar = fGenelTutar - fDuzeltme;
        } else if ($("#iDuzeltmeTipi").val() == 2) {
            fGenelTutar = fGenelTutar + fDuzeltme;
        }
    } else if (($("#iDuzeltmeTipi") == null || $("#iDuzeltmeTipi").val() == null) && $("#cDuzeltme").val() != null) {
        fDuzeltme = OndalikCevir($("#cDuzeltme").val().replace(",", ""));
        fGenelTutar = fGenelTutar - fDuzeltme;
    }

    $('#cTutar').val(fTutar.toFixed(2));

    if ($('#iKDVTuru').val() == 1) {
        if ($('#iKDVOrani').val() == 1) {
            $('#cGenelTutar').val(fGenelTutar.toFixed(2));
        } else if ($('#iKDVOrani').val() == 2) {
            $('#cGenelTutar').val((fGenelTutar * 1.01).toFixed(2));
        } else if ($('#iKDVOrani').val() == 3) {
            $('#cGenelTutar').val((fGenelTutar * 1.08).toFixed(2));
        } else if ($('#iKDVOrani').val() == 4) {
            $('#cGenelTutar').val((fGenelTutar * 1.10).toFixed(2));
        } else if ($('#iKDVOrani').val() == 5) {
            $('#cGenelTutar').val((fGenelTutar * 1.18).toFixed(2));
        }
    } else {
        $('#cGenelTutar').val(fGenelTutar.toFixed(2));
    }

    $('#cDuzeltme').priceFormat(optionPriceFormat);
    $('#cGenelTutar').priceFormat(optionPriceFormat);
}

function KDVHesapla2() {
    var fGenelTutar = OndalikCevir($("#cGenelTutar").val().replace(",", ""));
    if ($('#iKDVTuru').val() == 1) {
        if ($('#iKDVOrani').val() == 1) {
            $('#cTutar').val(fGenelTutar.toFixed(2));
        } else if ($('#iKDVOrani').val() == 2) {
            $('#cTutar').val((fGenelTutar / 1.01).toFixed(2));
        } else if ($('#iKDVOrani').val() == 3) {
            $('#cTutar').val((fGenelTutar / 1.08).toFixed(2));
        } else if ($('#iKDVOrani').val() == 4) {
            $('#cTutar').val((fGenelTutar / 1.10).toFixed(2));
        } else if ($('#iKDVOrani').val() == 5) {
            $('#cTutar').val((fGenelTutar / 1.18).toFixed(2));
        }
    } else {
        $('#cTutar').val(fGenelTutar.toFixed(2));
    }

    $('#cGenelTutar').priceFormat(optionPriceFormat);
}

function OndalikCevir(deger) {
    var dec = 2;
    var result = Math.round(deger * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}