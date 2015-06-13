function loadInstructorTweets(screen_name) {

    var $tweet = $('<li><div class="bubble-container">' +
        '<div class="bubble">' +
        '<div class="tweet-time"></div>' +
        '<div class="tweet-text"></div>' +
        '</div></div></li>');

        $.ajax({
            url: 'http://hypermediagym.altervista.org/php/get_instructor_twitter_feed.php?screen_name=AlexBehrensGym',
            method: 'GET',
            data: 'screen_name=' + screen_name,
            dataType: 'json',
            success: function(data) {
                if (data.hasOwnProperty('tweets')) {
                    for (var i in data.tweets) {
                        $('.timeline').append( createTweet(data.tweets[i], screen_name));
                    }
                    $('.twitter-container').fadeIn();
                }
            }
        });

    function createTweet(tweet, screen_name) {
        $('.twitter-screen-name')
            .attr('href', 'https://twitter.com/' + screen_name)
            .html('@' + screen_name);
        var $tempTweet = $tweet.clone();
        $tempTweet.find('.tweet-time').html(tweet.created_at.split("+")[0]);
        $tempTweet.find('.tweet-text').html(tweet.text);
        return $tempTweet;

    }

}
