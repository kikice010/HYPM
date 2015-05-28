$(document).ready(function() {
    //frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFeD0JY9_jrcVGaCwCgcnbwGL48kORFb0 &q=Via%20Edoardo%20Bonardi%2C%209%2C%20Milano%2C%20MI%2C%20Italia"
		
		/*var rootElement = $('#location-content-container').find('.location-content-item');
		console.log("you called me");
		rootElement.find('.contact-info').find('.contact-info-address').html("works");
		rootElement.find('.how-to-get-here-text').html("works");*/
		
    function createLocationContainer(location) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('#location-content-container').find('.location-content-item');
		console.log("you called me");
		rootElement.find('.contact-info').find('.contact-info-address').html(location.address);
		rootElement.find('.how-to-get-here-text').html(location.how_to_get_here);

        return rootElement.fadeIn();
    }
	
    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    if (typeof loadContent !== 'undefined') {  
		console.log("loadContent defined");
        loadContent(
            'http://hypermediagym.altervista.org/php/get_gym_location.php',
            'location', $('#location-content-container'), createLocationContainer);
    } else {
		console.log("loadContent undefined");
	}

});
