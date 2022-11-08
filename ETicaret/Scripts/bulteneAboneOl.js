$(function () {
    $("#subscribe").click(function () {
        if ($("#email").val().trim() != '' && isEmail($("#email").val().trim())) {
            $("#successSubscribe").css("display", "none");
            $("#errorSubscribe").css("display", "none");
            var data = {
                cEMail: $("#email").val()
            };
            $.ajax({
                type: "PUT",
                url: "/api/subscribeapi/",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                processData: !0,
                success: function () {
                    $("#successSubscribe").css("display", "block");
                },
                error: function (a) {
                    $("#errorSubscribe").css("display", "block");
                }
            });
        } else {
            $("#errorSubscribe").css("display", "block");
        }
    });
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}