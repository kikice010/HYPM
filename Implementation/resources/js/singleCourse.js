$(document).ready(function() {

    var listItem = $('<li><a href=""></a></li>');

    function createCourseContainer(course) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('#course-container');
        $('.page-header h1').html(course.title);
        $('.breadcrumb li:last').html(course.title);

        rootElement.find('.course-room a')
            .html(course.room)
            .attr('href', './room.html?name=' + course.room);
        rootElement.find('.course-level a')
            .html(course.level);

        rootElement.find('.course-category a')
            .html(course.category)
            .attr('href', './category.html?name=' + course.category);
        rootElement.find('.course-description-text').html(course.description);
        rootElement.find('.course-target-text').html(course.target);


        if (course.hasOwnProperty('instructors')) {
            for (var i in course.instructors) {
                rootElement.find('.course-instructors ul')
                    .append(createListItem(course.instructors[i]));
            }
        }
        return rootElement;
    }


    function createListItem(instructor) {
        var tempListItem = listItem.clone();
        tempListItem.find('a').html(instructor)
            .attr('href', './instructor.html?name=' + instructor);
        return tempListItem;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    var params = (window.location.search.replace("?", "")).split("=");
    if (typeof loadContent !== 'undefined' && params.length === 2) {
        loadContent(
            'http://hypermediagym.altervista.org/php/get_course_by_title.php',
            'course', $('#course-container'), createCourseContainer, 
            {'title': params[1].replace(/%20/g, ' ') });
    }

});
