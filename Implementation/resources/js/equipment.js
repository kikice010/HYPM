$(document).ready(function() {

    var dummyNode = $('.single-equipment-item'); // get the empty boilerplate node defined in the html
    var eqNode    = dummyNode.clone();           // clone it
    dummyNode.css('display','none');             // hide the useless boilerplate node


    function createEquipmentElement(equipment) { // clone the empty boilerplate node and fill it with content
        var tempNode = eqNode.clone();
            tempNode.find('.equipment-name').html(equipment.name);
            tempNode.find('.equipment-description').html(equipment.description);
            tempNode.find('img').attr('src', equipment.image_path);
        return tempNode;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    if (typeof loadContent !== 'undefined') {   
        loadContent( 
            'http://hypermediagym.altervista.org/php/get_all_equipment.php',
             'equipment', $('#equipment-container'), createEquipmentElement);
    }

});
