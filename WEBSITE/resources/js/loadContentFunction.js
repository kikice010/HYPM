function loadContent(phpUrl, rootJSON, $container, function_createContentElement, getParams) {
    $.ajax({
        url: phpUrl,
        method: 'GET',
        data:  getParams,
        dataType: 'json',
        success: function(data) {
            console.log(data);
            if (data.hasOwnProperty(rootJSON)) {
                for (var i in data[rootJSON]) {
                    $container.append(
                        function_createContentElement(data[rootJSON][i]));
                }
            }
            if (data.hasOwnProperty('success') && data.success === 0){
                $('.page-wrap .container').append(
                    $('<p>Invalid '+rootJSON+' request</p>').addClass('error-msg'));
            }
        },
        error: function(requestObject, error, errorThrown) {
            $('.page-wrap .container').append(
                $('<p>Please check your internet connection</p>').addClass('error-msg'));
        }
    });
}
