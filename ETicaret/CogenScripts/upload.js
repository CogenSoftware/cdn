var cResimler = '';

$(function () {
    $('#cResimler').on("change", function () {
        cResimler = '';
        $("#fileUploadAlertSuccess").css('display', 'none');
        $("#fileUploadAlertDanger").css('display', 'none');
        $('#formAlert').css('display', 'none');
        if (window.FormData !== undefined) {
            var fileUpload = $("#cResimler").get(0);
            var files = fileUpload.files;
            UploadFile(files);
        }
    });
});

function UploadFile(files) {

    var iCount = $('#image-list .col-md-3').length;

    if (iCount >= maxFilesUpload) {
        $("#fileUploadAlertDanger").html('<strong>Hata</strong> : Maksimum ' + maxFilesUpload + ' adet fotoğraf yükleyebilirsiniz!');
        $("#fileUploadAlertDanger").css('display', 'block');
        $('#formAlert').css('display', 'block');
        return false;
    }

    var totalSize = 0;
    for (var i = 0; i < files.length; i++) {
        totalSize += files[i].size;
    }

    var sizeInMb = totalSize / 1000000;
    if (sizeInMb > 200) {
        $("#fileUploadAlertDanger").html('<strong>Hata</strong> : Toplamda maksimum 200 Mb fotoğraf yükleyebilirsiniz!');
        $("#fileUploadAlertDanger").css('display', 'block');
        $('#formAlert').css('display', 'block');
        return false;
    }

    for (var i = 0; i < files.length; i++) {
        

        var reader = new FileReader();
        reader.cFileNameReader = files[i].name;
        reader.onload = function (e) {
            var image = new Image();
            image.cFileNameImage = this.cFileNameReader;
            image.onload = function (imageEvent) {
                // Resize the image
                var canvas = document.createElement('canvas'),
                    max_size = 800,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg');
                var resizedImage = dataURLToBlob(dataUrl);
                $.event.trigger({
                    type: "imageResized",
                    blob: resizedImage,
                    url: dataUrl,
                    filename: this.cFileNameImage
                });

            }

            image.src = e.target.result;

            $('#image-list').append(
                '<div class="col-md-2">' +
                '<i class="fa fa-close" onclick="DeleteImage(this)"></i>' +
                '<i class="fa fa-arrow-right" onclick="ImageOrderNext(this)"></i>' +
                '<i class="fa fa-arrow-left" onclick="ImageOrderBack(this)"></i>' +
                '<a href="' + e.target.result + '" data-lightbox="image">' +
                '<div data-file-upload="1" data-file-name="' + e.target.cFileNameReader + '" class="image" style="background-image:url(' + e.target.result + ')">' +
                '<div id="loading" style="display:block;" class="loading"></div>' +
                '</div>' +
                '</a>' +
                '</div>');
        }

        reader.readAsDataURL(files[i]);
    }
}

var dataURLToBlob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];

        return new Blob([raw], { type: contentType });
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

$(document).on("imageResized", function (event) {
    if (event.blob && event.filename) {
        UploadFileSplit(event.blob, event.filename);
    }
});

function UploadFileSplit(TargetFile, FileName) {
    // create array to store the buffer chunks
    var FileChunk = [];
    // the file object itself that we will work with
    var file = TargetFile;
    // set up other initial vars
    var MaxFileSizeMB = 0.5;
    var BufferChunkSize = MaxFileSizeMB * (1024 * 1024);
    var ReadBuffer_Size = 1024;
    var FileStreamPos = 0;
    // set the initial chunk length
    var EndPos = BufferChunkSize;
    var Size = file.size;
    // add to the FileChunk array until we get to the end of the file
    while (FileStreamPos < Size) {
        // "slice" the file from the starting position/offset, to  the required length
        FileChunk.push(file.slice(FileStreamPos, EndPos));
        FileStreamPos = EndPos; // jump by the amount read
        EndPos = FileStreamPos + BufferChunkSize; // set next chunk length
    }
    // get total number of "files" we will be sending
    var TotalParts = FileChunk.length;
    var PartCount = 0;
    // loop through, pulling the first item from the array each time and sending it
    while (chunk = FileChunk.shift()) {
        PartCount++;
        // file name convention
        var FilePartName = FileName + ".part_" + PartCount + "." + TotalParts;
        // send the file
        UploadFileSplitChunk(chunk, FilePartName);
    }
}


