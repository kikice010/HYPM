$(document).ready(function() {
    //frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFeD0JY9_jrcVGaCwCgcnbwGL48kORFb0 &q=Via%20Edoardo%20Bonardi%2C%209%2C%20Milano%2C%20MI%2C%20Italia"
		
    function createLocationContainer(location) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('#location-container');
		rootElement.find('.contact-info').find('.contact-info-address').html(location.address);
		rootElement.find('.how-to-get-here-text').html(location.how_to_get_here);
		
		//escape the address string
		//Via Edoardo Bonardi, 9, Milano, MI, Italia
		//Via%20Edoardo%20Bonardi%2C%209%2C%20Milano%2C%20MI%2C%20Italia
		var escapedAddress = location.address.replace(" ","%20").replace(",", "%2C")
		var googleMapsEmbedApiKey = "AIzaSyBFeD0JY9_jrcVGaCwCgcnbwGL48kORFb0";
		rootElement.find('.iframe-wrapper iframe')
		.attr('src',"https://www.google.com/maps/embed/v1/place?key="+googleMapsEmbedApiKey+" &q="+escapedAddress)
		.attr('frameborder','0')
		.attr('style','border:0');
		
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

});
