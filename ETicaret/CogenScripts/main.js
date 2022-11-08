$(function () {
    var path = window.location.pathname;

    $("#sidebar .components a").each(function () {
        if ($(this).attr("href") == path && $(this).attr("class") != "new-tab") {
            $(this).addClass("active");
            $(this).parent().parent().addClass("show");
        }

        if ($(this).attr("class") != "dropdown-toggle") {
            $(this).parent().append('<a href="' + $(this).attr("href") + '" target="_blank" class="new-tab" title="Yeni Sekmede Aç"><i class="fa fa-external-link" aria-hidden="true"></i></a>');
        }
    });
});

function goBack() {
    window.history.back();
}