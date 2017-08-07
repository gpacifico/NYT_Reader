$(document).ready(init);

function init() {
    var nytPromise = getNYT();

    nytPromise.then(function (nyt) {
        var articleTitles = [];
        var articleURLs = [];
        var articleDescriptions = [];
        var articleImages = [];
        articleTitles = getArticleTitlesFromNYT(nyt);
        articleTitles = sanitizeArticleTitles(articleTitles);
        articleURLs = getArticleURLsFromNYT(nyt);
        articleDescriptions = getArticleDescriptionsFromNYT(nyt);
        articleImages = getArticleImagesFromNYT(nyt);
        displayArticleItems(articleTitles,articleURLs, articleDescriptions, articleImages);
        speakArticleTitles(articleTitles, articleDescriptions);
    });
}

function getNYT() {
    var nytPromise = new Promise(function (res, rej) {
        $.ajax({
            dataType: 'json',
            type: 'get',
            data: {
                api_key: '3788190a07ca43fdaf2083bef6b256d2'
            },
            url: "https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=3788190a07ca43fdaf2083bef6b256d2",
            success: function(nyt) {
                res(nyt);
            }
        });
    });
    return nytPromise;
}

function sanitizeArticleTitles(articleTitles) {
    for(var i = 0; i < articleTitles.length; i++){
        articleTitles[i] = sanitizeText(articleTitles[i]);
    }
    return articleTitles;
}

function getArticleTitlesFromNYT(nyt) {
    var articleTitles = [];
    for (var i = 0; i < nyt.articles.length; i++) {
        articleTitles.push(nyt.articles[i].title);
    }
    return articleTitles;
}

function getArticleURLsFromNYT(nyt) {
    var articleURLs = [];
    for (var i = 0; i < nyt.articles.length; i++) {
        articleURLs.push(nyt.articles[i].url);
    }
    return articleURLs;
}

function getArticleDescriptionsFromNYT(nyt) {
    var articleDescriptions = [];
    for (var i = 0; i < nyt.articles.length; i++) {
        articleDescriptions.push(nyt.articles[i].description);
    }
    return articleDescriptions;
}

function getArticleImagesFromNYT(nyt) {
    var articleImages = [];
    for (var i = 0; i < nyt.articles.length; i++) {
        articleImages.push(nyt.articles[i].urlToImage);
    }
    return articleImages;
}

function displayArticleDescriptions(articleDescriptions) {
    var describe = $('<h5>', {
        class:'descr',
        html: articleDescriptions,
    });
    for(var g = 0; g < articleDescriptions.length; g++) {
        $('#description').append(describe);
    }
}

function displayArticleItems(articleTitles, articleURLs, articleDescriptions, articleImages) {
    var articlesDOMElement = document.getElementById('articles');

    var frag = document.createDocumentFragment();

    for (var i = 0; i < articleTitles.length; i++) {
        var div = document.createElement('div');
        div.className = "article-item";

        var a = document.createElement('a');
        a.setAttribute('href', articleURLs[i]);
        a.setAttribute('target', '_blank');

        var h4 = document.createElement('h4');
        h4.className = "article-title";

        var text = articleTitles[i];

        var tn = document.createTextNode(text);

        var describe = $('<p>', {
            class:'article-description',
            html: articleDescriptions[i],
        });

        var pics = $('<img>', {
            class:'article-image',
            src: articleImages[i],
        });

        var articleText = $('<div>', {
            class: 'article-text',
            });

        var picDiv = $('<div>', {
            class: 'article-image-div',
        });

        picDiv.append(pics);
        a.appendChild(h4);
        h4.appendChild(tn);
        articleText.append(a);
        articleText.append(describe);
        $(div).append(picDiv);
        $(div).append(articleText);

        frag.appendChild(div);
    }

    articlesDOMElement.appendChild(frag);
    return;
}


function sanitizeText(text) {
    var sanitizeArray = [
        {
            'regex': /\’/g,
            'replacement': '\''
        }
    ];

    for (var i = 0; i < sanitizeArray.length; i++) {
        text = text.replace(sanitizeArray[i].regex, sanitizeArray[i].replacement);
    }
    return text;
}

function speakArticleTitles(articleTitles, articleDescriptions) {
    for (var j = 0; j < articleTitles.length; j++) {
        responsiveVoice.speak(articleTitles[j], "US English Female", {onstart: null, onend: null});
        responsiveVoice.speak(articleDescriptions[j], "US English Female", {onstart: null, onend: null});
    }
    return;
}