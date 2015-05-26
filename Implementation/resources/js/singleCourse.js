$(document).ready(function() {

    

    function createCourseContainer(course) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('<div>');
        rootElement.append($('<h1>').html(course.title));

        rootElement.append($('<div>').text(course.level));
        rootElement.append($('<div>').text(course.room));
        rootElement.append($('<div>').text(course.category));
        rootElement.append($('<div>').html(course.description));
        rootElement.append($('<div>').html(course.target));


        return rootElement;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    var params = String.split(window.location.search.replace("?", ""), "=");
    if (typeof loadContent !== 'undefined' && params.length === 2) {
        loadContent(
            'http://hypermediagym.altervista.org/php/get_course_by_title.php',
            'course', $('#course-container'), createCourseContainer, 
            {'title' : params[1].replace(/%20/g, ' ') });
    }

});
