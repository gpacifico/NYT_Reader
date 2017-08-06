// Let's use the News Headline API and Text to Speech API I sent you.

// $(document).ready(getNYT);
$(document).ready(init);

// function getNYT() {
    // $.ajax({
    //     dataType: 'json',
    //     type: 'get',
    //     data: {
    //         api_key: '3788190a07ca43fdaf2083bef6b256d2'
    //     },
    //     url: "https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=3788190a07ca43fdaf2083bef6b256d2",
    //     success: function(story) {
    //         console.log(story.articles);
    //     }
    // });
// }

// var dummyData = `{"status":"ok","source":"the-new-york-times","sortBy":"top","articles":[{"author":"Julie Hirschfeld Davis","title":"Those Calls to Trump? White House Admits They Didn’t Happen","description":"The White House admitted the president was not phoned with praise by the head of the Boy Scouts or the president of Mexico. But there was an explanation.","url":"https://www.nytimes.com/2017/08/02/us/politics/those-calls-to-trump-white-house-admits-they-didnt-happen.html","urlToImage":"https://static01.nyt.com/images/2017/08/03/us/03DC-TRUMP-01/03DC-TRUMP-01-facebookJumbo.jpg","publishedAt":"2017-08-03T16:21:37Z"},{"author":"Michael D. Shear and Jonathan Martin","title":"In West Virginia, Trump Hails Conservatism and a New G.O.P. Governor","description":"With President Trump by his side, West Virginia’s newly elected Democratic governor, Jim Justice, announced that he is becoming a Republican.","url":"https://www.nytimes.com/2017/08/03/us/politics/west-virginia-governor-to-switch-from-democrat-to-republican-trump.html","urlToImage":"https://static01.nyt.com/images/2017/08/04/us/04DC-GOVERNOR-sub1/04DC-GOVERNOR-sub1-facebookJumbo-v2.jpg","publishedAt":"2017-08-04T05:15:35Z"},{"author":"Jason Horowitz","title":"A Vatican Shot Across the Bow for Hard-Line U.S. Catholics","description":"An officially vetted journal has sown rancor by depicting the U.S. church as overly political, captive to the right and out of step with the mainstream.","url":"https://www.nytimes.com/2017/08/02/world/europe/vatican-us-catholic-conservatives.html","urlToImage":"https://static01.nyt.com/images/2017/07/29/world/29Vatican1/29Vatican1-facebookJumbo.jpg","publishedAt":"2017-08-04T15:30:31Z"},{"author":"Glenn Thrush, Michael D. Shear and Eileen Sullivan","title":"John Kelly Quickly Moves to Impose Military Discipline on White House","description":"The former general and new chief of staff is seeking to quell dysfunction with a suddenness and force that have upended the West Wing.","url":"https://www.nytimes.com/2017/08/03/us/politics/john-kelly-chief-of-staff-trump.html","urlToImage":"https://static01.nyt.com/images/2017/08/03/us/03DC-KELLY/03DC-KELLY-facebookJumbo.jpg","publishedAt":"2017-08-04T14:14:36Z"},{"author":"Peter Baker","title":"Transcripts Show How Contentious Trump’s Calls Were With Mexican and Australian Leaders","description":"The exchanges turned so sharp that Mr. Trump said talking to President Vladimir V. Putin of Russia was more pleasant.","url":"https://www.nytimes.com/2017/08/03/us/politics/trump-calls-mexico-australia.html","urlToImage":"https://static01.nyt.com/images/2017/08/04/us/04dc-trumpcalls/04dc-trumpcalls-facebookJumbo.jpg","publishedAt":"2017-08-04T15:56:13Z"},{"author":"John Sipher and Steve Hall","title":"Opinion | Oh, Wait. Maybe It Was Collusion.","description":"Russian intelligence may have been trying to recruit allies within the Trump campaign to influence the election — and our government.","url":"https://www.nytimes.com/2017/08/02/opinion/donald-trump-russia-collusion-cia.html","urlToImage":"https://static01.nyt.com/images/2017/08/02/opinion/02CipherHall-web/02CipherHall-web-facebookJumbo.jpg","publishedAt":"2017-08-02T21:43:46Z"},{"author":"Anemona Hartocollis and Stephanie Saul","title":"Affirmative Action Battle Has a New Focus: Asian-Americans","description":"A lawsuit against Harvard raises the issue of whether there has been discrimination against Asian-Americans in the name of creating a diverse student body.","url":"https://www.nytimes.com/2017/08/02/us/affirmative-action-battle-has-a-new-focus-asian-americans.html","urlToImage":"https://static01.nyt.com/images/2017/08/05/us/04affirmative/04affirmative-facebookJumbo.jpg","publishedAt":"2017-08-04T17:28:32Z"},{"author":"Sara Manning Peskin, M.d.","title":"The Symptoms of Dying","description":"Whether you have cancer or heart disease or diabetes, dying has its own biology and symptoms. It’s a diagnosis in itself.","url":"https://www.nytimes.com/2017/06/20/well/live/the-symptoms-of-dying.html","urlToImage":"https://static01.nyt.com/images/2017/05/01/well/family/well-dying2/well-dying2-facebookJumbo.png","publishedAt":"2017-07-12T16:39:02Z"},{"author":"Pam Belluck","title":"In Breakthrough, Scientists Edit a Dangerous Mutation From Genes in Human Embryos","description":"Researchers have found a way to reliably remove disease-causing mutations from human embryos, an achievement sure to renew concerns over so-called designer babies.","url":"https://www.nytimes.com/2017/08/02/science/gene-editing-human-embryos.html","urlToImage":"https://static01.nyt.com/images/2017/08/04/insider/03GENE1/03GENE1-facebookJumbo.jpg","publishedAt":"2017-08-04T13:06:20Z"},{"author":"Peter Baker","title":"Trump Supports Plan to Cut Legal Immigration by Half","description":"Legislation would favor immigrants based on skills and education, while curtailing those brought into the country through family ties.","url":"https://www.nytimes.com/2017/08/02/us/politics/trump-immigration.html","urlToImage":"https://static01.nyt.com/images/2017/08/03/us/03immigration/03immigration-facebookJumbo-v3.jpg","publishedAt":"2017-08-04T17:52:26Z"}]}`
// dummyData = JSON.parse(dummyData);

