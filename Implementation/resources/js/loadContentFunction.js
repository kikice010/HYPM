function loadContent(phpUrl, rootJSON, $container, function_createContentElement, getParams) {
    $.ajax({
        url: phpUrl,
        method: 'GET',
        data:  getParams,
        dataType: 'json',
        success: function(data) {
            if (data.hasOwnProperty(rootJSON)) {
                for (var i in data[rootJSON]) {
                    $container.append(
                        function_createContentElement(data[rootJSON][i]));
                }
            }
        }
    });
}
