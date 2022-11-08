$(".addAddress").unbind('click').click(function () {
    var id = $(this).attr("data-id");
    $("#successBasket").css("display", "none");
    $("#errorBasket").css("display", "none");
    var data = {
        iKodUyelik: id,
        cBaslik: $("#cBaslik").val(),
        cAdres: $("#cAdres").val(),
        iKodSehir: $("#iSehirAnahtar").val(),
        iKodIlce: $("#iIlceAnahtar").val(),
        iKodMahalle: $("#iMahalleAnahtar").val(),
        cPostaKodu: $("#cPostaKodu").val(),
    };

    $.ajax({
        type: "PUT",
        url: "/api/addaddressapi/",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: !0,
        success: function (result, status, jqXHR) {
            console.log(result)
            if (result != null) {

                $('#iKodFaturaAdres').append($('<option>', {
                    value: result.iKodAdres,
                    text: result.cAdres
                }));

                $('#iKodKargoAdres').append($('<option>', {
                    value: result.iKodAdres,
                    text: result.cAdres
                }));

                $('#iKodFaturaAdres').val(result.iKodAdres).trigger('change');
                $('#iKodKargoAdres').val(result.iKodAdres).trigger('change');
                $('#iKodFaturaAdres').niceSelect('update');
                $('#iKodKargoAdres').niceSelect('update');
                
            }

        },
        error: function (a) {
            $("#errorBasket").css("display", "block");
        }
    })

});