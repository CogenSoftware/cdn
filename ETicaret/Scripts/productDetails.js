$(function () {
    $("#AddComment").unbind('click').click(function () {
        $("#success").css("display", "none");
        $("#error").css("display", "none");
        var data = {
            cComment: $("#cComment").val(),
            iKodProduct: $("#iCodeProduct").val(),
            iKodUyelik: iKodUyelikLogin
        };
        $.ajax({
            type: "PUT",
            url: "/api/commentapi/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: !0,
            success: function () {
                $("#success").css("display", "block");
            },
            error: function (a) {
                $("#error").css("display", "block");
            }
        })
    });

    $(".AddWishList").unbind('click').click(function () {
        var id = $(this).attr("data-id");
        $("#successWishList").css("display", "none");
        $("#errorWishList").css("display", "none");
        var data = {
            iKodProduct: id,
            iKodUyelik: iKodUyelikLogin
        };
        $.ajax({
            type: "PUT",
            url: "/api/addtowishlistapi/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: !0,
            success: function () {
                $("#successWishList").css("display", "block");
            },
            error: function (a) {
                $("#errorWishList").css("display", "block");
            }
        })

    });

    $(".AddBasket2").unbind('click').click(function () {
        var id = $(this).attr("data-id");
        $("#successBasket").css("display", "none");
        $("#errorBasket").css("display", "none");
        var data = {
            iKodProduct: id,
            iMiktar: $("#iMiktar").val(),
            cModel: $("#cboModel").val(),
            iKodUyelik: iKodUyelikLogin
        };
        $.ajax({
            type: "PUT",
            url: "/api/addbasketapi/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: !0,
            success: function (response) {
                if (response == 0) {
                    $("#successStok").css("display", "block");
                }
                else {
                    $("#successBasket").css("display", "block");
                    $("#successStok").css("display", "none");
                    window.location.href = "/kullanici/sepet?iData=" + iData;
                }
            },
            error: function (a) {
                $("#errorBasket").css("display", "block");
            }
        })

    });

    $("#iOrder").change(function () {
        $('#orderby').submit();

    });

    $("#cboModel").change(function () {
        modelChange();
    });
});

function modelChange() {
    var deger = $('#cboModel').val();
    var modelName = $('#cboModel').val().split('|')[2];
    var yeniDeger = $('.firstPrice').text();
    var iKur = $('.firstKur').text();
    var iDolar = $('.firstDolar').text();
    var iEuro = $('.firstEuro').text();
    iDolar = parseFloat(iDolar.replace(",", "."));
    iEuro = parseFloat(iEuro.replace(",", "."));
    $('.modelName').text(modelName);
    if (deger == 0) {
        if (iKur == 1) {
            $('.price_box .current_price').text((yeniDeger).toLocaleString("tr-TR", { style: "currency", currency: "TRY" }) + " (K.D.V. Dahil)");
        }
        if (iKur == 2) {
            yeniDeger = parseFloat(yeniDeger) * iDolar;
            $('.price_box .current_price').text((yeniDeger).toLocaleString("tr-TR", { style: "currency", currency: "TRY" }) + " (K.D.V. Dahil)");
        }
        if (iKur == 3) {
            yeniDeger = parseFloat(yeniDeger) * iEuro;
            $('.price_box .current_price').text((yeniDeger).toLocaleString("tr-TR", { style: "currency", currency: "TRY" }) + " (K.D.V. Dahil)");
        }
    }
    else {
        if (iKur == 1) {
            var cTutar = $('#cboModel').val().split('|')[0];
            var cOncekiTutar = $('#cboModel').val().split('|')[1];
            $('.price_box .current_price').text(cTutar + ' ₺' + " (K.D.V. Dahil)");
            $('.price_box .old_price').text(cOncekiTutar + ' ₺');
            console.log("tl tutar", cTutar);
            console.log("deger", deger);
        }
        if (iKur == 2) {
            var cTutar = $('#cboModel').val().split('|')[0].replace(".", "");
            var cOncekiTutar = $('#cboModel').val().split('|')[1];
            cTutar = parseFloat((cTutar).replace(",", ".")) * iDolar;
            cOncekiTutar = parseFloat((cOncekiTutar).replace(",", ".")) * iDolar;
            $('.price_box .current_price').text((cTutar).toLocaleString("tr-TR", { style: "currency", currency: "TRY" }) + " (K.D.V. Dahil)");
            $('.price_box .old_price').text((cOncekiTutar).toLocaleString("tr-TR", { style: "currency", currency: "TRY" }));
        }
        if (iKur == 3) {
            var cTutar = $('#cboModel').val().split('|')[0].replace(".", "");;
            var cOncekiTutar = $('#cboModel').val().split('|')[1];
            cTutar = parseFloat((cTutar).replace(",", ".")) * iEuro;
            cOncekiTutar = parseFloat((cOncekiTutar).replace(",", ".")) * iEuro;
            $('.price_box .current_price').text((cTutar).toLocaleString("tr-TR", { style: "currency", currency: "TRY" }) + " (K.D.V. Dahil)");
            $('.price_box .old_price').text((cOncekiTutar).toLocaleString("tr-TR", { style: "currency", currency: "TRY" }));
            console.log("euro tutar", cTutar);
            console.log("deger", deger);
        }
    }
}


$(".AddStok2").unbind('click').click(function () {
    var id = $(this).attr("data-id");
    $("#successStok").css("display", "none");
    $("#errorStok").css("display", "none");
    var data = {
        iKodProduct: id,
        iKodUyelik: iKodUyelikLogin
    };
    $.ajax({
        type: "PUT",
        url: "/api/stokhaberapi/",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: !0,
        success: function () {
            $("#successStok").css("display", "block");
        },
        error: function (a) {
            $("#errorStok").css("display", "block");
        }
    })

});








