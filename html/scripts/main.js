$(document).ready(function() {

    $('#header .toggle').click(function(e) {
        $('#header nav').toggleClass('expanded');
        e.preventDefault();
        return false;
    });

});
