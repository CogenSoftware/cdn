$(document).ready(function () {
    $("#iSehirAnahtar").change(function () {
        GetLocation();
    });
    $("#iIlceAnahtar").change(function () {
        GetLocation();
    });
    $("#iMahalleAnahtar").change(function () {
        GetLocation();
    });
    $("#cAdres").focusout(function () {
        GetLocation();
    });
    $("#iSehirAnahtar2").change(function () {
        GetLocation2();
    });
    $("#iIlceAnahtar2").change(function () {
        GetLocation2();
    });
    $("#iMahalleAnahtar2").change(function () {
        GetLocation2();
    });
    $("#cAdres2").focusout(function () {
        GetLocation2();
    });
    $("#iSehirAnahtar3").change(function () {
        GetLocation3();
    });
    $("#iIlceAnahtar3").change(function () {
        GetLocation3();
    });
    $("#iMahalleAnahtar3").change(function () {
        GetLocation3();
    });
    $("#cAdres3").focusout(function () {
        GetLocation3();
    });
});

function GetLocation() {
    var geocoder = new google.maps.Geocoder();
    var cValue = '';
    var iZoom = 10;
    if ($("#iSehirAnahtar").val() > 0) {
        if (cValue != '') {
            cValue += ", ";
        }
        cValue += $("#iSehirAnahtar option:selected").text();
        iZoom = 10;
    }
    if ($("#iIlceAnahtar").val() > 0) {
        if (cValue != '') {
            cValue += ", ";
        }
        cValue += $("#iIlceAnahtar option:selected").text();
        iZoom = 12;
    }
    if ($("#iMahalleAnahtar").val() > 0) {
        if (cValue != '') {
            cValue += ", ";
        }
        cValue += $("#iMahalleAnahtar option:selected").text();
        iZoom = 14;
    }
    if ($("#cAdres").val() != '') {
        if (cValue != '') {
            cValue += ", ";
        }
        cValue += $("#cAdres").val();
        iZoom = 16;
    }
    geocoder.geocode({ 'address': cValue }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(cValue)
            map.setCenter({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });
            var latlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            myMarker.setPosition(latlng);
            map.setZoom(iZoom);
            $("#cEnlem").val(results[0].geometry.location.lat().toFixed(6));
            $("#cBoylam").val(results[0].geometry.location.lng().toFixed(6));
        }
    });
}

var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 10,
    center: new google.maps.LatLng(cEnlem, cBoylam),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var myMarker = new google.maps.Marker({
    position: new google.maps.LatLng(cEnlem, cBoylam),
    draggable: true
});

google.maps.event.addListener(myMarker, 'dragend', function (evt) {
    $("#cEnlem").val(evt.latLng.lat().toFixed(5));
    $("#cBoylam").val(evt.latLng.lng().toFixed(5));
});

google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
    $("#cEnlem").val();
    $("#cBoylam").val();
});

google.maps.event.addListener(map, 'click', function (event) {
    myMarker.setPosition(event.latLng);
    map.setCenter(location);
});

map.setCenter(myMarker.position);
myMarker.setMap(map);

function GetLocation2() {
    var geocoder2 = new google.maps.Geocoder();
    var cValue2 = '';
    var iZoom2 = 10;
    if ($("#iSehirAnahtar2").val() > 0) {
        if (cValue2 != '') {
            cValue2 += ", ";
        }
        cValue2 += $("#iSehirAnahtar2 option:selected").text();
        iZoom2 = 10;
    }
    if ($("#iIlceAnahtar2").val() > 0) {
        if (cValue2 != '') {
            cValue2 += ", ";
        }
        cValue2 += $("#iIlceAnahtar2 option:selected").text();
        iZoom2 = 12;
    }
    if ($("#iMahalleAnahtar2").val() > 0) {
        if (cValue2 != '') {
            cValue2 += ", ";
        }
        cValue2 += $("#iMahalleAnahtar2 option:selected").text();
        iZoom2 = 14;
    }
    if ($("#cAdres2").val() != '') {
        if (cValue2 != '') {
            cValue2 += ", ";
        }
        cValue2 += $("#cAdres2").val();
        iZoom2 = 16;
    }
    geocoder2.geocode({ 'address': cValue2 }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map2.setCenter({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });
            var latlng2 = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            myMarker2.setPosition(latlng2);
            map2.setZoom(iZoom);
            $("#cEnlem2").val(results[0].geometry.location.lat().toFixed(6));
            $("#cBoylam2").val(results[0].geometry.location.lng().toFixed(6));
        }
    });
}

