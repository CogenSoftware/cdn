$(function () {
    $("#siparisReddetModal #btnsiparisReddet").click(function () {
        siparisReddetModal();
    });

    $('#siparisReddetModal').on('show.bs.modal', function () {
        siparisReddetModalOpen();
    });
});

function siparisReddetModalOpen() {
    $('#siparisReddetModal #cAciklama').val('');
}

function siparisReddetModal() {
    $("#pageLoading").displayBlock();

    $("#siparisReddetModal #cAciklamaValidation").text("");
    $("#siparisReddetModal #alert-1").displayNone();
    $("#siparisReddetModal #alert-2").displayNone();
    $("#siparisReddetModal #alert-3").displayNone();

    if ($.trim($('#siparisReddetModal #cAciklama').val()) == "") {
        $("#siparisReddetModal #cAciklamaValidation").text("Lütfen bu alanı doldurun!");
        $("#siparisReddetModal #alert-1").displayBlock();
        $("#pageLoading").displayNone();
        return;
    }
    

    var Data = {
        "iKodSiparisler": iKodSiparisler,
        "cAciklama": $('#siparisReddetModal #cAciklama').val()
    };
    console.log(Data);
    $.ajax({
        type: "PUT",
        url: "/api/siparisreddetapi/",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: true,
        success: function (data, status, jqXHR) {
            if (data != null) {
                $("#siparisReddetModal").modal('hide');
                $("#pageLoading").displayNone();
                window.location.href = "/Siparisler/Listele";
            }
            else if (data == -2) {
                $("#siparisReddetModal #alert-2").displayBlock();
            }
            else if (data == -3) {
                $("#siparisReddetModal #alert-3").displayBlock();
            }
            $("#pageLoading").displayNone();
        },
        error: function (xhr) {
            alert(xhr.responseText);
            $("#pageLoading").displayNone();
        }
    });
}
