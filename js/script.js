// Mixing jQuery and Node.js code in the same file? Yes please!

$(function(){

    // Display some statistics about this computer, using node's os module.

    var json = "https://raw.githubusercontent.com/EmolLi/Leetcode/b95f25893110f56b6ef1c86ec432084f8f4adf30/appData.json";
    var os = require('os');
    var prettyBytes = require('pretty-bytes');
    //let appData = require('../appData.json');

    $('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
    $('.stats').append('Free memory: <span>' + prettyBytes(os.freemem())+ '</span>');

    // Electron's UI library. We will need it for later.

    var shell = require('shell');


    // Fetch the recent posts on Tutorialzine.

    var ul = $('.flipster ul');
    //let a = 1;
    //alert(a);
/**
    let appData = {"Firefox": "../icon/firefox.png",
                    "Google Chrome": "../icon/googleChrome.png",
                    "Excel": "../icon/excel.png"};
**/
    // The same-origin security policy doesn't apply to electron, so we can
    // send ajax request to other sites. Let's fetch Tutorialzine's rss feed:

    $.getJSON( json, {
                        format: "json"
    })
    .done(function( data ) {

        $.each( data.items, function( i, item ) {
            //$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
            //if ( i === 3 ) {
              //  return false;
            //}
        });
        alert("He");
    });
/**
    $.get("http://feeds.feedburner.com/Tutorialzine", function(response){

        var rss = $(response);

        // Find all articles in the RSS feed:

        rss.find('item').each(function(){
            var item = $(this);
            
            var content = item.find('encoded').html().split('</a></div>')[0]+'</a></div>';
            var urlRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;

            // Fetch the first image of the article.
            var imageSource = content.match(urlRegex)[1];


            // Create a li item for every article, and append it to the unordered list.

            var li = $('<li><img /><a target="_blank"></a></li>');

            li.find('a')
                .attr('href', item.find('link').text())
                .text(item.find("title").text());

            li.find('img').attr('src', imageSource);

            li.appendTo(ul);

        });

        // Initialize the flipster plugin.

        $('.flipster').flipster({
            style: 'carousel'
        });

        // When an article is clicked, open the page in the system default browser.
        // Otherwise it would open it in the electron window which is not what we want.

        $('.flipster').on('click', 'a', function (e) {

            e.preventDefault();
            
            // Open URL with default browser.

            shell.openExternal(e.target.href);

        });

    });**/

});

/**
 *
 * @param appData {object} cmd/ app data. key is the name of the app/cmd, value is the icon, (link to pic, string) . If cmd, logo is just is just cmd picture, whatever
 *//**
function populateflipster(appData) {
    for (let app of appData){
        let li = $('<li><img /><a target="_blank"></a></li>');
        li.find('a')
            .attr('href', " ")  //maybe we dont need this
            .text(app);
        li.find('img').attr('src', appData[app]);
        li.appendTo(ul);
    }

}**/


//let a = {Firefox: "../icon/firefox.png", Google Chrome: "../icon/googleChrome.png", Excel: "../icon/excel.png"};
