function loadContent(phpUrl, rootJSON, $container, function_createContentElement) {
    $.ajax({
        url: phpUrl,
        method: 'GET',
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
