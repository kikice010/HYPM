$(document).ready(function() {

    function createCategoryContent(category) { // clone the empty boilerplate node and fill it with content
        var rootElement = $('#category-container');
        $('.page-header h1').html(category.name);
        $('.breadcrumb li:last').html(category.name);

        rootElement.find('.category-benefits-text').html(category.benefits);
        rootElement.find('.category-origins-text').html(category.origins);
        rootElement.find('.category-description-text').html(category.description);
        rootElement.find('.category-meant-for-text').html(category.meant_for);
        
        return rootElement;
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
