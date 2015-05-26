$(document).ready(function() {

    

    function createCourseContainer(course) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('<div>');
        $('.page-header h1').html(course.title);
        $('.breadcrumb li:last').html(course.title);

        rootElement.append($('<div>').html(course.level));
        rootElement.append($('<div>').html(course.room));
        rootElement.append($('<div>').html(course.category));
        rootElement.append($('<div>').html(course.description));
        rootElement.append($('<div>').html(course.target));


        return rootElement;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    var params = (window.location.search.replace("?", "")).split("=");
	console.log(params);
    if (typeof loadContent !== 'undefined' && params.length === 2) {
        loadContent(
            'http://hypermediagym.altervista.org/php/get_course_by_title.php',
            'course', $('#course-container'), createCourseContainer, 
            {'title' : params[1].replace(/%20/g, ' ') });
    }

});
