$(document).ready(function() {

    var dummyNode = $('.single-instructor-item'); // get the empty boilerplate node defined in the html
    var eqNode    = dummyNode.clone();           // clone it
    dummyNode.css('display','none');             // hide the useless boilerplate node


    function createInstructorElement(instructor) { // clone the empty boilerplate node and fill it with content
        var tempNode = eqNode.clone();
            tempNode.find('.instructor-name').html("<a href='./instructor.html?name="+instructor.instr_name+"'>"+instructor.instr_name+"</a>");
            tempNode.find('img').attr('src', instructor.image_path);
			if(instructor.instructor_of_the_month == 1) {
				tempNode.find('.instructor-of_the_month').html('<span class="glyphicon glyphicon-star" aria-hidden="true"></span> <b> Instructor of the month</b>');
			} else {
				tempNode.find('.instructor-of_the_month').css("visibility", 'hidden');
			}
        return tempNode;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    if (typeof loadContent !== 'undefined') {   
        loadContent( 
            'http://hypermediagym.altervista.org/php/get_all_instructors.php',
             'instructors', $('#instructor-container'), createInstructorElement);
    }

});
