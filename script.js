// Let's use the News Headline API and Text to Speech API I sent you.

function getNYT() {
    $.ajax({
        dataType: 'json',
        type: 'get',
        data: {
            api_key: 'comingsoon'
        },
        url: url.get,
        success: function(result) {
            console.log("it's reading");
        }
    });
}
