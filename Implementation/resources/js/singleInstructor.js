$(document).ready(function() {

    var listItem = $('<li><a href=""></a></li>');

    function createInstructorContainer(instructor) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('#instructor-container');
        $('.page-header h1').html(instructor.instr_name);
        $('.breadcrumb li:last').html(instructor.instr_name);
		
		rootElement.find('.instructor-image-id').attr('src', instructor.image_path);
		if(instructor.instructor_of_the_month == 1) {
			rootElement.find('.instructor-of-the-month').html("<img src='../resources/images/instructors/star.png'  height='42' width='42' /> <b> Instructor of the month</b>");
		} else {
			rootElement.find('.instructor-of-the-month').css("visibility", 'hidden');
		}
		
		console.log(instructor);
		//in the logged variable there is nothing inside arrays instructor.courses and instructor.categories
		//but if we check the php call it is ok
		//http://hypermediagym.altervista.org/php/get_instructor_by_name.php?name=Alexandra+Behrens
		if (instructor.hasOwnProperty('courses')) {
            for (var i in instructor.courses) {
                rootElement.find('.instructor-courses ul')
                    .append(createCourseListItem(instructor.courses[i]));
            }
        }
		
		if (instructor.hasOwnProperty('categories')) {
            for (var i in instructor.categories) {
                rootElement.find('.instructor-categories ul')
                    .append(createCategoryListItem(instructor.categories[i]));
            }
        }
		
		rootElement.find('.instructor-bio').html(instructor.bio);
		rootElement.find('.instructor-qualifications-text').html(instructor.prizes_and_awards);
		rootElement.find('.instructor-prizes-text').html(instructor.prizes_and_awards);

        return rootElement;
    }


    function createCourseListItem(course) {
        var tempListItem = listItem.clone();
        tempListItem.find('a').html(course)
            .attr('href', './course.html?title=' + course);
        return tempListItem;
    }
	
	function createCategoryListItem(category) {
        var tempListItem = listItem.clone();
        tempListItem.find('a').html(category)
            .attr('href', './category.html?name=' + category);
        return tempListItem;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    var params = (window.location.search.replace("?", "")).split("=");
    if (typeof loadContent !== 'undefined' && params.length === 2) {
        loadContent(
            'http://hypermediagym.altervista.org/php/get_instructor_by_name.php',
            'instructor', $('#instructor-container'), createInstructorContainer, 
            {'name' : params[1].replace(/%20/g, ' ') });
    }

});
