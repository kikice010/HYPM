$(document).ready(function() {

    var listItem = $('<li><a href=""></a></li>');

    function createCategoryContent(category) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('#category-container');
        $('.page-header h1').html(category.name).fadeIn();
        $('.breadcrumb li:last').html(category.name).fadeTo(500,1);

        rootElement.find('.category-benefits-text').html(category.benefits);
        rootElement.find('.category-origins-text').html(category.origins);
        rootElement.find('.category-description-text').html(category.description);
        rootElement.find('.category-meant-for-text').html(category.meant_for);
        
        if (category.hasOwnProperty('instructors')) {
            for (var i in category.instructors) {
                rootElement.find('.category-instructors ul')
                    .append(createInstructorListItem(category.instructors[i]));
            }
        }
         if (category.hasOwnProperty('courses')) {
            for (var j in category.courses) {
                rootElement.find('.category-courses ul')
                    .append(createCourseListItem(category.courses[j]));
            }
        }
        return rootElement.fadeIn();
    }
    function createInstructorListItem(instructor) {
        var tempListItem = listItem.clone();
        tempListItem.find('a').html(instructor)
            .attr('href', './instructor.html?name=' + instructor);
        return tempListItem;
    }
    function createCourseListItem(course) {
        var tempListItem = listItem.clone();
        tempListItem.find('a').html(course)
            .attr('href', './course.html?title=' + course);
        return tempListItem;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    var params = (window.location.search.replace("?", "")).split("=");
    if (typeof loadContent !== 'undefined' && params.length === 2) {
        loadContent(
            'http://hypermediagym.altervista.org/php/get_category_by_name.php',
            'category', $('#category-container'), createCategoryContent, {
                'name': params[1].replace(/%20/g, ' ')
            });
    }

});
