//function showProducts(minPrice, maxPrice) {
//    var lChechked = false;
//    $('.sidebar_widget').find('.checkboxbutton:checked').each(function () {
//        lChechked = true;
//    });
//    $("#products .col-md-4").hide().filter(function () {
//        var price = parseInt($(this).data("price"), 10);
//        var split = $(this).attr("class").split(' ');
//        var lResult = false;
//        for (var i = 0; i < split.length; i++) {
//            $('.sidebar_widget').find('.checkboxbutton:checked').each(function () {
//                if ($(this).attr("rel") == split[i]) {
//                    console.log($(this).attr("rel") + ' | ' + split[i])
//                    lResult = true;
//                }
//            });
//        }
//        if (lChechked == false) {
//            lResult = true;
//        }
//        return price >= minPrice && price <= maxPrice && lResult;
//    }).show();
//}

//$(function () {
//    var options = {
//        range: true,
//        min: 0,
//        max: 100000,
//        values: [0, 100000],
//        slide: function (event, ui) {
//            var min = ui.values[0],
//                max = ui.values[1];

//            $("#amount").val(min + " ₺ - " + max + " ₺");
//            showProducts(min, max);
//        }
//    }, min, max;

//    $("#slider-range").slider(options);

//    min = $("#slider-range").slider("values", 0);
//    max = $("#slider-range").slider("values", 1);

//    $("#amount").val(min + " ₺ - " + max + " ₺");

//    showProducts(min, max);

//    $(".checkboxbutton").change(function () {
//        showProducts(min, max);
//    });
//});


//YENİ SERDAR COGEN TARAFINDAN YAZYILDI
$(function () {
    var options = {
        range: true,
        min: 0,
        max: 5000,
        values: [0, 5000],
        slide: function (event, ui) {
            var min = ui.values[0],
                max = ui.values[1];
            $("#amount").val(min + " ₺ - " + max + " ₺");
            showProduct();
        }
    }, min, max;

    $("#slider-range").slider(options);

    var min = $("#slider-range").slider("values", 0);
    var max = $("#slider-range").slider("values", 1);
    $("#amount").val(min + " ₺ - " + max + " ₺");

    $(".checkboxbutton").change(function () {
        showProduct();
    });

    $("#amount").change(function () {
        showProduct();
    });
});

function showProduct() {
    $("#products .col-md-4").hide();
    var checkboxRel = [];
    $('.sidebar_widget').find('.checkboxbutton:checked').each(function () {
        checkboxRel.push($(this).attr("rel"));
    });


    $('#products').find('.col-md-4').each(function () {
        
        var split = $(this).attr("class").split(' ');
        var iVarMi = 0;
        for (var i = 0; i < split.length; i++) {
            for (var j = 0; j < checkboxRel.length; j++) {
                if (split[i] == checkboxRel[j]) {
                    iVarMi++;
                }
            }
        }
        if (iVarMi == checkboxRel.length) {
            $(this).show();
        }
    });

    var min = parseFloat($("#slider-range").slider("values", 0));
    var max = parseFloat($("#slider-range").slider("values", 1));
    $("#amount").val(min + " ₺ - " + max + " ₺");
    $('#products').find('.col-md-4').each(function () {
        var price = parseFloat($(this).data('price'));
        if (price < min || price > max) {
            $(this).hide();
        }
    });
}