(function ($) {
    "use strict"; // Start of use strict

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
        $("#content-wrapper").toggleClass("toggled");
        $("#dashboard_nav").toggleClass("toggled");
    });
})(jQuery);