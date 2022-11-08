$(function () {
    $("#cartUpdate").unbind('click').click(function () {
        ProductWrite();

    });
    $("#iKodKargo").change(function () {
        UpdateTotal();
    });
    $("#iKodKargoName").change(function () {
        UpdateName();
    });
});

function ProductWrite() {
    var iCodProduct = 0;
    var iAdet = 0;
    $('#cartList').find('.cartRow').each(function () {
        var iCodProduct = $(this).attr("data-id");
        var cModel = $(this).attr("data-model");
        console.log(cModel);
        var iAdet = $(this).find('.product_quantity').find('.adet').val();
        var iStok = $(this).find('.product_quantity').find('.adet').attr('max');
        var data = [];

        var iKodUyelik = iKodUyelikLogin;
        var dataRow = {
            "iKodUrun": iCodProduct,
            "cModel": cModel,
            "iAdet": iAdet,
            "iStok": iStok,
        };
        if (parseFloat(dataRow.iStok) > parseFloat(dataRow.iAdet)) {
            data.push(dataRow);
            $.ajax({
                type: "PUT",
                url: "/api/updatebasketapi/" + iKodUyelik + "/?" + new Date(),
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                processData: !0,
                success: function (result, status, jqXHR) {
                    if (result == 0) {
                        $("#successStok").css("display", "block");
                    }
                    else {
                        $("#successBasket").css("display", "block");
                        $("#successStok").css("display", "none");
                    }
                },
                error: function (a) {
                    $("#errorBasket").css("display", "block");
                }
            })
        }
    });
}

function UpdateTotal(input) {
    if (input) {
        if (parseFloat(input.value) <= parseFloat(input.max)) {
            $("#successStok").css("display", "none");
            console.log("buraya neden giriyor");
            var cartRow = $(input).parent().parent();
            console.log("cart row ne geldi", cartRow);
            var kur = $(cartRow).find('.kurDurum').text();
            var dolar = $(cartRow).find('.kurDolar').text().replace(/\./g, '').replace(',', '.');
            var euro = $(cartRow).find('.kurEuro').text().replace(/\./g, '').replace(',', '.');
            var productPrice = $(cartRow).find('.product-price').text().replace(/\./g, '').replace(',', '.');
            var productTotal = parseFloat(productPrice) * parseFloat($(input).val());
            if (kur == 1) {
                $(cartRow).find('.product_total').text(format(productTotal) + ' TL');
                $(cartRow).find('.product_totalTL').text(format(productTotal) + ' TL');
            }
            else if (kur == 2) {
                var productTotal2 = productTotal * dolar;
                $(cartRow).find('.product_total').text(format(productTotal2) + ' TL');
                $(cartRow).find('.product_totalDolar').text(format(productTotal) + ' $');
            }
            else {
                var productTotal2 = productTotal * euro;
                $(cartRow).find('.product_total').text(format(productTotal2) + ' TL');
                $(cartRow).find('.product_totalEuro').text(format(productTotal) + ' €');
            }

            var Total = 0;

            $('#cartList').find('.product_total').each(function () {
                Total = Total + parseFloat(($(this).text()).replace(/\./g, '').replace(",", "."));

            });

            var fKargoFiyat = 0;
            var cKargo = $("#iKodKargo option:selected").data('fiyat');
            if (cKargo) {
                fKargoFiyat = parseFloat(cKargo);
            }
            var fToplam = Total + fKargoFiyat;
            $('#kargoFiyatToplam').text(format(fToplam) + " TL");
        }
        else {
            $("#successStok").css("display", "block");
        }

    }
}

function UpdateName(input) {
    if (input) {
        var cartRow = $(input).parent().parent();
        var productPrice = $(cartRow).find('.product-price').text().replace(/\./g, '').replace(',', '.');
        var productTotal = parseFloat(productPrice) * parseFloat($(input).val());
        $(cartRow).find('.product_total').text(format(productTotal) + ' TL');
    }

    var Total = 0;
    $('#cartList').find('.product_total').each(function () {
        Total = Total + parseFloat(($(this).text()).replace(/\./g, '').replace(",", "."));
    });

    var fKargoFiyat = 0;
    var cKargo = $("#iKodKargoName option:selected").data('ad');
    cKargo = 0;
    fKargoFiyat = cKargo;

    var fToplam = Total + fKargoFiyat;
    $('#kargoFiyatToplam').text(format(fToplam) + " TL");

}

function formatCurrency(total) {
    var neg = false;
    if (total < 0) {
        neg = true;
        total = Math.abs(total);
    }
    return parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

var format = function (num) {
    var str = num.toString(), parts = false, output = [], i = 1, formatted = null;
    if (str.indexOf(".") > 0) {
        parts = str.split(".");
        str = parts[0];
    }
    str = str.split("").reverse();
    for (var j = 0, len = str.length; j < len; j++) {
        if (str[j] != ".") {
            output.push(str[j]);
            if (i % 3 == 0 && j < (len - 1)) {
                output.push(".");
            }
            i++;
        }
    }
    formatted = output.reverse().join("");
    return (formatted + ((parts) ? "," + parts[1].substr(0, 2) : ",00"));
};

$(function () {
    $("#btnHediye").unbind('click').click(function () {
        var cekAlani = $('#cHediyeAdi').val();
        $.ajax({
            type: "GET",
            url: "/api/hediyeapi?HediyeAdi=" + cekAlani,
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    console.log(data.cHediyeTipi);
                    if (data.cHediyeTipi == 1) {
                        $('#HediyeTutari').text('İndirim Tutarı: ' + data.iTutar + ' ' + 'TL');
                        console.log(data.cHediyeAdi);
                        $('#HediyeAdlari').val(data.cHediyeAdi);
                    }
                    else {
                        $('#HediyeTutari').text('İndirim Tutarı: ' + '%' + ' ' + data.iTutar);
                        $('#HediyeAdlari').val(data.cHediyeAdi);
                    }

                }
                var Total = 0;
                $('#cartList2').find('.product_total').each(function () {
                    Total = Total + parseFloat(($(this).text()).replace(/\./g, '').replace(",", "."));
                });
                var fYeniToplam = 0;
                var cIndırım = (data.iTutar);
                if (cIndırım) {
                    fYeniToplam = parseFloat(cIndırım);
                }
                if (data.cHediyeTipi == 1) {
                    if (Total > 50) {
                        var fToplam = Total - fYeniToplam;
                        console.log(fToplam);
                    }
                    else {
                        var kargoFiyatı = $('#Kargo').text().replace("00", "").replace(",", "").replace("TL", "");
                        var fToplam2 = Total + parseFloat(kargoFiyatı);
                        console.log(fToplam2);
                        var fToplam = fToplam2 - fYeniToplam;
                        console.log(fToplam);
                    }
                }


                else {
                    if (Total > 50) {
                        var fToplam = Total - ((Total / 100) * data.iTutar);
                    }
                    else {
                        var kargoFiyatı = $('#Kargo').text().replace("00", "").replace(",", "").replace("TL", "");
                        var fToplam2 = Total + parseFloat(kargoFiyatı);
                        var fToplam = fToplam2 - ((fToplam2 / 100) * data.iTutar);
                    }

                }

                //$('#YeniToplam').val(fToplam);
                $('#YeniTutar').text(format(fToplam) + " TL");
            }
        });
    });
});


























