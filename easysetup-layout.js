(function ($) {
    $(document).ready(function () {
        //header fixed
        $(window).scroll(function () {
            if (($(".header.fixed").length > 0)) {
                if (($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                    $("body").addClass("fixed-header-on");
                } else {
                    $("body").removeClass("fixed-header-on");
                }
            }
            ;
        });
        $(window).load(function () {
            if (($(".header.fixed").length > 0)) {
                if (($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                    $("body").addClass("fixed-header-on");
                } else {
                    $("body").removeClass("fixed-header-on");
                }
            }
            ;
        });
        //Scroll Spy
        if ($(".scrollspy").length > 0) {
            $("body").addClass("scroll-spy");
            $('body').scrollspy({
                target: '.scrollspy',
                offset: 152
            });
        }
        //smooth scroll
        if ($(".smooth-scroll").length > 0) {
            $('.smooth-scroll a[href*=#]:not([href=#]), a[href*=#]:not([href=#]).smooth-scroll').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 151
                        }, 1000);
                        return false;
                    }
                }
            });
        }
        // Animations fadeIn
        //-----------------------------------------------
        if (($("[data-animation-effect]").length > 0)) {
            $("[data-animation-effect]").each(function () {
                var $this = $(this);
                //$this.attr("data-animation-effect");
                $this.addClass('object-visible');

            });
        }
    });
})(this.jQuery);