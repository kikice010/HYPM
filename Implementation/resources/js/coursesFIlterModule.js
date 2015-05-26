/*
	function Util.createElement expects JSON filteredObject
	where root element filter can be either 'category', 'level' or 'alphabetical'
e.g. 
{
    filter: [
    	{
            name: "Cardio",
            courses: [
                "Spinning",
                "Running Club"
            ]
        }, {
            name: "Dance",
            courses: [
                "Ballet workout"
            ]
        }
    ]
}
*/

$( function(){
	var CoursesFilterModule = (function(){

	var Util = {
		$helperListItem	: 	$('<li class="list-group-item"><a/></li>'), 
		createListItem	: 	function(course){
			var tempListItem = this.$helperListItem.clone();
	        	tempListItem.find('a')
		        	.html(course)
		            .attr('href', './course.html?title=' + course);
	        return tempListItem;
		},
		createElement 	: 	function( filter, filteredObj, $itemBolierplate ){
			var tempNode = $itemBolierplate.clone();
        		tempNode.find('.'+ filter +'-name')
        				.html(filteredObj.name);
        		tempNode.find('.'+ filter +'-name-link')
        				.attr('href','./'+ filter +'.html?name=' + filteredObj.name);

	        if (filteredObj.hasOwnProperty('courses')) {
	            for (var i in filteredObj.courses) {
	                tempNode.find('.'+ filter +'-courses')
	                    	.append(Util.createListItem(filteredObj.courses[i]));
	        }}
	        return tempNode.fadeIn();
		},
		loadContent		: 	function (phpUrl, rootJSON, $container, $itemBoilerplate) {
			var self = this;
		    $.ajax({
		        url: phpUrl,
		        method: 'GET',
		        dataType: 'json',
		        success: function(data) {
		            if (data.hasOwnProperty(rootJSON)) {
		            	var counter = 0;
						var intervalId = setInterval(function(){
						    $container.append( 
						    		   self.createElement(rootJSON, data[rootJSON][counter], $itemBoilerplate));
						    counter++;
						    if(counter === (data[rootJSON]).length)  clearInterval( intervalId );
						}, 10);
		            }
		        }
    		});
		}
	};	

	var categoryData 	= {
		$root 			: 	$('#category-filter-container')   || null,
		$itemElement 	: 	$('.single-category-container').clone()   || null,
		
		loadData : function(){
			if (typeof loadContent !== 'undefined') 
		        Util.loadContent(
		        	'http://hypermediagym.altervista.org/php/get_courses_by_category.php',
		            'category', this.$root, this.$itemElement);
		},
		show : 	function(){
			this.$root.fadeIn();
		},
		hide : 	function(){
			this.$root.fadeOut();
		}

	};

	var levelData 	= {
		$root 			: 	$('#level-filter-container')   || null,
		$itemElement 	: 	$('.single-level-container').clone()   || null,
		
		loadData : function(){
			if (typeof loadContent !== 'undefined') 
		        Util.loadContent(
		        	'http://hypermediagym.altervista.org/php/get_courses_by_level.php',
		            'level', this.$root, this.$itemElement);
		},
		show : 	function(){
			this.$root.fadeIn();
		},
		hide : 	function(){
			this.$root.fadeOut();
		}

	};


	categoryData.loadData();
	levelData.loadData();
	//return {
	// 	filterByCategory: filterByCategory,
	// 	filterByLevel: filterByLevel,
	// 	filterByAlphabet: filterByAlphabet,

	// };
})();
});