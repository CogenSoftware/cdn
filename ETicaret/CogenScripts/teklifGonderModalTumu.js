$(function () {
    $(".dropdown-modal.dropdown-item").click(function () {
        $('#teklifGonderModal #teklifGonderId').val($(this).data("id"));
    });

    $("#teklifGonderModal #btnGonderTeklif").click(function () {
        TeklifGonderModal();
    });

    $('#teklifGonderModal').on('show.bs.modal', function () {
        TeklifGonderModalOpen();
    });
});

function TeklifGonderModalOpen() {
    $('#teklifGonderModal #cAciklama').val('Sayın [FİRMAADI],\n\nKurumunuzun gereksinimlerini karşılamak üzere hazırlanan teklifimiz aşağıda bilgilerinize sunulmuştur. \n\nGereksinimlerinizi en iyi şekilde karşılayacağına inandığımız teklifimize ilişkin sorularınızı yanıtlamaktan ve kurumunuza hizmet vermekten memnuniyet duyduğumuzu bildirir, çalışmalarınızda başarılar dileriz. \n\nSaygılarımızla, ');
    $("#teklifGonderModal #cAciklamaValidation").text("");
    $("#teklifGonderModal #alert-1").displayNone();
    $("#teklifGonderModal #alert-2").displayNone();
    $("#teklifGonderModal #alert-3").displayNone();
}


function TeklifGonderModal() {
    var cAciklamaREP = ($('#teklifGonderModal #cAciklama').val()).replace(/\n/g, '|');
    window.open("/Teklif2/GonderTeklifTumu/" + $('#teklifGonderModal #teklifGonderId').val() + "/?cAciklama=" + cAciklamaREP, '_self');
}