function UploadFileSplitChunk(Chunk, FileName) {
    var FD = new FormData();
    FD.append('file', Chunk, FileName);
    $.ajax({
        type: "POST",
        url: '/Dosya/UploadFileSplit/',
        contentType: false,
        processData: false,
        data: FD,
        success: function (result) {
            cResimler = '';
            if (result.indexOf(":") != -1) {
                var cSplit = result.split(':');
                $('#image-list').find('.image').each(function () {
                    if ($(this).data('file-name') == cSplit[1]) {
                        $(this).attr('data-file-name', cSplit[0]);
                        $(this).attr('data-file-upload', 0);
                        $(this).parent().find('.loading').css('display', 'none');
                        if (cResimler != '') {
                            cResimler += "|";
                        }
                    }
                });

                $('#image-list').find('.image').each(function () {
                    if (cResimler != '') {
                        cResimler += "|";
                    }
                    cResimler += $(this).attr('data-file-name');
                });
                $('#cResimListesi').val(cResimler);
                $('#fileUploadAlertSuccess').html('<strong>Bilgi</strong> : Dosya(lar) başarılı bir şekilde yüklendi.');
                $('#fileUploadAlertDanger').css('display', 'none');
                $('#fileUploadAlertSuccess').css('display', 'block');
            }
        },
        error: function (err) {
            $('#fileUploadAlertDanger').html('<strong>Hata</strong> : Dosya(lar) yüklenirken beklenmedik bir hata oluştu!');
            $('#fileUploadAlertSuccess').css('display', 'none');
            $('#fileUploadAlertDanger').css('display', 'block');
        }
    });
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

function DeleteImage(fa) {
    $(fa).parent().remove();
    var cResimler = '';
    $('#image-list').find('.image').each(function () {
        if (cResimler != '') {
            cResimler += '|';
        }

        cResimler += $(this).data('file-name');
    });
    $('#cResimListesi').val(cResimler);

    var iCount = $('#image-list .col-md-3').length;
    var iOrder = 0;
    $('#image-list').find('.col-md-3').each(function () {
        $(this).find('.fa-arrow-left').css('display', 'block');
        $(this).find('.fa-arrow-right').css('display', 'block');
        $(this).find('.fa-arrow-left').css('right', '74px');

        if (iOrder == 0) {
            $(this).find('.fa-arrow-left').css('display', 'none');
        }
        if (iOrder == (iCount - 1)) {
            $(this).find('.fa-arrow-right').css('display', 'none');
            $(this).find('.fa-arrow-left').css('right', '40px');
        }
        iOrder++;
    });
}

function ImageOrderNext(fa) {
    var parent = $(fa).parents('.col-md-3');
    parent.insertAfter(parent.next('.col-md-3'));

    var iCount = $('#image-list .col-md-3').length;
    var iOrder = 0;
    $('#image-list').find('.col-md-3').each(function () {
        $(this).find('.fa-arrow-left').css('display', 'block');
        $(this).find('.fa-arrow-right').css('display', 'block');
        $(this).find('.fa-arrow-left').css('right', '74px');

        if (iOrder == 0) {
            $(this).find('.fa-arrow-left').css('display', 'none');
        }
        if (iOrder == (iCount - 1)) {
            $(this).find('.fa-arrow-right').css('display', 'none');
            $(this).find('.fa-arrow-left').css('right', '40px');
        }
        iOrder++;
    });

    cResimler = '';
    $('#image-list').find('.image').each(function () {
        if (cResimler != '') {
            cResimler += "|";
        }
        cResimler += $(this).attr('data-file-name');
    });
    $('#cResimListesi').val(cResimler);
}

function ImageOrderBack(fa) {
    var parent = $(fa).parents('.col-md-3');
    parent.insertBefore(parent.prev('.col-md-3'));

    var iCount = $('#image-list .col-md-3').length;
    var iOrder = 0;
    $('#image-list').find('.col-md-3').each(function () {
        $(this).find('.fa-arrow-left').css('display', 'block');
        $(this).find('.fa-arrow-right').css('display', 'block');
        $(this).find('.fa-arrow-left').css('right', '74px');

        if (iOrder == 0) {
            $(this).find('.fa-arrow-left').css('display', 'none');
        }
        if (iOrder == (iCount - 1)) {
            $(this).find('.fa-arrow-right').css('display', 'none');
            $(this).find('.fa-arrow-left').css('right', '40px');
        }
        iOrder++;
    });

    cResimler = '';
    $('#image-list').find('.image').each(function () {
        if (cResimler != '') {
            cResimler += "|";
        }
        cResimler += $(this).attr('data-file-name');
    });
    $('#cResimListesi').val(cResimler);
}