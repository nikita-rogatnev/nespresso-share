$(document).ready(function () {
    $('.owl-carousel').children().each(function (index) {
        $(this).attr('data-position', index);
    });

    if ($(window).width() < 1160) {
        $('.owl-carousel').owlCarousel({
            center: true,
            loop: true,
            items: 1,
        });
    }

    else {
        $('.owl-carousel').owlCarousel({
            center: true,
            loop: true,
            items: 3,
        });
    }

    // Go to the next item
    $('.owl-next').click(function () {
        $('.owl-carousel').trigger('next.owl.carousel');
    });

    // Go to the previous item
    $('.owl-prev').click(function () {
        $('.owl-carousel').trigger('prev.owl.carousel', [300]);
    });

    $(document).on('click', '.owl-item>div', function () {
        $('.owl-carousel').trigger('to.owl.carousel', $(this).data('position'));
    });

    $(".intro .slider__slide").click(function (e) {
        e.preventDefault();
        $(".modal").removeClass('is-hidden');
        $(".slider").addClass('is-modal');
        $(".intro").addClass('is-blur');
    });

    $(".modal__close").click(function (e) {
        e.preventDefault();
        $(".modal, .form, .final").addClass('is-hidden');
        $(".slider").removeClass('is-modal is-hidden');
        $(".intro").removeClass('is-blur');
    });

    $(".slider__link a").click(function (e) {
        e.preventDefault();
        $(".slider").removeClass('is-modal');
        $(".form").removeClass('is-hidden');
    });

    $(".form button").click(function (e) {
        e.preventDefault();
        $(".form").addClass('is-hidden');
        $(".final").removeClass('is-hidden');
    });

});
