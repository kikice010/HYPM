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
		currentFilter	: 	null,
		$helperListItem	: 	$('<li class="list-group-item"><a/></li>'),
		show : 	function(obj){
			obj.$root.fadeIn();
			obj.$tab.addClass('active');
		},
		hide : 	function(obj){
			obj.$root.fadeOut();
			obj.$tab.removeClass('active');
		}, 
		showDataByFilter : function(newFilter){
			if(this.currentFilter != newFilter){
				this.hide(this.currentFilter);
				this.show(newFilter);
				this.currentFilter = newFilter;
			}
		},
		createListItem	: 	function(course){
			var tempListItem = this.$helperListItem.clone();
	        	tempListItem
	        		.find('a')
		        	.html(course)
		            .attr('href', './course.html?title=' + course);
	        return tempListItem;
		},
		createElement 	: 	function( filter, filteredObj, $itemBolierplate ){
			var tempNode = $itemBolierplate.clone();
        		tempNode
        			.find('.'+ filter +'-name')
        			.html(filteredObj.name);

        		tempNode
        			.find('.'+ filter +'-name-link')
        			.attr('href','./'+ filter +'.html?name=' + filteredObj.name);

	        if (filteredObj.hasOwnProperty('courses')) {
	            for (var i in filteredObj.courses) {
	                tempNode
	                .find('.'+ filter +'-courses')
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
						    $container.append(self.createElement(rootJSON, data[rootJSON][counter], $itemBoilerplate));
						    counter++;
						    if(counter === (data[rootJSON]).length)  clearInterval( intervalId );
						}, 10);
		            }
		        },
		        error: function(requestObject, error, errorThrown) {
		            $('.page-wrap .container').append(
		                $('<p>Please check your internet connection</p>').addClass('error-msg'));
		        }
		    });
		}
	};	

	var categoryData 	= {
		$tab			: 	$('.category-tab')							|| null,
		$root 			: 	$('#category-filter-container')   			|| null,
		$itemElement 	: 	$('.single-category-container').clone()   	|| null,
		loadData : function(){
	        Util.loadContent(
	        	'http://hypermediagym.altervista.org/php/get_courses_by_category.php',
	            'category', this.$root, this.$itemElement);
		}
	};

	var levelData = {
		$tab			: 	$('.level-tab')							|| null,
		$root 			: 	$('#level-filter-container')  			|| null,
		$itemElement 	: 	$('.single-level-container').clone() 	|| null,
		loadData : function(){
	        Util.loadContent(
	        	'http://hypermediagym.altervista.org/php/get_courses_by_level.php',
	            'level', this.$root, this.$itemElement);
		}
	};

	var alphabeticalData = {
		$tab			: 	$('.alphabetical-tab')							|| null,
		$root 			: 	$('#alphabetical-filter-container')   			|| null,
		$itemElement 	: 	$('.single-alphabetical-container').clone()   	|| null,
		loadData : function(){
	        Util.loadContent(
	        	'http://hypermediagym.altervista.org/php/get_courses_by_alphabetical.php',
	            'alphabetical', this.$root, this.$itemElement);
		}
	};


	// load data for one filter 
	// aslo bind one time click hendlers to lazily load data 
	var params = (window.location.search.replace("?", "")).split("=");
	if (params[1] && params[1] == 'Level'){
		levelData.loadData();
		Util.currentFilter = categoryData;
		Util.showDataByFilter(levelData);
		categoryData.$tab.one('click', function(){categoryData.loadData();});
		alphabeticalData.$tab.one('click', function(){alphabeticalData.loadData();});
	}
	else if (params[1] && params[1] == 'Alphabetical'){
		alphabeticalData.loadData();
		Util.currentFilter = categoryData;
		Util.showDataByFilter(alphabeticalData);
		levelData.$tab.one('click', function(){levelData.loadData();});
		categoryData.$tab.one('click', function(){categoryData.loadData();});
	}
	else{
		categoryData.loadData();
		Util.currentFilter = levelData;
		Util.showDataByFilter(categoryData);
		levelData.$tab.one('click', function(){levelData.loadData();});
		alphabeticalData.$tab.one('click',function(){alphabeticalData.loadData();});
	}

	// bind tab click handelers
	$.each([categoryData, levelData, alphabeticalData], function( index, filterObj ) {
		filterObj.$tab.click(function(){
			Util.showDataByFilter(filterObj);
		});
	});
	

})();
});
