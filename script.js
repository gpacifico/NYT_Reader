// Let's use the News Headline API and Text to Speech API I sent you.

$(document).ready(getNYT);

function getNYT() {
    $.ajax({
        dataType: 'json',
        type: 'get',
        data: {
            api_key: '3788190a07ca43fdaf2083bef6b256d2'
        },
        url: "https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=3788190a07ca43fdaf2083bef6b256d2",
        success: function(story) {
            console.log(story.articles);
        }
    });
}

