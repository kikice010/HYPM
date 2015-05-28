$(document).ready(function() {

    
    function loadHomepageComponents(homepage) { // clone the empty boilerplate node and fill it with content
           $('.jumbotron').css('background-image', 'url('+ homepage.header_image_path +')');
           $('.general-info').html(homepage.general_description);
           $('.founder-container iframe').attr('src', homepage.founder_video_path);
           $('.founder_description').html(homepage.founder_description);

          //  tempNode.find('.homepage-description').html(homepage.description);
          //  tempNode.find('img').attr('src', homepage.image_path);
        return null;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    if (typeof loadContent !== 'undefined') {   
        loadContent( 
            'http://hypermediagym.altervista.org/php/get_homepage_components.php',
             'homepage', $('#homepage-container'), loadHomepageComponents);
    }

});
