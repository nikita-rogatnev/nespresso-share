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
        $('input:radio[name=image]').attr('checked', false);
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
            title = userName + ' is wise like Yoda!';
            description = 'some text 2';
            image = 'http://drib.tech/fbsharetest/quiz_yoda.jpg';
            break;

        case 'share-3':
            title = userName + ' is wise like Yoda!';
            description = 'some text 3';
            image = 'http://drib.tech/fbsharetest/quiz_yoda.jpg';
            break;

        case 'share-4':
            title = userName + ' is wise like Yoda!';
            description = 'some text 4';
            image = 'http://drib.tech/fbsharetest/quiz_yoda.jpg';
            break;

        case 'share-5':
            title = userName + ' is wise like Yoda!';
            description = 'some text 5';
            image = 'http://drib.tech/fbsharetest/quiz_yoda.jpg';
            break;
    }

    // and finally share it

    shareOverrideOGMeta(window.location.href,
        title,
        description,
        image);

    return false;
}

function shareOverrideOGMeta(overrideLink, overrideTitle, overrideDescription, overrideImage) {
    FB.ui({
            method: 'share_open_graph',
            action_type: 'og.shares',
            action_properties: JSON.stringify({
                object: {
                    'og:url': overrideLink,
                    'og:title': overrideTitle,
                    'og:description': overrideDescription,
                    'og:image': overrideImage
                }
            })
        },

        function (response) {
            // Action after response
        });

    document.write(VK.Share.button({
        url: overrideLink,
        title: overrideTitle,
        image: overrideImage,
        noparse: true
    }));

    console.log(overrideLink, overrideTitle, overrideDescription, overrideImage);
}


function shareOriginal() {
    FB.ui({
            method: 'share',
            href: window.location.href
        },
        function (response) {
            // Action after response
        });

    return false;
}
