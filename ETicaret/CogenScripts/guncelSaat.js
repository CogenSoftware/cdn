function CurrentDateTime(iValue) {
    if (iValue == 1) {
        var d = new Date();
        $("#cGirisTarihi").val((d.getDate() < 10 ? '0' : '') + d.getDate() + '.' + ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '.' + d.getFullYear());
        $("#iGirisSaat").val(d.getHours());
        $("#iGirisSaat").select2();
        var iDakika = d.getMinutes();
        if (iDakika == 0) {
            iDakika = 60;
        }
        $("#iGirisDakika").val(iDakika);
        $("#iGirisDakika").select2();
        Hesapla();
    } else if (iValue == 2) {
        var d = new Date();
        $("#cCikisTarihi").val((d.getDate() < 10 ? '0' : '') + d.getDate() + '.' + ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '.' + d.getFullYear());
        $("#iCikisSaat").val(d.getHours());
        $("#iCikisSaat").select2();
        var iDakika = d.getMinutes();
        if (iDakika == 0) {
            iDakika = 60;
        }
        $("#iCikisDakika").val(iDakika);
        $("#iCikisDakika").select2();
        Hesapla();
    }
}