var iUrunId = 0;

$(function () {

    $("#btnSave").click(function () {
        $("#form").submit();
    });
    
    $("#btnAdd").click(function () {
        ProductAdd();
    });

    $("#btnAllAdd").click(function () {
        ProductAllCode();
    });

   


});

function ProductAdd() {
    $("#pageLoading").displayBlock();
    $("#cIsTuruListesiValidation").text("");

    var lSecimYap = true;
    for (var i = 0; i < iUrunId + 1; i++) {
        if ($("#iKodIsTuru-" + i).val() == 0 || $("#cTarih-" + i).val() == '') {
            lSecimYap = false;
        }
    }

    if (lSecimYap == false) {
        $("#cIsTuruListesiValidation").text("Lütfen bu alanı doldurun!");
        $("#pageLoading").displayNone();
    } else {
        ProductAdd2(0);
    }
}

function ProductAdd2(iKodIsTuru) {
    $.ajax({
        type: "GET",
        url: "/api/isturuapi/?" + new Date(),
        contentType: "json",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                for (var i = 0; i < iUrunId + 1; i++) {
                    if ($("#iKodIsTuru-" + i).val() == 0 || $("#cTarih-" + i).val() == '' ) {
                        $("#iKodIsTuru-" + i).parent().parent().remove();
                    }
                }

                iUrunId = iUrunId + 1;

                if (data.length > 0) {
                    var cHTML = '';

                    $.each(data, function (i, item) {
                        if (item && item.iKodIsTuru && item.cAdi) {
                            cHTML += "<option value=\"" + item.iKodIsTuru + "\">" + item.cAdi + "</option>";
                        }
                    });
                    if (cHTML != '') {
                        cHTML =
                            "<div class=\"row\">" + 
                            "<div class= \"form-group col-md-6\" >" +
                            "<label for=\"iKodIsTuru\">İş Türü</label>" +
                            "<select onchange=\"Write()\" class=\"form-control cboIsTuruAdi\" id=\"iKodIsTuru-" + iUrunId + "\" tabindex=\"2\">" +
                            "<option value =\"0\">Lütfen iş türü seçin ...</option>" +
                            cHTML +
                            "</select>" +
                            "</div>" +
                            "<div class=\"form-group col-md-5\">" +
                            "<label for=\"cTarih\">Tarih</label>" +
                            "<input autocomplete=\"off\" class=\"form-control txtTarih\" id=\"cTarih-" + iUrunId + "\" name=\"cTarih\" onchange=\"Write()\" placeholder=\"Lütfen tarih girin ...\" tabindex=\"1\" type=\"text\" value=\"\">" +
                            "</div>" +
                            "<div class=\"col-md-1\">" +
                            "<button onclick=\"Delete(this)\" type=\"button\" class=\"btn btn-secondary btn-block btn-delete\" tabindex=\"7\">Sil</button>" +
                            "</div>" +
                            "</div>";


                        console.log(cHTML);
                        $("#isTuruListesi").append(cHTML);

                        $("#iKodIsTuru-0").select2();
                        $("#cTarih-0" ).datepicker(dataPickerOption);


                        $("#iKodIsTuru-" + iUrunId).select2();
                        $("#cTarih-" + iUrunId).datepicker(dataPickerOption);

                        Write();
                        $("#pageLoading").displayNone();
                    }
                    else {
                        $("#pageLoading").displayNone();
                    }
                }
                else {
                    $("#pageLoading").displayNone();
                }
            }
            else {
                $("#pageLoading").displayNone();
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
            $.ajax({
                type: "PUT",
                url: "/api/logapi/",
                data: JSON.stringify({
                    "iType": 1,
                    "cControllerName": "Java Script Ajax Hatası",
                    "cActionName": "isTakibi.js",
                    "cHata": xhr.responseText,
                    "cIslem": "",
                    "iKodKullanici": 0,
                    "iKodKayit": 0
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                processData: true
            });
            $("#pageLoading").displayNone();
        }
    });
}

function Write() {
    $('#cIsTuruListesi').val('');
    $('#isTuruListesi').find('.row').each(function () {
        if ($('#cIsTuruListesi').val() != '') {
            $('#cIsTuruListesi').val($('#cIsTuruListesi').val() + "|");
        }

        $('#cIsTuruListesi').val(
            $('#cIsTuruListesi').val() +
            $(this).find('.cboIsTuruAdi').val() + "*" +
            $(this).find('.txtTarih').val()

        );
    });
}

function Delete(button) {
    if (button) {
        $(button).parent().parent().remove();
        Write();
    }
}
