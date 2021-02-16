(function ($) {
    "use strict"; // Start of use strict

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
        $("body").toggleClass("sidebar-toggled");
        $("#content-wrapper").toggleClass("toggled");
        $("#dashboard_nav").toggleClass("toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Close any open menu accordions when window is resized below 992px
    $(window).resize(function() {
        if ($(window).width() < 992) {
            $('.sidebar .collapse').collapse('hide');
        };
        // Toggle the side navigation when window is resized below 576px
        if ($(window).width() < 576 && !$(".sidebar").hasClass("toggled")) {
            $("body").addClass("sidebar-toggled");
            $(".sidebar").addClass("toggled");
            $('.sidebar .collapse').collapse('hide');
        };
        if ($(window).width() > 576) {
            $("body").removeClass("sidebar-toggled");
            $(".sidebar").removeClass("toggled");
        }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
        if ($(window).width() > 992) {
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });

    // Scroll to top button appear
    $(document).on('scroll', function() {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function(e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });

    /* ******************************* */
    /* ******* Zoomable Cards ******** */
    /* ******************************* */
    $(document).on('click', '.card.zoomable .card-header', function(e) {
        $(this).closest('.card.zoomable').toggleClass('zoomed');
        $(this).children('i').toggleClass('fa-expand-arrows-alt fa-compress-arrows-alt');
    });

    $('.card.zoomable .card-header').each(function(index, elt){
        $(this).append("<i class='fas fa-expand-arrows-alt text-muted float-right' style='padding-top:0.25rem'></i>");
    });

    //close zoomed card if click outside
    $(document).mouseup(function(e)
    {
        var container = $(".card.zoomable.zoomed");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            container.removeClass('zoomed');
            container.children('i').toggleClass('fa-expand-arrows-alt fa-compress-arrows-alt');
        }
    });
    /* ******************************* */
    /* **** End of Zoomable Cards **** */
    /* ******************************* */
    
})(jQuery);