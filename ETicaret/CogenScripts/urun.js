var iId = 0;
$(function () {
    $("#iKodIndirimTuru").select2();
    $("#iKodKategori").select2();
    $("#iKodMarka").select2();
    $("#iVaryant").select2();
    $('#cFiyat').priceFormat(optionPriceFormat);
    $('#cIndirimTutari').priceFormat(optionPriceFormat);
    $('#cGenelTutar').priceFormat(optionPriceFormat);
    $('#cAciklama').summernote({
        height: 300,
        disable: true,
        minHeight: null,
        maxHeight: null,
        focus: false,
        lang: 'tr-TR',
        placeholder: 'Lütfen açıklama girin ...',
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']]
        ]
    });
    $("#yuzde").displayNone();

    if ($("#iKodIndirimTuru").val() == 1) {
        $("#fiyat").displayBlock();
        $("#yuzde").displayNone();
    }
    else if ($("#iKodIndirimTuru").val() == 2) {
        $("#yuzde").displayBlock();
        $("#fiyat").displayNone();
    }
    $('#iKodIndirimTuru').on('change', function () {
        if ($("#iKodIndirimTuru").val() == 1) {
            $("#fiyat").displayBlock();
            $("#yuzde").displayNone();
        }
        else if ($("#iKodIndirimTuru").val() == 2) {
            $("#yuzde").displayBlock();
            $("#fiyat").displayNone();
        }
    });

    if (iKodIndirimTuru == 1) {
        $("#fiyat").displayBlock();
        $("#yuzde").displayNone();
    }
    if (iKodIndirimTuru == 2) {
        $("#yuzde").displayNone();
        $("#fiyat").displayBlock();

    }
    if (iKodIndirimTuru > 0) {
        $("#iKodIndirimTuru").val(iKodIndirimTuru).trigger('change');
    }

    $("#varyant").displayNone();


    $("#cFiyat").change(function () {
        KDVHesapla();
    });

    $("#cFiyat").keyup(function () {
        KDVHesapla();
    });


    $("#iKDVOrani").change(function () {
        KDVHesapla();
    });

    $("#cGenelTutar").change(function () {
        KDVHesapla();
    });

    $("#cGenelTutar").keyup(function () {
        KDVHesapla();
    });

    $("#btnEkle").click(function () {
        VaryantEkle();
    });

    $("#iVaryant").change(function () {
        VaryantEkle();
        ProductWrite();
    });

    $("#cVaryant").change(function () {
        ProductWrite();
    });

    $("#iKodKategori").change(function () {
        ProductWrite();
    });

});


function VaryantEkle() {

    $("#pageLoading").displayBlock();

    if ($('#iVaryant').val() > 0) {
        $("#varyant").displayBlock();
        $.ajax({
            type: "GET",
            url: "/api/varyantapi/" + $('#iVaryant').val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    if (data.length > 0) {
                        var cHTML = '';
                        $.each(data, function (i, item) {
                            if (item && item.iKodVaryant && item.cVaryant) {
                                cHTML += "<option value=\"" + item.iKodVaryant + "\">" + item.cVaryant + "</option>";
                            }
                        });
                        iId = iId + 1;

                        cHTML =
                            "<div class=\"urunSatiri\">" +
                            "<div class=\"row\">" +
                            "<div class=\"form-group col-md-10\">" +
                            "<label for=\"cVaryant\">Varyant</label>" +
                            "<select data-iVaryant=\"" + $('#iVaryant').val() + "\" onchange=\"Write()\" class=\"form-control cboVaryant\" id=\"cVaryant-" + iId + "\" tabindex=\"3\"  multiple=\"multiple\">" +
                            cHTML +
                            "</select>" +
                            "</div>" +
                            "<div class=\"col-md-2\">" +
                            "<button onclick=\"Delete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"4\"><i class=\"fa fa-trash\"></i></button>" +
                            "</div>" +
                            "</div>" +
                            "</div>";

                        $("#varyantListesi").append(cHTML);

                        $("#cVaryant-" + iId).select2();

                        Write();

                        $("#pageLoading").displayNone();
                    }
                }

                $("#pageLoading").displayNone();
            },
            error: function (xhr) {
                alert(xhr.responseText);
                $.ajax({
                    type: "PUT",
                    url: "/api/logapi/",
                    data: JSON.stringify({
                        "iType": 1,
                        "cControllerName": "Java Script Ajax Hatası",
                        "cActionName": "varyantApi.js",
                        "cHata": xhr.responseText,
                        "cIslem": "",
                        "iKodKullanici": 0,
                        "iKodKayit": 0
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    processData: true
                });
            }
        });
    } else {
        $("#iKodVaryant").empty();
        $('#iKodVaryant').val(0);
    }

    $("#pageLoading").displayNone();
}

function ProductWrite() {
    $('#varyantListesi').find('.urunSatiri').each(function () {
        if ($('#cVaryantListesi').val() != '') {
            $('#cVaryantListesi').val($('#cVaryantListesi').val() + "|");
        }

        $('#cVaryantListesi').val(
            $('#cVaryantListesi').val() +
            $(this).find('.cboVaryant').attr("data-iVaryant") + "*" +
            $(this).find('.cboVaryant').val());
    });

}

function Delete(button) {
    if (button) {
        $(button).parent().parent().parent().remove();
        Write();
    }
}

function KDVHesapla() {
    var fFiyat = OndalikCevir($("#cFiyat").val().replace(",", ""));
    var fGenelTutar = OndalikCevir($("#cFiyat").val().replace(",", ""));

    $('#cFiyat').val(fFiyat.toFixed(2));

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

    $('#cGenelTutar').priceFormat(optionPriceFormat);
}

function OndalikCevir(deger) {
    var dec = 2;
    var result = Math.round(deger * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}