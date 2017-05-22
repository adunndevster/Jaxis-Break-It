// Write your Javascript code.
$(document).ready(function ($) {
    
    //nav dropdown
    setTimeout(function () {
        //nav dropdown
        $('.nav-drop').hover(function () {
            $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(250);
        }, function () {
            $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(250);
        });
    }, 1);
});

