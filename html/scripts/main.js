$(document).ready(function() {

    $('#header .toggle').click(function(e) {
        $('#header nav').toggleClass('expanded');
        e.preventDefault();
        return false;
    });

    controller.loadInitialTweets(5);
});



// this is in a closure so it could be separated in separated modules
var view = function() {

    var $container = $('#content')

    var populateDom = function(listOfTweets) {

        var template = $('#template').html();
        Mustache.parse(template);

        console.log(template);

        var output = Mustache.render(template, listOfTweets);
        $container.html(output);
    }

    return {
        displayTweets: populateDom
    }
}();


// this is in a closure so it could be separated in separated modules
var controller = function() {

    // the controller here is asking the model the data needed by the view
    // args: n is the number of tweet for initial load
    var loadInitialTweets = function(n) {
        view.displayTweets(dataMangement.getLastNTweets(n));
    }

    return {
        loadInitialTweets: loadInitialTweets
    }
}();