var map2 = new google.maps.Map(document.getElementById('map_canvas_2'), {
    zoom: 10,
    center: new google.maps.LatLng(cEnlem2, cBoylam2),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var myMarker2 = new google.maps.Marker({
    position: new google.maps.LatLng(cEnlem2, cBoylam2),
    draggable: true
});

google.maps.event.addListener(myMarker2, 'dragend', function (evt) {
    $("#cEnlem2").val(evt.latLng.lat().toFixed(5));
    $("#cBoylam2").val(evt.latLng.lng().toFixed(5));
});

google.maps.event.addListener(myMarker2, 'dragstart', function (evt) {
    $("#cEnlem2").val();
    $("#cBoylam2").val();
});

google.maps.event.addListener(map2, 'click', function (event) {
    myMarker2.setPosition(event.latLng);
    map2.setCenter(location);
});

map2.setCenter(myMarker2.position);
myMarker2.setMap(map2);

function GetLocation3() {
    var geocoder3 = new google.maps.Geocoder();
    var cValue3 = '';
    var iZoom3 = 10;
    if ($("#iSehirAnahtar3").val() > 0) {
        if (cValue3 != '') {
            cValue3 += ", ";
        }
        cValue3 += $("#iSehirAnahtar3 option:selected").text();
        iZoom3 = 10;
    }
    if ($("#iIlceAnahtar3").val() > 0) {
        if (cValue3 != '') {
            cValue3 += ", ";
        }
        cValue3 += $("#iIlceAnahtar3 option:selected").text();
        iZoom3 = 13;
    }
    if ($("#iMahalleAnahtar3").val() > 0) {
        if (cValue3 != '') {
            cValue3 += ", ";
        }
        cValue3 += $("#iMahalleAnahtar3 option:selected").text();
        iZoom3 = 14;
    }
    if ($("#cAdres3").val() != '') {
        if (cValue3 != '') {
            cValue3 += ", ";
        }
        cValue3 += $("#cAdres3").val();
        iZoom3 = 16;
    }
    geocoder3.geocode({ 'address': cValue3 }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map3.setCenter({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });
            var latlng3 = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            myMarker3.setPosition(latlng3);
            map3.setZoom(iZoom);
            $("#cEnlem3").val(results[0].geometry.location.lat().toFixed(6));
            $("#cBoylam3").val(results[0].geometry.location.lng().toFixed(6));
        }
    });
}

var map3 = new google.maps.Map(document.getElementById('map_canvas_3'), {
    zoom: 10,
    center: new google.maps.LatLng(cEnlem3, cBoylam3),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var myMarker3 = new google.maps.Marker({
    position: new google.maps.LatLng(cEnlem3, cBoylam3),
    draggable: true
});

google.maps.event.addListener(myMarker3, 'dragend', function (evt) {
    $("#cEnlem3").val(evt.latLng.lat().toFixed(5));
    $("#cBoylam3").val(evt.latLng.lng().toFixed(5));
});

google.maps.event.addListener(myMarker3, 'dragstart', function (evt) {
    $("#cEnlem3").val();
    $("#cBoylam3").val();
});

google.maps.event.addListener(map3, 'click', function (event) {
    myMarker3.setPosition(event.latLng);
    map3.setCenter(location);
});

map3.setCenter(myMarker3.position);
myMarker3.setMap(map3);