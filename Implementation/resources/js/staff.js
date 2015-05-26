$(document).ready(function() {

    var dummyNode = $('.single-instructor-item'); // get the empty boilerplate node defined in the html
    var eqNode    = dummyNode.clone();           // clone it
    dummyNode.css('display','none');             // hide the useless boilerplate node


    function createInstructorElement(instructor) { // clone the empty boilerplate node and fill it with content
        var tempNode = eqNode.clone();
            tempNode.find('.instructor-name').html(instructor.instr_name);
            tempNode.find('.instructor-description').html(instructor.bio);
            tempNode.find('img').attr('src', instructor.image_path);
            tempNode.find('.instructor-qualifications').html("<b>Qualifications: </b>"+instructor.qualifications);
            tempNode.find('.instructor-prizes_and_awards').html("<b>Prizes and awards: </b>"+instructor.prizes_and_awards);
			if(instructor.instructor_of_the_month == 1) {
				tempNode.find('.instructor-of_the_month').html("<img src='http://hypermediagym.altervista.org/resources/images/instructors/star.png'  height='42' width='42' /> <b> Instructor of the month</b>");
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