// init();

function init() {
    var nytPromise = getNYT();

    nytPromise.then(function (nyt) {
        var articleTitles = [];
        var articleURLs = [];
        articleTitles = getArticleTitlesFromNYT(nyt);
        articleTitles = sanitizeArticleTitles(articleTitles);
        articleURLs = getArticleURLsFromNYT(nyt);
        displayArticleTitles(articleTitles,articleURLs);
        speakArticleTitles(articleTitles, articleURLs);
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
            url: "https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=3788190a07ca43fdaf2083bef6b256d2",
            success: function(nyt) {
                res(nyt);
            }
        });
        // window.setTimeout(function () {
        //     res(dummyData);
        // }, 0);
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

function displayArticleTitles(articleTitles, articleURLs) {
    // var articles = dummyData.articles;
    var articlesDOMElement = document.getElementById('articles');

    var frag = document.createDocumentFragment();
    // var articleTitles = [];

    for (var i = 0; i < articleTitles.length; i++) {
        // articleTitles.push(articles[i].title);

        var div = document.createElement('div');
        div.className = "article-item";

        var a = document.createElement('a');
        a.setAttribute('href', articleURLs[i]);
        a.setAttribute('target', '_blank');

        var h4 = document.createElement('h4');
        h4.className = "article-title";

        var text = articleTitles[i];
        // text = sanitizeText(text);
        var tn = document.createTextNode(text);

        a.appendChild(h4);
        h4.appendChild(tn);
        div.appendChild(a);
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

function speakArticleTitles(articleTitles) {
    // We lucked out, this automatically runs synchronously, convenient!
    for (var j = 0; j < articleTitles.length; j++) {
        responsiveVoice.speak(articleTitles[j], "US English Female", {onstart: null, onend: null});
    }
    return;
}