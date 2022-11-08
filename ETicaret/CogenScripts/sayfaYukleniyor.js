function hideLoader() {
    $('#pageLoading').hide();
}
$(window).ready(hideLoader);
setTimeout(hideLoader, 60000);