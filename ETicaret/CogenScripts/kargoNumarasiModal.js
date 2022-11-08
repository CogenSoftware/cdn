$(function () {
    $("#kargoNumarasiModal #btnkargoNumarasi").click(function () {
        kargoNumarasiModal();
    });

    $('#kargoNumarasiModal').on('show.bs.modal', function () {
        kargoNumarasiModalOpen();
    });
});

function kargoNumarasiModalOpen() {
    $('#kargoNumarasiModal #cKargoNo').val('');
}

function kargoNumarasiModal() {
    $("#pageLoading").displayBlock();

    $("#kargoNumarasiModal #cKargoNoValidation").text("");
    $("#kargoNumarasiModal #alert-1").displayNone();
    $("#kargoNumarasiModal #alert-2").displayNone();
    $("#kargoNumarasiModal #alert-3").displayNone();

    if ($.trim($('#kargoNumarasiModal #cKargoNo').val()) == "") {
        $("#kargoNumarasiModal #cKargoNoValidation").text("Lütfen bu alanı doldurun!");
        $("#kargoNumarasiModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }


    var Data = {
        "iKodSiparisler": iKodSiparisler,
        "cKargoNo": $('#kargoNumarasiModal #cKargoNo').val()
    };
    console.log(Data);
    $.ajax({
        type: "PUT",
        url: "/api/kargonumarasiapi/",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: true,
        success: function (data, status, jqXHR) {
            if (data != null) {
                $("#kargoNumarasiModal").modal('hide');
                $("#pageLoading").displayNone();
                window.location.href = "/Siparisler/OnaylananListele";
            }
            else if (data == -2) {
                $("#kargoNumarasiModal #alert-2").displayBlock();
            }
            else if (data == -3) {
                $("#kargoNumarasiModal #alert-3").displayBlock();
            }
            $("#pageLoading").displayNone();
        },
        error: function (xhr) {
            alert(xhr.responseText);
            $("#pageLoading").displayNone();
        }
    });
}
