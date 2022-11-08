$(function () {
    Webcam.set({
        width: 640,
        height: 480,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach('#webcamPicture');

    $('#btnPicture').click(function () {
        Webcam.snap(function (data_uri) {
            var iCount = $('#image-list .col-md-3').length;

            if (iCount >= maxFilesUpload) {
                $("#fileUploadAlertDanger").html('<strong>Hata</strong> : Maksimum ' + maxFilesUpload + ' adet fotoğraf yükleyebilirsiniz!');
                $("#fileUploadAlertDanger").css('display', 'block');
                $('#formAlert').css('display', 'block');
                return false;
            }

            var newDate = new Date();
            var time = newDate.getTime();

            $('#image-list').append(
                '<div class="col-md-3")">' +
                '<i class="fa fa-close" onclick="DeleteImage(this)"></i>' +
                '<i class="fa fa-arrow-right" onclick="ImageOrderNext(this)"></i>' +
                '<i class="fa fa-arrow-left" onclick="ImageOrderBack(this)"></i>' +
                '<a href="' + data_uri + '" data-lightbox="image">' +
                '<div data-file-upload="1" data-file-name="' + time + '" class="image" style="background-image:url(' + data_uri + ')">' +
                '<div id="loading" style="display:block;" class="loading"></div>' +
                '</div>' +
                '</a>' +
                '</div>');

            var blob = dataURLToBlob(data_uri);
            UploadFileSplit(blob, time);
        });

        $("#webcamPictureModal").modal('hide');
    });
});