(function ($) {
    "use strict"; // Start of use strict

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
        console.log('test');
        $("#content-wrapper").toggleClass("toggled");
    });
})(jQuery);