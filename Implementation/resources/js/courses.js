$(document).ready(function() {

    var dummyNode = $('.single-category-container'); // get the empty boilerplate node defined in the html
    var newNode = dummyNode.clone();                 // clone it
    dummyNode.css('display', 'none');                // hide the useless boilerplate node

    var listItem = $('<li class="list-group-item"><a/></li>'); // helper list item

    function createCategoryContainer(category) { // clone the empty boilerplate node and fill it with content
        var tempNode = newNode.clone();
        tempNode.find('.category-name').html(category.name);

        if (category.hasOwnProperty('courses')) {
            for (var i in category.courses) {
                tempNode.find('.category-courses')
                    .append(createListItem(category.courses[i]));
        }}
        return tempNode;
    }

    function createListItem(course) {
        var tempListItem = listItem.clone();
        tempListItem.find('a').html(course)
                    .attr('href', './courses/' + course.replace(/ /g, ''));
        return tempListItem;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    if (typeof loadContent !== 'undefined') {
        loadContent(
            'http://hypermediagym.altervista.org/php/get_courses_by_category.php',
            'category', $('#course-container'), createCategoryContainer);
    }

});
