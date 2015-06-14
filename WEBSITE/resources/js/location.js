$(document).ready(function() {

    function createLocationContainer(location) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('#location-container');
        rootElement.find('.contact-info').find('.contact-info-address').html(location.address);
        rootElement.find('.how-to-get-here-text').html(location.how_to_get_here);

        mapOptions = {
            zoom: 16,
            center: {
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lon),
            }
        };
        loadGoogleMapsScript(location.APIkey);
        return rootElement.fadeIn();
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    if (typeof loadContent !== 'undefined') {
        console.log("loadContent defined");
        loadContent(
            'http://hypermediagym.altervista.org/php/get_gym_location.php',
            'location', $('#location-container'), createLocationContainer);
    }

    // contactUs form listeners
    $('#contactUs-form').submit(function(evt) {
        evt.preventDefault();
        $('#contactUs-message')
            .html($('#contactUs-name').val() + ', thank you for contacting us!')
            .fadeIn('slow');
        $('#contactUs-form')[0].reset();
    });
    $('#contactUs-accordion a').click(function(evt) {
        $('#contactUs-message').html('');
    });


});


// global variable
var mapOptions = {};

function initializeGoogleMap() {

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(mapOptions.center.lat, mapOptions.center.lng),
        map: map,
        title: 'Big gym'
    });

}

function loadGoogleMapsScript(APIkey) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 
        'https://maps.googleapis.com/maps/api/js?key=' + APIkey +
        '&callback=initializeGoogleMap';
    document.body.appendChild(script);
}
