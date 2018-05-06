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
        $('meta[property=og\\:title]').remove();
        $('meta[property=og\\:description]').remove();
        $('meta[property=og\\:image]').remove();
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

function submitAndShare() {
    // get the selected answer
    var userName = $('#name').val();
    var slideId = $('.center .slider__slide').attr('id');
    var slideText = $('.center .slider__title').html();


    var title = '';
    var description = '';
    var image = '';

    switch (slideId) {
        case 'share-1':
            title = userName + slideText;
            description = 'some text 1';
            image = 'http://drib.tech/fbsharetest/quiz_yoda.jpg';
            break;

        case 'share-2':
            title = userName + slideText;
            description = 'some text 2';
            image = 'http://drib.tech/fbsharetest/quiz_yoda.jpg';
            break;

        case 'share-3':
            title = userName + slideText;
            description = 'some text 3';
            image = 'http://drib.tech/fbsharetest/quiz_yoda.jpg';
            break;

        case 'share-4':
            title = userName + slideText;
            description = 'some text 4';
            image = 'http://drib.tech/fbsharetest/quiz_yoda.jpg';
            break;

        case 'share-5':
            title = userName + slideText;
            description = 'some text 5';
            image = 'http://drib.tech/fbsharetest/quiz_yoda.jpg';
            break;
    }

    $('meta[property=og\\:title]').remove();
    $('meta[property=og\\:description]').remove();
    $('meta[property=og\\:image]').remove();

    $('head').append('<meta name="og:title" content="' + title + '">');
    $('head').append('<meta name="og:description" content="' + description + '">');
    $('head').append('<meta name="og:image" content="' + image + '">');

    console.log(title, description, image);

    // and finally share it

    var buttons = document.querySelectorAll(".social_share");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            return JSShare.go(this);
        }, false);
    }
}