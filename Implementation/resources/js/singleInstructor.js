$(document).ready(function() {

    

    function createInstructorContainer(instructor) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('<div>');
        $('.page-header h1').html(instructor.instr_name);
        $('.breadcrumb li:last').html(instructor.instr_name);
		
		var imgElement = $('<img>');
		imgElement.attr('src', instructor.image_path);
		var divImgElement = $('<div>');
		divImgElement.attr('class', 'instructor-image row-md-2');
        rootElement.append(divImgElement.append(imgElement));
		var restDivElement = $('<div>');
		restDivElement.attr('class', 'instructor-rest row-md-8');
		if(instructor.instructor_of_the_month == 1) {
			var instrMonthElement = $('<div>');
			instrMonthElement.html("<img src='../resources/images/instructors/star.png'  height='42' width='42' /> <b> Instructor of the month</b>");
			restDivElement.append(instrMonthElement);
		} else {
		}
        restDivElement.append($('<div>').html(instructor.bio));
        restDivElement.append($('<div>').html("<b>Qualifications: </b>"+instructor.qualifications));
        restDivElement.append($('<div>').html("<b>Prizes and awards: </b>"+instructor.prizes_and_awards));
		rootElement.append(restDivElement);


        return rootElement;
    }

    // load content from the server
    // loadContent( url,  rootJsonElement, $containerNode,  function that creates a node to be appended to the $container )
    var params = (window.location.search.replace("?", "")).split("=");
	console.log(params);
    if (typeof loadContent !== 'undefined' && params.length === 2) {
        loadContent(
            'http://hypermediagym.altervista.org/php/get_instructor_by_name.php',
            'instructor', $('#instructor-container'), createInstructorContainer, 
            {'name' : params[1].replace(/%20/g, ' ') });
    }

});
