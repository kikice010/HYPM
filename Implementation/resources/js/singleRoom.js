$(document).ready(function() {

    var galleryItem    = $('<a data-gallery><div><img/></div></a>');
    var courseListItem = $('<li><a href=""></a></li>');

    function createCategoryContent(room) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('#room-container');
        $('.page-header h1').html(room.name).fadeIn();
        $('.breadcrumb li:last').html(room.name).fadeTo(500, 1);

        rootElement.find('.room-location').html(room.location);

        if (room.hasOwnProperty('courses')) {
            for (var i in room.courses) {
                rootElement.find('.room-courses ul')
                    .append(createCourseListItem(room.courses[i]));
            }
        }
        if (room.hasOwnProperty('gallery')) {
            for (var j in room.gallery) {
                rootElement.find('.room-gallery')
                    .append(createGalleryItem(room.name, room.gallery[j]));
            }
        }
        return rootElement.fadeIn();
    }

    function createCourseListItem(course) {
        var tempListItem = courseListItem.clone();
        tempListItem.find('a').html(course)
            .attr('href', './course.html?title=' + course);
        return tempListItem;
    }

    function createGalleryItem(room_name, image_path) {
        var tempGalleryItem = galleryItem.clone();
        tempGalleryItem.attr({
            href : image_path,
            title: room_name });
        tempGalleryItem.find('img').attr({
            src  : image_path,
            alt  : room_name });

        return tempGalleryItem.fadeIn();
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    var params = (window.location.search.replace("?", "")).split("=");
    if (typeof loadContent !== 'undefined' && params.length === 2) {
        loadContent(
            'http://hypermediagym.altervista.org/php/get_room_by_name.php',
            'room', $('#room-container'), createCategoryContent, {
                'name': params[1].replace(/%20/g, ' ')
            });
    }

});
