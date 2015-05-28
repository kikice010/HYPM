$(document).ready(function() {

    var dummyNode = $('.single-floor-container'); // get the empty boilerplate node defined in the html
    var newNode = dummyNode.clone();                 // clone it
    dummyNode.css('display', 'none');                // hide the useless boilerplate node

    var listItem = $('<li class="list-group-item"><a/></li>'); // helper list item

    function createRoomContainer(floor) { // clone the empty boilerplate node and fill it with content
        var tempNode = newNode.clone();
        tempNode.find('.floor-name').html(floor.name);

        if (floor.hasOwnProperty('rooms')) {
            for (var i in floor.rooms) {
                tempNode.find('.rooms').append(createListItem(floor.rooms[i]));
        }}
        return tempNode.fadeIn();
    }

    function createListItem(room) {
        var tempListItem = listItem.clone();
        tempListItem.find('a').html(room)
                    .attr('href', './room.html?name=' + room);
        return tempListItem;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    if (typeof loadContent !== 'undefined') {
        loadContent(
            'http://hypermediagym.altervista.org/php/get_rooms_by_floor.php',
            'room', $('#rooms-container'), createRoomContainer);
    }

});
