$(function () {
    $("#iKodUrunKategori").change(function () {
        UrunKategoriListele();
    });
});

function UrunKategoriListele() {
    $("#pageLoading").displayBlock();
    if ($("#iKodUrunKategori").val() > 0) {
        $.ajax({
            type: "GET",
            url: "/api/urunaltkategoriapi/" + $("#iKodUrunKategori").val() + "/?" + new Date(),
            contentType: "json",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#iKodUrunAltKategori").empty();
                    $('#iKodUrunAltKategori').append($('<option>', {
                        value: 0,
                        text: "Lütfen ürün alt kategori seçin ..."
                    }));
                    $('#iKodUrunAltKategori').val(0);

                    $.each(data, function (i, item) {
                        $('#iKodUrunAltKategori').append($('<option>', {
                            value: item.iKodUrunAltKategori,
                            text: item.cAdi
                        }));
                    });
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
                        "cActionName": "urunEkle4.js",
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
        $("#iKodUrunAltKategori").empty();
        $('#iKodUrunAltKategori').append($('<option>', {
            value: 0,
            text: "Lütfen ürün alt kategori seçin ..."
        }));
        $('#iKodUrunAltKategori').val(0);
    }
    $("#pageLoading").displayNone();
}
