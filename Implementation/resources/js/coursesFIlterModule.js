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
	                tempNode.find('.category-courses')
	                    	.append(Util.createListItem(filteredObj.courses[i]));
	        }}
	        return tempNode;
		},
		loadContent		: 	function (phpUrl, rootJSON, $container, $itemBoilerplate) {
			var self = this;
		    $.ajax({
		        url: phpUrl,
		        method: 'GET',
		        dataType: 'json',
		        success: function(data) {
		            if (data.hasOwnProperty(rootJSON)) {
		                for (var i in data[rootJSON]) {
		                    $container.append(
		                    	self.createElement(rootJSON, data[rootJSON][i], $itemBoilerplate));
		                }
		            }
		        }
    		});
		}
	};	

	var categoryData 	= {
		$root 			: 	$('#category-filter-container')   || null,
		$itemElement 	: 	$('.single-category-container').clone().css('display','')   || null,
		
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

	categoryData.loadData();
	//return {
	// 	filterByCategory: filterByCategory,
	// 	filterByLevel: filterByLevel,
	// 	filterByAlphabet: filterByAlphabet,

	// };
})();
});